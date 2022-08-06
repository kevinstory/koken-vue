<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import router from "../../router/index.js";
import { userStore } from "../../stores/user";
import AdminNav from '../../components/admin/AdminNav.vue'
import AdminFooter from '../../components/admin/AdminFooter.vue'
import SettingsLibrary from '../../components/admin/SettingsLibrary.vue'
import SettingsContent from '../../components/admin/SettingsContent.vue'

import AdminUpload from '../../components/admin/AdminUpload.vue'
const showUpload = ref(false)

const strapi = import.meta.env.VITE_STRAPI_URL
const store = userStore();

async function logout() {
    try {
        store.$reset();
        const navigationResult = await router.push("/auth/login");
    } catch (error) {
        console.log(error, "log out error catch");
        errors.value = error.response;
    }
}
function selectCategory(cat) {
    if (cat != null) {
        console.log('selecting cat', cat.id)
        filterCat.value = cat.id
    }
    else {
        console.log('selecting all')
        filterCat.value = ''
    }
}
</script>

<template>
    <div>
        <div class="flex flex-col justify-between items-center h-screen">
            <div class="">
                <AdminNav @upload="showUploadDialog()" @logout="logout" />
            </div>

            <div class="flex flex-row justify-between items-center w-screen min-h-max flex-grow">
                <SettingsContent />

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