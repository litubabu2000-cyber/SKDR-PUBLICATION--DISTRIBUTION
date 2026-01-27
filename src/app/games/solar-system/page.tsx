'use client';
import React, { useEffect, useRef, useState } from 'react';

// --- Static Data and Helpers (Outside Component) ---
const PLANET_DATA = [
    { name: "Mercury (Budh)", size: 2.4, distance: 28, speed: 0.04, type: 'rocky', color: '#D5D5D5', fact: "Yeh humare saurmandal ka sabse chhota grah hai aur Suraj ke sabse paas hai. Din mein iska taapman 430°C tak pahunch sakta hai." },
    { name: "Venus (Shukra)", size: 3.8, distance: 40, speed: 0.015, type: 'atmosphere', color: '#FFD700', fact: "Shukra saurmandal ka sabse garam grah hai. Iska ghana vaayumandal garmi ko rok leta hai (greenhouse effect), jisse yeh Mercury se bhi zyada garam ho jata hai." },
    { name: "Earth (Prithvi)", size: 4.0, distance: 58, speed: 0.01, type: 'earth', color: '#4466FF', fact: "Humara ghar. Abhi tak humein sirf yahin par jeevan mila hai. Yeh saurmandal ka ekmatra grah hai jiske satah par liquid paani maujood hai." },
    { name: "Mars (Mangal)", size: 2.8, distance: 75, speed: 0.008, type: 'rocky', color: '#FF5500', fact: "Mangal ek thanda, dhool bhara, registani duniya hai. Wahan bohot patla vaayumandal hai. Vaigyanikon ko lagta hai ki arabo saal pehle wahan paani hua karta tha." },
    { name: "Jupiter (Brihaspati)", size: 10, distance: 110, speed: 0.004, type: 'gas', color: '#EEDDAA', fact: "Brihaspati baaki sabhi grahon ko milakar bhi unse doguna bhaari hai. Iska 'Great Red Spot' ek bohot purana toofan hai jo Prithvi se bhi bada hai." },
    { name: "Saturn (Shani)", size: 8.5, distance: 150, speed: 0.003, type: 'ringed', color: '#FFEE88', fact: "Shani apne sundar rings ke liye jaana jata hai. Doosre gas giants ke paas bhi rings hain, lekin Shani ke rings sabse shandaar aur bade hain." },
    { name: "Uranus (Arun)", size: 5.0, distance: 190, speed: 0.002, type: 'gas', color: '#88FFCC', fact: "Arun apne orbit mein lagbhag 90-degree jhuka hua hai, jisse aisa lagta hai ki yeh apni side par ghoom raha hai. Yeh bohot thanda grah hai." },
    { name: "Neptune (Varun)", size: 4.8, distance: 230, speed: 0.001, type: 'gas', color: '#66B2FF', fact: "Varun bohot andhera, thanda aur tez hawaon wala grah hai. Yeh pehla grah tha jise telescope se pehle ganit (maths) ke zariye dhoonda gaya tha." }
];

declare global {
  interface Window {
    THREE: any;
    OrbitControls: any;
  }
}

const createTexture = (THREE: any, type: string, baseColorStr: string) => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = baseColorStr;
    ctx.fillRect(0, 0, size, size);
    if (type === 'gas' || type === 'ringed') { ctx.globalAlpha = 0.3; for (let i = 0; i < 20; i++) { const y = Math.random() * size; const h = Math.random() * 50 + 10; ctx.fillStyle = Math.random() > 0.5 ? '#222' : '#fff'; ctx.fillRect(0, y, size, h); } ctx.globalAlpha = 0.1; ctx.fillStyle = baseColorStr; ctx.fillRect(0,0,size,size); }
    else if (type === 'rocky') { ctx.globalAlpha = 0.15; for (let i = 0; i < 100; i++) { const x = Math.random() * size; const y = Math.random() * size; const r = Math.random() * 20; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = Math.random() > 0.5 ? '#222' : '#666'; ctx.fill(); } }
    else if (type === 'atmosphere') { ctx.globalAlpha = 0.3; for(let i=0; i<300; i++){ ctx.beginPath(); ctx.arc(Math.random()*size, Math.random()*size, Math.random()*80, 0, Math.PI*2); ctx.fillStyle = "#fff"; ctx.fill(); } }
    else if (type === 'earth') { ctx.fillStyle = "#2a5dbf"; ctx.fillRect(0,0,size,size); ctx.fillStyle = "#4a8d4a"; ctx.globalAlpha = 1.0; for(let i=0; i<30; i++) { ctx.beginPath(); let x = Math.random() * size; let y = Math.random() * size; if(y < 50 || y > size - 50) continue; let r = Math.random() * 80 + 20; ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill(); } ctx.globalAlpha = 0.5; ctx.fillStyle = "#fff"; for(let i=0; i<100; i++) { ctx.beginPath(); ctx.arc(Math.random()*size, Math.random()*size, Math.random()*40, 0, Math.PI*2); ctx.fill(); } }
    return new THREE.CanvasTexture(canvas);
};

