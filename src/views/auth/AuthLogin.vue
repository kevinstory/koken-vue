<template>
  <div class="h-screen mx-auto flex items-center justify-center bg-repeat bg-zinc-900">
    <div class="shadow-[0_2px_10px_0px_rgba(0,0,0,0.8)] overflow-hidden py-4 w-72 bg-zinc-800 rounded">
      <div class="w-full my-5 flex flex-col justify-around items-center gap-3 ">
        <span class="material-icons md-150 pb-4 text-zinc-400">lens_blur</span>
        <form>
          <input type="text" id="email" name="email" placeholder="E-Mail Address"
            class="input-text w-full border border-black rounded-t-sm" v-model="email" />
          <br />
          <input type="password" id="password" name="password" placeholder="Password"
            class="input-text w-full border-x border-b border-black rounded-b-sm" v-model="password" />
          <div class="mt-4">
            <button class="block p-0.5 px-2 mt-2 bg-primary rounded-sm font-semibold w-full" @click="login">
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div class="p-2 text-center text-sm text-gray-400">
        <div>Forgot Password? <router-link to="/auth/reset">Reset</router-link>
        </div>
        <div>
          Don't have an account?
          <router-link to="/auth/register">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { userStore } from "../../stores/user";
import router from "../../router/index.js";
const strapi = import.meta.env.VITE_STRAPI_URL
const email = ref('')
const password = ref('')
const errors = ref("")
const loginPending = ref(false)
const loginDialog = ref(true)
const bgImage = '../images/bg.png'
async function login(e) {
  const store = userStore();
  e.preventDefault();
  try {
    const { data } = await axios.post(strapi + '/auth/local', {
      identifier: email.value,
      password: password.value,
    });
    const token = data.jwt;
    const userAuth = data.user;

    store.token = token;
    store.userAuth = userAuth;
    if (token) {
      const navigationResult = await router.push({ path: '/admin' });
    }
  } catch (error) {
    errors.value = error.response;
  }
}
</script>

<style>
</style>
