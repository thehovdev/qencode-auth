import Image from "next/image";
import type { Social, Socials } from "@/interfaces";
import Link from "next/link";


export default function SocialButtons(props: Socials) {
    const itemClass = "rounded-md border-[1.5px] border-[#D3D8DC] flex items-center justify-center h-12 w-1/2 text-sm font-medium";
    const { socials } = props

    return (
        <div className="flex w-full gap-4">
            {
                socials.map((social: Social) => {
                    return (
                        <Link key={social.title} type="button" className={itemClass} href={social.link} target="_blank">
                            <Image
                                src={`${social.icon}`}
                                alt={social.alt || social.icon}
                                width={social.width || 18}
                                height={social.height || 18}
                                className="mr-[10px]"
                            />
                            {social.title}
                        </Link>
                    )
                })
            }
        </div>
    );
}