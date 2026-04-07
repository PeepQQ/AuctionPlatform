import * as yup from 'yup';

export const signInFormSchema = yup.object({
    email: yup.string().required('form.signIn.emailRequired').email('form.signIn.email'),
    password: yup.string().required('form.signIn.passwordRequired').min(8, 'form.signIn.passwordMinLength'),
});

export type SignInFormData = yup.InferType<typeof signInFormSchema>;