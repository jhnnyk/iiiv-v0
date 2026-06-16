<script setup>
import TitleBar from './components/TitleBar.vue'
</script>

<template>
  <TitleBar />
  <router-view />
</template>

<style>
body {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  padding: 10px 20px;
  background-color: rgb(11, 11, 11);
  color: rgb(203, 210, 216);
}

.error {
  color: red;
}
</style>
