import { IoIosWarning } from "react-icons/io";

const CantFind = () => {
    return (
        <div className="bg-[#FDF0D5] flex justify-between p-2 gap-2">
            <IoIosWarning className="text-red-500 w-5 h-5" />
            <span className="text-xs">We can&apos;t find products matching the selection.</span>
        </div>
    );
};

export default CantFind;