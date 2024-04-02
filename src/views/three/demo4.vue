<template>
  <div class="index-vue">

    <div id="demo4" class="three-demo4"></div>

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
  camera.position.z = 15;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  container = document.querySelector('#demo4');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x00FF00
      })
  );
  sphere1.position.x = -4;
  scene.add(sphere1);

  const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 999999
      })
  );
  sphere2.position.x = 4
  scene.add(sphere2);

  const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshBasicMaterial({
        color: 0x0000FF
      })
  );
  scene.add(sphere3);


  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper)


  const control = new OrbitControls(camera, renderer.domElement);
  control.update();
  control.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });

  renderer.render(scene, camera);

  window.addEventListener('click', event => {

    mouse.x = (event.clientX / window.innerWidth) * 2 -1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);

    // 计算射线与物体的焦点
    const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);

    console.log('---intersects---:', intersects);
  });




})

</script>


<style lang="scss" scoped>
.three-demo3 {
  width: 100%;
  height: 100%;
}
</style>
