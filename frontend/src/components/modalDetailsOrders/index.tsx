import { MdOutlineClose } from "react-icons/md";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { Loading } from "../loading/loading";

interface OrdersProps {
    id: string;
    name: string;
    status: string;
    delivery_date: string;
    adress: string;
    contact: string;
    observation?: string;
    itens: ItemsProps[]
}

interface ItemsProps {
    id: string;
    nameItem: string;
    order_id: string;
}

interface ModalProps {
    id: string;
    closeModal: () => void;
}

export function ModalDetailsOrders({ id, closeModal }: ModalProps) {
    const token = localStorage.getItem("@tokenOrderFlow");
    const [orders, setOrders] = useState<OrdersProps>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getOrders() {
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
            } catch (error) {
                console.log("Erro ao buscar pedidos " + error)
            } finally {
                setLoading(false)
            }
        }

        getOrders();
    }, [])

    return (
        <div onClick={closeModal} className="bg-black/40 fixed inset-0 flex items-center justify-center z-10">
            <main onClick={(e) => e.stopPropagation()} className="max-h-11/12 overflow-y-auto bg-white w-11/12 max-w-xl h-auto flex flex-col rounded-lg p-8 ">
                <header className="flex justify-between mb-2">
                    <p className="font-bold sm:text-lg text-base text-gray-800 flex items-center">
                        <GiCardboardBoxClosed size={24} className="inline mr-2 text-zinc-800" />
                        Dados da Encomenda
                    </p>
                    <MdOutlineClose onClick={closeModal} size={18} className="cursor-pointer text-zinc-700 transition-all duration-200 hover:text-red-500" />
                </header>

                <section className="my-4 flex flex-col gap-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-medium text-zinc-800 sm:text-lg text-base flex items-center gap-1">Dados do Cliente</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-left w-full">
                            <p className="font-medium text-zinc-700">Cliente</p>
                            <span className="text-zinc-600">{orders?.name}</span>
                        </div>
                        <div className="text-left w-full">
                            <p className="font-medium text-zinc-700">Contato</p>
                            <span className="text-zinc-600">{orders?.contact}</span>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-left w-full">
                            <p className="font-medium text-zinc-700">Endereço</p>
                            <span className="text-zinc-600">{orders?.adress}</span>
                        </div>
                        {orders?.observation && (
                            <div className="text-left w-full">
                                <p className="font-medium text-zinc-700">Observações</p>
                                <span className="text-zinc-600">{orders?.observation}</span>
                            </div>
                        )}
                    </div>
                </section>

                <section className="my-4 flex flex-col gap-4">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="font-medium text-zinc-800 sm:text-lg text-base flex items-center gap-1">Dados do Pedido</p>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-left w-full">
                            <p className="font-medium text-zinc-700">Items</p>
                            <ul>
                                {orders?.itens.map(item => (
                                    <li key={item.id} className="text-zinc-600">• {item.nameItem}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {loading && <Loading />}

            </main>
        </div>
    )
}