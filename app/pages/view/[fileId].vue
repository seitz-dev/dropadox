<template>
    <div class="h-full">
        <div class="flex h-full grow bg-zinc-100">
            <DashboardSidebar>
                <div class="p-4 bg-white rounded-lg shadow-md">
                    <h1 class="text-2xl font-bold mb-4">File Details</h1>
                    <p>File ID: {{ upload.id }}</p>
                    <p>File Name: {{ upload.filePath }}</p>
                    <p>Uploaded At: {{ new Date(upload.createdAt).toLocaleString() }}</
                    <p></p>
                </div>
            </DashboardSidebar>
        </div>
    </div>
</template>

<script setup lang="ts">
const { fileId } = useRoute().params;
const token = useCookie("token").value;
const fileUpload = await $fetch.raw(`/api/files/get/${fileId}`, {
    method: "post",
    body: {
        token: token
    },
});

if(!fileUpload){
    await navigateTo("/dashboard");
}

const upload = (fileUpload._data as any).upload;

</script>