import Link from "next/link";

export default function SignupHint() {
    return (
        <div className="w-full flex justify-center mt-5">
            <span className="text-sm leading-5 font-normal">Is your company new to Qencode?</span>
            <Link href="https://portal.qencode.com/signup" className="text-sm leading-5 font-medium text-brand ml-1 cursor-pointer">Sign up</Link>
        </div>
    )
}