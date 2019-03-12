window.onload = function() {
    // Creating the scene
    var scene = new THREE.Scene();

    // Creating the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    //camera.position.y = 5;

    // WebGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Adding the Sun
    var geometry = new THREE.SphereGeometry(3, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map:THREE.ImageUtils.loadTexture('sun.jpg')} );
    var sun_mesh = new THREE.Mesh(geometry, material);
    sun_mesh.matrixAutoUpdate = false;
    scene.add(sun_mesh);

    // Adding earth
    var geometry = new THREE.SphereGeometry(2, 32, 32);
    var material = new THREE.MeshLambertMaterial( {map:THREE.ImageUtils.loadTexture('earth.jpg')} );
    var earth_mesh = new THREE.Mesh(geometry, material);
    earth_mesh.position.set(2,0,0);
    //earth_mesh.matrixAutoUpdate = false;
    sun_mesh.add(earth_mesh);

    // Adding light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 3);
    scene.add(directionalLight);

    function animate() {
        var now = new Date();
        var dt = now - (animate.time || now);
        animate.time = now;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        // Matrix animation
        var rot = new THREE.Matrix4().makeRotationY(0.001*now);
        //var tras = new THREE.Matrix4().makeTranslation(2,0,0);
        sun_mesh.matrix = rot;

        
        //var rot = new THREE.Matrix4().makeRotationY(0.001*dt);
        var tras = new THREE.Matrix4().makeTranslation(1,0,0);
        earth_mesh.matrix = sun_mesh.matrix.multiply(tras);
        //earth_mesh.matrix.multiply(rot);
        
    }

    animate();
}