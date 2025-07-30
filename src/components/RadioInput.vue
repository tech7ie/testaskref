<template>
    <div style="display: flex; align-items: center; gap: 5px;">
        <input
          style="margin: 0;"
          :id="props.label"
          :name="props.name"
          :checked="checked"
          type="radio"
        />
        <label :for="props.label" class="medium-text">{{ props.label }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string;
    checked?: boolean;
    label: string
}>();
</script>
