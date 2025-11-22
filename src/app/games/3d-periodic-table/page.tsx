
'use client';
import { useEffect } from 'react';

export default function PeriodicTablePage() {

    useEffect(() => {
        const loadScript = (src: string, isModule = false) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(true);
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                if (isModule) {
                    script.type = 'module';
                }
                script.onload = () => resolve(true);
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        };

        const initPeriodicTable = async () => {
            try {
                // Ensure THREE is loaded first and is available on window
                await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js');
                
                // Now load dependent scripts
                await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/tween.min.js');
                await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/TrackballControls.js');
                await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/renderers/CSS3DRenderer.js');
                
                const table = [
                    "H", "Hydrogen", "1.0079", 1, 1,
                    "He", "Helium", "4.0026", 18, 1,
                    "Li", "Lithium", "6.941", 1, 2,
                    "Be", "Beryllium", "9.0122", 2, 2,
                    "B", "Boron", "10.811", 13, 2,
                    "C", "Carbon", "12.0107", 14, 2,
                    "N", "Nitrogen", "14.0067", 15, 2,
                    "O", "Oxygen", "15.9994", 16, 2,
                    "F", "Fluorine", "18.9984", 17, 2,
                    "Ne", "Neon", "20.1797", 18, 2,
                    "Na", "Sodium", "22.9897", 1, 3,
                    "Mg", "Magnesium", "24.305", 2, 3,
                    "Al", "Aluminium", "26.9815", 13, 3,
                    "Si", "Silicon", "28.0855", 14, 3,
                    "P", "Phosphorus", "30.9738", 15, 3,
                    "S", "Sulfur", "32.065", 16, 3,
                    "Cl", "Chlorine", "35.453", 17, 3,
                    "Ar", "Argon", "39.948", 18, 3,
                    "K", "Potassium", "39.0983", 1, 4,
                    "Ca", "Calcium", "40.078", 2, 4,
                    "Sc", "Scandium", "44.9559", 3, 4,
                    "Ti", "Titanium", "47.867", 4, 4,
                    "V", "Vanadium", "50.9415", 5, 4,
                    "Cr", "Chromium", "51.9961", 6, 4,
                    "Mn", "Manganese", "54.938", 7, 4,
                    "Fe", "Iron", "55.845", 8, 4,
                    "Co", "Cobalt", "58.9331", 9, 4,
                    "Ni", "Nickel", "58.6934", 10, 4,
                    "Cu", "Copper", "63.546", 11, 4,
                    "Zn", "Zinc", "65.38", 12, 4,
                    "Ga", "Gallium", "69.723", 13, 4,
                    "Ge", "Germanium", "72.63", 14, 4,
                    "As", "Arsenic", "74.9216", 15, 4,
                    "Se", "Selenium", "78.96", 16, 4,
                    "Br", "Bromine", "79.904", 17, 4,
                    "Kr", "Krypton", "83.798", 18, 4,
                    "Rb", "Rubidium", "85.4678", 1, 5,
                    "Sr", "Strontium", "87.62", 2, 5,
                    "Y", "Yttrium", "88.9059", 3, 5,
                    "Zr", "Zirconium", "91.224", 4, 5,
                    "Nb", "Niobium", "92.9064", 5, 5,
                    "Mo", "Molybdenum", "95.96", 6, 5,
                    "Tc", "Technetium", "98", 7, 5,
                    "Ru", "Ruthenium", "101.07", 8, 5,
                    "Rh", "Rhodium", "102.9055", 9, 5,
                    "Pd", "Palladium", "106.42", 10, 5,
                    "Ag", "Silver", "107.8682", 11, 5,
                    "Cd", "Cadmium", "112.411", 12, 5,
                    "In", "Indium", "114.818", 13, 5,
                    "Sn", "Tin", "118.71", 14, 5,
                    "Sb", "Antimony", "121.76", 15, 5,
                    "Te", "Tellurium", "127.6", 16, 5,
                    "I", "Iodine", "126.9045", 17, 5,
                    "Xe", "Xenon", "131.293", 18, 5,
                    "Cs", "Caesium", "132.9054", 1, 6,
                    "Ba", "Barium", "137.327", 2, 6,
                    "La", "Lanthanum", "138.9055", 3, 9,
                    "Ce", "Cerium", "140.116", 4, 9,
                    "Pr", "Praseodymium", "140.9077", 5, 9,
                    "Nd", "Neodymium", "144.242", 6, 9,
                    "Pm", "Promethium", "145", 7, 9,
                    "Sm", "Samarium", "150.36", 8, 9,
                    "Eu", "Europium", "151.964", 9, 9,
                    "Gd", "Gadolinium", "157.25", 10, 9,
                    "Tb", "Terbium", "158.9253", 11, 9,
                    "Dy", "Dysprosium", "162.5", 12, 9,
                    "Ho", "Holmium", "164.9303", 13, 9,
                    "Er", "Erbium", "167.259", 14, 9,
                    "Tm", "Thulium", "168.9342", 15, 9,
                    "Yb", "Ytterbium", "173.054", 16, 9,
                    "Lu", "Lutetium", "174.9668", 17, 9,
                    "Hf", "Hafnium", "178.49", 4, 6,
                    "Ta", "Tantalum", "180.9488", 5, 6,
                    "W", "Tungsten", "183.84", 6, 6,
                    "Re", "Rhenium", "186.207", 7, 6,
                    "Os", "Osmium", "190.23", 8, 6,
                    "Ir", "Iridium", "192.217", 9, 6,
                    "Pt", "Platinum", "195.084", 10, 6,
                    "Au", "Gold", "196.9665", 11, 6,
                    "Hg", "Mercury", "200.59", 12, 6,
                    "Tl", "Thallium", "204.3833", 13, 6,
                    "Pb", "Lead", "207.2", 14, 6,
                    "Bi", "Bismuth", "208.9804", 15, 6,
                    "Po", "Polonium", "209", 16, 6,
                    "At", "Astatine", "210", 17, 6,
                    "Rn", "Radon", "222", 18, 6,
                    "Fr", "Francium", "223", 1, 7,
                    "Ra", "Radium", "226", 2, 7,
                    "Ac", "Actinium", "227", 3, 10,
                    "Th", "Thorium", "232.038", 4, 10,
                    "Pa", "Protactinium", "231.0359", 5, 10,
                    "U", "Uranium", "238.0289", 6, 10,
                    "Np", "Neptunium", "237", 7, 10,
                    "Pu", "Plutonium", "244", 8, 10,
                    "Am", "Americium", "243", 9, 10,
                    "Cm", "Curium", "247", 10, 10,
                    "Bk", "Berkelium", "247", 11, 10,
                    "Cf", "Californium", "251", 12, 10,
                    "Es", "Einsteinium", "252", 13, 10,
                    "Fm", "Fermium", "257", 14, 10,
                    "Md", "Mendelevium", "258", 15, 10,
                    "No", "Nobelium", "259", 16, 10,
                    "Lr", "Lawrencium", "262", 17, 10,
                    "Rf", "Rutherfordium", "267", 4, 7,
                    "Db", "Dubnium", "268", 5, 7,
                    "Sg", "Seaborgium", "271", 6, 7,
                    "Bh", "Bohrium", "272", 7, 7,
                    "Hs", "Hassium", "270", 8, 7,
                    "Mt", "Meitnerium", "276", 9, 7,
                    "Ds", "Darmstadtium", "281", 10, 7,
                    "Rg", "Roentgenium", "280", 11, 7,
                    "Cn", "Copernicium", "285", 12, 7,
                    "Nh", "Nihonium", "284", 13, 7,
                    "Fl", "Flerovium", "289", 14, 7,
                    "Mc", "Moscovium", "288", 15, 7,
                    "Lv", "Livermorium", "293", 16, 7,
                    "Ts", "Tennessine", "294", 17, 7,
                    "Og", "Oganesson", "294", 18, 7
                ];

                const { TWEEN } = (window as any);
                const { TrackballControls } = (window as any).THREE;
                const { CSS3DRenderer, CSS3DObject } = (window as any).THREE;

                let camera: any, scene: any, renderer: any, controls: any;
                const objects: any[] = [];
                const targets = { table: [] as any[], sphere: [] as any[], helix: [] as any[], grid: [] as any[] };

                init();
                animate();

                function init() {
                    const container = document.getElementById('canvas-container');

                    camera = new (window as any).THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
                    camera.position.z = 3000;

                    scene = new (window as any).THREE.Scene();

                    for (let i = 0; i < table.length; i += 5) {
                        const element = document.createElement('div');
                        element.className = 'element';
                        
                        const col = table[i + 3] as number;
                        if(col === 18) element.classList.add('group-gas');
                        if(col === 1) element.classList.add('group-alkali');
                        
                        const number = document.createElement('div');
                        number.className = 'number';
                        number.textContent = ((i / 5) + 1).toString();
                        element.appendChild(number);

                        const symbol = document.createElement('div');
                        symbol.className = 'symbol';
                        symbol.textContent = table[i] as string;
                        element.appendChild(symbol);

                        const details = document.createElement('div');
                        details.className = 'details';
                        details.innerHTML = (table[i + 1] as string) + '<br>' + (table[i + 2] as string);
                        element.appendChild(details);

                        element.addEventListener('pointerdown', () => {
                            showModal(table[i] as string, table[i+1] as string, table[i+2] as string);
                        });

                        const objectCSS = new CSS3DObject(element);
                        objectCSS.position.x = Math.random() * 4000 - 2000;
                        objectCSS.position.y = Math.random() * 4000 - 2000;
                        objectCSS.position.z = Math.random() * 4000 - 2000;
                        scene.add(objectCSS);
                        objects.push(objectCSS);

                        const objectTarget = new (window as any).THREE.Object3D();
                        objectTarget.position.x = ((table[i + 3] as number) * 140) - 1330;
                        objectTarget.position.y = -((table[i + 4] as number) * 180) + 990;
                        targets.table.push(objectTarget);
                    }

                    const vector = new (window as any).THREE.Vector3();
                    for (let i = 0, l = objects.length; i < l; i++) {
                        const phi = Math.acos(-1 + (2 * i) / l);
                        const theta = Math.sqrt(l * Math.PI) * phi;
                        const object = new (window as any).THREE.Object3D();
                        object.position.setFromSphericalCoords(800, phi, theta);
                        vector.copy(object.position).multiplyScalar(2);
                        object.lookAt(vector);
                        targets.sphere.push(object);
                    }

                    for (let i = 0, l = objects.length; i < l; i++) {
                        const theta = i * 0.175 + Math.PI;
                        const y = -(i * 8) + 450;
                        const object = new (window as any).THREE.Object3D();
                        object.position.setFromCylindricalCoords(900, theta, y);
                        vector.x = object.position.x * 2;
                        vector.y = object.position.y;
                        vector.z = object.position.z * 2;
                        object.lookAt(vector);
                        targets.helix.push(object);
                    }

                    for (let i = 0; i < objects.length; i++) {
                        const object = new (window as any).THREE.Object3D();
                        object.position.x = ((i % 5) * 400) - 800;
                        object.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800;
                        object.position.z = (Math.floor(i / 25)) * 1000 - 2000;
                        targets.grid.push(object);
                    }

                    renderer = new CSS3DRenderer();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    if (container) {
                        while (container.firstChild) {
                            container.removeChild(container.firstChild);
                        }
                        container.appendChild(renderer.domElement);
                    }

                    controls = new TrackballControls(camera, renderer.domElement);
                    controls.minDistance = 500;
                    controls.maxDistance = 6000;
                    controls.rotateSpeed = 2.0;
                    controls.addEventListener('change', render);

                    const buttonTable = document.getElementById('table');
                    const buttonSphere = document.getElementById('sphere');
                    const buttonHelix = document.getElementById('helix');
                    const buttonGrid = document.getElementById('grid');
                    
                    const button2D = document.getElementById('mode-2d');
                    const button3D = document.getElementById('mode-3d');

                    if (buttonTable) buttonTable.addEventListener('click', function() { transform(targets.table, 2000); setActive(this); });
                    if (buttonSphere) buttonSphere.addEventListener('click', function() { transform(targets.sphere, 2000); setActive(this); });
                    if (buttonHelix) buttonHelix.addEventListener('click', function() { transform(targets.helix, 2000); setActive(this); });
                    if (buttonGrid) buttonGrid.addEventListener('click', function() { transform(targets.grid, 2000); setActive(this); });

                    if (button2D) button2D.addEventListener('click', () => {
                        button2D.classList.add('active');
                        if (button3D) button3D.classList.remove('active');
                        controls.noRotate = true;
                        controls.reset();
                        new TWEEN.Tween(camera.position)
                            .to({ x: 0, y: 0, z: 3000 }, 1500)
                            .easing(TWEEN.Easing.Cubic.Out)
                            .start();
                        new TWEEN.Tween(camera.rotation)
                            .to({ x: 0, y: 0, z: 0 }, 1500)
                            .easing(TWEEN.Easing.Cubic.Out)
                            .start();
                        transform(targets.table, 1500);
                        if (buttonTable) setActive(buttonTable);
                        if (buttonSphere) buttonSphere.classList.add('disabled');
                        if (buttonHelix) buttonHelix.classList.add('disabled');
                        if (buttonGrid) buttonGrid.classList.add('disabled');
                    });

                    if (button3D) button3D.addEventListener('click', () => {
                        button3D.classList.add('active');
                        if (button2D) button2D.classList.remove('active');
                        controls.noRotate = false;
                        if (buttonSphere) buttonSphere.classList.remove('disabled');
                        if (buttonHelix) buttonHelix.classList.remove('disabled');
                        if (buttonGrid) buttonGrid.classList.remove('disabled');
                    });

                    transform(targets.table, 2000);
                    if (buttonTable) setActive(buttonTable);

                    window.addEventListener('resize', onWindowResize);
                    
                    const closeBtn = document.getElementById('close-btn');
                    if(closeBtn) closeBtn.addEventListener('click', () => {
                        const overlay = document.getElementById('overlay');
                        if (overlay) overlay.style.display = 'none';
                    });
                }

                function setActive(button: HTMLElement) {
                    document.querySelectorAll('#menu button').forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                }

                function showModal(symbol: string, name: string, mass: string) {
                    const mSymbol = document.getElementById('m-symbol');
                    const mName = document.getElementById('m-name');
                    const mDetails = document.getElementById('m-details');
                    const overlay = document.getElementById('overlay');

                    if (mSymbol) mSymbol.textContent = symbol;
                    if (mName) mName.textContent = name;
                    if (mDetails) mDetails.textContent = `Atomic Mass: ${mass}`;
                    if (overlay) overlay.style.display = 'flex';
                }

                function transform(targets: any[], duration: number) {
                    TWEEN.removeAll();
                    for (let i = 0; i < objects.length; i++) {
                        const object = objects[i];
                        const target = targets[i];
                        new TWEEN.Tween(object.position)
                            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();
                        new TWEEN.Tween(object.rotation)
                            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                            .easing(TWEEN.Easing.Exponential.InOut)
                            .start();
                    }
                    new TWEEN.Tween(this)
                        .to({}, duration * 2)
                        .onUpdate(render)
                        .start();
                }

                function onWindowResize() {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    render();
                }

                function animate() {
                    requestAnimationFrame(animate);
                    TWEEN.update();
                    controls.update();
                }

                function render() {
                    renderer.render(scene, camera);
                }

            } catch (error) {
                console.error("Failed to initialize periodic table:", error);
            }
        };

        initPeriodicTable();

        return () => {
             const scripts = [
                'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
                'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/tween.min.js',
                'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/TrackballControls.js',
                'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/renderers/CSS3DRenderer.js'
            ];
            scripts.forEach(src => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) {
                    document.body.removeChild(script);
                }
            });
            const container = document.getElementById('canvas-container');
            if(container) {
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }
        }
    }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;700&display=swap');

        .periodic-table-body {
            margin: 0;
            background-color: #050505;
            background-image: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%);
            font-family: 'Rajdhani', sans-serif;
            overflow: hidden;
            color: white;
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
        }

        #canvas-container {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
        }

        #menu {
            position: absolute;
            bottom: 30px;
            width: 100%;
            text-align: center;
            z-index: 101;
            pointer-events: none;
        }

        #view-controls {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 101;
        }

        #menu button, #view-controls button {
            pointer-events: auto;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.5);
            color: rgba(0, 255, 255, 0.8);
            padding: 10px 25px;
            margin: 0 10px;
            font-family: 'Rajdhani', sans-serif;
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.1);
        }

        #menu button.disabled, #view-controls button.disabled {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
            border-color: #555;
            color: #555;
            box-shadow: none;
        }

        #menu button:hover, #menu button.active,
        #view-controls button:hover, #view-controls button.active {
            background: rgba(0, 255, 255, 0.3);
            color: #fff;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
            transform: scale(1.05);
        }

        .element {
            width: 120px;
            height: 160px;
            box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.3);
            border: 1px solid rgba(127, 255, 255, 0.25);
            background-color: rgba(0, 10, 20, 0.85);
            text-align: center;
            cursor: default;
            transition: background-color 0.3s, box-shadow 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            user-select: none;
        }

        .element:hover {
            box-shadow: 0px 0px 20px rgba(0, 255, 255, 0.7);
            background-color: rgba(0, 20, 40, 0.95);
            border-color: rgba(0, 255, 255, 0.8);
            z-index: 1000;
        }

        .element .number {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 14px;
            color: rgba(127, 255, 255, 0.75);
        }

        .element .symbol {
            font-size: 50px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        }

        .element .details {
            font-size: 14px;
            color: rgba(127, 255, 255, 0.75);
            margin-top: 5px;
        }

        .group-alkali { border-color: #ff3366; box-shadow: 0 0 10px #ff336640; }
        .group-alkali .symbol { color: #ff3366; text-shadow: 0 0 10px #ff3366; }
        
        .group-gas { border-color: #33ff66; box-shadow: 0 0 10px #33ff6640; }
        .group-gas .symbol { color: #33ff66; text-shadow: 0 0 10px #33ff66; }

        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 200;
            backdrop-filter: blur(5px);
        }

        #modal {
            width: 400px;
            background: rgba(10, 15, 30, 0.95);
            border: 1px solid cyan;
            padding: 30px;
            border-radius: 8px;
            position: relative;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
            text-align: center;
        }

        #modal h1 { margin: 0; font-size: 64px; color: cyan; text-shadow: 0 0 15px cyan; }
        #modal h2 { margin: 5px 0 20px; font-size: 24px; color: white; }
        #modal p { color: #aaa; line-height: 1.6; }
        #close-btn {
            margin-top: 20px;
            width: 100%;
            background: cyan;
            color: black;
            border: none;
        }
        #close-btn:hover { background: white; box-shadow: 0 0 15px white; transform: none;}

        #info {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 14px;
            color: #666;
            pointer-events: none;
        }
      `}</style>
      <div className="periodic-table-body">
        <div id="info">Use Mouse to Rotate, Scroll to Zoom</div>

        <div id="view-controls">
            <button id="mode-2d">2D View</button>
            <button id="mode-3d" className="active">3D View</button>
        </div>

        <div id="menu">
            <button id="table" className="active">Table</button>
            <button id="sphere">Sphere</button>
            <button id="helix">Helix</button>
            <button id="grid">Grid</button>
        </div>

        <div id="canvas-container"></div>

        <div id="overlay">
            <div id="modal">
                <h1 id="m-symbol">H</h1>
                <h2 id="m-name">Hydrogen</h2>
                <p id="m-details">Atomic Mass: 1.0079</p>
                <p style={{ fontSize: '0.9em', marginTop: '15px' }}>
                    Typically found in a gaseous state. Essential component of water and organic matter.
                </p>
                <button id="close-btn">Close</button>
            </div>
        </div>
      </div>
    </>
  );
}
