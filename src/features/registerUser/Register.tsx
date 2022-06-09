import React, {useCallback, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/cjs/Button';
import {LinkContainer} from 'react-router-bootstrap';
import {
    register as registerUser,
    registerClear,
    selectRegisterErrorMessage,
    selectRegisterState
} from './registerSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectIsUserAuthenticated} from "../currentUser/currentUserSlice";
import {useNavigate} from "react-router";
import {url} from "../../app/urls";
import {SubmitHandler, useForm} from 'react-hook-form';
import * as yup from 'yup';
import './Register.sass';
import {AnySchema} from "yup/lib/schema";

type Inputs = {
    login: string,
    realName: string,
    location: string,
    eMail: string,
    password: string,
    password2: string
};

type Shape<Type> = { // TODO dig it
    [Property in keyof Type]: AnySchema;
};

type YupObjectSchema = ReturnType<typeof yup.object>;

const useYupValidationResolver = (validationSchema: YupObjectSchema) => // TODO dig it
    useCallback(
        async (data: any) => { // TODO is 'any' ok here ?
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false
                });

                return {
                    values,
                    errors: {}
                };
            } catch (errors: any) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: any) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type || "validation",
                                message: currentError.message
                            }
                        }),
                        {}
                    )
                };
            }
        },
        [validationSchema]
    );

const RegisterSchema = yup.object().shape<Shape<Inputs>>({
    login: yup.string().max(32).required(),
    realName: yup.string().max(50).required(),
    location: yup.string().max(100),
    eMail: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    password2: yup.string().min(6).max(20).required().oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function Register() {
    const registering = useAppSelector(selectRegisterState);
    const errorMessage = useAppSelector(selectRegisterErrorMessage);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsUserAuthenticated);
    const password = useRef({});
    const password2 = useRef({});

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        trigger
    } = useForm<Inputs>({
        resolver: useYupValidationResolver(RegisterSchema),
        mode: 'onChange',
        shouldUnregister: true,
        defaultValues: {
            login: '',
            realName: '',
            location: '',
            eMail: '',
            password: '',
            password2: ''
        }
    });

    const onSubmit: SubmitHandler<Inputs> = ({login: name, realName, location, eMail, password}) => {
        dispatch(registerUser({name, realName, location, eMail, password}))
    };

    password.current = watch("password", "");
    password2.current = watch("password2", "");

    useEffect(() => {
        dispatch(registerClear());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('cannot register authenticated user, please sign-out first');
            setTimeout(() => {
                navigate(url.FORUM);
            }, 0);
        }
    }, [isAuthenticated]);

    // TODO focus on the first form field at initial render
    // TODO passwords match validation

    /*
        useEffect(() => {
            trigger(['password', 'password2']);
        }, [password, password2, trigger]);
    */

    const formDone = (
        <h5 className='center bold'>
            Congratulations ! You've been successfully registered!<br/>
            Now you can <LinkContainer to={url.SIGN_IN}><a>sign-in</a></LinkContainer>
        </h5>
    );

    const showError = (field: keyof Inputs, message?: string) => {
        if (!!errors[field]) { // TODO remove @ts-ignore
            // @ts-ignore
            return <div className='error-message margin1 pad025'>{errors[field].message}</div>
        } else {
            return message ? <Form.Text className="text-muted">{message}</Form.Text> : ''
        }
    };

    const formRegister = (
        <div className='register form-width-50'>
            <h6 className='register__header center border-1-top border-1-left border-1-right border-1-bottom pad05 border-top-round-025'>
                Sign-up
            </h6>
            <Form className='border-1-right border-1-left border-1-bottom border-bottom-round-025 pad-1'
                  onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formLogin">
                    <Form.Label className='bold'>Login</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('login')}
                    />
                    {showError('login', 'only characters and numbers')}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label className='bold'>First name</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('realName')}
                    />
                    {showError('realName')}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label className='bold'>E-mail</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('eMail')}
                    />
                    {showError('eMail')}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label className='bold'>Location</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('location')}
                    />
                    {showError('location')}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className='bold'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        {...register('password')}
                    />
                    {showError('password', 'Your password must be 8-20 characters long, contain letters and numbers, and\n' +
                        '                        must not contain spaces, special characters, or emoji.')}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword2">
                    <Form.Label className='bold'>Repeat password</Form.Label>
                    <Form.Control
                        type="password"
                        aria-describedby="passwordHelpBlock"
                        {...register('password2')}
                    />
                    {showError('password2')}
                </Form.Group>

                {
                    registering === 'error' ? (
                        <div className='error-message margin1 border-round-025 pad025 center'>{errorMessage}</div>
                    ) : ''
                }

                <Button {...((registering === 'pending' || Object.keys(errors).length > 0) ? {disabled: true} : {})}
                        variant="primary" type='submit'
                >
                    Submit
                </Button>
            </Form>
        </div>
    );

    return registering === 'done' ? formDone : formRegister;
}