import { PiSignOutBold } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
/*import { IoMdSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { Input } from "../../components/input";*/

interface OrdersProps {
    id: string;
    name: string;
    delivery_date: string;
    status: string;
    adress: string;
    contact: string;
    observation?: string;
}

export function Home() {
    const [orders, setOrders] = useState<OrdersProps[]>([])

    useEffect(() => {
        async function loadOrders() {
            const token = localStorage.getItem("@tokenOrderFlow");

            try {
                const response = await api.get<OrdersProps[]>(
                    "/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setOrders(response.data);
            } catch (error) {
                console.log("Erro ao carregar encomendas " + error)
            }
        }

        loadOrders()
    }, [])

    async function handleDeleteOrder(id: string) {
        const token = localStorage.getItem("@tokenOrderFlow");

        try {
            await api.delete(`/orders?order_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setOrders(orders.filter(order => order.id !== id))
        } catch (error) {
            console.log("Erro ao deletar encomenda " + error)
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-300/10 flex items-center justify-center">
            <main className="w-full max-w-7xl p-12 h-screen">

                <header className="flex  justify-between items-center w-full mb-12">
                    <div>
                        <h1 className="text-zinc-800 font-bold lg:text-3xl md:text-2xl text-xl flex items-center gap-2">
                            Controle de Encomendas
                            <GiCardboardBoxClosed size={28} className="text-zinc-800 mt-2" />
                        </h1>
                        <p className="text-zinc-600">Tenha controle do seu negócio, acompanhe cada encomenda.</p>
                    </div>
                    <div>
                        <button className="cursor-pointer transition-all hover:scale-105">
                            <IoIosAddCircleOutline size={36} className="text-zinc-800" />
                        </button>
                        <button className="cursor-pointer transition-all hover:scale-105">
                            <PiSignOutBold size={36} className="text-zinc-800" />
                        </button>
                    </div>
                </header>

                <section className="bg-white w-full rounded-2xl border border-gray-200 shadow-md px-8 py-4 flex max-h-9/12 overflow-y-auto">
                    <table className="w-full border-collapse table-fixed block lg:table">
                        <thead className="hidden lg:table-header-group text-left">
                            <tr className="text-center border-b border-gray-200">
                                <th className="pb-4 text-gray-500">Nome</th>
                                <th className="pb-4 text-gray-500">Data de Entrega</th>
                                <th className="pb-4 text-gray-500">Endereço</th>
                                <th className="pb-4 text-gray-500">Contato</th>
                                <th className="pb-4 text-gray-500">Status</th>
                                <th className="pb-4 text-gray-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-left block lg:table-row-group">
                            {orders.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-100/30 transition-all hover:odd:bg-gray-100/10 hover:even:bg-gray-100/50 block lg:table-row">
                                    <td data-label="Nome" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        {item.name}
                                    </td>
                                    <td data-label="Data de Entrega" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        {item.delivery_date}
                                    </td>
                                    <td data-label="Endereço" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        {item.adress}
                                    </td>
                                    <td data-label="Contato" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        {item.contact}
                                    </td>
                                    <td data-label="Status" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        {item.status}
                                    </td>
                                    <td data-label="Ações" className="py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                        <div className="flex gap-2 mt-2 lg:justify-center justify-end">
                                            <FaUser size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                            <FaEdit size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                            <button onClick={() => handleDeleteOrder(item.id)}>
                                                <FaTrash size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </main>
        </div>
    )
}