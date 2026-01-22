'use client';
import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        THREE: any;
    }
}

export default function PressureBeltsPage() {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        let animationFrameId: number;
        let renderer: any, scene: any, camera: any;
        let earthGroup: any;
        let sunDirection: any;
        let atmo: any;
        let windSystem: any;
        let windParticles: any[] = [];
        let starField: any;
        let drag = false, lastM = {x:0, y:0};

        // Load Three.js script
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
            document.body.appendChild(script);
        });

        async function init() {
            try {
                await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
            } catch (error) {
                console.error(error);
                if (isMounted) setIsLoading(false);
                return;
            }

            if (!isMounted || !canvasContainerRef.current || typeof window.THREE === 'undefined') {
                if (isMounted) setIsLoading(false);
                return;
            }
            
            const THREE = window.THREE;
            
            const config = {
                earthRadius: 5,
                rotationSpeed: 0.0005, // Slightly faster for more dynamism
                tilt: 0.41,
                cameraZ: 14,
                minZoom: 8,
                maxZoom: 25
            };

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = config.cameraZ;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;
            canvasContainerRef.current!.appendChild(renderer.domElement);

            // --- Enhanced Texture Generation ---
            function createTexture(isNight: boolean) {
                const canvas = document.createElement('canvas');
                canvas.width = 2048; canvas.height = 1024;
                const ctx = canvas.getContext('2d');
                if(!ctx) return null;
                
                if(!isNight) {
                    // Ocean base
                    const ocean = ctx.createLinearGradient(0,0,0,1024);
                    ocean.addColorStop(0, '#004D7F'); ocean.addColorStop(1, '#002033');
                    ctx.fillStyle = ocean; ctx.fillRect(0,0,2048,1024);

                    // Land masses
                    ctx.fillStyle = '#1B4D3E';
                    ctx.globalAlpha = 0.8;
                    for(let i=0; i<30; i++) {
                        ctx.beginPath();
                        const x = Math.random()*2048; const y = Math.random()*1024;
                        const r = Math.random()*250+100;
                        ctx.ellipse(x, y, r, r * (Math.random()*0.4 + 0.4), Math.random()*Math.PI*2, 0, Math.PI*2);
                        ctx.fill();
                    }

                    // Clouds
                    ctx.fillStyle = 'rgba(255,255,255,0.4)';
                     for (let i = 0; i < 50; i++) {
                        ctx.beginPath();
                        const x = Math.random()*2048; const y = Math.random()*1024;
                        const r = Math.random()*150+50;
                        ctx.ellipse(x, y, r, r * 0.3, Math.random()*Math.PI*2, 0, Math.PI*2);
                        ctx.fill();
                    }

                    // Ice Caps
                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                    const iceGradTop = ctx.createLinearGradient(0,0,0,150);
                    iceGradTop.addColorStop(0, 'white'); iceGradTop.addColorStop(1, 'rgba(255,255,255,0)');
                    ctx.fillStyle = iceGradTop;
                    ctx.fillRect(0,0,2048,150);

                    const iceGradBottom = ctx.createLinearGradient(0,1024-150,0,1024);
                    iceGradBottom.addColorStop(0, 'rgba(255,255,255,0)'); iceGradBottom.addColorStop(1, 'white');
                    ctx.fillStyle = iceGradBottom;
                    ctx.fillRect(0,1024-150,2048,150);

                } else { // Night texture
                    ctx.fillStyle = '#000'; ctx.fillRect(0,0,2048,1024);
                    // Clustered city lights
                    for(let c=0; c<15; c++) {
                        const centerX = Math.random()*2048; const centerY = Math.random()*(1024-400)+200;
                        for(let i=0; i<200; i++) {
                            ctx.fillStyle = `rgba(255, 220, 150, ${Math.random()*0.6})`;
                            const x = centerX + (Math.random()-0.5)*200;
                            const y = centerY + (Math.random()-0.5)*100;
                            ctx.fillRect(x, y, Math.random()*2+1, Math.random()*2+1);
                        }
                    }
                }
                return new THREE.CanvasTexture(canvas);
            }

            earthGroup = new THREE.Group();
            earthGroup.rotation.z = config.tilt;
            scene.add(earthGroup);

            sunDirection = new THREE.Vector3(1, 0.4, 1).normalize();
            const earthMat = new THREE.ShaderMaterial({
                uniforms: { dayTex: { value: createTexture(false) }, nightTex: { value: createTexture(true) }, sunDir: { value: sunDirection } },
                vertexShader: `varying vec3 vNormal; varying vec2 vUv; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                fragmentShader: `
                    uniform sampler2D dayTex; uniform sampler2D nightTex; uniform vec3 sunDir;
                    varying vec3 vNormal; varying vec2 vUv;
                    void main() {
                        float dotSun = dot(vNormal, sunDir);
                        float mixAmt = smoothstep(-0.15, 0.15, dotSun); // Sharper transition
                        vec3 day = texture2D(dayTex, vUv).rgb;
                        vec3 night = texture2D(nightTex, vUv).rgb * (1.0 + mixAmt * 0.5); // Night lights brighter near terminator
                        float rim = smoothstep(0.0, 0.3, 1.0 - abs(dotSun));
                        gl_FragColor = vec4(mix(night, day, mixAmt) + vec3(0.9, 0.5, 0.2)*rim*mixAmt*0.5, 1.0);
                    }
                `
            });

            const earth = new THREE.Mesh(new THREE.SphereGeometry(config.earthRadius, 128, 128), earthMat);
            earthGroup.add(earth);

            // More cinematic atmosphere
            atmo = new THREE.Mesh(
                new THREE.SphereGeometry(config.earthRadius + 0.8, 128, 128),
                new THREE.ShaderMaterial({
                    vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                    fragmentShader: `varying vec3 vNormal; void main() { float i = pow(0.6 - dot(vNormal, vec3(0,0,1)), 3.0); gl_FragColor = vec4(0.2, 0.4, 0.9, 1.0) * i; }`, // Softer, more blue glow
                    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false
                })
            );
            scene.add(atmo);
            
            // --- Pressure Belts and Labels (same as before) ---
            const beltData = [
                { lat: 0, color: 0xff3366, label: "ITCZ (Low)" },
                { lat: 30, color: 0x00d4ff, label: "Subtropical High (N)" },
                { lat: -30, color: 0x00d4ff, label: "Subtropical High (S)" },
                { lat: 60, color: 0xff3366, label: "Subpolar Low (N)" },
                { lat: -60, color: 0xff3366, label: "Subpolar Low (S)" },
                { lat: 90, color: 0x00d4ff, label: "Polar High (N)" },
                { lat: -90, color: 0x00d4ff, label: "Polar High (S)" }
            ];

            function createLabel(text: string) {
                const canvas = document.createElement('canvas');
                const size = 256;
                canvas.width = size * 2; canvas.height = size;
                const ctx = canvas.getContext('2d');
                if(!ctx) return null;
                ctx.font = 'bold 40px Segoe UI';
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 10;
                ctx.fillText(text, canvas.width/2, canvas.height/2);
                const tex = new THREE.CanvasTexture(canvas);
                const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex }));
                sprite.scale.set(4, 2, 1);
                return sprite;
            }

            beltData.forEach(b => {
                const rad = config.earthRadius * Math.cos(b.lat * Math.PI / 180);
                const y = config.earthRadius * Math.sin(b.lat * Math.PI / 180);
                if (rad > 0.1) {
                    const ring = new THREE.Mesh(
                        new THREE.TorusGeometry(rad + 0.1, 0.03, 16, 100),
                        new THREE.MeshBasicMaterial({ color: b.color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }) // Additive blending for glow
                    );
                    ring.rotation.x = Math.PI/2; ring.position.y = y;
                    earthGroup.add(ring);
                }
                const lbl = createLabel(b.label);
                if (lbl) {
                    lbl.position.set(0, y, config.earthRadius + 1.2);
                    earthGroup.add(lbl);
                }
            });

            // --- Flow Arrows (same) ---
            function createArrow(color: number) {
                const group = new THREE.Group();
                const head = new THREE.Mesh( new THREE.ConeGeometry(0.12, 0.3, 8), new THREE.MeshBasicMaterial({ color: color }) );
                head.position.y = 0.15;
                group.add(head);
                const shaft = new THREE.Mesh( new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8), new THREE.MeshBasicMaterial({ color: color }) );
                shaft.position.y = -0.15;
                group.add(shaft);
                return group;
            }
            const arrowGroup = new THREE.Group();
            earthGroup.add(arrowGroup);
            const flowZones = [
                { lat: 15, dLat: -1, dLong: -1 }, { lat: -15, dLat: 1, dLong: -1 }, { lat: 45, dLat: 1, dLong: 1 },
                { lat: -45, dLat: -1, dLong: 1 }, { lat: 75, dLat: -1, dLong: -1 }, { lat: -75, dLat: 1, dLong: -1 }
            ];
            flowZones.forEach(zone => {
                for(let a = 0; a < 360; a += 45) {
                    const arrow = createArrow(0xffffff);
                    const phi = (90 - zone.lat) * (Math.PI / 180); const theta = a * (Math.PI / 180);
                    const r = config.earthRadius + 0.4;
                    arrow.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
                    const up = arrow.position.clone().normalize();
                    const tangent = new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0), up).normalize();
                    const bitangent = new THREE.Vector3().crossVectors(up, tangent).normalize();
                    const finalDir = new THREE.Vector3().addScaledVector(tangent, zone.dLong).addScaledVector(bitangent, zone.dLat).normalize();
                    arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), finalDir);
                    arrowGroup.add(arrow);
                }
            });
            
            // --- Cinematic Wind Particles ---
            const windCount = 2500; // More particles
            windParticles = [];
            const windGeo = new THREE.BufferGeometry();
            const windPosArr = new Float32Array(windCount * 3);
            windGeo.setAttribute('position', new THREE.BufferAttribute(windPosArr, 3));
            windSystem = new THREE.Points(windGeo, new THREE.PointsMaterial({ color: 0xaaaaff, size: 0.06, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
            earthGroup.add(windSystem);
            function resetWind(i: number) {
                const z = flowZones[Math.floor(Math.random() * flowZones.length)];
                windParticles[i] = {
                    lat: z.lat + (Math.random()-0.5)*20, long: Math.random()*360,
                    vLat: z.dLat * 0.05, vLong: z.dLong * 0.35, life: Math.random()*150 + 50,
                    alt: config.earthRadius + 0.2 + Math.random() * 0.2, zone: z, maxLife: 150
                };
            }
            for(let i=0; i<windCount; i++) resetWind(i);

            // --- Starfield ---
            const starGeo = new THREE.BufferGeometry();
            const starPos = new Float32Array(5000 * 3);
            for(let i=0; i<5000; i++) {
                const dist = 300 + Math.random() * 500;
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * Math.PI * 2;
                starPos[i*3] = dist * Math.sin(phi) * Math.cos(theta);
                starPos[i*3+1] = dist * Math.sin(phi) * Math.sin(theta);
                starPos[i*3+2] = dist * Math.cos(phi);
            }
            starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
            starField = new THREE.Points(starGeo, new THREE.PointsMaterial({color: 0xffffff, size: 0.5, transparent: true, opacity: 0.7}));
            scene.add(starField);

            // --- Interaction ---
            const onMouseDown = (e: MouseEvent) => { drag = true; lastM = {x:e.clientX, y:e.clientY}; };
            const onMouseMove = (e: MouseEvent) => {
                if(drag) {
                    earthGroup.rotation.y += (e.clientX - lastM.x) * 0.005;
                    earthGroup.rotation.x += (e.clientY - lastM.y) * 0.005;
                    lastM = {x:e.clientX, y:e.clientY};
                }
            };
            const onMouseUp = () => { drag = false; };
            const onWheel = (e: WheelEvent) => {
                e.preventDefault();
                camera.position.z += e.deltaY * 0.01;
                camera.position.z = Math.max(config.minZoom, Math.min(config.maxZoom, camera.position.z));
            };
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            window.addEventListener('wheel', onWheel, { passive: false });

            // --- Animation Loop ---
            function animate() {
                if (!isMounted) return;
                animationFrameId = requestAnimationFrame(animate);
                if(!drag) earthGroup.rotation.y += config.rotationSpeed;
                starField.rotation.y += config.rotationSpeed * 0.1;

                const pos = windSystem.geometry.attributes.position.array;
                for(let i=0; i<windCount; i++) {
                    const w = windParticles[i];
                    w.lat += w.vLat; w.long += w.vLong; w.life -= 0.5;
                    if(w.life <= 0) resetWind(i);
                    const phi = (90 - w.lat) * (Math.PI / 180);
                    const theta = (w.long + 180) * (Math.PI / 180);
                    pos[i*3] = -(w.alt * Math.sin(phi) * Math.cos(theta));
                    pos[i*3+1] = w.alt * Math.cos(phi);
                    pos[i*3+2] = w.alt * Math.sin(phi) * Math.sin(theta);
                }
                windSystem.geometry.attributes.position.needsUpdate = true;
                
                atmo.quaternion.copy(camera.quaternion); // Atmosphere follows camera
                renderer.render(scene, camera);
            }

            const onWindowResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', onWindowResize);

            if (isMounted) {
                setIsLoading(false);
                animate();
            }

            return () => {
                isMounted = false;
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', onWindowResize);
                document.removeEventListener('mousedown', onMouseDown);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                window.removeEventListener('wheel', onWheel);
                if (canvasContainerRef.current && renderer.domElement.parentElement === canvasContainerRef.current) {
                    canvasContainerRef.current.removeChild(renderer.domElement);
                }
            };
        }

        init();

    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000' }}>
            {isLoading && (
                <div id="loader" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'radial-gradient(ellipse at center, #101520 0%, #000000 100%)', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', color: '#00d4ff', zIndex: 999
                }}>
                    <div className="spinner"></div>
                    <div style={{ letterSpacing: '4px', fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>Generating Flow Dynamics</div>
                </div>
            )}

            <div id="ui-layer" className="transition-opacity duration-1000" style={{ position: 'absolute', top: '25px', left: '25px', color: 'white', pointerEvents: 'none', zIndex: 10, opacity: isLoading ? 0 : 1 }}>
                <div className="panel" style={{
                    background: 'rgba(5, 10, 20, 0.6)', padding: '20px', borderLeft: '3px solid #00d4ff',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', maxWidth: '300px'
                }}>
                    <h1 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#00d4ff', fontWeight: 600 }}>Planetary Winds</h1>
                    <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.85rem' }}>
                        <div className="dot" style={{ width: '12px', height: '12px', borderRadius: '50%', marginRight: '12px', background: '#ff3366', boxShadow: '0 0 8px #ff3366' }}></div>
                        <span>Low Pressure (L) - Rising Air</span>
                    </div>
                    <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '0.85rem' }}>
                        <div className="dot" style={{ width: '12px', height: '12px', borderRadius: '50%', marginRight: '12px', background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }}></div>
                        <span>High Pressure (H) - Sinking Air</span>
                    </div>
                    <div className="desc" style={{ fontSize: '0.75rem', color: '#a0b0c0', lineHeight: 1.6, marginTop: '15px', borderTop: '1px solid rgba(0,212,255,0.2)', paddingTop: '15px' }}>
                        <b>Flow Arrows:</b> Large markers indicate the primary wind direction in each cell.
                        <br /><br />
                        <b>Controls:</b><br />
                        • <b>Rotate:</b> Drag Mouse<br />
                        • <b>Zoom:</b> Scroll Mouse Wheel
                    </div>
                </div>
            </div>
            
            <div id="canvas-container" ref={canvasContainerRef} style={{ width: '100vw', height: '100vh', display: 'block' }}></div>
            
            <style jsx global>{`
                body { margin: 0; overflow: hidden; background-color: #000; font-family: 'Segoe UI', sans-serif; }
                .spinner {
                    width: 40px; height: 40px;
                    border: 3px solid rgba(0,212,255,0.2);
                    border-top-color: #00d4ff;
                    border-radius: 50%;
                    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                #ui-layer {
                    animation: fadeIn 2s ease-out 1s forwards;
                    opacity: 0;
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
