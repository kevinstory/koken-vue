<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const strapi = import.meta.env.VITE_STRAPI_URL
const categories = ref([])
const active = ref(null)

async function getCategories() {
    try {
        const response = await axios.get(strapi + '/categories');
        categories.value = response.data
    } catch (error) {
        console.error(error);
    }
}
function setActive(c) {
    active.value = c
}
function dragOverOn(e) {
    //console.log('over', e)
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.add("dragover");
    }
}
function dragOverOff(e) {
    //console.log('leave', e)
    if (e.target.classList.contains("dropzone")) {
        e.target.classList.remove("dragover");
    }
}
onMounted(() => {
    getCategories()
})
</script>

<template>
    <div
        class="w-72 h-full bg-zinc-900 text-zinc-400 flex flex-col justify-between items-start flex-grow border-r border-zinc-800">
        <div class="w-full border-b border-zinc-800 p-2">Library</div>
        <div class="w-full h-full flex flex-col">
            <div class="h-full overflow-auto scrollbar bg-black p-2">
                <div class="overflow-y-none max-h-full h-96 flex flex-col gap-6">
                    <div>
                        <div @click="$emit('selectCategory', null)" class="cursor-pointer">All Content</div>
                        <div>Last Uploaded</div>
                        <div>Favorites</div>
                        <div>Featured Content</div>
                        <div>Featured Albums</div>
                    </div>
                    <div>
                        <div class="font-semibold text-zinc-200 pb-2">Categories</div>
                        <div class="font-semibold text-zinc-400 hover:text-zinc-200 active:text-zinc-300"
                            v-for="category in categories" :key="category.id">
                            <div @click="$emit('selectCategory', category), setActive(category.id)"
                                class="cursor-pointer dropzone" :active="active = category.id"
                                @drop.prevent="$emit('dropCategory', category.id, $event)" @dragover.prevent @dragenter="dragOverOn($event)"
                                @dragleave="dragOverOff($event)"> - {{
                                        category.Category
                                }}</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <div class="w-full h-12 flex justify-between items-center px-4 border-t border-zinc-800">
            settings
        </div>
    </div>
</template>
<style scoped>
.dragover {
    color: yellow;
}
</style>