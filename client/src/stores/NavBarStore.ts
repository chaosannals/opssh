import { defineStore } from "pinia";
import { reactive } from "vue";

export const useNavBarStore = defineStore('navbar', () => {
    const opends: string[] = reactive([]);

    return {
        opends,
    };
}, {
    persist: true,
});