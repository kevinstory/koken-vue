<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { userStore } from "../../stores/user";
const strapi = import.meta.env.VITE_STRAPI_URL

const props = defineProps(['photo'])
const emit = defineEmits(['delete', 'updatePhoto'])
const store = userStore();

</script>

<template>
    <div
        class="w-96 h-full bg-black text-zinc-400 flex flex-col justify-between items-start flex-grow border-r border-zinc-800">
        <div class="w-full bg-zinc-900 border-b border-zinc-800 p-2">Inspector</div>
        <div class="w-full h-full flex flex-col">
            <div class="flex items-center justify-around border-b border-black mb-0" v-if="props.photo">
                <template v-if="props.photo.photo.formats">
                    <a :href="strapi + props.photo.photo.url" target="_blank"><img
                            :src="strapi + props.photo.photo.formats.small.url"
                            :alt="props.photo.Title"
                            class="block object-cover object-center w-full h-full"></a>
                </template>
                <template v-else>

                    <a :href="strapi + props.photo.photo.url" target="_blank"><img :src="strapi + props.photo.photo.url" :alt="props.photo.Title"
                        class="block object-cover object-center max-h-96 w-full h-full"></a>
                </template>
            </div>
            <div class="h-full overflow-auto scrollbar p-2" v-if="props.photo">
                <div class="overflow-none max-h-full h-96 flex flex-col gap-5">
                    <div
                        class="w-full text-zinc-400 text-sm  flex flex-col gap-2 flex-grow items-start border-b border-white pb-5">
                        <div class="font-semibold text-lg text-white underline-offset-2 underline">Properties</div>
                        <div class="flex flex-row items-start gap-2 w-full">File: {{ props.photo.photo.name }}</div>
                        <div class="flex flex-row items-start gap-2 w-full">Dimensions: {{ props.photo.photo.width }} x
                            {{ props.photo.photo.height }}</div>
                        <div class="flex flex-row items-start gap-2 w-full">ID: {{ props.photo.id }}</div>
                        <div class="flex flex-row items-start gap-2 w-full">Title: <input type="text"
                                class="bg-zinc-700 text-zinc-200 rounded px-1 w-full" @change="$emit('updatePhoto', props.photo)" v-model="props.photo.Title" />
                        </div>
                        <div class="flex flex-row items-start gap-2 w-full">Caption: <textarea
                                class="bg-zinc-700 text-zinc-200 rounded px-1 w-full" v-model="props.photo.Caption"
                                @change="$emit('updatePhoto', props.photo)"> {{ props.photo.Caption }}</textarea>
                        </div>
                        <div class="flex flex-row items-start gap-2 w-full">Categories: <div
                                v-for="cat in props.photo.categories" :key="cat.id">{{ cat.Category }}</div>
                        </div>
                        <div class="flex flex-row items-start gap-2 w-full">Tags: <div v-for="tag in props.photo.tags"
                                :key="tag.id">{{ tag.Tag }}</div>
                        </div>
                    </div>
                    <div>
                        <div
                            class="w-full text-zinc-400 text-sm font-mono flex flex-col gap-2 flex-grow items-start border-b border-white pb-5">
                            <div class="font-semibold text-lg text-white underline-offset-2 underline">Access</div>

                            <div class="flex flex-row items-start gap-2 w-full">Visibility: {{ props.photo.Visibility }}
                            </div>
                            <div class="flex flex-row items-start gap-2 w-full">Download: {{ props.photo.Download }}
                            </div>
                            <div class="flex flex-row items-start gap-2 w-full">Link:
                                <textarea class="bg-zinc-700 text-zinc-200 rounded px-1 w-full text-xs"
                                    rows="4" disabled>{{strapi}}{{ props.photo.photo.url }}</textarea>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="w-full text-zinc-400 text-sm font-mono flex flex-col gap-2 flex-grow items-start">
                            <div class="font-semibold text-lg text-white underline-offset-2 underline">History</div>

                            <div class="flex flex-row items-start gap-2 w-full">Uploaded: {{ props.photo.published_at }}
                            </div>
                            <div class="flex flex-row items-start gap-2 w-full">Captured: {{
                                    props.photo.photo.created_at
                            }}</div>
                            <div class="flex flex-row items-start gap-2 w-full">Modified: {{ props.photo.updated_at }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2" v-if="props.photo">
                <div class="flex flex-row items-center rounded px-2 py-0.5 w-fit bg-red-900 text-white  cursor-pointer"
                    @click="$emit('delete', props.photo.id)"><span class="material-icons text-white">delete</span>
                    Delete</div>
            </div>

        </div>
        <div class="w-full h-12 flex justify-around items-center bg-zinc-900">

        </div>
    </div>
</template>