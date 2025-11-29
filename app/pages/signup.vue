<template>

  <h1>Welcome to Dropadox</h1>
  <h2>Sign up Now</h2>
    <div class="signup flex">

      <input v-model="state.email" placeholder="email"/>
      <p v-if="emailError">{{ emailError }}</p>
      <input v-model="state.password" placeholder="password"/>
      <p v-if="passwordError">{{ passwordError }}</p>
      <button @click="signUp">Sign Up</button>
    </div>

</template>
<script lang="ts" setup>
  const state = reactive({
    email: '',
    password: '',
  })
  const passwordError = ref();
  const emailError = ref();

  function signUp() {
      emailError.value = false
      passwordError.value = false
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.email)) {
          emailError.value = 'Please enter a valid email';
      }
      if (state.password.length < 6) {
        passwordError.value = 'Please enter a password';
      }

      if (!emailError.value && !passwordError.value) {
        // add api connection here
      }
  }

</script>