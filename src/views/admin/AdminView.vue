<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from "../../router/index.js";

import { userStore } from "../../stores/user";
import AdminNav from '../../components/admin/AdminNav.vue'
import AdminFooter from '../../components/admin/AdminFooter.vue'
import AdminLibrary from '../../components/admin/AdminLibrary.vue'
import AdminContent from '../../components/admin/AdminContent.vue'
import AdminInspector from '../../components/admin/AdminInspector.vue'
import AdminUpload from '../../components/admin/AdminUpload.vue'
const strapi = import.meta.env.VITE_STRAPI_URL
const photos = ref([])
const photo = ref(null)
const showUpload = ref(false)
const category = ref(null)
const store = userStore();
function inspectPhoto(p) {
    photo.value = p
}
function showUploadDialog() {
    showUpload.value = !showUpload.value
}
async function deletePhoto(id) {
    await console.log(id)
}
function submitSuccess() {
    getPhotos()
    showUpload.value = false
}
function selectCategory(cat) {
    if (cat == null) {
        category.value = null

    } else {
        category.value = cat.Category

    }
    getPhotos()
}
async function updatePhoto(p) {
    let url = strapi + `/photos/` + p.id
    try {
        const response = await axios.put(url, { "Caption": p.Caption, "Title": p.Title }, {
            headers: {
                Authorization:
                    'Bearer ' + store.token,
            },
        });

    } catch (error) {
        console.error(error);
    }
}
async function getPhotos() {
    
    let url = ''
    if (category.value == null) {
        url = strapi + `/photos`
    } else {
        url = strapi + `/photos?categories.Category_in=` + category.value
    }
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization:
                    'Bearer ' +  store.token,
            },
        });
        photos.value = response.data
        photo.value = photos.value[0]
    } catch (error) {
        console.error(error);
    }
}
async function logout() {
  try {
    store.$reset();
    const navigationResult = await router.push("/auth/login");
  } catch (error) {
    console.log(error, "log out error catch");
    errors.value = error.response;
  }
}
onMounted(() => {
    getPhotos()
})
</script>

<template>
    <div>
        <div class="flex flex-col justify-between items-center h-screen">
            <div class="">
                <AdminNav @upload="showUploadDialog()" @logout="logout" />
            </div>

            <div class="flex flex-row justify-between items-center w-screen min-h-max flex-grow">
                <AdminLibrary @select-category="selectCategory" />
                <AdminContent @inspect-photo="inspectPhoto" :photos="photos" :category="category" />
                <AdminInspector :photo="photo" @delete="deletePhoto(id)" @update-photo="updatePhoto" />
            </div>
            <div>
                <AdminFooter />
            </div>

        </div>
        <div v-if="showUpload" class="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
            <div class="relative mx-auto p-4 min-w-fit shadow-lg rounded-md bg-zinc-700">
                <AdminUpload @submit="submitSuccess" @close="showUpload = false" />
            </div>

        </div>
    </div>

</template>