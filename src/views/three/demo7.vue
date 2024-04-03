<!--线框几何体-->
<template>
  <div class="index-vue">
    <div id="demo7" class="three-demo7"></div>
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

  container = document.querySelector('#demo7');
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

  const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xFF0000
      })
  );
  sphere2.position.x = 0;
  scene.add(sphere2);

  const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0000FF
      })
  );
  sphere3.position.x = 4;
  scene.add(sphere3);


  console.log('scene:', scene);

  let box = new THREE.Box3();
  for (let i=0; i < scene.children.length; i++) {
    // 计算几何体的边界矩形
    scene.children[i].geometry.computeBoundingBox();


    // 方法一
    // const box3 = scene.children[i].geometry.boundingBox;
    //
    // scene.children[i].updateMatrixWorld(true);
    //
    // box3.applyMatrix4(scene.children[i].matrixWorld);


    // 方法二:       setFromObject(用来计算包围盒的3D对象)
    let box3 = new THREE.Box3().setFromObject(scene.children[i])

    box.union(box3)
  }

  let boxHelper = new THREE.Box3Helper(box, 0xffff00);

  scene.add(boxHelper);









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
.three-demo7 {
  width: 100%;
  height: 100%;
}
</style>
