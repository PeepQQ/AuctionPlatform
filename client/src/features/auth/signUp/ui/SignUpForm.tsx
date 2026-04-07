'use client';
import { InputField } from '@shared/ui/form';
import { useForm } from 'react-hook-form';
import styles from './signUpForm.module.scss';
import { signUpFormSchema, type SignUpFormData } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/shared/ui/button/Button';
import { useSignUpMutation } from '@/shared/api/user/user.api';

export const SignUpForm = () => {
    const [signUp, { isLoading }] = useSignUpMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: yupResolver(signUpFormSchema),
    });

    const onSubmit = (data: SignUpFormData) => {
        signUp(data);
    };
    
    return (
        <form 
            className={styles.signUpForm}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputField
                label="Name"
                name="name"
                register={register}
                error={errors.name?.message}
            />
            <InputField
                label="Email"
                name="email"
                register={register}
                error={errors.email?.message}
            />
            <InputField
                label="Password"
                name="password"
                register={register}
                error={errors.password?.message}
            />
            <Button type="submit">
                <span>Sign in</span>
            </Button>
        </form>
    )
}