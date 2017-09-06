// The detector will show a warning if the current browser does not support WebGL.
if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

// All of these variables will be needed later, just ignore them for now.
var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
render();

function init()
{
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 3;

  scene = new THREE.Scene();
  ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);

  keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
  keyLight.position.set(-100, 0, 100);

  fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
  fillLight.position.set(100, 0, 100);

  backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(100, 0, -100).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath('../models/');
  mtlLoader.setPath('../models/');
  mtlLoader.load('cabinet.mtl', function (materials)
  {
      materials.preload();

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('../models/');
      objLoader.load('cabinet.obj', function (cabinet)
      {
        cabinet.scale.set(0.2, 0.2, 0.2);
        cabinet.rotation.set(0, -90, 0);
        scene.add(cabinet);
      });
  });

  mtlLoader.load('screen.mtl', function (materials)
  {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');

    objLoader.load('screen.obj', function (cabinet_screen)
    {
      cabinet_screen.scale.set(0.2, 0.2, 0.2);
      cabinet_screen.rotation.set(0, -90, 0);
      scene.add(cabinet_screen);
    });
  });

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color("#FFFFFF"));

  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
}

function render()
{
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}
