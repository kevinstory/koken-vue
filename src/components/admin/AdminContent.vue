<script setup>
import { ref } from 'vue'
import { userStore } from "../../stores/user";
const store = userStore();
const strapi = import.meta.env.VITE_STRAPI_URL
const props = defineProps(['photos', 'category'])
const editMenu = ref(false)
const sortMenu = ref(false)
const filterMenu = ref(false)
const cols = ref(10)
const selected = ref(null)
</script>

<template>
    <div
        class="w-full h-full bg-zinc-900 text-zinc-600 flex flex-col justify-between items-start flex-grow border-r border-zinc-800">
        <div class="w-full h-12 flex flex-row justify-between items-center px-4 gap-3">
            <div class="flex flex-row justify-between items-center gap-3 text-zinc-200 font-mono">
                <div class="relative w-42">
                    <button id="dropdownDefault" class="font-medium text-sm" type="button"
                        @click="editMenu = !editMenu; sortMenu = false; filterMenu = false">edit</button>
                    <div v-show="editMenu" class="fixed z-10 rounded koken-shadow w-42 min-w-fit bg-zinc-800 mt-1">
                        <ul class="py-1 text-sm text-zinc-200 " @mouseleave="editMenu = false">
                            <li class="menu-item">Rotate Left</li>
                            <li class="menu-item">Rotate Right</li>
                            <li class="menu-item">Replace Original</li>
                            <li class="menu-item">Download Original</li>
                            <li class="menu-item">Mark as Featured</li>
                            <li class="menu-item">Mark as Favorite</li>
                            <li class="menu-item">Move to Trash</li>
                        </ul>
                    </div>

                </div>
                <div class="relative">
                    <button id="dropdownDefault" class="font-medium text-sm" type="button"
                        @click="sortMenu = !sortMenu; editMenu = false; filterMenu = false">sort</button>
                    <div v-show="sortMenu" class="fixed z-10 rounded koken-shadow w-fit bg-zinc-800 mt-1">
                        <ul class="py-1 text-sm text-zinc-200 cursor-pointer" @mouseleave="sortMenu = false">
                            <li class="menu-item" @click="$emit('sortPhotos', '_sort=created_at:ASC')">Oldest Uploaded
                                First</li>
                            <li class="menu-item" @click="$emit('sortPhotos', '_sort=created_at:DESC')">Newest Uploaded
                                First</li>
                            <li class="menu-item" @click="$emit('sortPhotos', '_sort=updated_at:ASC')">Oldest Updated
                                First</li>
                            <li class="menu-item" @click="$emit('sortPhotos', '_sort=updated_at:DESC')">Newest Updated
                                First
                            </li>

                        </ul>
                    </div>

                </div>
                <div class="relative">
                    <button id="dropdownDefault" class="font-medium text-sm" type="button"
                        @click="filterMenu = !filterMenu; editMenu = false; sortMenu = false">share</button>
                    <div v-show="filterMenu" class="fixed z-10 rounded koken-shadow w-fit bg-zinc-800 mt-1">
                        <ul class="py-1 text-sm text-zinc-200 " @mouseleave="filterMenu = false">
                            <li class="menu-item">Twitter</li>
                            <li class="menu-item">Instagram</li>
                            <li class="menu-item">Facebook</li>
                            <li class="menu-item">&lt;&gt; Embed</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="props.category">{{ props.category }}</div>
            <div v-else>All Content</div>
            <div>Search</div>
        </div>
        <div class="w-full h-full flex flex-col">
            <div class="h-full overflow-auto scrollbar bg-zinc-80">
                <div class="overflow-y-none max-h-full h-96 ">
                    <div class="h-full m-4">
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-10 gap-4 p-2 text-zinc-400 font-semibold text-sm">
                            <div v-for="photo in props.photos" :key="photo.id"
                                class="h-full flex flex-col justify-start items-center gap-2">
                                <template v-if="photo.photo.formats">
                                    <img :src="strapi + photo.photo.formats.thumbnail.url"
                                        class="koken-shadow block object-cover object-center rounded cursor-pointer"
                                        :class="store.settings.square ? 'h-32 w-32' : 'max-h-32 max-w-32', photo.id == selected ? 'ring-4 ring-orange-500' : ''"
                                        @click="$emit('inspectPhoto', photo), selected = photo.id" draggable
                                        @dragstart="$emit('dragPhoto', photo)">
                                </template>
                                <template v-else>

                                    <img :src="strapi + photo.photo.url"
                                        class="koken-shadow block object-cover object-center rounded cursor-pointer"
                                        :class="store.settings.square ? 'h-32 w-32' : 'max-h-32 max-w-32', photo.id == selected ? 'ring-4 ring-orange-500' : ''"
                                        @click="$emit('inspectPhoto', photo), selected = photo.id" draggable
                                        @dragstart="$emit('dragPhoto', photo)">
                                </template>
                                <div class="">{{ photo.Title }}</div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div class="w-full h-12 flex justify-between items-center px-4 border-t border-zinc-800">
            <div>selection</div>
            <div>{{ photos.length }} items</div>
            <div><span class="material-icons cursor-pointer" @click="store.settings.square = !store.settings.square">
                    crop_square
                </span></div>
        </div>
    </div>
</template>