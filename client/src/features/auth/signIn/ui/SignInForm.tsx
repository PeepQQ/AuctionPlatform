'use client';
import { InputField } from '@shared/ui/form';
import { useForm } from 'react-hook-form';
import styles from './signInForm.module.scss';
import { signInFormSchema, type SignInFormData } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/shared/ui/button/Button';
import { useSignInMutation } from '@/shared/api/user/user.api';

export const SignInForm = () => {
    const [signIn, { isLoading }] = useSignInMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema),
    });

    const onSubmit = (data: SignInFormData) => {
        signIn(data);
    };

    return (
        <form 
            className={styles.signInForm}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputField
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                register={register}
                error={errors.email?.message}
            />
            <InputField
                label="Password"
                name="password"
                autoComplete="current-password"
                type="password"
                register={register}
                error={errors.password?.message}
            />
            <Button type="submit">
                <span>Sign in</span>
            </Button>
        </form>
    )
}