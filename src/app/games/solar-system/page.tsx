'use client';
import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Orbit, Sun, Moon, Rocket, ZoomIn, ZoomOut, RotateCw, Play, Pause, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


// Planet data (simplified)
const solarSystemData = [
  { name: 'Sun', color: 0xffcc00, size: 10, isStar: true },
  { name: 'Mercury', color: 0x999999, size: 1, distance: 18, speed: 0.04 },
  { name: 'Venus', color: 0xffd700, size: 1.5, distance: 25, speed: 0.025 },
  { name: 'Earth', color: 0x0077be, size: 1.6, distance: 35, speed: 0.015, moon: { size: 0.4, distance: 3, speed: 0.1 } },
  { name: 'Mars', color: 0xff5733, size: 1.2, distance: 48, speed: 0.01 },
  { name: 'Jupiter', color: 0xffa500, size: 5, distance: 70, speed: 0.005 },
  { name: 'Saturn', color: 0xd2b48c, size: 4, distance: 95, speed: 0.003, ring: { inner: 5.5, outer: 8 } },
  { name: 'Uranus', color: 0xadd8e6, size: 3, distance: 120, speed: 0.002 },
  { name: 'Neptune', color: 0x00008b, size: 2.8, distance: 140, speed: 0.001 },
];

declare global {
  interface Window {
    THREE: any;
  }
}

const ThreeScene = forwardRef(({ timeScale, onReady }: { timeScale: number, onReady: () => void }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
      renderer: null as any,
      camera: null as any,
      scene: null as any,
      rootGroup: null as any, // Group for rotation
      timeScale: timeScale,
  }).current;

  // Make methods available to parent component
  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      if(stateRef.camera) stateRef.camera.position.z = Math.max(20, stateRef.camera.position.z - 10);
    },
    zoomOut: () => {
        if(stateRef.camera) stateRef.camera.position.z = Math.min(400, stateRef.camera.position.z + 10);
    },
    resetView: () => {
        if(stateRef.camera && stateRef.rootGroup) {
            stateRef.camera.position.set(0, 60, 150);
            stateRef.rootGroup.rotation.set(0.3, 0, 0); // Slight initial tilt
        }
    }
  }));

  // Update timeScale ref when prop changes
  useEffect(() => {
    stateRef.timeScale = timeScale;
  }, [timeScale, stateRef]);

  // One-time setup effect
  useEffect(() => {
    let animationId: number;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const init = () => {
      if (!containerRef.current || !window.THREE) return;
      const THREE = window.THREE;
      
      // Scene & Camera
      stateRef.scene = new THREE.Scene();
      stateRef.camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      stateRef.camera.position.set(0, 60, 150);
      
      // Renderer
      stateRef.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      stateRef.renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      stateRef.renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(stateRef.renderer.domElement);
      
      // A group to apply rotation to, so camera can stay independent
      stateRef.rootGroup = new THREE.Group();
      stateRef.rootGroup.rotation.x = 0.3; // Initial tilt
      stateRef.scene.add(stateRef.rootGroup);

      // --- Scene Objects ---

      // Starfield
      const starsGeometry = new THREE.BufferGeometry();
      const starsCount = 10000;
      const posArray = new Float32Array(starsCount * 3);
      for(let i=0; i<starsCount*3; i++) {
          posArray[i] = (Math.random() - 0.5) * 800;
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const starsMaterial = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff });
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      stateRef.scene.add(starField);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      stateRef.rootGroup.add(ambientLight);
      
      // The Sun
      const sunData = solarSystemData[0];
      const pointLight = new THREE.PointLight(sunData.color, 4, 800);
      stateRef.rootGroup.add(pointLight);
      
      const sunGeometry = new THREE.SphereGeometry(sunData.size, 32, 32);
      const sunMaterial = new THREE.MeshBasicMaterial({ color: sunData.color });
      const sun = new THREE.Mesh(sunGeometry, sunMaterial);
      
      // Sun glow
      const spriteMaterial = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(generateGlowTexture()),
        color: 0xffd700, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.7
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(sunData.size * 4, sunData.size * 4, 1.0);
      sun.add(sprite);
      stateRef.rootGroup.add(sun);
      
      // Planets
      solarSystemData.slice(1).forEach(data => {
        const planet = new THREE.Mesh(
          new THREE.SphereGeometry(data.size, 32, 32),
          new THREE.MeshStandardMaterial({ color: data.color, metalness: 0.1, roughness: 0.8 })
        );
        planet.userData = { ...data };
        stateRef.rootGroup.add(planet);

        const orbit = new THREE.Mesh(
          new THREE.RingGeometry(data.distance - 0.05, data.distance + 0.05, 128),
          new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.15, transparent: true, side: THREE.DoubleSide })
        );
        orbit.rotation.x = -Math.PI / 2;
        stateRef.rootGroup.add(orbit);

        if (data.moon) {
            const moon = new THREE.Mesh(
                new THREE.SphereGeometry(data.moon.size, 16, 16),
                new THREE.MeshStandardMaterial({color: 0xcccccc})
            );
            moon.userData = data.moon;
            planet.add(moon);
        }

        if (data.ring) {
            const ring = new THREE.Mesh(
              new THREE.RingGeometry(data.ring.inner, data.ring.outer, 64),
              new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide, opacity: 0.4, transparent: true })
            );
            ring.rotation.x = Math.PI / 2 + 0.3;
            planet.add(ring);
        }
      });
      
      if(onReady) onReady();
      animate();
    }
    
    function generateGlowTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d')!;
        const gradient = context.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,0,1)');
        gradient.addColorStop(0.4, 'rgba(255,150,0,1)');
        gradient.addColorStop(1, 'rgba(255,150,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0,0,canvas.width, canvas.height);
        return canvas;
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!stateRef.scene) return;
      const now = Date.now() * 0.0001 * stateRef.timeScale;
      
      stateRef.rootGroup.children.forEach((obj: any) => {
        if (obj.isMesh && obj.userData.distance) { // Planet
          obj.position.x = Math.cos(now * obj.userData.speed) * obj.userData.distance;
          obj.position.z = Math.sin(now * obj.userData.speed) * obj.userData.distance;
          obj.rotation.y += 0.005;

          obj.children.forEach((child: any) => {
              if (child.isMesh && child.userData.distance) { // Moon
                child.position.x = Math.cos(now * 10 * child.userData.speed) * child.userData.distance;
                child.position.z = Math.sin(now * 10 * child.userData.speed) * child.userData.distance;
              }
          })
        }
      });
      
      stateRef.renderer.render(stateRef.scene, stateRef.camera);
    }
    
    // --- Event Handlers ---
    const onWindowResize = () => {
        if (!containerRef.current || !stateRef.camera || !stateRef.renderer) return;
        stateRef.camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        stateRef.camera.updateProjectionMatrix();
        stateRef.renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !stateRef.rootGroup) return;
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        stateRef.rootGroup.rotation.y += deltaMove.x * 0.005;
        stateRef.rootGroup.rotation.x += deltaMove.y * 0.005;
        // Clamp vertical rotation
        stateRef.rootGroup.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, stateRef.rootGroup.rotation.x));
        previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => { isDragging = false; };
    const handleZoom = (e: WheelEvent) => {
        if (!stateRef.camera) return;
        e.preventDefault();
        stateRef.camera.position.z += e.deltaY * 0.1;
        stateRef.camera.position.z = Math.max(20, Math.min(400, stateRef.camera.position.z));
    }

    // --- Script Loading & Cleanup ---
    useEffect(() => {
        if (!window.THREE) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
          document.head.appendChild(threeScript);
          threeScript.onload = init;
        } else {
          init();
        }
        
        const currentRef = containerRef.current;
        if (currentRef) {
            window.addEventListener('resize', onWindowResize);
            currentRef.addEventListener('mousedown', handleMouseDown);
            currentRef.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            currentRef.addEventListener('wheel', handleZoom, { passive: false });
        }
        
        return () => {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', onWindowResize);
          if (currentRef) {
            currentRef.removeEventListener('mousedown', handleMouseDown);
            currentRef.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            currentRef.removeEventListener('wheel', handleZoom);
            if (stateRef.renderer) {
                currentRef.removeChild(stateRef.renderer.domElement);
                stateRef.renderer.dispose();
            }
          }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
});
ThreeScene.displayName = "ThreeScene";

