<!--线框几何体-->
<template>
  <div class="index-vue">
    <div id="demo6" class="three-demo6"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';


let container;

onMounted(() => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  container = document.querySelector('#demo6');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();



  const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00FF00
      })
  );
  sphere1.position.x = -4;
  scene.add(sphere1);

  // const sphere2 = new THREE.Mesh(
  //     new THREE.SphereGeometry(1, 32, 32),
  //     new THREE.MeshBasicMaterial({
  //       color: 0xFF0000
  //     })
  // );
  // sphere2.position.x = 0;
  // scene.add(sphere2);
  //
  // const sphere3 = new THREE.Mesh(
  //     new THREE.SphereGeometry(1, 32, 32),
  //     new THREE.MeshBasicMaterial({
  //       color: 0x0000FF
  //     })
  // );
  // sphere3.position.x = 4;
  // scene.add(sphere3);

  const sphereGeometry =  new THREE.SphereGeometry(1, 32, 32);
  const edgesGeometry = new THREE.EdgesGeometry(sphereGeometry);

  // 用于绘制线框样式几何体的材质
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
  });

  // 绘制线
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  sphere1.updateWorldMatrix(true, true)

  // 存储物体的本地变换矩阵，这是对象相对于父对象的变换矩阵
  edges.matrix.copy(sphere1.matrixWorld)

  // 设置变换矩阵所需的位置信息
  edges.matrix.decompose(edges.position, edges.quaternion, edges.scale)

  scene.add(edges);

  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  animate()

  function animate() {
    requestAnimationFrame(animate)
    TWEEN.update();
    renderer.render(scene, camera);
  }


})

</script>


<style lang="scss" scoped>
.three-demo6 {
  width: 100%;
  height: 100%;
}
</style>
