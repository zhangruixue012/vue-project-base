<!--cannon 引擎摩擦系数，弹性系数: 给每个物体设置一个材质，然后给材质设置摩擦系数和弹性系数-->
<!--cannon 定义接触材质的系数-->
<template>
  <div class="index-vue">
    <div id="demo14" class="three-demo14"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon-es'

let container;
onMounted(() => {
  const scene = new THREE.Scene();
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(0,0,0);
  scene.add(camera);

  const GROUP1 = 1;
  const GROUP2 = 2;
  const GROUP3 = 4;
  const GROUP4 = 8;


  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);


  let phyMeshes = [];
  let meshes = [];

  // Cannon世界正方体
  const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  const boxMaterialCon = new CANNON.Material("boxMaterial");

  const boxBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(-2, 0.5, 0),
    shape: boxShape,
    material: boxMaterialCon
  });
  boxBody.velocity.set(2, 0, 0);
  phyMeshes.push(boxBody)
  world.addBody(boxBody);


  const sphereShape = new CANNON.Sphere(0.5);
  const sphereMaterial = new CANNON.Material("sphereMaterial");
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 0.5, 0),
    shape: sphereShape,
    material: sphereMaterial
  });
  phyMeshes.push(sphereBody)
  world.addBody(sphereBody);

  const cylinderShape = new CANNON.Cylinder(0.5, 0.5, 1, 32);
  const cylinderBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(2, 0.8, 0),
    shape: cylinderShape,
    material: sphereMaterial
  });
  phyMeshes.push(cylinderBody)
  world.addBody(cylinderBody);

  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  // THREE世界正方体
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);
  meshes.push(boxMesh);

  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const sphereMaterial1 = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial1);
  scene.add(sphereMesh);
  meshes.push(sphereMesh);

  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  scene.add(cylinderMesh);
  meshes.push(cylinderMesh);


  container = document.querySelector('#demo14');
  container.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const planeShape = new CANNON.Box(new CANNON.Vec3(5, 0.1, 5))
  const planeBody = new CANNON.Body({
    mass: 0,
    shape: planeShape,
    position: new CANNON.Vec3(0, 0, 0),
    material: boxMaterialCon
  })

  world.addBody(planeBody);

  const planeGeometry = new THREE.BoxGeometry(10, 0.2, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(planeMesh);





  const clock = new THREE.Clock();
  function animate() {

    const delta = clock.getDelta();
    world.step(1 / 60, delta, 10);

    for(let i = 0; i < phyMeshes.length; i++) {
      meshes[i].position.copy(phyMeshes[i].position);
      meshes[i].quaternion.copy(phyMeshes[i].quaternion);
    }

    planeMesh.position.copy(planeBody.position);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    control.update();

  };


  animate()

})

</script>


<style lang="scss" scoped>
.three-demo14 {
  width: 100%;
  height: 100%;
}
</style>
