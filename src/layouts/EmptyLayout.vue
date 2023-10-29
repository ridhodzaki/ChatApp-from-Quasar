<template>
  <q-layout view="hHh lpR lff">
    <q-page-container class="background-login">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.background-login {
  background: #0F2027;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
