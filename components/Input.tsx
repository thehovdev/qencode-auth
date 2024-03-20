'use client';

import Image from "next/image";
import {FormEvent, useState} from "react";
import type { Input } from "@/interfaces";

export default function Input(props: Input) {
    const { type, placeholder, code, label, value, input } = props;
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    return (
        <div>
            { label && <div className="text-[#060E1E] text-[15px] font-medium w-full leading-[21px] mb-2">{label}</div> }
            <div
                className="relative outline-0 border-[1.5px] border-[#D3D8DC] h-12 rounded-md py-[14px] px-[15px] text-[15px]"
            >
                <input
                    className="w-full h-full bg-transparent outline-0"
                    type={!isPasswordVisible && type ? type : 'text'}
                    placeholder={placeholder}
                    onInput={(e: FormEvent<HTMLInputElement>) => input(e.currentTarget.value, code)}
                    value={value}
                />
                {
                    type === 'password' && (
                        <Image
                            src="/eye.svg"
                            alt="eye"
                            height="13"
                            width="18"
                            className="absolute right-4 top-4 cursor-pointer"
                            onClick={() => setPasswordVisible(!isPasswordVisible)}
                        />
                    )
                }
            </div>
        </div>

    )
}