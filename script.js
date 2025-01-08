import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';


console.log("This is 3D TEXT");


//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff);

//camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight,0.1, 1000);


// const geometry = new THREE.BoxGeometry(1,1,1)
// //Color of the Object
// const material = new THREE.MeshBasicMaterial({color: 0XFF0000})
// //create the final mesh
// const mesh = new THREE.Mesh(geometry, material)

//init camera
camera.position.z = 45;
camera.position.y =20;
camera.position.x=3;

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true

// renderer.render(scene, camera)


// const canvas = document.querySelector('canvas.webgl')

//controls
const controls =  new OrbitControls(camera,renderer.domElement);
controls.target = new THREE.Vector3(0,0, -40);
controls.update();

// RESIZE HANDLER
function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

//floor

const plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200), new THREE.MeshPhongMaterial({color: 0x0000c0cb}));
plane.rotation.x = -Math.PI/2
plane.receiveShadow = true
scene.add(plane);

//init hemisphere light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

//Point light
const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1);

const light2 = new THREE.PointLight(0x33ff33, 1, 100);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);

//Font loader
const loader = new FontLoader();
loader.load('./asset/Maze_Bold.json', 
    function(font){
        const geometry = new TextGeometry('JOHN IDOGUN', {
            font: font,
            size: 6,
            height: 2,
        })

        const textMesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0xad4000}),//front
            new THREE.MeshPhongMaterial({color: 0x5c2301}) //side
        ])
        textMesh.castShadow= true
        textMesh.position.y += 15
        textMesh.position.z -=40
        textMesh.position.x =-8
        textMesh.rotation.y = -0.50
        scene.add(textMesh)
    }

);

loader.load('./asset/Social Shapes_Regular.json',

    function (font){
        const geometry = new TextGeometry('ifyt',{
            font: font,
            size: 10,
            height: 2,
        })

        const iconsMesh = new THREE.Mesh(geometry,
            new THREE.MeshPhongMaterial({color: 0xffffff}))
            iconsMesh.castShadow = true
            iconsMesh.position.y +=1
            iconsMesh.position.z =-6
            iconsMesh.position.x=35
            iconsMesh.rotation.y = 0.35
            scene.add(iconsMesh)

        
    }
)
//Animate

function animate(){
     const now = Date.now()/1000;
     light1.position.y = 15;
     light1.position.x =Math.cos(now) * 20;
     light1.position.z = Math.sin(now) * 20;

    
     light2.position.y = 15;
     light2.position.x =Math.cos(now) * 20;
     light2.position.z = Math.sin(now) * 20;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();



