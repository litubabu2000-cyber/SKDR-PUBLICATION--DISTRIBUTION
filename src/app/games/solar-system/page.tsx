
'use client';
import React, { useEffect, useRef } from 'react';

export default function SolarSystemPage() {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const labelsContainerRef = useRef<HTMLDivElement>(null);
    const infoPanelRef = useRef<HTMLDivElement>(null);
    const planetNameRef = useRef<HTMLHeadingElement>(null);
    const planetDetailsRef = useRef<HTMLParagraphElement>(null);
    const speedSliderRef = useRef<HTMLInputElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<() => void>(() => {});

    useEffect(() => {
        let isMounted = true;
        let animationFrameId: number;

        const loadScript = (src: string): Promise<void> => {
            return new Promise((resolve, reject) => {
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
        };

        const initSimulation = () => {
            if (!isMounted || !window.THREE || !(window as any).THREE.OrbitControls) return;

            const THREE = window.THREE;
            const OrbitControls = (window as any).THREE.OrbitControls;

            // --- Configuration & Constants ---
            const SCENE_CONFIG = {
                sunSize: 15,
                baseOrbitSpeed: 0.2, 
                scaleMultiplier: 1.0       
            };
            
            // Dynamic State
            let orbitSpeedMultiplier = 0.2;
            let focusedPlanet: any = null;

            const PLANETS = [
                { name: "Mercury (Budh)", size: 2.4, distance: 28, speed: 0.04,  type: 'rocky',  color: '#D5D5D5', fact: "Yeh humare saurmandal ka sabse chhota grah hai aur Suraj ke sabse paas hai. Din mein iska taapman 430°C tak pahunch sakta hai." },
                { name: "Venus (Shukra)",   size: 3.8, distance: 40, speed: 0.015, type: 'atmosphere', color: '#FFD700', fact: "Shukra saurmandal ka sabse garam grah hai. Iska ghana vaayumandal garmi ko rok leta hai (greenhouse effect), jisse yeh Mercury se bhi zyada garam ho jata hai." },
                { name: "Earth (Prithvi)",   size: 4.0, distance: 58, speed: 0.01,  type: 'earth',  color: '#4466FF', fact: "Humara ghar. Abhi tak humein sirf yahin par jeevan mila hai. Yeh saurmandal ka ekmatra grah hai jiske satah par liquid paani maujood hai." },
                { name: "Mars (Mangal)",    size: 2.8, distance: 75, speed: 0.008, type: 'rocky',  color: '#FF5500', fact: "Mangal ek thanda, dhool bhara, registani duniya hai. Wahan bohot patla vaayumandal hai. Vaigyanikon ko lagta hai ki arabo saal pehle wahan paani hua karta tha." },
                { name: "Jupiter (Brihaspati)", size: 10,  distance: 110,speed: 0.004, type: 'gas',    color: '#EEDDAA', fact: "Brihaspati baaki sabhi grahon ko milakar bhi unse doguna bhaari hai. Iska 'Great Red Spot' ek bohot purana toofan hai jo Prithvi se bhi bada hai." },
                { name: "Saturn (Shani)",  size: 8.5, distance: 150,speed: 0.003, type: 'ringed', color: '#FFEE88', fact: "Shani apne sundar rings ke liye jaana jata hai. Doosre gas giants ke paas bhi rings hain, lekin Shani ke rings sabse shandaar aur bade hain." },
                { name: "Uranus (Arun)",  size: 5.0, distance: 190,speed: 0.002, type: 'gas',    color: '#88FFCC', fact: "Arun apne orbit mein lagbhag 90-degree jhuka hua hai, jisse aisa lagta hai ki yeh apni side par ghoom raha hai. Yeh bohot thanda grah hai." },
                { name: "Neptune (Varun)", size: 4.8, distance: 230,speed: 0.001, type: 'gas',    color: '#66B2FF', fact: "Varun bohot andhera, thanda aur tez hawaon wala grah hai. Yeh pehla grah tha jise telescope se pehle ganit (maths) ke zariye dhoonda gaya tha." }
            ];

            let scene: any, camera: any, renderer: any, controls: any;
            let sunMesh: any, sunLight: any;
            let planetMeshes: any[] = [];
            let starField: any;
            let raycaster: any, mouse: any;
            
            function createTexture(type:string, baseColorStr:string) {
                const size = 512;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d')!;
                new THREE.Color(baseColorStr);

                ctx.fillStyle = baseColorStr;
                ctx.fillRect(0, 0, size, size);

                if (type === 'gas' || type === 'ringed') {
                    ctx.globalAlpha = 0.3;
                    for (let i = 0; i < 20; i++) {
                        const y = Math.random() * size;
                        const h = Math.random() * 50 + 10;
                        ctx.fillStyle = Math.random() > 0.5 ? '#222222' : '#ffffff';
                        ctx.fillRect(0, y, size, h);
                    }
                    ctx.globalAlpha = 0.1;
                    ctx.fillStyle = baseColorStr;
                    ctx.fillRect(0,0,size,size);
                } else if (type === 'rocky' || type === 'mercury') {
                    ctx.globalAlpha = 0.15;
                    for (let i = 0; i < 100; i++) {
                        const x = Math.random() * size;
                        const y = Math.random() * size;
                        const r = Math.random() * 20;
                        ctx.beginPath();
                        ctx.arc(x, y, r, 0, Math.PI * 2);
                        ctx.fillStyle = Math.random() > 0.5 ? '#222222' : '#666666';
                        ctx.fill();
                    }
                } else if (type === 'atmosphere') {
                    ctx.globalAlpha = 0.3;
                    for(let i=0; i<300; i++){
                        ctx.beginPath();
                        ctx.arc(Math.random()*size, Math.random()*size, Math.random()*80, 0, Math.PI*2);
                        ctx.fillStyle = "#ffffff";
                        ctx.fill();
                    }
                } else if (type === 'earth') {
                    ctx.fillStyle = "#2a5dbf";
                    ctx.fillRect(0,0,size,size);
                    ctx.fillStyle = "#4a8d4a";
                    ctx.globalAlpha = 1.0;
                    for(let i=0; i<30; i++) {
                         ctx.beginPath();
                         let x = Math.random() * size;
                         let y = Math.random() * size;
                         if(y < 50 || y > size - 50) continue; 
                         let r = Math.random() * 80 + 20;
                         ctx.arc(x, y, r, 0, Math.PI*2);
                         ctx.fill();
                    }
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = "#ffffff";
                    for(let i=0; i<100; i++) {
                        ctx.beginPath();
                        ctx.arc(Math.random()*size, Math.random()*size, Math.random()*40, 0, Math.PI*2);
                        ctx.fill();
                    }
                }
                return new THREE.CanvasTexture(canvas);
            }

            function createRingTexture() {
                const size = 256;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d')!;
                const centerX = size/2;
                const centerY = size/2;
                const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, size/2);
                gradient.addColorStop(0, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.4, 'rgba(255,235,205,0.2)');
                gradient.addColorStop(0.6, 'rgba(255,235,205,0.9)');
                gradient.addColorStop(0.7, 'rgba(0,0,0,0)');
                gradient.addColorStop(0.8, 'rgba(230,210,180,0.7)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0,0,size,size);
                return new THREE.CanvasTexture(canvas);
            }

            function init() {
                const container = canvasContainerRef.current;
                if (!container) return;

                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }

                scene = new THREE.Scene();
                scene.fog = new THREE.FogExp2(0x050505, 0.0006); 

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
                camera.position.set(-80, 60, 180);

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                container.appendChild(renderer.domElement);

                controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping = true;
                controls.dampingFactor = 0.05;
                controls.minDistance = 20;
                controls.maxDistance = 600;

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
                scene.add(ambientLight);

                sunLight = new THREE.PointLight(0xffffff, 2.5, 1200);
                sunLight.position.set(0, 0, 0);
                sunLight.castShadow = true;
                sunLight.shadow.bias = -0.0001;
                sunLight.shadow.mapSize.width = 2048;
                sunLight.shadow.mapSize.height = 2048;
                scene.add(sunLight);

                const sunGeometry = new THREE.SphereGeometry(SCENE_CONFIG.sunSize, 64, 64);
                const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF5E0 });
                sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
                
                const glowCanvas = document.createElement('canvas');
                glowCanvas.width = 128; glowCanvas.height = 128;
                const glowCtx = glowCanvas.getContext('2d')!;
                const grad = glowCtx.createRadialGradient(64,64,0, 64,64,64);
                grad.addColorStop(0, 'rgba(255, 220, 180, 1)');
                grad.addColorStop(0.4, 'rgba(255, 160, 60, 0.6)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                glowCtx.fillStyle = grad;
                glowCtx.fillRect(0,0,128,128);
                const glowTex = new THREE.CanvasTexture(glowCanvas);
                const glowMat = new THREE.SpriteMaterial({ map: glowTex, color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending });
                const sunGlow = new THREE.Sprite(glowMat);
                sunGlow.scale.set(SCENE_CONFIG.sunSize * 4.5, SCENE_CONFIG.sunSize * 4.5, 1);
                sunMesh.add(sunGlow);
                scene.add(sunMesh);

                PLANETS.forEach(data => createPlanet(data));
                createStars();

                raycaster = new THREE.Raycaster();
                mouse = new THREE.Vector2();
                window.addEventListener('resize', onWindowResize, false);
                window.addEventListener('mousedown', onMouseClick, false);
                
                const speedSlider = speedSliderRef.current;
                if (speedSlider) {
                  speedSlider.addEventListener('input', (e) => {
                      orbitSpeedMultiplier = parseFloat((e.target as HTMLInputElement).value);
                  });
                }

                setTimeout(() => {
                    const loader = loaderRef.current;
                    if (loader) {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            if (isMounted) loader.style.display = 'none';
                        }, 1000);
                    }
                }, 800);

                animate();
            }

            function createPlanet(data:any) {
                const orbitCurve = new THREE.EllipseCurve(0, 0, data.distance, data.distance, 0, 2 * Math.PI, false, 0);
                const points = orbitCurve.getPoints(128);
                const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
                const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }); 
                const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
                orbitLine.rotation.x = Math.PI / 2;
                scene.add(orbitLine);

                const geometry = new THREE.SphereGeometry(data.size, 32, 32);
                const texture = createTexture(data.type, data.color);
                const material = new THREE.MeshStandardMaterial({
                    map: texture,
                    roughness: data.type === 'gas' ? 0.4 : 0.7,
                    metalness: data.type === 'earth' ? 0.2 : 0.0,
                    emissive: 0x222222,
                    emissiveIntensity: 0.1,
                    color: 0xffffff
                });

                const planet = new THREE.Mesh(geometry, material);
                planet.castShadow = true;
                planet.receiveShadow = true;
                
                if (data.name.includes("Saturn")) {
                    const ringGeo = new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 64);
                    const ringTex = createRingTexture();
                    const ringMat = new THREE.MeshStandardMaterial({ 
                        map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.95, color: 0xffffff,
                        emissive: 0x222222, emissiveIntensity: 0.1
                    });
                    const ring = new THREE.Mesh(ringGeo, ringMat);
                    ring.rotation.x = Math.PI / 1.8;
                    planet.add(ring);
                }

                const labelDiv = document.createElement('div');
                labelDiv.className = 'planet-label';
                labelDiv.textContent = data.name;
                labelsContainerRef.current?.appendChild(labelDiv);

                planetMeshes.push({
                    mesh: planet,
                    data: data,
                    angle: Math.random() * Math.PI * 2,
                    label: labelDiv
                });
                
                scene.add(planet);
            }

            function createStars() {
                const geometry = new THREE.BufferGeometry();
                const count = 4000;
                const positions = new Float32Array(count * 3);
                const colors = new Float32Array(count * 3);

                for (let i = 0; i < count; i++) {
                    const r = 800 + Math.random() * 800;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos(2 * Math.random() - 1);
                    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                    positions[i * 3 + 2] = r * Math.cos(phi);

                    const col = new THREE.Color();
                    col.setHSL(Math.random(), 0.8, 0.95); 
                    colors[i*3] = col.r; colors[i*3+1] = col.g; colors[i*3+2] = col.b;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                const material = new THREE.PointsMaterial({ size: 1.8, vertexColors: true, transparent: true, opacity: 0.9 });
                starField = new THREE.Points(geometry, material);
                scene.add(starField);
            }

            function onMouseClick(event: MouseEvent) {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const meshes = planetMeshes.map(p => p.mesh);
                const intersects = raycaster.intersectObjects(meshes);

                if (intersects.length > 0) {
                    const selectedMesh = intersects[0].object;
                    const planetObj = planetMeshes.find(p => p.mesh === selectedMesh || p.mesh.children.includes(selectedMesh));
                    if (planetObj) focusOnPlanet(planetObj);
                }
            }
            
            function focusOnPlanet(planetObj: any) {
                focusedPlanet = planetObj;
                const panel = infoPanelRef.current;
                const nameEl = planetNameRef.current;
                const detailsEl = planetDetailsRef.current;
                if(panel && nameEl && detailsEl) {
                    nameEl.innerText = planetObj.data.name;
                    detailsEl.innerText = planetObj.data.fact;
                    panel.classList.add('visible');
                }
            }

            (window as any).resetFocus = function() {
                focusedPlanet = null;
                if(infoPanelRef.current) infoPanelRef.current.classList.remove('visible');
                if(controls) controls.target.set(0,0,0);
            }

            function animate() {
                if(!isMounted) return;
                animationFrameId = requestAnimationFrame(animate);

                planetMeshes.forEach(obj => {
                    obj.angle += obj.data.speed * orbitSpeedMultiplier;
                    const x = Math.cos(obj.angle) * obj.data.distance;
                    const z = Math.sin(obj.angle) * obj.data.distance;
                    obj.mesh.position.set(x, 0, z);
                    obj.mesh.rotation.y += 0.005;

                    const tempV = new THREE.Vector3();
                    obj.mesh.getWorldPosition(tempV);
                    tempV.project(camera);

                    const xPos = (tempV.x * .5 + .5) * window.innerWidth;
                    const yPos = (tempV.y * -.5 + .5) * window.innerHeight;

                    if (tempV.z < 1) {
                        obj.label.style.display = 'block';
                        obj.label.style.left = `${xPos}px`;
                        obj.label.style.top = `${yPos}px`;
                    } else {
                        obj.label.style.display = 'none';
                    }
                });

                if (focusedPlanet) controls.target.copy(focusedPlanet.mesh.position);
                if(starField) starField.rotation.y += 0.0002;

                controls.update();
                renderer.render(scene, camera);
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            
            init();

            cleanupRef.current = () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', onWindowResize);
                window.removeEventListener('mousedown', onMouseClick);
                if (renderer) {
                    renderer.dispose();
                }
                 if (canvasContainerRef.current && renderer?.domElement) {
                     try {
                        canvasContainerRef.current.removeChild(renderer.domElement);
                     } catch (e) {
                         // Ignore error if element is already removed
                     }
                }
            };
        });

        Promise.all([
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
            loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js')
        ]).then(initSimulation).catch(console.error);

        return () => {
            isMounted = false;
            cleanupRef.current();
        };
    }, []);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#050505', color: 'white', fontFamily: 'Segoe UI, sans-serif' }}>
            <style jsx global>{`
                #canvas-container { width: 100vw; height: 100vh; display: block; }
                #ui-layer { position: absolute; top: 20px; left: 20px; color: rgba(255, 255, 255, 1.0); pointer-events: none; z-index: 10; }
                #ui-layer h1 { margin: 0; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; font-size: 1.8rem; border-bottom: 1px solid rgba(255,255,255,0.5); display: inline-block; padding-bottom: 5px; text-shadow: 0 0 10px rgba(79, 172, 254, 0.8); }
                #ui-layer p.subtitle { font-size: 1.0rem; margin-top: 5px; opacity: 1.0; text-shadow: 1px 1px 2px black; }
                .planet-label { position: absolute; color: #ffffff; font-weight: bold; font-size: 14px; background: rgba(0, 0, 0, 0.6); padding: 4px 8px; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; pointer-events: none; transform: translate(-50%, -150%); white-space: nowrap; transition: opacity 0.2s; text-shadow: 0 0 4px black; }
                #info-panel { position: absolute; bottom: 30px; right: 30px; width: 320px; background: rgba(20, 30, 40, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); border-left: 4px solid #4facfe; padding: 25px; color: #fff; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); z-index: 20; }
                #info-panel.visible { transform: translateX(0); }
                #info-panel h2 { margin: 0 0 10px 0; color: #4facfe; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
                #info-panel p { line-height: 1.6; font-size: 1rem; color: #eee; }
                #info-panel button { margin-top: 15px; background: rgba(79, 172, 254, 0.2); border: 1px solid #4facfe; color: #4facfe; padding: 10px 20px; border-radius: 4px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem; text-transform: uppercase; font-weight: bold; }
                #info-panel button:hover { background: #4facfe; color: #000; }
                #controls-bar { position: absolute; bottom: 30px; left: 30px; z-index: 20; background: rgba(20, 30, 40, 0.9); padding: 15px 25px; border-radius: 30px; display: flex; align-items: center; gap: 15px; border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 5px 15px rgba(0,0,0,0.5); }
                #controls-bar label { color: #fff; font-size: 1rem; font-family: monospace; font-weight: bold;}
                input[type=range] { cursor: pointer; }
                #loader { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #050505; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; z-index: 999; transition: opacity 1s ease-out; }
                .spinner { width: 50px; height: 50px; border: 4px solid #333; border-top: 4px solid #4facfe; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
            
            <div id="loader" ref={loaderRef}>
                <div className="spinner"></div>
                <div>Simulation shuru ho raha hai...</div>
            </div>

            <div id="ui-layer">
                <h1>Saurmandal Explorer</h1>
                <p className="subtitle">Grah par click karein • Zoom karne ke liye scroll karein</p>
            </div>

            <div id="info-panel" ref={infoPanelRef}>
                <h2 id="planet-name" ref={planetNameRef}>Grah Ka Naam</h2>
                <p id="planet-details" ref={planetDetailsRef}>Jankari...</p>
                <button onClick={() => (window as any).resetFocus()}>Wapas Solar View Par Jayein</button>
            </div>

            <div id="controls-bar">
                <label>Gati (Speed)</label>
                <input type="range" min="0" max="1" step="0.05" defaultValue="0.2" id="speed-slider" ref={speedSliderRef} />
            </div>

            <div id="labels-container" ref={labelsContainerRef}></div>
            <div id="canvas-container" ref={canvasContainerRef}></div>
        </div>
    );

    