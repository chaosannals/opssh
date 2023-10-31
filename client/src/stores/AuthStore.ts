import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const able = ref(false);
    const token = ref("");
    const server = reactive({
        scheme: 'http',
        host: "127.0.0.1",
        port: "3000",
    });
    return {
        able,
        token,
        server,
    };
}, {
    persist: true,
});