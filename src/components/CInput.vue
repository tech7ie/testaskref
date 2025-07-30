<template>
  <div class="input-container">
        <slot></slot>
        <div style="margin-top: 2px;">
            <img v-if="props.icon"
              :src="props.icon"
              style="position: absolute; z-index: 99;
                transform: translate(50%, 50%);"
            />
            <component :is="props.type === 'textarea' ? 'textarea' : 'input'"
              :class="['main-input medium-text',
                {'input-errored': props.error,'icon-padding': props.icon}]"
              :type="props.type"
              :id="props.name"
              v-model="internalModelValue"
              v-bind="props.fieldProps"
              @input="onInput"
              :placeholder="props.placeholder"
            ></component>

        </div>
        <span v-if="props.type === 'textarea'"
          :class="['small-text error-text-input zero-height-text-input',
           isCountOver ? 'text-red' : 'text-dark-gray' ]"
          style="margin-left: auto;"
        >
            {{ countSymbols }}/255
        </span>
        <span class="zero-height-text-input small-text text-red">
            {{ props.error }}
        </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';


const countSymbols = ref<number>(0);

const isCountOver = computed(() => {
  return countSymbols.value > 255;
})

const props = defineProps<{
    icon?: string,
    type: string,
    placeholder: string;
    name: string;
    modelValue: string|number;
    fieldProps: Record<string, any>;
    error: string|undefined;
}>();

const internalModelValue = ref<string|number>(props.modelValue);

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    countSymbols.value = target.value.length;
    emit('update:modelValue', target.value);
}
</script>

<style scoped>
.input-container{
    display: flex;
    flex-direction: column;
}

.main-input {
    resize: none;
    width: 100%;
    padding: 14px 16px;
    border: none;
    border-radius: 12px;
    transition: filter 0.3s ease, transform 0.1s ease;
    background-color: var(--light-gray);
    color: var(--dark-gray);
    box-sizing: border-box;
}
.icon-padding{
    padding: 14px 16px 14px 42px;
}
.input-errored{
  border: 1px solid;
  border-color: var(--light-red);
}

.main-input:focus,
.main-input:active {
    filter: brightness(0.970);
    outline: none;
}

/* минус стрелочки */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}
</style>
