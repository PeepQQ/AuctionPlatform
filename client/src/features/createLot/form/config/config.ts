import * as yup from 'yup';
import styles from '../styles/createLotForm.module.scss';
import type { selectOption } from '@/shared/ui/form';

export const createLotFormSchema = yup.object({
    name: yup.string().required('Название является обязательным'),
    pictures: yup
        .array()
        .min(1, "Добавьте хотя бы одно изображение")
        .typeError("Добавьте хотя бы одно изображение")
        .of(
            yup
                .mixed()
                .test('is-file', 'Нужен файл', (v) => v instanceof File)
                .test('image', 'Только изображения', (v) => v instanceof File && v.type.startsWith('image/'))
                .test('size', 'Файл слишком большой', (v) => v instanceof File && v.size <= 5 * 1024 * 1024),
    ),
    price: yup.number()
        .transform((_, orig) => (orig === '' || orig == null ? undefined : Number(orig)))
        .typeError('Введите число')
        .required('Цена обязательна'),
    description: yup.string().required('Описание является обязательным'),
    startAt: yup.date()
                .typeError("Заполните дату начала торгов")
                .required("Заполните дату начала торгов")
                .test(
                    'is-in-the-future',
                    'Дата должна быть в будущем',
                    (value) => {
                        if(!value) return false;

                        return value > new Date();
                    }
                ),
    endAt: yup.date()
                .typeError("Заполните дату окончания торгов")
                .required("Заполните дату окончания торгов")
                .test(
                    "is-after-now-plus-1h",
                    "Минимальная длительность после даты начала торгов - 1 минута",
                    function (value) {
                        const { startAt }: {startAt: Date} = this.parent;
                        if (!value || !startAt) return false;

                        const minDate = new Date(startAt);
                        minDate.setMinutes(startAt.getMinutes() + 1);
                        
                        return value >= minDate;
                    }
                )
});

export type CreateLotFormValues = yup.InferType<typeof createLotFormSchema>;

export type CreateLotFieldConfig = {
  name: keyof CreateLotFormValues;
  label: string;
  type?: string;
  field?: 'input' | 'textarea';
  placeholder?: string;
  onlyNum?: boolean;
  className?: string;
};

export const headFields: CreateLotFieldConfig[] = [
    {
        name: 'name',
        label: 'Название',
        type: 'text',
        field: 'input',
        placeholder: 'Введите название',
        className: styles.createLotFormInput,
    },
    {
        name: 'price',
        label: 'Цена',
        type: 'text',
        field: 'input',
        placeholder: 'Введите цену',
        onlyNum: true,
        className: styles.createLotFormInput,
    },
    {
        name: 'startAt',
        label: 'Начало торгов',
        field: 'input',
        type: 'datetime-local',
        className: styles.createLotFormInput
    },
    {
        name: 'endAt',
        label: 'Окончание торгов',
        field: 'input',
        type: 'datetime-local',
        className: styles.createLotFormInput,
    },
    {
        name: 'description',
        label: 'Описание',
        field: 'textarea',
        placeholder: 'Введите описание',
        className: styles.createLotFormTextarea,
    }
]