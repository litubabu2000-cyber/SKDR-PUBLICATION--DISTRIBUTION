
'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Orbit, Sun, Moon, Rocket, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Planet data (simplified)
const solarSystemData = [
  { name: 'Sun', color: 0xffcc00, size: 10, isStar: true },
  { name: 'Mercury', color: 0x999999, size: 1, distance: 15, speed: 0.04 },
  { name: 'Venus', color: 0xffd700, size: 1.5, distance: 22, speed: 0.025 },
  { name: 'Earth', color: 0x0077be, size: 1.6, distance: 30, speed: 0.015, moon: { size: 0.4, distance: 2.5, speed: 0.1 } },
  { name: 'Mars', color: 0xff5733, size: 1.2, distance: 40, speed: 0.01 },
  { name: 'Jupiter', color: 0xffa500, size: 5, distance: 60, speed: 0.005 },
  { name: 'Saturn', color: 0xd2b48c, size: 4, distance: 80, speed: 0.003, ring: { inner: 5, outer: 7 } },
  { name: 'Uranus', color: 0xadd8e6, size: 3, distance: 100, speed: 0.002 },
  { name: 'Neptune', color: 0x00008b, size: 2.8, distance: 120, speed: 0.001 },
];

declare global {
  interface Window {
    THREE: any;
  }
}

const ThreeScene = ({ timeScale, onReady }: { timeScale: number; onReady: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    let animationId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let renderer: any, scene: any, camera: any, controls: any;

    if (!window.THREE) {
      const threeScript = document.createElement('script');
      threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      document.head.appendChild(threeScript);
      
      threeScript.onload = () => {
          initScene();
          onReady();
      };
    } else {
      initScene();
      onReady();
    }

    function initScene() {
      const THREE = window.THREE;
      if (!containerRef.current) return;
      
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 50, 100);
      
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      
      const onWindowResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
      window.addEventListener('resize', onWindowResize, false);
      
      // Starfield
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 5000;
      const posArray = new Float32Array(starsCount * 3);
      for(let i=0; i<starsCount*3; i++) {
          posArray[i] = (Math.random() - 0.5) * 500
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const starsMaterial = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff });
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);
      
      // The Sun
      const sunData = solarSystemData[0];
      const pointLight = new THREE.PointLight(sunData.color, 3, 500);
      scene.add(pointLight);
      
      const sunGeometry = new THREE.SphereGeometry(sunData.size, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: sunData.color });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      scene.add(sun);
      
      // Planets
      solarSystemData.slice(1).forEach(data => {
        const planetGroup = new THREE.Group();
        scene.add(planetGroup);

        const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({ color: data.color, metalness: 0.3, roughness: 0.7 });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.userData = { ...data, group: planetGroup };
        scene.add(planet);

        // Orbit Path
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 128);
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.2, transparent: true, side: THREE.DoubleSide });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = -Math.PI / 2;
        scene.add(orbit);

        // Moon
        if (data.moon) {
            const moonGeometry = new THREE.SphereGeometry(data.moon.size, 16, 16);
            const moonMaterial = new THREE.MeshStandardMaterial({color: 0xcccccc});
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.userData = data.moon;
            planet.add(moon);
        }

        // Saturn's Ring
        if (data.ring) {
            const ringGeometry = new THREE.RingGeometry(data.ring.inner, data.ring.outer, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide, opacity: 0.6, transparent: true });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + 0.2;
            planet.add(ring);
        }
      });

      sceneRef.current = { scene, camera, renderer };

      animate();
    }

    function animate() {
      if (!sceneRef.current) return;
      const { scene } = sceneRef.current;
      const now = Date.now() * 0.0001 * timeScale;
      
      scene.children.forEach((obj: any) => {
        if (obj.isMesh && obj.userData.distance) { // It's a planet
          obj.position.x = Math.cos(now * obj.userData.speed) * obj.userData.distance;
          obj.position.z = Math.sin(now * obj.userData.speed) * obj.userData.distance;
          obj.rotation.y += 0.005;

          // Animate moon
          obj.children.forEach((child: any) => {
              if (child.isMesh && child.userData.distance) {
                child.position.x = Math.cos(now * 2 * child.userData.speed) * child.userData.distance;
                child.position.z = Math.sin(now * 2 * child.userData.speed) * child.userData.distance;
              }
          })
        }
      });
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sceneRef.current) return;
      const { scene } = sceneRef.current;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      scene.rotation.y += deltaMove.x * 0.005;
      scene.rotation.x += deltaMove.y * 0.005;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };
    
    const handleZoom = (e: WheelEvent) => {
        if (!sceneRef.current) return;
        camera.position.z -= e.deltaY * 0.1;
        camera.position.z = Math.max(20, Math.min(300, camera.position.z));
    }

    const currentRef = containerRef.current;
    if (currentRef) {
        currentRef.addEventListener('mousedown', handleMouseDown);
        currentRef.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        currentRef.addEventListener('wheel', handleZoom);
    }
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (currentRef) {
        currentRef.removeEventListener('mousedown', handleMouseDown);
        currentRef.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        currentRef.removeEventListener('wheel', handleZoom);
        if (renderer && renderer.domElement) {
          currentRef.removeChild(renderer.domElement);
        }
      }
    };
  }, [timeScale, onReady]);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};

export default function SolarSystemPage() {
    const [timeScale, setTimeScale] = useState(1);
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="relative h-[calc(100vh-4rem)] w-full bg-black overflow-hidden">
            {!isReady && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <p className="text-white text-lg animate-pulse">Loading 3D Solar System...</p>
                </div>
            )}
            <ThreeScene timeScale={timeScale} onReady={() => setIsReady(true)} />
            
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:max-w-md z-10">
                <Card className="bg-slate-900/70 text-white border-slate-700 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Orbit /> Solar System Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Simulation Speed</label>
                            <Slider
                                value={[timeScale]}
                                onValueChange={(value) => setTimeScale(value[0])}
                                min={0}
                                max={10}
                                step={0.1}
                            />
                        </div>
                        <p className="text-xs text-slate-400">
                            Use your mouse to drag and rotate the view. Use the scroll wheel to zoom in and out.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
