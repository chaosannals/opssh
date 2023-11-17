<template>
    <div class="side-bar">
        <div class="side-bar-top">
            <div class="icon">
                <img alt="avatar" src="../assets/icons/avatar.svg"/>
            </div>
        </div>
        <div class="side-bar-menu">

        </div>
        <div class="side-bar-bottom">
            <div class="icon" @click="onClickLogout">
                <img alt="logout" src="../assets/icons/shutdown.svg"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDialogStore } from '../stores/DialogStore';


const dialog = useDialogStore();

const onClickLogout = () => {
    dialog.logout.visible = true;
};
</script>

<style scoped lang="scss">
.side-bar {
    --icon-size: 3.4em;

    display: flex;
    flex-direction: column;
    width: 5.4em;

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--icon-size);
        height: var(--icon-size);
        user-select: none;

        &>img {
            width: 80%;
        }
    }

    .side-bar-top {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-shrink: 1;
        margin-top: 2em;

        .icon {
            border-radius: 50%;
            background-color: #f4f4f444;
        }
    }

    .side-bar-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;
    }

    .side-bar-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-shrink: 1;
        margin-bottom: 2em;

        .icon {
            border-radius: 50%;
            background-color: #f4f4f444;
            transition: .4s linear;

            &:hover {
                background-color: #f4f4f4ff;
            }
        }
    }
}
</style>