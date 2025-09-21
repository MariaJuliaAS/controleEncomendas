
interface InputProps {
    placeholder: string;
    type: string;
}

export function Input({ placeholder, type }: InputProps) {
    return (
        <div>
            <input
                className="w-full border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                placeholder={placeholder}
                type={type}
            />
        </div>
    )
}