export default function Divider(props: { wordInCentre?: string }) {
    const { wordInCentre } = props;

    return (
        <div className="w-full h-[1px] bg-[#E3E6E9] my-[38px] relative">
            {wordInCentre && <div className="text-[#A1A7B3] text-xs font-medium -mt-2 w-full text-center">
                <span className="bg-white px-[5px]">{wordInCentre}</span>
            </div>}
        </div>
    );
}