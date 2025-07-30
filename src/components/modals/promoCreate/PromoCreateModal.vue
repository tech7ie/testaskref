<template>
    <Modal
      :show-modal="props.showModal"
      @close="close"
    >
        <div class="promo-modal-container">
            <div class="promo-modal-head">
                <h1>Создание промокода</h1>
                <div class="steps">
                <Step
                  v-for="(obj, index) in steps"
                  :key="index"
                  :active="index === step"
                  style="flex: 1"
                >
                    {{ obj['title'] }}
                </Step>
                </div>
            </div>
            <component
              :is="steps[step]['component']"
              @next="nextStep"
              @prev="prevStep"
            />

        </div>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../../Modal.vue';
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';
import Step from './Step.vue';


const step = ref<number>(0);
const data = ref<{}>({});

type ISteps = {
  component: typeof StepOne,
  title: string
}

const steps: ISteps[] = [
  {
    'component': StepOne,
    'title': 'Шаг 1: Основное'
  },
  {
    'component': StepTwo,
    'title': 'Шаг 2: Настройка'
  },
];

const props = defineProps<{
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};


const prevStep = () => {
    if (step.value === 0) {
        close();
    } else step.value--;
};

const nextStep = (values: any) => {
    data.value = {...values, ...data.value}
    if (step.value === steps.length - 1) {
        alert(JSON.stringify(data.value))
    } else step.value++;
};
</script>

<style scoped>
.promo-modal-container{
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.promo-modal-head{
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.steps{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    gap: 10px;
}

</style>
