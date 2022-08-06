<script setup>
import { ref } from 'vue'

const menu = ref(['Administrator', 'Uploading', 'System'])
</script>
<template>
<div class="w-72 h-full bg-zinc-900 text-zinc-400 flex flex-col justify-between items-start flex-grow border-r border-zinc-800">

    <div class="w-full border-b border-zinc-800 p-2">Settings</div>
        <div class="w-full h-full flex flex-col">
            <div class="h-full overflow-auto scrollbar bg-black p-2">
                <div class="overflow-y-none max-h-full h-96 flex flex-col gap-6">
                    <div>
                        <div v-for="item in menu" :key="item">{{item}}</div>
                    </div>
                    

                </div>
            </div>

        </div>


</div>
</template>