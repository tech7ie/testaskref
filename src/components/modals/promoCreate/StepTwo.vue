<template>
    <form @submit="onSubmit">
        <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; flex-direction: column;">
                <label for="datecon" class="medium-text" style="margin-bottom: 12px;">
                    Срок действия промокода<a class="text-red">*</a>
                </label>
                <div id="datecon" class="date-inputs">
                    <div class="date-block">
                        <DateInput
                        id="datestart"
                        v-model="dateStart"
                        :fieldProps="dateStartFieldProps"
                        >
                            <label for="datestart" class="small-text text-dark-gray">Дата начала</label>
                        </DateInput>
                        <TimeInput v-model="timeStart" :fieldProps="timeStartFieldProps" style="margin-top: auto;" />
                    </div>
                    <div class="date-block">
                        <DateInput
                        id="dateend"
                        v-model="dateEnd"
                        :fieldProps="dateEndFieldProps"
                        >
                            <label for="datestart" class="small-text text-dark-gray">Дата окончания</label>
                        </DateInput>
                        <TimeInput v-model="timeEnd" :fieldProps="timeEndFieldProps" style="margin-top: auto;" />
                    </div>
                </div>
                <span class="zero-height-text-input small-text text-red">
                    {{ errors.dateStart || errors.dateEnd || errors.timeEnd || errors.timeStart }}
                </span>
            </div>
            <CheckBox label="Без даты конца" v-model="checkbox" :fieldProps="checkboxFieldProps" />
            <div class="separate-line"></div>
            <CInput
                label="Лимит"
                type="number"
                placeholder="Введите число"
                name="numberLimit"
                v-model="limit"
                :fieldProps="limitFieldProps"
                :error="errors.limit"
            >
                <label for="name-promo" class="medium-text">
                    Введите лимит активаций (шт.)<a class="text-red">*</a>
                </label>
            </CInput>
            <div>
                <label
                  for="promosets"
                  class="medium-text"
                >
                    Настроить получение промокода
                </label>
                <div id="promosets" style="margin-top: 12px;">
                    <RadioInput v-for="(obj, index) in choses"
                      :label="obj.label"
                      @click="radioSet(index)"
                      name="sends"
                      :checked="index === 0"
                    />
                </div>
            </div>
            <div class="flex w-full" style="gap: 12px">
                <Button
                  type="button"
                  @click="$emit('prev')"
                  text="Назад"
                />
                <Button
                  type="submit"
                  @click="handleSubmit"
                  text="Отправить"
                  :blue-style="true"
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import CInput from '../../CInput.vue';
import DateInput from '../../DateInput.vue';
import TimeInput from '../../TimeInput.vue';
import CheckBox from '../../CheckBox.vue';
import RadioInput from '../../RadioInput.vue';
import Button from '../../Button.vue';


const radioChose = ref<number>(0);

type IChoses = {
    label: string
}

const choses: IChoses[] = [
    {label: 'Создать промокод без отправки'},
    {label: 'Отправить промокод всем пользователям'}
]

const dateRule = yup.string().required('Время обязательно');

const schema = yup.object({
    limit: yup.number().required('Количество обязательно')
              .test('is-greater-than-zero', 'Стоимость должна быть больше 0', value => value! > 0),
    dateStart: dateRule,
    timeStart: dateRule,
    dateEnd: dateRule,
    timeEnd: dateRule,
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
    initialValues: {
        limit: 0,
        dateStart: '',
        timeStart: '',
        dateEnd: '',
        timeEnd: '',
        checkbox: false
    },
});

const [limit, limitFieldProps] = defineField('limit');
const [dateStart, dateStartFieldProps] = defineField('dateStart');
const [timeStart, timeStartFieldProps] = defineField('timeStart');
const [dateEnd, dateEndFieldProps] = defineField('dateEnd');
const [timeEnd, timeEndFieldProps] = defineField('timeEnd');
const [checkbox, checkboxFieldProps] = defineField('checkbox');



const radioSet = (n: number) => {
    radioChose.value = n;
}


const emit = defineEmits<{
    (e: 'next', value: any): void;
    (e: 'prev'): void;
}>();


const onSubmit = handleSubmit(values => {
    const sendAll = radioChose.value == 1;
    const responseObj = { ...values, sendAll};
    emit('next', responseObj)
});
</script>

<style scoped>
.date-inputs {
    display: flex;
}
.date-block{
    display: flex;
    gap: 4px;
}
.separate-line{
    width: 100%;
    height: 1px;
    background-color: var(--light-gray);
    border-radius: 1px;
}
</style>