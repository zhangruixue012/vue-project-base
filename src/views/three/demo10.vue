<!--聚光灯-->
<template>
  <div class="index-vue">
    <div id="demo10" class="three-demo10"></div>
  </div>
</template>


<script setup>

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import * as dat from "dat.gui";


let container;

onMounted(() => {
  const gui = new dat.GUI();
// 1、创建场景
  const scene = new THREE.Scene();

// 2、创建相机
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  );

  // 设置相机位置
  camera.position.set(0, 0, 10);
  scene.add(camera);

  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial();
  const sphere = new THREE.Mesh(sphereGeometry, material);
  scene.add(sphere);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 创建平面
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.position.set(0, -1, 0);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // 环境光
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);

  //直线光源
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(5, 5, 5);

  spotLight.intensity = 2;

  // 设置阴影贴图模糊度
  spotLight.shadow.radius = 20;
  // 设置阴影贴图的分辨率
  spotLight.shadow.mapSize.set(512, 512);
  // 聚光源目标对象
  spotLight.target = sphere;

  // 聚光源发散角度
  spotLight.angle = Math.PI / 6;
  spotLight.distance = 0;
  // 半影衰减
  spotLight.penumbra = 0;
  // 光源衰减
  spotLight.decay = 0;

  // 投射阴影
  sphere.castShadow = true;
  spotLight.castShadow = true;
  // 接收阴影
  plane.receiveShadow = true;
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;


  // renderer.physicallyCorrectLights = true;


  // 设置透视相机的属性
  scene.add(spotLight);
  gui.add(sphere.position, "x").min(-5).max(5).step(0.1);
  gui.add(spotLight, "angle")
      .min(0)
      .max(Math.PI / 2)
      .step(0.01);
  gui.add(spotLight, "distance").min(0).max(10).step(0.01);
  gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
  gui.add(spotLight, "decay").min(0).max(5).step(0.01);




  // 将webgl渲染的canvas内容添加到body
  container = document.querySelector('#demo10');
  container.appendChild(renderer.domElement);


  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);


  function render() {
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
})

</script>


<style lang="scss" scoped>
.three-demo10 {
  width: 100%;
  height: 100%;
}
</style>
