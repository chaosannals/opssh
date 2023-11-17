<template>
    <div class="embed-route-layout">
        <SideBar></SideBar>
        <div class="embed-route-main">
            <NavBar></NavBar>
            <div class="embed-route-sheet">
                <TabBar></TabBar>
                <div class="embed-route-content">
                    <RouterView v-slot="{ Component }">
                        <KeepAlive>
                            <component :is="Component" />
                        </KeepAlive>
                    </RouterView>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
.embed-route-layout {
    --radius: .8em;
    --content-radius: calc(var(--radius) * 2);

    display: flex;
    justify-content: stretch;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #2C2C2C;

    .embed-route-main {
        display: flex;
        justify-content: stretch;
        overflow: hidden;
        flex-grow: 1;
        margin: var(--radius) var(--radius) var(--radius) 0;
        border-radius: var(--radius);
        background-color: #EBEBEB;
    }

    .embed-route-sheet {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex-grow: 1;
        border-radius: var(--content-radius) 0 0 var(--content-radius);
        background-color: #FFFFFF;
    }

    .embed-route-content {
        flex-grow: 1;
        margin: 0 1em;
        overflow: hidden;
    }
}
</style>