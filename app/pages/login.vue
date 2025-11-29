<template>
  <h1>Dropadox</h1>
  <h2>Sign in </h2>
  <div class="signin flex">

    <input v-model="state.email" placeholder="email"/>
    <p v-if="emailError">{{ emailError }}</p>
    <input v-model="state.password" placeholder="password"/>
    <p v-if="passwordError">{{ passwordError }}</p>
    <button @click="signIn">Sign Up</button>
  </div>

</template>
<script lang="ts" setup>
  const emailError = ref()
  const passwordError = ref()

  const state = {
    email: '',
    password: '',
  }

  function signIn() {
    //get password thing
  }

</script>