const createRingTexture = (THREE: any) => {
    const size = 256; const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size; const ctx = canvas.getContext('2d')!; const centerX = size/2; const centerY = size/2; const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, size/2); gradient.addColorStop(0, 'rgba(0,0,0,0)'); gradient.addColorStop(0.4, 'rgba(255,235,205,0.2)'); gradient.addColorStop(0.6, 'rgba(255,235,205,0.9)'); gradient.addColorStop(0.7, 'rgba(0,0,0,0)'); gradient.addColorStop(0.8, 'rgba(230,210,180,0.7)'); gradient.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gradient; ctx.fillRect(0,0,size,size); return new THREE.CanvasTexture(canvas);
};

export default function SolarSystemPage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [focusedPlanet, setFocusedPlanet] = useState<(typeof PLANET_DATA)[0] | null>(null);
    const [speedMultiplier, setSpeedMultiplier] = useState(0.2);
    const [planetLabels, setPlanetLabels] = useState<any[]>([]);
    
    const speedMultiplierRef = useRef(speedMultiplier);
    const focusedPlanetRef = useRef(focusedPlanet);
    useEffect(() => { speedMultiplierRef.current = speedMultiplier; }, [speedMultiplier]);
    useEffect(() => { focusedPlanetRef.current = focusedPlanet; }, [focusedPlanet]);

    useEffect(() => {
        let isMounted = true;
        let animationFrameId: number;
        let cleanup = () => {};

        const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });

        async function init() {
            try {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
                await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
            } catch (error) {
                console.error(error);
                if (isMounted) setIsLoading(false);
                return;
            }

            if (!isMounted || !mountRef.current || typeof window.THREE === 'undefined' || typeof (window as any).THREE.OrbitControls === 'undefined') {
                if (isMounted) setIsLoading(false);
                return;
            }

            const THREE = window.THREE;
            const OrbitControls = (window as any).THREE.OrbitControls;
            const mount = mountRef.current;
            
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x050505, 0.0006);
            const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 2000);
            camera.position.set(-80, 60, 180);
            
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            mount.appendChild(renderer.domElement);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; 
            controls.minDistance = 20; 
            controls.maxDistance = 600;
            
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);
            
            const sunLight = new THREE.PointLight(0xffffff, 2.5, 1200);
            sunLight.castShadow = true;
            scene.add(sunLight);

            const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(15, 64, 64), new THREE.MeshBasicMaterial({ color: 0xFFF5E0 }));
            scene.add(sunMesh);
            
            const planetMeshes: any[] = [];
            PLANET_DATA.forEach(data => {
                const orbitCurve = new THREE.EllipseCurve(0, 0, data.distance, data.distance, 0, 2 * Math.PI, false, 0);
                const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitCurve.getPoints(128));
                const orbitLine = new THREE.LineLoop(orbitGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
                orbitLine.rotation.x = Math.PI / 2;
                scene.add(orbitLine);
                
                const planet = new THREE.Mesh(new THREE.SphereGeometry(data.size, 32, 32), new THREE.MeshStandardMaterial({ map: createTexture(THREE, data.type, data.color), roughness: 0.7, metalness: data.type === 'earth' ? 0.2 : 0, emissive: 0x222222, emissiveIntensity: 0.1 }));
                if (data.name.includes("Saturn")) {
                    const ring = new THREE.Mesh(new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 64), new THREE.MeshStandardMaterial({ map: createRingTexture(THREE), side: THREE.DoubleSide, transparent: true, opacity: 0.95 }));
                    ring.rotation.x = Math.PI / 1.8;
                    planet.add(ring);
                }
                planet.castShadow = true;
                planet.receiveShadow = true;
                planet.userData = { ...data, angle: Math.random() * Math.PI * 2 };
                planetMeshes.push(planet);
                scene.add(planet);
            });

            const onWindowResize = () => { 
                if (!isMounted || !mount) return; 
                camera.aspect = mount.clientWidth / mount.clientHeight; 
                camera.updateProjectionMatrix(); 
                renderer.setSize(mount.clientWidth, mount.clientHeight); 
            };
            window.addEventListener('resize', onWindowResize);
            
            const raycaster = new THREE.Raycaster(); 
            const mouse = new THREE.Vector2();
            
            const onPointerDown = (event: PointerEvent) => {
                if (!isMounted || !mount) return;
                const rect = mount.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(planetMeshes, true);
                if (intersects.length > 0) {
                    const selectedMesh = intersects[0].object;
                    const planetObject = planetMeshes.find(p => p === selectedMesh || p.children.includes(selectedMesh));
                    if (planetObject) setFocusedPlanet(planetObject.userData);
                }
            };
            mount.addEventListener('pointerdown', onPointerDown);

            const animate = () => {
                if (!isMounted) return;
                animationFrameId = requestAnimationFrame(animate);
                const labels: any[] = [];
                
                planetMeshes.forEach(mesh => {
                    mesh.userData.angle += mesh.userData.speed * speedMultiplierRef.current;
                    mesh.position.x = Math.cos(mesh.userData.angle) * mesh.userData.distance;
                    mesh.position.z = Math.sin(mesh.userData.angle) * mesh.userData.distance;
                    mesh.rotation.y += 0.005;
                    const tempV = new THREE.Vector3(); 
                    mesh.getWorldPosition(tempV); 
                    tempV.project(camera);
                    if (tempV.z < 1) { 
                        labels.push({ 
                            name: mesh.userData.name, 
                            x: (tempV.x * 0.5 + 0.5) * mount.clientWidth, 
                            y: (tempV.y * -0.5 + 0.5) * mount.clientHeight 
                        }); 
                    }
                });
                
                if(isMounted) setPlanetLabels(labels);
                
                const currentFocus = focusedPlanetRef.current;
                if (currentFocus) {
                    const targetMesh = planetMeshes.find(p => p.userData.name === currentFocus.name);
                    if (targetMesh) controls.target.copy(targetMesh.position);
                } else { 
                    controls.target.set(0, 0, 0); 
                }
                
                controls.update();
                renderer.render(scene, camera);
            };

            if(isMounted) {
                setIsLoading(false);
                animate();
            }

            cleanup = () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', onWindowResize);
                if(mount) {
                    mount.removeEventListener('pointerdown', onPointerDown);
                    if(renderer.domElement.parentElement === mount) {
                        mount.removeChild(renderer.domElement);
                    }
                }
                controls.dispose();
                renderer.dispose();
            };
        }

        init();

        return () => {
            isMounted = false;
            cleanup();
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#050505', color: 'white', fontFamily: 'Segoe UI, sans-serif' }}>
            {isLoading && (
                <div className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center text-white z-50 transition-opacity duration-1000">
                    <div className="w-12 h-12 border-4 border-[#333] border-t-[#4facfe] rounded-full animate-spin mb-5"></div>
                    <div>Simulation shuru ho raha hai...</div>
                </div>
            )}
            <div className="absolute top-4 left-4 text-white pointer-events-none z-10 md:top-5 md:left-5">
                <h1 className="m-0 font-light tracking-[4px] uppercase text-xl md:text-2xl border-b border-white/50 inline-block pb-1 text-shadow-[0_0_10px_rgba(79,172,254,0.8)]">Saurmandal Explorer</h1>
                <p className="text-sm md:text-base mt-1 opacity-100 text-shadow-[1px_1px_2px_black]">Grah par click karein • Zoom karne ke liye scroll karein</p>
            </div>

            <div className={`absolute bottom-20 md:bottom-8 right-4 md:right-8 w-[calc(100%-2rem)] md:w-80 bg-black/80 backdrop-blur-md border border-white/30 border-l-4 border-l-[#4facfe] p-6 rounded-lg shadow-2xl z-20 transition-transform duration-300 ${focusedPlanet ? 'translate-x-0' : 'translate-x-[120%]'}`}>
                {focusedPlanet && (
                    <>
                        <h2 className="m-0 mb-2 text-[#4facfe] font-semibold tracking-wider uppercase">{focusedPlanet.name}</h2>
                        <p className="leading-relaxed text-sm text-gray-200">{focusedPlanet.fact}</p>
                        <button onClick={() => setFocusedPlanet(null)} className="mt-4 bg-blue-500/20 border border-[#4facfe] text-[#4facfe] py-2 px-4 rounded text-xs uppercase font-bold transition-all hover:bg-[#4facfe] hover:text-black">Wapas Solar View Par Jayein</button>
                    </>
                )}
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:bottom-8 md:left-8 md:translate-x-0 z-20 bg-black/70 p-3 px-6 rounded-full flex items-center gap-4 border border-white/30 shadow-lg">
                <label className="text-white text-sm font-mono font-bold">Gati</label>
                <input type="range" min="0" max="1" step="0.05" value={speedMultiplier} onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))} className="cursor-pointer" />
            </div>
            
            <div ref={mountRef} className="w-full h-full block"></div>
            
            <div className="absolute top-0 left-0 pointer-events-none w-full h-full">
                {planetLabels.map(label => (
                    <div key={label.name} className="planet-label" style={{ left: `${label.x}px`, top: `${label.y}px` }}>
                        {label.name}
                    </div>
                ))}
            </div>
            
             <style jsx global>{`
                .planet-label { position: absolute; color: #ffffff; font-weight: bold; font-size: 12px; background: rgba(0, 0, 0, 0.6); padding: 2px 6px; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; transform: translate(-50%, -150%); white-space: nowrap; transition: opacity 0.2s; text-shadow: 0 0 4px black; }
                @media (max-width: 768px) { .planet-label { font-size: 10px; } }
            `}</style>
        </div>
    );
}
