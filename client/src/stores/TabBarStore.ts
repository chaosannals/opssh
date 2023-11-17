import { defineStore } from "pinia";
import { reactive } from "vue";

export const useTabBarStore = defineStore('tabbar', () => {
    const items: any[] = reactive([]);

    return {
        items,
    };
}, {
    persist: true,
});