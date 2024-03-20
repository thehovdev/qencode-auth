'use client'

import Input from "@/components/Input";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import { AuthResponse, ForgotState } from "@/interfaces";
import { getDetails, isCorrectEmail } from "@/utils";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import PageLabel from "@/components/PageLabel";

export default function Forgot() {
    const router = useRouter()
    const [data, setData] = useState<ForgotState>({
        email: '',
        redirect_url: 'https://auth-qa.qencode.com/password-set'
    })
    const updateData = (value: string, code: string): void => {
        setData({...data, [code]: value})
    }
    const hasError = async (): Promise<string|null> => {
        let msg = null

        if(!data.email.trim() || !isCorrectEmail(data.email)) {
            msg = 'Please enter a valid email'
        }

        return msg
    }
    const forgot = async (): Promise<void> => {
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

        const res = await fetch('https://auth-qa.qencode.com/v1/auth/password-reset', {
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
        }
    }
    return (
        <div className="flex flex-col w-full">
            <PageLabel label="Forgot Password?" />
            <Input
                code="email"
                type="text"
                placeholder="Email"
                input={(value: string, code: string) => updateData(value, code)}
            />

            <div className="mb-4 mt-5">
                <Button
                    title="Log in to Qencode"
                    click={forgot}
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