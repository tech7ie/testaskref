<template>
    <div style="display: flex; align-items: center;">
        <input type="checkbox" :id="props.label"/>
        <label :for="props.label" class="medium-text">{{ props.label }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string
}>();
</script>
