<template>
  <div class="index-vue">

    <div id="demo3" class="three-demo3"></div>

  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';

let container;

onMounted(() => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  camera.position.y = 1;
  camera.position.x = 1;
  camera.lookAt(0, 0, 0);

  container = document.querySelector('#demo3');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // 创建缓冲区几何体
  const geometry = new THREE.BoxGeometry();


  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    // side: THREE.DoubleSide,
    wireframe: false
  });

  const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    // side: THREE.DoubleSide,
    wireframe: false
  });
  const material2 = new THREE.MeshBasicMaterial({
    color: 0x666666,
    // side: THREE.DoubleSide,
    wireframe: false
  });
  const material3 = new THREE.MeshBasicMaterial({
    color: 0x999999,
    // side: THREE.DoubleSide,
    wireframe: false
  });
  const material4 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    // side: THREE.DoubleSide,
    wireframe: false
  });
  const material5 = new THREE.MeshBasicMaterial({
    color: 0x440000,
    // side: THREE.DoubleSide,
    wireframe: false
  });




  const cube = new THREE.Mesh(geometry, [material, material1,material2, material3, material4, material5]);

  scene.add(cube);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper)


  const control = new OrbitControls(camera, renderer.domElement);
  control.update();
  control.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });

  renderer.render(scene, camera);
})

</script>


<style lang="scss" scoped>
.three-demo3 {
  width: 100%;
  height: 100%;

}
</style>
