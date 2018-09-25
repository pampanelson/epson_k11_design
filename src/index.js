import * as THREE from 'three';
// console.log(THREE);

// trick to import other modules and merge to  THREE

window.THREE = THREE;


require('three/examples/js/controls/OrbitControls.js');
//add json loader manually
require('three/src/loaders/JSONLoader.js');


window.onload = function() {

    const loader = new THREE.JSONLoader();

    console.log(loader);

    const resize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.onresize = resize;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 20, 100);
    controls.update();

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    loader.load(
        // resource URL under /dist 
        "static/1.json",
        // onLoad callback
        function(geometry, material) {
            var object = new THREE.Mesh(geometry, material);
            scene.add(object);
        },


        // onProgress callback
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // onError callback
        function(err) {
            console.error('An error happened');
        }
    );

    camera.position.z = 5;

    const animate = function() {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
    };

    animate();

}();