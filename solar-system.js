window.onload = function() {
    // Creating the scene
    var scene = new THREE.Scene();

    // Creating the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.y = 0;
    camera.position.z = 85;
    
    // WebGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var loader = new THREE.TextureLoader();

    // Orbit control
    orbitControl = new THREE.OrbitControls( camera, renderer.domElement );
    orbitControl.maxDistance = 200;
    
    // Adding the Sun
    var geometry = new THREE.SphereGeometry(23, 32, 32);
    var material = new THREE.MeshBasicMaterial( {map: (new THREE.TextureLoader()).load('textures/sun.jpg'), side: THREE.DoubleSide} );
    var sun_mesh = new THREE.Mesh(geometry, material);
    sun_mesh.matrixAutoUpdate = false;
    scene.add(sun_mesh);

    // Adding mercury
    var geometry = new THREE.SphereGeometry(3, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/mercury.jpg')} );
    var mercury_mesh = new THREE.Mesh(geometry, material);
    mercury_mesh.matrixAutoUpdate = false;
    scene.add(mercury_mesh);

    // Adding venus
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/venus.jpg')} );
    var venus_mesh = new THREE.Mesh(geometry, material);
    venus_mesh.matrixAutoUpdate = false;
    scene.add(venus_mesh);
    // Venus' moon
    var geometry = new THREE.SphereGeometry(1.5, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/moon.png')} );
    var venus_moon_mesh = new THREE.Mesh(geometry, material);
    venus_moon_mesh.matrixAutoUpdate = false;
    venus_mesh.add(venus_moon_mesh);

    // Adding earth
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/earth.jpg')} );
    var earth_mesh = new THREE.Mesh(geometry, material);
    earth_mesh.matrixAutoUpdate = false;
    scene.add(earth_mesh);
    // Earth's Moon
    var geometry = new THREE.SphereGeometry(1.5, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/moon.png')} );
    var earth_moon_mesh = new THREE.Mesh(geometry, material);
    earth_moon_mesh.matrixAutoUpdate = false;
    earth_mesh.add(earth_moon_mesh);

    // Adding Mars
    var geometry = new THREE.SphereGeometry(3.5, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/mars.jpg')} );
    var mars_mesh = new THREE.Mesh(geometry, material);
    mars_mesh.matrixAutoUpdate = false;
    scene.add(mars_mesh);

    // Adding Jupiter
    var geometry = new THREE.SphereGeometry(8, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/jupiter.jpg')} );
    var jupiter_mesh = new THREE.Mesh(geometry, material);
    jupiter_mesh.matrixAutoUpdate = false;
    scene.add(jupiter_mesh);

    // Adding Saturn
    var geometry = new THREE.SphereGeometry(7, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/saturn.jpg')} );
    var saturn_mesh = new THREE.Mesh(geometry, material);
    saturn_mesh.matrixAutoUpdate = false;
    scene.add(saturn_mesh);

    // Adding light
    var sun_light = new THREE.PointLight( 0xffffff, 1 );
    sun_mesh.add(sun_light);
    var ambient_light = new THREE.AmbientLight( 0x404040 ); // soft white ambient light
    scene.add(ambient_light);

    // Adding stars
    stars = new THREE.Mesh(new THREE.SphereGeometry(300, 64), new THREE.MeshBasicMaterial({ map: loader.load('textures/stars.jpg'), side: THREE.BackSide }));
    scene.add(stars);
    stars.matrixAutoUpdate = false;

    // Constants
    var speed = 0.3;

    function animate() {
        var now = new Date();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        // Sun
        var sun_rot = new THREE.Matrix4().makeRotationY(now*0.0005 * speed);
        sun_mesh.matrix = sun_rot;

        stars.matrix = new THREE.Matrix4().makeRotationY(now*0.00003 * speed);

        // Mercury
        var mercury_self_rot = new THREE.Matrix4().makeRotationY(now*0.001 * speed);
        var mercury_tras = new THREE.Matrix4().makeTranslation(30,0,0);
        var mercury_sun_rot = new THREE.Matrix4().makeRotationY(0.005*now * speed);
        mercury_mesh.matrix = mercury_sun_rot.multiply(mercury_tras.multiply(mercury_self_rot));

        // Venus
        var venus_self_rot = new THREE.Matrix4().makeRotationY(now * 0.002 * speed);
        var venus_tras = new THREE.Matrix4().makeTranslation(45,0,0);
        var venus_sun_rot = new THREE.Matrix4().makeRotationY(0.002*now * speed);
        venus_mesh.matrix = venus_sun_rot.multiply(venus_tras.multiply(venus_self_rot));
        // Venus' moon
        var venus_moon_tras = new THREE.Matrix4().makeTranslation(7,0,0);
        var venus_moon_earth_rot = new THREE.Matrix4().makeRotationY(0.003*now);
        venus_moon_mesh.matrix = venus_moon_earth_rot.multiply(venus_moon_tras);

        // Earth
        var earth_self_rot = new THREE.Matrix4().makeRotationY(now*0.001 * speed);
        var earth_tras = new THREE.Matrix4().makeTranslation(60,0,0);
        var earth_sun_rot = new THREE.Matrix4().makeRotationY(0.0015*now * speed);
        earth_mesh.matrix = earth_sun_rot.multiply(earth_tras.multiply(earth_self_rot));
        // Earth's Moon
        var earth_moon_tras = new THREE.Matrix4().makeTranslation(7,0,0);
        var earth_moon_earth_rot = new THREE.Matrix4().makeRotationY(0.001*now);
        earth_moon_mesh.matrix = earth_moon_earth_rot.multiply(earth_moon_tras);

        // Mars
        var mars_self_rot = new THREE.Matrix4().makeRotationY(now*0.001 * speed);
        var mars_tras = new THREE.Matrix4().makeTranslation(75,0,0);
        var mars_sun_rot = new THREE.Matrix4().makeRotationY(0.0005*now * speed);
        mars_mesh.matrix = mars_sun_rot.multiply(mars_tras.multiply(mars_self_rot));

        // Jupiter
        var jupiter_self_rot = new THREE.Matrix4().makeRotationY(now*0.003 * speed);
        var jupiter_tras = new THREE.Matrix4().makeTranslation(95,0,0);
        var jupiter_sun_rot = new THREE.Matrix4().makeRotationY(0.0003*now * speed);
        jupiter_mesh.matrix = jupiter_sun_rot.multiply(jupiter_tras.multiply(jupiter_self_rot));

        // Saturn
        var saturn_self_rot = new THREE.Matrix4().makeRotationY(now*0.0025 * speed);
        var saturn_tras = new THREE.Matrix4().makeTranslation(115,0,0);
        var saturn_sun_rot = new THREE.Matrix4().makeRotationY(0.00025*now * speed);
        saturn_mesh.matrix = saturn_sun_rot.multiply(saturn_tras.multiply(saturn_self_rot));
    }

    document.getElementById("cameraY").oninput = function(e) { camera.position.y = e.target.value; camera.lookAt(new THREE.Vector3(0,0,0)); };
    document.getElementById("cameraZ").oninput = function(e) { camera.position.z = e.target.value; camera.lookAt(new THREE.Vector3(0,0,0)); };
    document.getElementById("speed").oninput = function(e) { speed = 3*e.target.value/100; };
    
    animate();
    snackBarFun();
}

function snackBarFun() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
