import {FormEvent} from "react";

export interface Social {
    title: string;
    icon: string
    link: string
    alt?: string
    width?: number
    height?: number
}

export interface Socials {
    socials: Social[]
}

export interface Input {
    code: string,
    type: string,
    label?: string,
    value?: string,
    placeholder: string,
    input: (value: string, code: string) => void
}

export interface Button {
    title: string
    textColor?: string
    bg?: string
    border?: string
    click: () => void
}

export interface AuthResponse {
    detail: string
    access_token: string
    refresh_token: string
    token_expire: number
    refresh_token_expire: number
}

export interface LoginState {
    email: string
    password: string
}

export interface ForgotState extends Pick<LoginState, "email"> {
    redirect_url: string
}

export interface SetNewPassword extends Pick<LoginState, "password"> {
    password_confirm: string
}
