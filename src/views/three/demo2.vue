<template>
  <div class="index-vue">

    <div id="demo2" class="three-demo2"></div>

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

  container = document.querySelector('#demo2');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  // 创建缓冲区几何体
  const geometry = new THREE.BufferGeometry();

  // 创建顶点数据
  const vertices = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
   -1, 1, 0
  ]); // plane 的 position属性依然是（x:0, y:0, z:0）
  // 将顶点数据设置到几何体上
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  const indices = new Uint16Array([0,1,2,2,3,0]);
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    wireframe: true
  });
  const plane = new THREE.Mesh(geometry, material);
  // plane.position.x = 3;
  geometry.translate(3, 0, 0)

  // geometry.rotateX(Math.PI/2)
  geometry.scale(2,2,2)

  console.log('plane:', plane)
  scene.add(plane);

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
.three-demo2 {
  width: 100%;
  height: 100%;

}
</style>
