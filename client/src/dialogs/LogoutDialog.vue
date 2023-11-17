<template>
    <ElDialog v-model="dialog.logout.visible" title="退出登录" width="14em" destroy-on-close center>
        <span>是否退出登录？</span>
        <template #footer>
            <div class="dialog-footer">
                <ElButton type="danger" @click="onClickConfirm">退出</ElButton>
            </div>
        </template>
    </ElDialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDialogStore } from '../stores/DialogStore';
import { useAuthStore } from '../stores/AuthStore';

const dialog = useDialogStore();
const auth = useAuthStore();
const router = useRouter();

const onClickConfirm = () => {
    dialog.logout.visible = false;
    auth.token = "";
    auth.permissions = [];
    router.push('/login');
}

</script>

<style scoped lang="scss">
.dialog-footer {
    display: flex;
    flex-direction: row-reverse;
}
</style>