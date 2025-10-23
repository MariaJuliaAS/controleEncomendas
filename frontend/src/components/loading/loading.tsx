import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <AiOutlineLoading3Quarters size={40} className="text-blue-700 animate-spin" />
        </div>
    )
}