<template>
    <div style="display: flex; flex-direction: column; gap: 6px;">
        <slot></slot>
        <input
          class="date-input"
          type="date"
          v-bind="props.fieldProps"
          v-model="internalModelValue"
          @input="onInput"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
    fieldProps: Record<string, any>;
    modelValue: string;
}>();

const internalModelValue = ref<string>(props.modelValue);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>

<style scoped> 
.date-input{
    background-color: var(--light-gray);
    border: none;
    border-radius: 12px;
    padding: 6px 8px;
    outline: none;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    appearance: none;
}
</style>