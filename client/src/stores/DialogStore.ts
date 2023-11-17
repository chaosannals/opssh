import { defineStore } from "pinia";
import { reactive } from "vue";

export const useDialogStore = defineStore('dialog', () => {
    const logout = reactive({
        visible: false,
    });

    return {
        logout,
    };
}, {
    persist: true,
});
