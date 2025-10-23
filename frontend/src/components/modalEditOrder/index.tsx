import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import z from "zod";
import { Input } from "../input";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "../../service/api";
import { FaEdit, FaPen, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { Loading } from "../loading/loading";

interface ModalProps {
    closeModal: () => void;
    id: string;
}

interface OrdersProps {
    id: string;
    name: string;
    status: string;
    delivery_date: string;
    contact: string;
    observation: string;
    adress: string;
    itens: ItemsProps[];
}

interface ItemsProps {
    id: string;
    nameItem: string;
}

const orderSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    status: z.string().nonempty("Status é obrigatório"),
    delivery_date: z.string().optional(),
    contact: z.string().nonempty("Contato é obrigatório"),
    observation: z.string().optional(),
    adress: z.string().optional(),
})

const schema = z.object({
    nameItem: z.string().nonempty("Adicione a encomenda.")
})

type OrderFormData = z.infer<typeof orderSchema>
type FormData = z.infer<typeof schema>;

export function ModalEditOrder({ closeModal, id }: ModalProps) {
    const token = localStorage.getItem("@tokenOrderFlow");
    const [orders, setOrders] = useState<OrdersProps>();
    const [nameItem, setNameItem] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const { register: registerOrder, handleSubmit: submitOrder, formState: { errors: errorsOrder }, reset: resetOrder } = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        mode: "onChange"
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    useEffect(() => {
        async function getOrder() {
            try {
                const response = await api.get<OrdersProps>("/order", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        order_id: id
                    }
                })


                setOrders(response.data)
                resetOrder({
                    name: response.data.name,
                    status: response.data.status,
                    delivery_date: response.data.delivery_date,
                    contact: response.data.contact,
                    adress: response.data.adress,
                    observation: response.data.observation,
                })
            } catch (error) {
                console.log("Erro ao buscar pedidos " + error)
            } finally {
                setLoading(false)
            }
        }

        getOrder();
    }, [onSubmitItem])

    async function editOrder(data: OrderFormData) {
        try {
            await api.put("/orders", {
                name: data.name,
                status: data.status,
                delivery_date: data.delivery_date,
                contact: data.contact,
                adress: data.adress,
                observation: data.observation,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: id
                }
            })
            toast.success("Dados do cliente editados com sucesso.")
        } catch (error: any) {
            console.log(error.response?.data || error.message);
            toast.error("Erro ao editar encomenda. ");
        }
    }

    async function editItem(id: string, e: FormEvent) {
        e.preventDefault();
        try {
            await api.put("/orders/itens", { nameItem: nameItem }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    item_id: id
                }
            })
            toast.success("Item editado com sucesso.")
        } catch (error) {
            toast.error("Erro ao editar item.")
            console.log("Erro ao editar item " + error)
        }
    }

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

    async function handleDeleteItem(id: string, e: FormEvent) {
        e.preventDefault();
        try {
            await api.delete('/orders/itens', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    item_id: id
                }
            })
            toast.success("Item deletaco com sucesso!")
        } catch (error) {
            console.error("Erro ao deletar item:", error);
            toast.error("Erro ao deletar item.");
        }
    }

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="flex justify-between mb-2">
                    <p className="font-bold sm:text-lg text-base text-gray-700 flex items-center">
                        <FaEdit size={24} className="inline mr-2 text-zinc-700" />
                        Editar Encomenda
                    </p>
                    <MdOutlineClose onClick={closeModal} size={18} className="cursor-pointer text-zinc-700 transition-all duration-200 hover:text-red-500" />
                </header>

                <section className="mt-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-medium text-zinc-800 sm:text-lg text-base flex items-center gap-1">Dados do Cliente</p>
                    </div>

                    <form onSubmit={submitOrder(editOrder)} className="my-2">
                        <label className="text-zinc-600 font-medium my-2">Nome</label>
                        <Input
                            placeholder="Nome do cliente"
                            type="text"
                            name="name"
                            register={registerOrder}
                            error={errorsOrder.name?.message}
                        />
                        <div className="w-full flex flex-row gap-2 my-2">
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Endereço</label>
                                <Input
                                    placeholder="Endereço do cliente"
                                    type="text"
                                    name="adress"
                                    register={registerOrder}
                                    error={errorsOrder.adress?.message}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Contato</label>
                                <Input
                                    placeholder="Contato do cliente"
                                    type="text"
                                    name="contact"
                                    register={registerOrder}
                                    error={errorsOrder.contact?.message}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-row gap-2 mb-2">
                            <div className="flex-1">
                                <label className="text-zinc-600 font-medium my-2">Status</label>
                                <select
                                    required
                                    id="status"
                                    {...registerOrder("status")}
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
                                    register={registerOrder}
                                    error={errorsOrder.delivery_date?.message}
                                />
                            </div>
                        </div>
                        <label className="text-zinc-600 font-medium my-2">Observações</label>
                        <textarea
                            className="w-full border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gray-400 mb-2"
                            placeholder="Observações sobre o pedido"
                            rows={3}
                            id="observation"
                            {...registerOrder("observation")}
                        />

                        <button className="w-full bg-blue-600 text-white flex flex-row gap-2 items-center justify-center font-medium cursor-pointer rounded-lg px-4 py-2 mt-2 transition-all hover:scale-105" type="submit">
                            ✓ Editar
                        </button>
                    </form>
                </section>

                <section className="my-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-medium text-zinc-800 sm:text-lg text-base flex items-center gap-1">Editar Encomendas</p>
                    </div>

                    {orders?.itens?.length === 0 ? (
                        <div className="my-2">
                            <p>Nenhum item foi cadastrado.</p>
                        </div>
                    ) : (
                        <div className="flex-col flex gap-2">
                            {orders?.itens?.map((item) => (
                                <form key={item.id} className="flex flex-row gap-2 mt-4">
                                    <div className="w-full">
                                        <input
                                            className="w-full border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                                            placeholder="Adicionar encomenda"
                                            type="text"
                                            name={`nameItem_${item.id}`}
                                            defaultValue={item.nameItem}
                                            onChange={(e) => setNameItem(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={(e) => handleDeleteItem(item.id, e)} type="submit" className="flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                                            <FaTrash size={18} className="text-red-600 mt-1" />
                                        </button>
                                        <button onClick={(e) => editItem(item.id, e)} type="submit" className="flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                                            <FaPen size={18} className="text-zinc-600 mt-1" />
                                        </button>
                                    </div>
                                </form>
                            ))}
                        </div>
                    )}

                </section>

                <section className="mb-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-medium text-zinc-800 sm:text-lg text-base flex items-center gap-1">Adicionar encomendas</p>
                    </div>
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
                            <button type="submit" className="flex items-center justify-center cursor-pointer transition-all hover:scale-105">
                                <FiPlus size={28} className="text-zinc-600 mt-1" />
                            </button>
                        </form>
                    </div>
                </section>

                {loading && <Loading />}

            </main>
        </div>
    )
}