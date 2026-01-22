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
                rotationSpeed: 0.0003,
                tilt: 0.41,
                cameraZ: 14,
                minZoom: 7,
                maxZoom: 28
            };

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = config.cameraZ;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;
            canvasContainerRef.current!.appendChild(renderer.domElement);

            function createTexture(isNight: boolean) {
                const canvas = document.createElement('canvas');
                canvas.width = 2048; canvas.height = 1024;
                const ctx = canvas.getContext('2d');
                if(!ctx) return null;
                if(!isNight) {
                    const g = ctx.createLinearGradient(0,0,0,1024);
                    g.addColorStop(0, '#020814'); g.addColorStop(0.5, '#051226'); g.addColorStop(1, '#020814');
                    ctx.fillStyle = g; ctx.fillRect(0,0,2048,1024);
                    ctx.fillStyle = '#0a1d12';
                    for(let i=0; i<100; i++) {
                        ctx.beginPath();
                        const x = Math.random()*2048; const y = Math.random()*1024;
                        const r = Math.random()*120+40;
                        ctx.arc(x, y, r, 0, Math.PI*2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.8;
                    ctx.fillRect(0, 0, 2048, 60); ctx.fillRect(0, 964, 2048, 60);
                } else {
                    ctx.fillStyle = '#000'; ctx.fillRect(0,0,2048,1024);
                    ctx.fillStyle = '#ffaa00';
                    for(let i=0; i<1000; i++) {
                        ctx.globalAlpha = Math.random()*0.8;
                        ctx.fillRect(Math.random()*2048, Math.random()*1024, 1.5, 1.5);
                    }
                }
                return new THREE.CanvasTexture(canvas);
            }

            const earthGroup = new THREE.Group();
            earthGroup.rotation.z = config.tilt;
            scene.add(earthGroup);

            const sunDirection = new THREE.Vector3(1, 0.4, 1).normalize();
            const earthMat = new THREE.ShaderMaterial({
                uniforms: { dayTex: { value: createTexture(false) }, nightTex: { value: createTexture(true) }, sunDir: { value: sunDirection } },
                vertexShader: `varying vec3 vNormal; varying vec2 vUv; void main() { vUv = uv; vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                fragmentShader: `
                    uniform sampler2D dayTex; uniform sampler2D nightTex; uniform vec3 sunDir;
                    varying vec3 vNormal; varying vec2 vUv;
                    void main() {
                        float dotSun = dot(vNormal, sunDir);
                        float mixAmt = smoothstep(-0.25, 0.25, dotSun);
                        vec3 day = texture2D(dayTex, vUv).rgb;
                        vec3 night = texture2D(nightTex, vUv).rgb + vec3(0.01, 0.02, 0.05);
                        float rim = smoothstep(0.0, 0.3, 1.0 - abs(dotSun));
                        gl_FragColor = vec4(mix(night, day, mixAmt) + vec3(0.8, 0.3, 0.1)*rim*mixAmt*0.4, 1.0);
                    }
                `
            });

            const earth = new THREE.Mesh(new THREE.SphereGeometry(config.earthRadius, 128, 128), earthMat);
            earthGroup.add(earth);

            const atmo = new THREE.Mesh(
                new THREE.SphereGeometry(config.earthRadius + 1.2, 128, 128),
                new THREE.ShaderMaterial({
                    vertexShader: `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
                    fragmentShader: `varying vec3 vNormal; void main() { float i = pow(0.65 - dot(vNormal, vec3(0,0,1)), 8.0); gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0) * i; }`,
                    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true
                })
            );
            scene.add(atmo);
            
            // --- Pressure Belts and Labels ---
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
                ctx.shadowBlur = 10; ctx.shadowColor = 'black';
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
                        new THREE.MeshBasicMaterial({ color: b.color, transparent: true, opacity: 0.3 })
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

            // --- Flow Arrows ---
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
                { lat: 15, dLat: -1, dLong: -1 },
                { lat: -15, dLat: 1, dLong: -1 },
                { lat: 45, dLat: 1, dLong: 1 },
                { lat: -45, dLat: -1, dLong: 1 },
                { lat: 75, dLat: -1, dLong: -1 },
                { lat: -75, dLat: 1, dLong: -1 }
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

            // --- Wind Particles ---
            const windCount = 1500;
            const windParticles: {lat: number, long: number, vLat: number, vLong: number, life: number, alt: number, zone: any}[] = [];
            const windGeo = new THREE.BufferGeometry();
            const windPosArr = new Float32Array(windCount * 3);
            windGeo.setAttribute('position', new THREE.BufferAttribute(windPosArr, 3));
            const windSystem = new THREE.Points(windGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.4 }));
            earthGroup.add(windSystem);

            function resetWind(i: number) {
                const z = flowZones[Math.floor(Math.random() * flowZones.length)];
                windParticles[i] = {
                    lat: z.lat + (Math.random()-0.5)*15, long: Math.random()*360,
                    vLat: z.dLat * 0.04, vLong: z.dLong * 0.3, life: Math.random()*100,
                    alt: config.earthRadius + 0.2, zone: z
                };
            }
            for(let i=0; i<windCount; i++) resetWind(i);

            // --- Interaction ---
            let drag = false, lastM = {x:0, y:0};
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
                const pos = windSystem.geometry.attributes.position.array as Float32Array;
                for(let i=0; i<windCount; i++) {
                    const w = windParticles[i];
                    w.lat += w.vLat; w.long += w.vLong; w.life -= 0.3;
                    if(w.life <= 0) resetWind(i);
                    const phi = (90 - w.lat) * (Math.PI / 180);
                    const theta = (w.long + 180) * (Math.PI / 180);
                    pos[i*3] = -(w.alt * Math.sin(phi) * Math.cos(theta));
                    pos[i*3+1] = w.alt * Math.cos(phi);
                    pos[i*3+2] = w.alt * Math.sin(phi) * Math.sin(theta);
                }
                windSystem.geometry.attributes.position.needsUpdate = true;
                
                atmo.quaternion.copy(camera.quaternion);
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

        const cleanupPromise = init();

        return () => {
            cleanupPromise.then(cleanup => cleanup && cleanup());
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000' }}>
            {isLoading && (
                <div id="loader" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: '#000', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', color: '#00d4ff', zIndex: 999
                }}>
                    <div className="spinner"></div>
                    <div style={{ letterSpacing: '4px', fontSize: '0.7rem', textTransform: 'uppercase' }}>Generating Flow Dynamics</div>
                </div>
            )}

            <div id="ui-layer" style={{ position: 'absolute', top: '25px', left: '25px', color: 'white', pointerEvents: 'none', zIndex: 10 }}>
                <div className="panel" style={{
                    background: 'rgba(0, 8, 20, 0.85)', padding: '20px', borderLeft: '4px solid #00d4ff',
                    backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
                    borderRadius: '0 15px 15px 0', boxShadow: '0 10px 40px rgba(0,0,0,0.8)', maxWidth: '300px'
                }}>
                    <h1 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#00d4ff' }}>Planetary Winds</h1>
                    <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '0.85rem' }}>
                        <div className="dot" style={{ width: '12px', height: '12px', borderRadius: '50%', marginRight: '12px', background: '#ff3366' }}></div>
                        <span>Low Pressure (L) - Rising Air</span>
                    </div>
                    <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '0.85rem' }}>
                        <div className="dot" style={{ width: '12px', height: '12px', borderRadius: '50%', marginRight: '12px', background: '#00d4ff' }}></div>
                        <span>High Pressure (H) - Sinking Air</span>
                    </div>
                    <div className="desc" style={{ fontSize: '0.75rem', color: '#8899aa', lineHeight: 1.5, marginTop: '10px', borderTop: '1px solid #333', paddingTop: '10px' }}>
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
                    border: 3px solid rgba(0,212,255,0.1);
                    border-top-color: #00d4ff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
