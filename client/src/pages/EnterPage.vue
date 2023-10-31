<template>
    <div class="enter-page">
        <form>
            <div class="enter-input">
                <label>协议</label>
                <input v-model="data.scheme"/>
            </div>
            <div class="enter-input">
                <label>域名</label>
                <input v-model="data.host"/>
            </div>
            <div class="enter-input">
                <label>端口</label>
                <input v-model="data.port"/>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const data = reactive({
    scheme: 'http',
    host: "127.0.0.1",
    port: "3000",
});



</script>

<style scoped lang="scss">
.enter-page {
    position: relative;
}
</style>