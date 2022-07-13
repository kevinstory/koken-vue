<script setup>
import { userStore } from "../stores/user";
import { ref, onUpdated, onMounted } from "vue";
import router from "../router/index.js";
import axios from 'axios'
const strapi = import.meta.env.VITE_STRAPI_URL
const user = userStore();
const photos = ref([]);
const category = ref(null);
const errors = ref("")
const store = userStore();
async function getPhotos() {
  let url = ''
  if (category.value == null) {
    url = strapi + `/photos`
  } else {
    url = strapi + `/photos?categories.Category_in=` + category.value
  }
  try {
    const response = await axios.get(url);
    photos.value = response.data

  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {
  getPhotos()
})
</script>

<template>
  <div class="bg-white">
    <div class="fixed h-12 w-screen bg-white flex flex-row justify-between items-center px-3">
      <div @click="router.push('/admin')" class="cursor-pointer">Admin</div>
      <div class="text-2xl font-semibold uppercase">Koken Vue</div>
      <div class="">
        
      </div>
    </div>
    <div
      class="bg-white min-h-full h-screen w-screen grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-0 md:gap-0.5">
      <template v-for="photo in photos" :key="photo.id">
        <template v-if="photo.photo.width > photo.photo.height">
          <div class="col-span-2">
            <img :src="strapi + photo.photo.url"
              class="block object-cover object-center w-full h-full col-span-2 cursor-pointer"
              @click="router.push({ name: 'photo', params: { id: photo.id } })" />
          </div>

        </template>
        <template v-else>
          <div>
            <img :src="strapi + photo.photo.url" class="block object-cover object-center w-full h-full cursor-pointer"
              @click="router.push({ name: 'photo', params: { id: photo.id } })" />

          </div>
        </template>
      </template>
    </div>
  </div>
</template>
