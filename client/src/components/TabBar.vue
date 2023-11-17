<template>
    <ElTabs v-model="current" class="tab-bar" type="border-card" @tab-remove="onRemove">
        <ElTabPane label="首页" name="/" :closable="false" class="tab-bar-tab"></ElTabPane>
        <ElTabPane v-for="tab in tabbar.items" :key="tab.fullPath" :label="tab.title" :name="tab.fullPath"
            :closable="tab.closable" class="tab-bar-tab">
        </ElTabPane>
    </ElTabs>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useTabBarStore } from '../stores/TabBarStore';
import { computed } from 'vue';
import { type TabPaneName } from 'element-plus';

const tabbar = useTabBarStore();
const route = useRoute();
const router = useRouter();

const current = computed({
    get: () => route.fullPath,
    set: (v) => router.push(v),
});

const onRemove = (name: TabPaneName) => {
    const i = tabbar.items.findIndex(t => t.fullPath == name);
    if (i > -1) {
        tabbar.items.splice(i, 1);
    }
};

</script>

<style scoped lang="scss">
.tab-bar {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 2em;
    margin: 1em 1em .4em 1em;
    padding: .4em;
    border: 1px solid #f4f4f4;
    border-radius: .4em;

    .tab-bar-tab {
        border: 1px solid #f4f4f4;
    }
}
</style>