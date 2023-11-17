<template>
    <ElMenu class="nav-bar" mode="vertical" :default-active="route.path" :default-openeds="navbar.opends" @open="onOpen"
        @close="onClose" :router="true" :collapse="false" background-color="transparent">
        <ElMenuItem index="/">首页</ElMenuItem>
        <ElSubMenu v-for="m in MENU" :index="m.index" :title="m.title">
            <template #title>
                <span>{{ m.title }}</span>
            </template>
            <ElMenuItem v-for="c in m.children" :index="c.index" :title="c.title">{{ c.title }}</ElMenuItem>
        </ElSubMenu>
    </ElMenu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useNavBarStore } from '../stores/NavBarStore';

const MENU = [
    {
        title: '机器管理',
        index: '/machine',
        children: [
            {
                title: '机器列表',
                index: '/machine/index',
            },
        ],
    },
    {
        title: '员工管理',
        index: '/employee',
        children: [
            {
                title: '员工列表',
                index: '/employee/index',
            },
        ],
    },
];

const navbar = useNavBarStore();
const route = useRoute();

const onOpen = (index: string) => {
    const i = navbar.opends.indexOf(index);
    if (i == -1 && index != '/') {
        navbar.opends.push(index);
    }
};
const onClose = (index: string) => {
    const i = navbar.opends.indexOf(index);
    if (i > -1 && index != '/') {
        navbar.opends.splice(i, 1);
    }
};
</script>

<style scoped lang="scss">
.nav-bar {
    display: flex;
    flex-direction: column;
    width: 10em;
    margin: 2em 0;
}
</style>