<script setup>
import { ref, onMounted, computed } from 'vue'
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
const filteredPhotos = computed(() => {
    let filter = filterCat.value
    if (filter == '') return photos.value
    //console.log('filteredPhotos', filter)
    return photos.value.filter(photo => {
        if (photo.categories.length > 0) {
            return photo.categories.some(cat => filter == cat.id)
        }
    }
    )
})
const draggedPhoto = ref(null)
const photo = ref(null)
const filterCat = ref('')
const showUpload = ref(false)
const category = ref(null)
const apiParams = ref('_sort=created_at:ASC')
const store = userStore();
function sortPhotos(p) {
    console.log('sorting: ', p)
    apiParams.value = p
    getPhotos()
}
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
    if (cat != null) {
        console.log('selecting cat', cat.id)
        filterCat.value = cat.id
    }
    else {
        console.log('selecting all')
        filterCat.value = ''
    }
}
async function updatePhoto(p) {
    console.log('updateing photo')
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
function dragPhoto(drag) {
    draggedPhoto.value = drag
    console.log('drag photo', draggedPhoto.value)
}
async function dropCategory(id, e) {
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.remove("dragover");
    }
    let url = strapi + `/photos/` + draggedPhoto.value.id
    var cats = [id]
    draggedPhoto.value.categories.forEach(cat => {
        cats.push(cat.id)
    })
    //console.log(cats)
    try {
        const response = await axios.put(url, { "categories": [cats] }, {
            headers: {
                Authorization:
                    'Bearer ' + store.token,
            },
        });
        //console.log(response.data)
        getPhotos()
    } catch (error) {
        console.error(error);
    }
}
async function getPhotos() {
    let url = strapi + `/photos?` + apiParams.value
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization:
                    'Bearer ' + store.token,
            },
        });
        //console.log('get photos', response.data)
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
                <AdminLibrary @select-category="selectCategory" @drop-category="dropCategory" />
                <AdminContent @inspect-photo="inspectPhoto" :photos="filteredPhotos" :category="category"
                    @sort-photos="sortPhotos" @drag-photo="dragPhoto" />
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