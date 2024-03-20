import type {Button} from "@/interfaces";

export default function Button(props: Button) {
    const { title, bg, textColor, border, click } = props


    return (
        <button
            type="button"
            className={
                `w-full h-[48px] bg-brand rounded-lg font-medium text-base leading-[21px] ${bg} ${textColor ? textColor : 'text-white'} ${border} `
            }
            onClick={click}
        >
            {title}
        </button>
    );
}