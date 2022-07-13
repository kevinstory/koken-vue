<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { userStore } from "../../stores/user";
const emit = defineEmits(['submit', 'close'])
const photo = ref(null)
const pending = ref(false)
const title = ref(null)
const store = userStore();
function selectPhoto(e) {
    photo.value = e.target.files;
}
async function upload(p) {
    console.log('uploading a photo', p)
    let formData = new FormData();
    let data = { "Title": p.name };
    formData.append("files.photo", p, p.name);
    formData.append("data", JSON.stringify(p.name));
    try {
        const response = await axios.post('http://192.168.1.99:1337/photos', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization":
                    'Bearer ' + store.token,
            }
        });
    } catch (error) {
        console.error(error);
    }
}
async function uploadPhoto(e) {
    console.log(photo.value)
    pending.value = true
    e.preventDefault()
    for (let i = 0; i < photo.value.length; i++) {
        await upload(photo.value[i]);
    }
    pending.value = false
    emit('submit')
}
</script>

<template>
    <transition name="pop" appear>
        <div class="flex flex-col justify-around items-center gap-3 text-zinc-300">
            <div>Upload</div>
            <div>
                <form class="flex flex-col justify-around items-center gap-3">
                    <!-- <div class="w-full">
                        <input type="text" name="title" v-model="title" class="rounded w-full px-2 text-zinc-800"
                            placeholder="Title" />
                    </div> -->
                    <input type="file" class="bg-white w-full rounded p-1 border text-zinc-800" @change="selectPhoto"
                        multiple />

                </form>
            </div>
            <div class="flex flex-row justify-between items-center w-full">
                <button @click="uploadPhoto" :disabled="pending"
                    class="bg-green-400 text-zinc-800 px-1 rounded cursor-pointer disabled:bg-green-800">Submit</button>
                <div @click="$emit('close')" class="bg-orange-400 text-zinc-800 px-1 rounded cursor-pointer">
                    Close</div>

            </div>

        </div>
    </transition>


</template>

<style scoped>
.pop-enter-active,
.pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
}
</style>