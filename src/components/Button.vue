<template>
    <button :class="['main-button', 'semibold-text', props.blueStyle ? 'blue-colored' : 'gray-colored']">
        {{ props.text }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string;
    blueStyle?: boolean
}>();
</script>

<style scoped>
.main-button {
    width: 100%;
    gap: 4px;
    border: none;
    padding: 14px 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
}

.blue-colored {
    color: white;
    background-color: var(--dark-blue);
}

.gray-colored {
    color: var(--dark-gray);
    background-color: var(--light-gray);
}

.main-button:hover {
    transform: scale(1.005);
}

.main-button:active {
    filter: brightness(0.95);
    transform: scale(0.985);
}

</style>
