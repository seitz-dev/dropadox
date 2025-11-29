<template>
    <div class="bg-neutral-200 p-4 rounded-xl hover:bg-neutral-300 transition-colors duration-200 cursor-pointer"
        :key="fileId">
        <div class="flex justify-between">
            <div class="flex gap-4 items-center font-bold">
                <File></File>
                {{ props.fileName }}
            </div>

            <div class="flex gap-4">

                <NuxtLink :to="`/view/${props.fileId}`">
                    <div class="ml-auto text-sm text-neutral-500">
                        <View />
                    </div>
                </NuxtLink>

                <button @click="download">
                    <Download />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { File, View, Download } from 'lucide-vue-next';

const props = defineProps<{ fileId: number; fileName: string }>();

async function download() {
    try {
        const res = await fetch(`/api/download/${props.fileId}`, {
            method: "GET"
        });

        if (!res.ok) {
            console.error("Download failed:", res.status);
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = props.fileName || "download";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Download error:", err);
    }
}



</script>
