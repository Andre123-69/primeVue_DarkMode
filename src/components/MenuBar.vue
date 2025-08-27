<template>
    <div class="card sidebar" v-motion-fade-visible-once>
        <Menubar :model="items">
            <template #start>
                <img src="@/assets/img/logo-awa.png" alt="Logo" class="h-8">
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <router-link v-if="item.to" :to="item.to" v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="p-1 ml-auto text-xs border rounded border-surface bg-emphasis text-muted-color">{{
                        item.shortcut }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </router-link>
                <a v-else v-ripple class="flex items-center" v-bind="props.action">
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="p-1 ml-auto text-xs border rounded border-surface bg-emphasis text-muted-color">{{
                        item.shortcut }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <ThemeSwitcher />
                    <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                </div>
            </template>
        </Menubar>
    </div>

</template>
<script setup>
import { ref } from "vue";
import ThemeSwitcher from './ThemeSwitcher.vue';

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/Home'
    },
    {
        label: 'Portal',
        icon: 'pi pi-home',
        to: '/Portal'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',

        badge: 2,
        items: [
            {
                label: 'Productos',
                icon: 'pi pi-bolt',
                to: '/productos',
            },
            {
                label: 'Debe-Pagos',
                icon: 'pi pi-dollar',
                to: '/debe-pagos',
            },
            
        ]
    }
]);

</script>

<style scoped></style>