<template>
    <div class="login-page">
        <div class="login-header">

        </div>
        <div class="login-content">
            <form class="login-form" @submit.prevent="onSubmit">
                <div class="login-input">
                    <label>用户</label>
                    <input v-model="data.username" />
                </div>
                <div class="login-input">
                    <label>密码</label>
                    <input v-model="data.password" />
                </div>
                <div class="login-input">
                    <label>验证码</label>
                    <input v-model="data.captcha" />
                    <img alt="captcha" :src="captchaSrc" @click="onClickCaptcha" />
                </div>
                <div class="login-row">
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { apiPost } from '../utils/http';

const data = reactive({
    username: "admin",
    password: "123456",
    captcha: "",
    captchaAt: new Date().getTime(),
});

const auth = useAuthStore();

const onSubmit = async () => {
    const response = await apiPost<any>('/auth/login', data);
    auth.token = response.data.access_token as string;
};

const onClickCaptcha = () => {
    data.captchaAt = new Date().getTime();
};

const captchaSrc = computed(() => {
    return `${auth.server.scheme}://${auth.server.host}:${auth.server.port}/auth/captcha?t=${data.captchaAt}`;
});
</script>

<style scoped lang="scss">
.login-page {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 100%;
    height: 100%;

    .login-header {
        height: 10em;
    }

    .login-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        padding: .4em;

    }

    .login-input {
        margin: .4em 0;
        padding: .4em;
        border: 1px solid #eee;
        border-radius: .4em;

        &>label {
            display: inline-block;
            min-width: 4em;
            text-indent: .4em;
        }

        &>input {
            flex-grow: 1;
            border: none;
            outline: none;
        }

        &>img {
            margin: -0.4em 0;
            height: 2em;
        }
    }

    .login-row {
        display: flex;

        &>button {
            flex-grow: 1;
            padding: .4em;
            border: none;
            border-radius: .4em;
            color: white;
            background-color: #49f;
        }
    }
}
</style>