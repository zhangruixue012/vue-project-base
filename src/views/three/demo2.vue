<template>
  <div className="index-vue">

    <div id="demo2" className="three-demo2"></div>

  </div>
</template>


<script setup>

import * as THREE from 'three';

let container;


onMounted(() => {

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  container = document.querySelector('#demo2');
  container.appendChild( renderer.domElement );


  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);


  const scene = new THREE.Scene();
  const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );


  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );

  const line = new THREE.Line( geometry, material );

  scene.add( line );


  renderer.render( scene, camera );

});

</script>

<style lang="scss" scoped>
.three-demo2 {
  width: 100%;
  height: 100%;
}
</style>
