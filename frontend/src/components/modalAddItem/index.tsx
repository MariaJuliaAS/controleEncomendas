import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import z from "zod";
import { Input } from "../input";
import { FiPlus } from "react-icons/fi";
import { api } from "../../service/api";
import toast from "react-hot-toast";

interface ModalProps {
    closeModal: () => void;
    id: string;
}

const schema = z.object({
    nameItem: z.string().nonempty("Adicione a encomenda.")
})

type FormData = z.infer<typeof schema>;

export function ModalAddItem({ closeModal, id }: ModalProps) {
    const token = localStorage.getItem("@tokenOrderFlow");
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    async function onSubmitItem(data: FormData) {
        try {
            await api.post("/orders/itens", {
                order_id: id,
                nameItem: data.nameItem
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Item adicionado com sucesso!")
            reset()
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            toast.error("Erro ao adicionar item.");
        }
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="flex justify-between mb-2 border-b border-gray-200 pb-2">
                    <p className="font-bold sm:text-lg text-base text-gray-700 flex items-center">
                        <IoIosAddCircleOutline size={24} className="inline mr-2 text-zinc-700" />
                        Adicione uma encomenda
                    </p>
                    <MdOutlineClose onClick={closeModal} size={18} className="cursor-pointer text-zinc-700 transition-all duration-200 hover:text-red-500" />
                </header>

                <div className="flex-col flex gap-2 ">
                    <form onSubmit={handleSubmit(onSubmitItem)} className="flex flex-row gap-2 mt-4">
                        <div className="flex-2">
                            <Input
                                placeholder="Adicionar encomenda"
                                type="text"
                                name="nameItem"
                                register={register}
                                error={errors.nameItem?.message}
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 rounded-lg px-2 h-10 flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                            <FiPlus size={24} className="text-white mt-1" />
                        </button>
                    </form>
                </div>
            </main>
        </div>

    )
}