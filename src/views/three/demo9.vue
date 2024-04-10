<!--聚光灯-->
<template>
  <div class="index-vue">
    <div id="demo9" class="three-demo9"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';


let container;

onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,10);
  camera.lookAt(0,0,0,)

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  container = document.querySelector('#demo9');
  container.appendChild(renderer.domElement);

  // 添加环境光
  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  // 球
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const material = new THREE.MeshPhongMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);

  // 聚光灯
  // const spotLight = new THREE.SpotLight(0xffffff, 1);
  // spotLight.position.set(5,5,5);
  // spotLight.shadow.radius = 20;
  // spotLight.shadow.mapSize.set(4096, 4096)
  // // spotLight.target = sphere;
  // scene.add(spotLight);

  const light1 = new THREE.SpotLight(0xffffff, 1);
  light1.position.set(5, 5, 5);
  light1.shadow.radius = 20;
  light1.castShadow = true;
  // 设置阴影贴图的分辨率
  light1.shadow.mapSize.set(2048, 2048);
  scene.add(light1);

  // 平面
  const planGeometry = new THREE.PlaneGeometry(8, 8);
  const planMaterial = new THREE.MeshStandardMaterial();
  const plan = new THREE.Mesh(planGeometry, planMaterial);
  plan.position.set(0, -1, 0);
  plan.rotation.x = -Math.PI / 2
  scene.add(plan);

  // 开启渲染器阴影
  renderer.shadowMap.enabled = true;
  sphere.castShadow = true;
  plan.receiveShadow = true;





  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  renderer.render(scene, camera);

  animate()
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

})

</script>


<style lang="scss" scoped>
.three-demo9 {
  width: 100%;
  height: 100%;
}
</style>
