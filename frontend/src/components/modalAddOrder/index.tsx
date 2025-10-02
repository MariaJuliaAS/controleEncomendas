import { MdOutlineClose } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "../input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaTrash } from "react-icons/fa";
import { api } from "../../service/api";
import { useState } from "react";

interface ModalProps {
    closeModal: () => void;
}

interface ApiProps {
    id: string;
    name: string;
    status: string;
    delivery_date: string;
    contact: string;
    observation: string;
    adress: string;
}

interface ItemsProps {
    id: string;
    nameItem: string;
}

const schema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    status: z.string().nonempty("Status é obrigatório"),
    delivery_date: z.string().optional(),
    contact: z.string().nonempty("Contato é obrigatório"),
    observation: z.string().optional(),
    adress: z.string().optional(),
    nameItem: z.string(),
})

type FormData = z.infer<typeof schema>;

export function ModalAddOrder({ closeModal }: ModalProps) {
    const token = localStorage.getItem("@tokenOrderFlow");
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const [idOrder, setIdOrder] = useState<string>("");
    const [items, setItems] = useState<ItemsProps[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);

    async function onSubmitOrder(data: FormData) {
        try {
            const response = await api.post<ApiProps>("/orders", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const idOrder = response.data.id;

            setIdOrder(idOrder);
            setDisabled(true);

            alert("Pedido adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar pedido:", error);
            alert("Erro ao adicionar pedido.");
        }
    }

    async function getItems(order_id: string) {
        try {
            const response = await api.get<ItemsProps[]>("orders/itens", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: order_id
                }
            })

            setItems(response.data);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            alert("Erro ao buscar itens.");
        }
    }

    async function onSubmitItem(data: FormData) {
        try {
            if (!idOrder) {
                alert("Adicione os dados do cliente antes.");
                return;
            }

            await api.post("/orders/itens", {
                order_id: idOrder,
                nameItem: data.nameItem
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            getItems(idOrder);
        } catch (error) {
            console.error("Erro ao adicionar item:", error);
            alert("Erro ao adicionar item.");
        }
    }

    async function handleDeleteItem(id: string) {
        try {
            await api.delete('/orders/itens', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    item_id: id
                }
            })

            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error("Erro ao deletar item:", error);
            alert("Erro ao deletar item.");
        }
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="flex justify-between mb-2">
                    <p className="font-medium sm:text-lg text-base text-gray-700 flex items-center">
                        <IoIosAddCircleOutline size={24} className="inline mr-2 text-zinc-700" />
                        Nova Encomenda
                    </p>
                    <MdOutlineClose onClick={closeModal} size={18} className="cursor-pointer text-zinc-700 transition-all duration-200 hover:text-red-500" />
                </header>

                <section className="my-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-bold text-zinc-800 sm:text-lg text-base flex items-center gap-1">Dados do Cliente</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmitOrder)} className="my-2">
                        <label className="text-zinc-600 font-medium my-2">Nome</label>
                        <Input
                            placeholder="Nome do cliente"
                            type="text"
                            name="name"
                            register={register}
                            error={errors.name?.message}
                            disabled={disabled}
                        />
                        <div className="w-full flex flex-row gap-2 my-2">
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Endereço</label>
                                <Input
                                    placeholder="Endereço do cliente"
                                    type="text"
                                    name="adress"
                                    register={register}
                                    error={errors.adress?.message}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Contato</label>
                                <Input
                                    placeholder="Contato do cliente"
                                    type="text"
                                    name="contact"
                                    register={register}
                                    error={errors.contact?.message}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-2 mb-2">
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Status</label>
                                <select
                                    required
                                    disabled={disabled}
                                    id="status"
                                    {...register("status")}
                                    className="w-full border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                                >
                                    <option value="Para Comprar">Para Comprar</option>
                                    <option value="Para Entregar">Para Entregar</option>
                                    <option value="Entregue">Entregue</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Data de Entrega</label>
                                <Input
                                    placeholder=""
                                    type="date"
                                    name="delivery_date"
                                    register={register}
                                    error={errors.delivery_date?.message}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <label className="text-zinc-600 font-medium my-2">Observações</label>
                        <textarea
                            className="w-full border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gray-400 mb-2"
                            placeholder="Observações sobre o pedido"
                            rows={3}
                            id="observation"
                            {...register("observation")}
                            disabled={disabled}
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-medium cursor-pointer rounded-lg px-4 py-2 mt-2 transition-all hover:scale-105">
                            ✓ Salvar
                        </button>

                    </form>
                </section>

                <section>
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-bold text-zinc-800 sm:text-lg text-base flex items-center gap-1">Encomendas</p>
                    </div>

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
                        <button type="submit" className="bg-blue-600 rounded-lg px-2 flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                            <FiPlus size={24} className="text-white mt-1" />
                        </button>
                    </form>

                    <div className="mt-4 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto shadow-md">
                        {items.length === 0 ? (
                            <p className="text-gray-500 text-center">Nenhum item adicionado.</p>
                        ) : (
                            <ul className="list-disc">
                                {items.map((item) => (
                                    <>
                                        <li className="flex justify-between items-center mb-1 ">
                                            • {item.nameItem}
                                            <button onClick={() => handleDeleteItem(item.id)}>
                                                <FaTrash size={16} className="text-zinc-600 cursor-pointer transition-all hover:scale-110" />
                                            </button>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        )}

                    </div>
                </section>
            </main>
        </div>
    )
}