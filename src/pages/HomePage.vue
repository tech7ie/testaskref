<template>
    <div class="home-container">
        <button @click="showModal = !showModal">открыть модалку</button>
    </div>
    <PromoCreateModal :show-modal="showModal" @close="showModal = !showModal"/>
</template>

<script setup lang="ts">
import PromoCreateModal from '../components/modals/promoCreate/PromoCreateModal.vue';
import { ref } from 'vue';


const showModal = ref<boolean>(false);
</script>

<style scoped>
.home-container{
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
