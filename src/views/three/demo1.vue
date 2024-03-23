<template>
  <div class="index-vue">

    <div id="demo1" class="three-demo1"></div>

  </div>
</template>


<script setup>

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let container;


onMounted(() => {

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container = document.querySelector('#demo1');
  container.appendChild( renderer.domElement );

  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const box = new THREE.BoxGeometry(1,1,1);

  const cube = new THREE.Mesh(box, material);
  scene.add(cube);

  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper)

  const control = new OrbitControls(camera, renderer.domElement);
  scene.add(control);
  control.autoRotate = true;
  control.enableDamping = true;
  control.update();

  renderer.render(scene, camera)


  function animate() {
    requestAnimationFrame(animate);
    control.update();

    renderer.render(scene, camera)

  }

  animate();

});

</script>

<style lang="scss" scoped>
.three-demo1 {
  width: 100%;
  height: 100%;

}
</style>
