<template>
  <div class="container mx-auto mt-64 flex items-center justify-center">
    <div class="card w-fit bg-gradient-to-b from-gray-50 to-gray-300">
      <div class="w-96 p-3 border-b border-gray-400">
        <h3 class="mb-3 text-lg font-semibold uppercase border-b-2">Register:</h3>
        <form>
          <label for="fname">Email:</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            class="input-text w-full shadow-inner"
            v-model="email"
          />
          <br />
          <label for="lname">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            class="input-text w-full shadow-inner"
            v-model="password"
          />
          <div class="mt-4">
            <button
              class="block p-0.5 px-2 mt-2 border bg-success rounded-md text-gray-200 w-full"
              @click="signUp"
            >Register</button>
          </div>
        </form>
      </div>
      <div class="p-2 text-center text-sm text-gray-600">
        <div>Forgot Password? <router-link to="/reset">Reset</router-link></div>
        <div>Already have an account? <router-link to="/login">Sign In</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "../../stores/user";
import router from "../../router/index.js";

</script>

<style>
</style>