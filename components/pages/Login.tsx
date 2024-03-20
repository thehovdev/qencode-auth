'use client'

import SocialButtons from "@/components/SocialButtons";
import {AuthResponse, LoginState, Social} from "@/interfaces";
import Divider from "@/components/Divider";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {useState} from "react";
import {getDetails, isCorrectEmail} from "@/utils";
import { setCookie } from 'cookies-next'
import Swal from 'sweetalert2'
import Link from "next/link";
import PageLabel from "@/components/PageLabel";
import SignupHint from "@/components/SignupHint";


export default function Login() {
    const socials: Social[] = [
        { title: "Google", icon: "/google.svg", link: 'https://accounts.google.com/Login' },
        { title: "Github",  icon: "/github.svg", link: 'https://github.com/login' }
    ]
    const [data, setData] = useState<LoginState>({
        email: '',
        password: ''
    })
    const updateData = (value: string, code: string): void => {
        setData({...data, [code]: value})
    }
    const hasError = async (): Promise<string|null> => {
        let msg = null
        if(!data.email.trim() || !data.password.trim()) {
            msg = 'Please fill in all fields'
        }

        if(data.password.trim().length < 8) {
            msg = 'Password must be at least 8 characters'
        }

        if(!isCorrectEmail(data.email)) {
            msg = 'Please enter a valid email'
        }

        return msg
    }

    const login = async (): Promise<void> => {
        const validationHasError = await hasError()
        if(validationHasError) {
            await Swal.fire({
                title: 'Error!',
                text: validationHasError,
                icon: 'error',
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#316FEA'
            })
            return
        }
        const res = await fetch('https://auth-qa.qencode.com/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response: AuthResponse = await res.json()
        if (!res.ok) {
            let errors: string = getDetails(response)

            await Swal.fire({
                title: 'Error!',
                text: errors,
                icon: 'error',
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#316FEA'
            })

        } else {
            await Swal.fire({
                title: 'Success!',
                text: response.detail,
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#316FEA'
            })
            setCookie(
                'auth.access_token',
               response.access_token,
                {
                    path: '/',
                    maxAge: response.token_expire,
                    secure: true
                }
            )
            setCookie(
                'auth.refresh_token',
                response.refresh_token,
                {
                    path: '/',
                    maxAge: response.refresh_token_expire,
                    secure: true
                }
            )
        }
    }

    return (
        <div className="flex flex-col w-full h-full">
            <PageLabel label="Log in to your account" />
            <SocialButtons socials={socials} />
            <Divider wordInCentre={'OR'} />
            <div className="flex flex-col gap-[25px]">
                <Input
                    value={data.email}
                    code="email"
                    type="text"
                    placeholder="Email"
                    input={(value: string, code: string) => updateData(value, code)}
                />
                <Input
                    value={data.password}
                    code="password"
                    type="password"
                    placeholder="Password"
                    input={(value: string, code: string) => updateData(value, code)}
                />
            </div>
            <Link href="/forgot" className="text-sm font-medium mt-[15px] mb-[30px] leading-5 flex justify-end w-full text-brand">
                Forgot your password?
            </Link>
            <Button
                title={"Log in to Qencode"}
                click={login}
            />
            <SignupHint />
        </div>
    );
}