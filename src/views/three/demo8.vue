<!--灯光与阴影-->
<template>
  <div class="index-vue">
    <div id="demo8" class="three-demo8"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';


let container;

onMounted(() => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  container = document.querySelector('#demo8');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 20),
      new THREE.MeshPhongMaterial()
  );
  scene.add(sphere);


  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);


  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(5, 5, 5);


  light1.shadow.radius = 20;

  // 设置阴影贴图的分辨率
  light1.shadow.mapSize.set(2048, 2048);

  // 设置平行光投射相机的属性
  light1.shadow.camera.near = 0.5;
  light1.shadow.camera.far = 500;
  light1.shadow.camera.top = 5;
  light1.shadow.camera.bottom = -5;
  light1.shadow.camera.left = -5;
  light1.shadow.camera.right = 5
  scene.add(light1);


  const gui = new GUI();
  gui.add(light1.shadow.camera, 'near')
      .min(0)
      .max(10)
      .step(0.1)
      .name('距离')
      .onChange(val => {
        light1.shadow.camera.updateProjectionMatrix()
      });


  const planGeometry = new THREE.PlaneGeometry(8, 8);
  const material = new THREE.MeshStandardMaterial();
  const plan = new THREE.Mesh(planGeometry, material);
  plan.position.set(0, -1, 0);
  plan.rotation.x = -Math.PI / 2
  scene.add(plan);


  // 开启渲染器阴影
  renderer.shadowMap.enabled = true;


  // 设置光照投射阴影
  light1.castShadow = true;
  // 投射阴影
  sphere.castShadow = true;
  // 平面接收阴影
  plan.receiveShadow = true;




  console.log('scene:', scene);


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
.three-demo8 {
  width: 100%;
  height: 100%;
}
</style>
