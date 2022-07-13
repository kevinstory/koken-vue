<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import axios from 'axios'
const strapi = import.meta.env.VITE_STRAPI_URL

const route = useRoute()
const photo = ref(null)
async function getPhoto() {
    let url = strapi + `/photos?id=` + route.params.id
    try {
        const response = await axios.get(url);
        console.log(response);
        photo.value = response.data[0]

    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
    
    getPhoto()
})
</script>

<template>
    <div class="bg-white">
        <div v-if="photo" class="flex flex-col justify-around items-center">
            <div class="text-2xl font-semibold py-2 md:py-4 lg:py-10" v-html="photo.Title ? photo.Title : photo.photo.name"></div>
            <img :src="strapi + photo.photo.url"
                class="block object-cover object-center w-full sm:w-5/6 md:w-4/6 lg:3/6" />
            <div class="text-xl font-normal p-10">{{photo.Caption}}</div>

        </div>

    </div>
</template>
