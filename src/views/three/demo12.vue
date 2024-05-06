<!--cannon 引擎的用途-->
<template>
  <div class="index-vue">
    <div id="demo12" class="three-demo12"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import * as dat from "dat.gui";
import * as CANNON from 'cannon-es'

let container;
onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(0,0,0);
  scene.add(camera);


  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const sphereShape = new CANNON.Sphere(0.5);
  const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    shape: sphereShape,
    material: new CANNON.Material('sphereMaterial')
  });

  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);
  world.addBody(sphereBody);

  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

  scene.add(sphereMesh);

  container = document.querySelector('#demo12');
  container.appendChild(renderer.domElement);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const planeShape = new CANNON.Plane();

  const planeBody = new CANNON.Body({
    mass: 0,
    shape: planeShape,
    position: new CANNON.Vec3(0, 0, 0),
  })

  planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

  world.addBody(planeBody);

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  planeMesh.rotation.x = -Math.PI / 2;
  scene.add(planeMesh);

  const clock = new THREE.Clock();
  function animate() {

    const delta = clock.getDelta();
    world.step(1 / 60, delta, 10);

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    planeMesh.position.copy(planeBody.position);

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    control.update();

  };


  animate()

})

</script>


<style lang="scss" scoped>
.three-demo12 {
  width: 100%;
  height: 100%;
}
</style>
