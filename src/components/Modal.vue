<template>
    <div v-show="props.showModal" class="modal-overlay">
        <div class="modal-content">
            <img :src="CloseSvg" @click="close" class="close-button" />
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import CloseSvg from '../assets/close.svg'


const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 16px;
  position: relative;
  width: 50vw;
  max-width: 450px;
}
@media (max-width: 670px) {
    .modal-content {
        width: 80vw;
    }
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.close-button:hover{
  filter: brightness(1.05);
}
</style>