export default function SolarSystemPage() {
    const [timeScale, setTimeScale] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const sceneRef = useRef<any>(null); // To call methods on ThreeScene

    const handleZoomIn = () => sceneRef.current?.zoomIn();
    const handleZoomOut = () => sceneRef.current?.zoomOut();
    const handleReset = () => sceneRef.current?.resetView();

    const effectiveTimeScale = isPlaying ? timeScale : 0;

    return (
        <div className="h-screen w-full bg-black text-white flex flex-col overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-20 p-4">
                <h1 className="text-xl font-bold text-center bg-black/20 backdrop-blur-md rounded-lg px-4 py-2 w-fit mx-auto shadow-lg">
                    Interactive 3D Solar System
                </h1>
            </header>
            
            <div className="flex-1 relative">
                {!isReady && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm gap-4">
                        <Orbit className="w-16 h-16 animate-spin text-cyan-400" />
                        <p className="text-white/80 text-lg">Loading Planets...</p>
                    </div>
                )}
                <ThreeScene ref={sceneRef} timeScale={effectiveTimeScale} onReady={() => setIsReady(true)} />
            </div>

            <footer className="absolute bottom-0 left-0 right-0 z-10 p-4 flex justify-center">
                <Card className="bg-slate-900/80 text-white border-slate-700 backdrop-blur-md w-full max-w-lg shadow-2xl">
                    <CardContent className="p-2 sm:p-4 flex items-center gap-2 sm:gap-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="hover:bg-slate-700" onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause /> : <Play />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>{isPlaying ? 'Pause' : 'Play'}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="flex-1 flex items-center gap-2">
                             <FastForward className="text-slate-400 shrink-0" />
                             <Slider
                                value={[timeScale]}
                                onValueChange={(value) => setTimeScale(value[0])}
                                min={0.1}
                                max={20}
                                step={0.1}
                            />
                        </div>
                        
                        <div className="flex items-center gap-1 border-l border-slate-700 pl-2 sm:pl-3">
                           <TooltipProvider>
                               <Tooltip>
                                   <TooltipTrigger asChild><Button variant="ghost" size="icon" className="hover:bg-slate-700" onClick={handleZoomIn}><ZoomIn /></Button></TooltipTrigger>
                                   <TooltipContent><p>Zoom In</p></TooltipContent>
                               </Tooltip>
                                <Tooltip>
                                   <TooltipTrigger asChild><Button variant="ghost" size="icon" className="hover:bg-slate-700" onClick={handleZoomOut}><ZoomOut /></Button></TooltipTrigger>
                                   <TooltipContent><p>Zoom Out</p></TooltipContent>
                               </Tooltip>
                                <Tooltip>
                                   <TooltipTrigger asChild><Button variant="ghost" size="icon" className="hover:bg-slate-700" onClick={handleReset}><RotateCw /></Button></TooltipTrigger>
                                   <TooltipContent><p>Reset View</p></TooltipContent>
                               </Tooltip>
                           </TooltipProvider>
                        </div>
                    </CardContent>
                </Card>
            </footer>
        </div>
    );
}
