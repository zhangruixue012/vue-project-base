<template>
  <div class="index-vue">

    <div id="demo1" class="three-demo1"></div>

  </div>
</template>


<script setup>

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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
  cube.position.x = 3;

  // 平移 && 缩放
  cube.scale.set(2, 2, 2);

  cube.rotation.x = Math.PI/4;
  cube.rotation.y= Math.PI/4;


  scene.add(cube);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper)

  const control = new OrbitControls(camera, renderer.domElement);
  // control.autoRotate = true;
  // control.enableDamping = true;
  control.update();
  control.addEventListener('change', function () {

    renderer.render(scene, camera); //执行渲染操作
  });


  renderer.render(scene, camera)

  // GUI
  let eventObj = {
    fullscreen: function () {
      document.body.requestFullscreen();
    },
    exitFullscreen() {
      document.exitFullscreen()
    }
  };
  const gui = new GUI();
  gui.add(eventObj, 'fullscreen').name('全屏');
  gui.add(eventObj, 'exitFullscreen').name('退出全屏');

  const folder = gui.addFolder('立方体位置');
  folder.add(cube.position, 'x').min(-10).max(10).step(1).name('立方体x轴位置').onChange(val => {
    renderer.render(scene, camera)
  }).onFinishChange(val => {
    renderer.render(scene, camera)
  });

  folder.add(material, 'wireframe').name('线框样式');

  function animate() {
    requestAnimationFrame(animate);
    control.update();

    renderer.render(scene, camera)

  }

  // animate();

});

</script>

<style lang="scss" scoped>
.three-demo1 {
  width: 100%;
  height: 100%;

}
</style>
