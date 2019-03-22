window.onload = function () 
{
    // Constants
    var speed = 0.0002;

    // Creating the scene
    var scene = new THREE.Scene();

    // Creating the camera
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 0;
    camera.position.z = 95;

    // WebGL renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var loader = new THREE.TextureLoader();

    // Orbit control
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.maxDistance = 200;

    // Adding light
    scene.add( new THREE.PointLight(0xffffff, 1) );
    scene.add( new THREE.AmbientLight(0x404040) );

    // Adding stars
    stars = new THREE.Mesh(new THREE.SphereGeometry(300, 64, 64), new THREE.MeshBasicMaterial({ map: loader.load('textures/stars1.jpg'), side: THREE.BackSide }));
    scene.add(stars);
    stars.matrixAutoUpdate = false;

    // Speed slider event
    document.getElementById("speed").oninput = function (e) { speed = e.target.value / 10000; };

    // Snackbar    
    snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);

    // Load objects
    var request = new XMLHttpRequest();
    request.open("GET", "./objects.json", false);
    request.send(null)
    var objects = JSON.parse(request.responseText);

    for (var i in objects)
    {
        o = objects[i];
        var geometry = new THREE.SphereGeometry(o.radius, 32, 32);

        switch (o.material) 
        {
            case 'basic':
                var material = new THREE.MeshBasicMaterial({ map: (new THREE.TextureLoader()).load('textures/' + o.texture) });
                break;
            case 'lambert':
                var material = new THREE.MeshLambertMaterial({ map: (new THREE.TextureLoader()).load('textures/' + o.texture) });
                break;
        }

        o.mesh = new THREE.Mesh(geometry, material);
        o.mesh.matrixAutoUpdate = false;

        if (o.parent == 'scene') { scene.add(o.mesh); }
        else { objects[o.parent].mesh.add(o.mesh); }
    }

    // Animate function
    (function animate()
    {
        var now = Date.now();

        for (var i in objects)
        {
            o = objects[i];
            var speedSelfRot = new THREE.Matrix4().makeRotationY(now * speed * o.speedSelfRot);
            var tras = new THREE.Matrix4().makeTranslation(o.tras, 0, 0);
            var speedParentRot = new THREE.Matrix4().makeRotationY(now * speed * o.speedParentRot);
            o.mesh.matrix = speedParentRot.multiply(tras.multiply(speedSelfRot));
        }

        // Stars light movement
        stars.matrix = new THREE.Matrix4().makeRotationY(now * speed / 10);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
}
