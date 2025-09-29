import type { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
    placeholder: string;
    type: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({ placeholder, type, name, register, error, rules }: InputProps) {
    return (
        <div>
            <input
                className="w-full border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                placeholder={placeholder}
                type={type}
                id={name}
                {...register(name, rules)}
            />
            {error && <p className="my-1 text-red-500">{error}</p>}
        </div>
    )
}