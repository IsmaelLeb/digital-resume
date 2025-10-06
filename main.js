import * as THREE from 'three';

const cHeight = 1000;


// scene
const scene = new THREE.Scene();

// camera

function setCamera(){
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, (cHeight / 2) - 5.5, 20);
    camera.lookAt(0, camera.position.y - 5, 0);
    return camera
}
const camera = setCamera();


// renderer (activer les ombres)
function setRenderer(){
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    return renderer;
}
const renderer = setRenderer()


// faire le sol
// function setPlane(){
//     const plane = new THREE.Mesh(
//         new THREE.PlaneGeometry(500, 500),
//         new THREE.MeshStandardMaterial({ color: 0x999999 })
//     );
//     plane.rotation.x = -Math.PI / 2; // rendre horizontal
//     plane.position.y = 0;      // sous le cylindre
//     plane.receiveShadow = true;      // reçoit les ombres
//     scene.add(plane);
//     return plane;
// }
// const plane = setPlane();


// créer des formes
function createBaseCylinder(){
    const Cgeometry = new THREE.CylinderGeometry(10,10,cHeight,100,1,false);
    const Cmaterial = new THREE.MeshStandardMaterial({ color: 0xf10f20f50 });
    const cylindre = new THREE.Mesh( Cgeometry, Cmaterial );
    cylindre.castShadow = true;  // pour qu’il projette des ombres
    scene.add(cylindre);
    return cylindre;
}
const cylindre = createBaseCylinder();

function createSpiralCurve(){
    class SpiralCurve extends THREE.Curve {
        constructor(radius, height, turns) {
            super();
            this.radius = radius;
            this.height = height;
            this.turns = turns;
        }

        getPoint(t) {
            const angle = 2 * Math.PI * this.turns * t;
            const x = this.radius * Math.cos(angle);
            const z = this.radius * Math.sin(angle);
            const y = this.height * (0.5 - t);
            return new THREE.Vector3(x, y, z);
        }
    }

    const path = new SpiralCurve(11, cHeight, 100);
    const Sgeometry = new THREE.TubeGeometry(path, 2000, 1.5, 20, false);
    const Smaterial = new THREE.MeshStandardMaterial({ color: 0xff22ff });
    const spiral = new THREE.Mesh(Sgeometry, Smaterial);
    spiral.castShadow = true;
    scene.add(spiral);
}

createSpiralCurve();

// créer la lumière
function createLight(){
    const Rlight = new THREE.DirectionalLight(0x909090, 1); // couleur, intensité
    Rlight.position.set(20, 20, 20); // position de la lumière
    Rlight.castShadow = true;         // elle génère des ombres
    const Llight = new THREE.DirectionalLight(0xffffff, 1); // couleur, intensité
    Llight.position.set(-20, -20, -20); // position de la lumière
    Llight.castShadow = true;         // elle génère des ombres


    const behindLight = new THREE.DirectionalLight(0xf5500f55, 1)
    behindLight.position.set(0, (cHeight / 2) - 5.5, -50)
    
    scene.add(behindLight);
    scene.add(Rlight);
    scene.add(Llight);
}
createLight();

function animate() {
    cylindre.rotation.y += 0.01;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


let scrollPosition = 0;
const scrollSpeed = 0.05; // ← BEAUCOUP plus petit !

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    scrollPosition += event.deltaY * scrollSpeed;
    const maxScroll = cHeight * 2;
    scrollPosition = Math.max(-50, Math.min(scrollPosition, maxScroll));
    camera.position.y = 0 - (scrollPosition * 0.1);
    camera.lookAt(0, camera.position.y - 5, 0);
}, { passive: false });


function htmlElement(){
    const div = "<div>test</div>"
    div.style.height = "10vh";
    div.style.width = "10vw";
    div.style.backgroundColor = "white";
    
}