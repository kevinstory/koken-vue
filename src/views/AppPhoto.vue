<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
const photo = ref(null)
async function getPhoto() {
    let url = `http://192.168.1.99:1337/photos?id=` + route.params.id
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
        <div v-if="photo" class="flex flex-col justify-around items-center py-10">
            <div class="text-2xl font-semibold pb-10">{{photo.Title}}</div>
            <img :src="`http://192.168.1.99:1337` + photo.photo.url"
                class="block object-cover object-center w-1/2 h-1/2 min-w-2/6 min-h-2/6" />
            <div class="text-xl font-normal pt-10">{{photo.Caption}}</div>

        </div>

    </div>
</template>
