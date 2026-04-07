import * as yup from 'yup';

export const signUpFormSchema = yup.object({
    name: yup.string().required('form.signIn.nameRequired'),
    email: yup.string().required('form.signIn.emailRequired').email('form.signIn.email'),
    password: yup.string().required('form.signIn.passwordRequired').min(8, 'form.signIn.passwordMinLength'),
});

export type SignUpFormData = yup.InferType<typeof signUpFormSchema>;