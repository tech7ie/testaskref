<template>
    <div class="step-container">
        <span :class="['step', 'semibold-text', { 'step-active': props.active }]">
            <slot></slot>
        </span>
        <div class="step-line"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    active: boolean
}>();

</script>

<style scoped>
.step-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.steps {
  display: flex;
  gap: 10px;
}
.step {
  transition: color 0.8s ease;
  color: var(--dark-gray);
}
.step-active {
  color: #107FD1;
}

.step-line{
    min-height: 2px;
    max-height: 2px;
    border-radius: 2px;
    width: 100%;
    background-color: var(--light-gray);
}
.step-active + .step-line {
    background-color: var(--light-blue);
}
</style>
