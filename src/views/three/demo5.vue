<!--Tween-->
<template>
  <div class="index-vue">

    <div id="demo5" class="three-demo5"></div>

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
  camera.position.z = 15;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  container = document.querySelector('#demo5');
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

  const tween1 = new TWEEN.Tween(sphere1.position).to({x: 5}, 1000);
  const tween2 = new TWEEN.Tween(sphere1.position).to({x: -5}, 1000);
  tween1.chain(tween2);
  tween2.chain(tween1);

  tween1.start()


  tween1.onStart(() => {
    // console.log('开始')
  })


  tween1.onUpdate(function (object) {
    // console.log(object.x)
  })

  tween1.onComplete(function (object) {
    // console.log(object.x)
  })

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper)


  const control = new OrbitControls(camera, renderer.domElement);
  control.update();

  animate()

  function animate() {
    requestAnimationFrame(animate)
    TWEEN.update();
    renderer.render(scene, camera);
  }

  const params = {
    stop: function () {
      tween1.stop();
    }
  }


  const gui = new GUI();
  gui.add(params, 'stop').name('停止');


})

</script>


<style lang="scss" scoped>
.three-demo5 {
  width: 100%;
  height: 100%;
}
</style>
