window.onload = function() {
    // Creating the scene
    var scene = new THREE.Scene();

    // Creating the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 75;
    camera.position.y = 10;

    // WebGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var dimPlanet = 450;
    var div = 696000;

    // Adding the Sun
    var sun = { rot_speed: 1997 };
    var geometry = new THREE.SphereGeometry((696000/div)*15, 32, 32);
    var loader = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial( {map: (new THREE.TextureLoader()).load('textures/sun3.jpg')} );
    var sun_mesh = new THREE.Mesh(geometry, material);
    sun_mesh.matrixAutoUpdate = false;
    scene.add(sun_mesh);

    // Adding light
    var sun_light = new THREE.PointLight( 0xffffff, 2 );
    sun_mesh.add(sun_light);
    var ambient_light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(ambient_light);

    // Adding mercury
    var mercury = { 
        radius: 2439,
        distanceFromSun: 57.91
    };
    var geometry = new THREE.SphereGeometry(dimPlanet*(2439/div), 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/mercury.jpg')} );
    var mercury_mesh = new THREE.Mesh(geometry, material);
    mercury_mesh.matrixAutoUpdate = false;
    scene.add(mercury_mesh);

    // Adding earth
    var earth = {
        radius: 6371,
        distanceFromSun: 108.2
    };
    var geometry = new THREE.SphereGeometry((dimPlanet)*(6371/div), 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/earth.jpg')} );
    var earth_mesh = new THREE.Mesh(geometry, material);
    earth_mesh.matrixAutoUpdate = false;
    scene.add(earth_mesh);
    // Moon
    var geometry = new THREE.SphereGeometry(dimPlanet*1737/div, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map: loader.load('textures/moon.png')} );
    var moon_mesh = new THREE.Mesh(geometry, material);
    moon_mesh.matrixAutoUpdate = false;
    earth_mesh.add(moon_mesh);

    

    function animate() {
        var now = new Date();
        now.setHours(now.getHours() + 0);
        var dt = now - (animate.time || now);
        animate.time = now;

        var rot_const = 0.001;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        // Sun
        var sun_rot = new THREE.Matrix4().makeRotationY(now * rot_const);
        sun_mesh.matrix = sun_rot;

        // Mercury
        var mercury_rot_speed = 0.5;
        var mercury_self_rot = new THREE.Matrix4().makeRotationY(now*rot_const * mercury_rot_speed);
        var mercury_tras = new THREE.Matrix4().makeTranslation(20,0,0);
        var mercury_sun_rot = new THREE.Matrix4().makeRotationY(0.001*now);
        mercury_mesh.matrix = mercury_sun_rot.multiply(mercury_tras.multiply(mercury_self_rot));

        // Earth
        var earth_rot_speed = 0.5;
        var earth_self_rot = new THREE.Matrix4().makeRotationY(now*rot_const * earth_rot_speed);
        var earth_tras = new THREE.Matrix4().makeTranslation(33,0,0);
        var earth_sun_rot = new THREE.Matrix4().makeRotationY(0.001*now);
        earth_mesh.matrix = earth_sun_rot.multiply(earth_tras.multiply(earth_self_rot));
        // Moon
        var moon_tras = new THREE.Matrix4().makeTranslation(4,0,0);
        moon_mesh.matrix = moon_tras;


        
    }

    animate();
}