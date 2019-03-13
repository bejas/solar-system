window.onload = function() {
    // Creating the scene
    var scene = new THREE.Scene();

    // Creating the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 155;
    camera.position.y = 30;

    // WebGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var loader = new THREE.TextureLoader();

    // Adding the Sun
    var geometry = new THREE.SphereGeometry(15, 32, 32);
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
        var mercury_rot_speed = 0.7;
        var mercury_self_rot = new THREE.Matrix4().makeRotationY(now * 0.001);
        var mercury_tras = new THREE.Matrix4().makeTranslation(25,0,0);
        var mercury_sun_rot = new THREE.Matrix4().makeRotationY(0.003*now);
        mercury_mesh.matrix = mercury_sun_rot.multiply(mercury_tras.multiply(mercury_self_rot));

        // Venus
        var venus_rot_speed = 0.5;
        var venus_self_rot = new THREE.Matrix4().makeRotationY(now * 0.002);
        var venus_tras = new THREE.Matrix4().makeTranslation(45,0,0);
        var venus_sun_rot = new THREE.Matrix4().makeRotationY(0.002*now);
        venus_mesh.matrix = venus_sun_rot.multiply(venus_tras.multiply(venus_self_rot));
        // Venus' moon
        var venus_moon_tras = new THREE.Matrix4().makeTranslation(7,0,0);
        var venus_moon_earth_rot = new THREE.Matrix4().makeRotationY(0.005*now);
        venus_moon_mesh.matrix = venus_moon_earth_rot.multiply(venus_moon_tras);

        // Earth
        var earth_rot_speed = 1;
        var earth_self_rot = new THREE.Matrix4().makeRotationY(now*rot_const * earth_rot_speed);
        var earth_tras = new THREE.Matrix4().makeTranslation(65,0,0);
        var earth_sun_rot = new THREE.Matrix4().makeRotationY(0.0015*now);
        earth_mesh.matrix = earth_sun_rot.multiply(earth_tras.multiply(earth_self_rot));
        // Moon
        var earth_moon_tras = new THREE.Matrix4().makeTranslation(7,0,0);
        var earth_moon_earth_rot = new THREE.Matrix4().makeRotationY(0.001*now);
        earth_moon_mesh.matrix = earth_moon_earth_rot.multiply(earth_moon_tras);
    }

    animate();
}