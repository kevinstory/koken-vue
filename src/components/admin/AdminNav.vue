<script setup>



</script>

<template>

    <div class="w-screen h-12 bg-zinc-800 flex flex-row justify-between items-center px-4 text-gray-400">
        <div class="flex flex-row justify-between items-center gap-5 text-sm text-zinc-500">
            <span class="material-icons md-36 text-zinc-400">lens_blur</span>
            <div>Library</div>
            <div>Text</div>
            <div>Site</div>
            <div>Settings</div>
            <div @click="$emit('upload')" class="navLink">Upload</div>
        </div>
        <div class="flex flex-row gap-2 ">
            <router-link to="/home">View Site</router-link>
             | 
            <div @click="$emit('logout')" class="navLink">Logout</div>
        </div>


    </div>

</template>