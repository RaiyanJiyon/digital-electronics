import { AlertTriangle } from "lucide-react";

const CantFind = () => {
    return (
        <div className="bg-[#FDF0D5] flex items-center justify-between p-2 gap-2">
            <AlertTriangle className="text-red-500 w-5 h-5" /> {/* Using the AlertTriangle icon */}
            <span className="text-xs">We can&apos;t find products matching the selection.</span>
        </div>
    );
};

export default CantFind;