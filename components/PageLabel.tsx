export default function PageLabel(props: { label: string }) {
    const {label} = props;
    return (
        <div className="text-3xl leading-[39px] font-bold text-gray-900 mb-10 text-center">{label}</div>
    )
}