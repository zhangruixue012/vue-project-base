<!--cannon 引擎摩擦系数，弹性系数: 给每个物体设置一个材质，然后给材质设置摩擦系数和弹性系数-->
<!--cannon 定义接触材质的系数-->
<template>
  <div class="index-vue">
    <div id="demo13" class="three-demo13"></div>
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

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(0,0,0);
  scene.add(camera);


  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);


  let phyMeshes = [];
  let meshes = [];

  // Cannon世界正方体
  const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  const boxMaterialCan = new CANNON.Material("boxMaterial");
  boxMaterialCan.friction = 0.7;
  boxMaterialCan.restitution = 1;

  const boxSlipperMaterial = new CANNON.Material("boxSlipperMaterial");
  const boxBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    shape: boxShape,
    material: boxMaterialCan
  });

  boxSlipperMaterial.friction = 0;
  const boxBody1 = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(1, 5, 0),
    shape: boxShape,
    material: boxSlipperMaterial
  });


  const boxMaterial3 = new CANNON.Material("boxMaterial3");
  const materialContact = new CANNON.ContactMaterial(
      boxMaterialCan,
      boxMaterial3,
      {
        friction: 0,
        restitution: 0.1
      }
  )
  world.addContactMaterial(materialContact);


  // boxMaterial3.friction = 0.1;
  // boxMaterial3.restitution = 1;
  const boxBody2 = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(2, 5, 0),
    shape: boxShape,
    material: boxMaterial3
  });

  phyMeshes.push(boxBody)
  phyMeshes.push(boxBody1)
  phyMeshes.push(boxBody2)


  world.gravity.set(0, -9.82, 0);
  world.addBody(boxBody);
  world.addBody(boxBody1);
  world.addBody(boxBody2);

  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  // THREE世界正方体
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  const boxMesh1 = new THREE.Mesh(boxGeometry, boxMaterial);
  const boxMesh2 = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);
  scene.add(boxMesh1);
  scene.add(boxMesh2);
  meshes.push(boxMesh);
  meshes.push(boxMesh1);
  meshes.push(boxMesh2);

  container = document.querySelector('#demo13');
  container.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const planeShape = new CANNON.Box(new CANNON.Vec3(5, 0.1, 5))
  const planeBody = new CANNON.Body({
    mass: 0,
    shape: planeShape,
    position: new CANNON.Vec3(0, 0, 0),
    material: boxMaterialCan
  })
  planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0.1);

  world.addBody(planeBody);

  const planeGeometry = new THREE.BoxGeometry(10, 0.2, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = 0.1
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
.three-demo13 {
  width: 100%;
  height: 100%;
}
</style>
