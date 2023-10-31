<template>
    <div class="login-page">
        <div class="login-header">

        </div>
        <div class="login-content">
            <form class="login-form" @submit="onSubmit">
                <div class="login-input">
                    <label>用户</label>
                    <input v-model="data.username" />
                </div>
                <div class="login-input">
                    <label>密码</label>
                    <input v-model="data.password" />
                </div>
                <div class="login-row">
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '../stores/AuthStore';
import { apiPost } from '../utils/http';

const data = reactive({
    username: "admin",
    password: "admin",
});

const auth = useAuthStore();

const onSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await apiPost<any>('/auth/login', data);
    auth.token = response.data.access_token as string;
};
</script>

<style scoped lang="scss"></style>