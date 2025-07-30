<template>
    <form @submit="onSubmit">
      <div style="display: flex; flex-direction: column; gap: 16px;">
            <CInput
                id="name-promo"
                type="text"
                placeholder="Введите название"
                name="name"
                v-model="name"
                :fieldProps="nameFieldProps"
                :error="errors.name"
            >
                <label for="name-promo" class="medium-text">
                    Название промокода<a class="text-red">*</a>
                </label>
            </CInput>

            <CInput
                type="text"
                placeholder="Введите заголовок"
                name="title"
                v-model="title"
                :fieldProps="titleFieldProps"
                :error="errors.title"
            >
                <label for="name-promo" class="medium-text">
                    Заголовок<a class="text-red">*</a>
                </label>
            </CInput>

            <CInput
                type="textarea"
                placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
                name="description"
                v-model="description"
                :fieldProps="descriptionFieldProps"
                :error="errors.description"
            >
                <label for="name-promo" class="medium-text">
                    Сопроводительный текст
                </label>
            </CInput>

            <CInput
                type="number"
                :icon="CoinSvg"
                placeholder="Введите стоимость"
                name="price"
                v-model="price"
                :fieldProps="priceFieldProps"
                :error="errors.price"
            >
                <label for="name-promo" class="medium-text">
                    Укажи количество баллов<a class="text-red">*</a>
                </label>
            </CInput>
            <div class="flex w-full" style="gap: 12px">
                <Button
                  type="button"
                  @click="$emit('prev')"
                  text="Отмена"
                />
                <Button
                  type="submit"
                  @click="handleSubmit"
                  text="Далее"
                  :blue-style="true"
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import CInput from '../../CInput.vue';
import CoinSvg from '../../../assets/refCoin.svg';
import Button from '../../Button.vue';



const schema = yup.object({
    name: yup.string().required('Название обязательно'),
    title: yup.string().required('Заголовок обязателен'),
    description: yup.string().required('Описание обязательно')
                .max(255, "Достигнут лимит по символам"),
    price: yup.number()
          .typeError('Стоимость должна быть числом')
          .test('is-greater-than-zero', 'Стоимость должна быть больше 0', value => value! > 0),
});

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    title: '',
    description: '',
    price: 0,
  },
});

const [name, nameFieldProps] = defineField('name');
const [title, titleFieldProps] = defineField('title');
const [description, descriptionFieldProps] = defineField('description');
const [price, priceFieldProps] = defineField('price');


const emit = defineEmits<{
    (e: 'next', value: any): void;
    (e: 'prev'): void;
}>();


const onSubmit = handleSubmit(values => {
    emit('next', values)
});
</script>

<style scoped>

</style>