<template>
    <div class="enter-page">
        <form class="enter-form" @submit.prevent="onSubmit">
            <div class="enter-input">
                <label>协议</label>
                <input v-model="data.scheme" />
            </div>
            <div class="enter-input">
                <label>域名</label>
                <input v-model="data.host" />
            </div>
            <div class="enter-input">
                <label>端口</label>
                <input v-model="data.port" />
            </div>
            <div class="enter-row">
                <button type="submit">连接</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { apiTouch } from '../utils/http';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

const data = reactive({
    scheme: 'http',
    host: "127.0.0.1",
    port: "3000",
});

const onSubmit = async () => {
    console.log('touch');
    if (await apiTouch({
        scheme: data.scheme,
        host: data.host,
        port: parseInt(data.port),
    })) {
        console.log('touch', 'ok');
        auth.able = true;
        auth.server = data;
        router.push('/login');
    }
};

</script>

<style scoped lang="scss">
.enter-page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .enter-form {
        display: flex;
        flex-direction: column;
        width: 14em;
        padding: 1em;
    }

    .enter-input {
        display: flex;
        align-items: center;
        margin: .4em 0;
        padding: .4em;
        border: 1px solid #eee;
        border-radius: .4em;

        &>label {
            min-width: 4em;
        }

        &>input {
            outline: none;
            border: none;
        }
    }

    .enter-row {
        display: flex;
        align-items: center;

        &>button {
            flex-grow: 1;
            padding: .4em;
            border: none;
            border-radius: .4em;
            color: white;
            background: #49f;
        }
    }
}
</style>