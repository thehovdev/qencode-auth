'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { AuthResponse, SetNewPassword } from "@/interfaces";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import PageLabel from "@/components/PageLabel";
import { getDetails } from "@/utils";

export default function SetNew() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [data, setData] = useState<SetNewPassword>({
        password: '',
        password_confirm: '',
    })
    const updateData = (value: string, code: string): void => {
        setData({...data, [code]: value})
    }
    const hasError = async (): Promise<string|null> => {
        let msg = null

        if(data.password.trim().length < 8) {
            msg = 'Password must be at least 8 characters'
        }

        if(data.password.trim() !== data.password_confirm.trim()) {
            msg = 'Passwords do not match'
        }

        if(!searchParams.get('token') && !searchParams.get('secret')) {
            msg = 'Invalid token or secret'
        }

        return msg
    }
    const setNew = async () => {
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

        const res = await fetch('https://auth-qa.qencode.com/v1/auth/password-set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                token: searchParams.get('token'),
                secret: searchParams.get('secret')
            })
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
        }


    }
    return (
        <div className="flex flex-col w-full">
            <PageLabel label="Create new Password" />

            <div className="gap-[25px] flex flex-col">
                <Input
                    code="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    input={(value: string, code: string) => updateData(value, code)}
                />

                <Input
                    code="password_confirm"
                    type="password"
                    placeholder="Password"
                    label="Confirm Password"
                    input={(value: string, code: string) => updateData(value, code)}
                />
            </div>



            <div className="mb-4 mt-5">
                <Button
                    title="Reset Password"
                    click={setNew}
                />
            </div>

            <Button
                bg="bg-white"
                textColor="#060E1E"
                border={"border-[1.5px] border-[#D3D8DC]"}
                title="Cancel"
                click={() => router.push('/')}
            />
        </div>
    )
}