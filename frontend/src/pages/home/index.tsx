import { PiSignOutBold } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { ModalAddOrder } from "../../components/modalAddOrder";
import { ModalDetailsOrders } from "../../components/modalDetailsOrders";
import { ModalEditOrder } from "../../components/modalEditOrder";
import { CiFilter } from "react-icons/ci";

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
    const [orders, setOrders] = useState<OrdersProps[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("Status");
    const [filterSearch, setFilterSearch] = useState<string>("");
    const [filterDate, setFilterDate] = useState<string>("desc");
    const [modalOpenAddOrder, setModalOpenAddOrder] = useState(false);
    const [modalOpenDetailsOrder, setModalOpenDetailsOrder] = useState(false);
    const [modalEditOrder, setModalEditOrder] = useState(false);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        async function loadOrders() {
            const token = localStorage.getItem("@tokenOrderFlow");

            try {
                const response = await api.get<OrdersProps[]>(
                    "/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            order_by: filterDate
                        }
                    }
                );
                setOrders(response.data);
            } catch (error) {
                console.log("Erro ao carregar encomendas " + error)
            }
        }

        loadOrders()
    }, [filterDate])

    async function handleDeleteOrder(id: string) {
        const token = localStorage.getItem("@tokenOrderFlow");

        try {
            await api.delete('/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: id
                }
            })
            setOrders(orders.filter(order => order.id !== id))
        } catch (error) {
            console.log("Erro ao deletar encomenda " + error)
        }
    }

    const ordersFilter = orders.filter((order) => {
        const statusFilter = filterStatus === "Todos" || filterStatus === "Status" || order.status === filterStatus;
        const searchFilter =
            order.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
            order.contact.includes(filterSearch) ||
            order.adress.toLowerCase().includes(filterSearch.toLowerCase());

        return statusFilter && searchFilter;
    })

    return (
        <div className="w-full h-screen bg-zinc-300/10 flex items-center justify-center">
            <main className="w-full max-w-7xl p-12 h-screen">

                <header className="flex  justify-between items-center w-full">
                    <div>
                        <h1 className="text-zinc-800 font-bold lg:text-3xl md:text-2xl text-xl flex items-center gap-2">
                            Controle de Encomendas
                            <GiCardboardBoxClosed size={28} className="text-zinc-800 mt-2" />
                        </h1>
                        <p className="text-zinc-600">Tenha controle do seu negócio, acompanhe cada encomenda.</p>
                    </div>
                    <div>
                        <button onClick={() => setModalOpenAddOrder(true)} className="cursor-pointer transition-all hover:scale-105">
                            <IoIosAddCircleOutline className="text-zinc-800 md:text-4xl text-3xl" />
                        </button>
                        <button className="cursor-pointer transition-all hover:scale-105">
                            <PiSignOutBold className="text-zinc-800 md:text-4xl text-3xl" />
                        </button>
                    </div>
                </header>

                <aside className="w-full my-12">
                    <h3 className="mb-2 font-bold lg:text-lg text-base text-zinc-800 flex flex-row items-center gap-2">
                        <CiFilter className="text-zinc-800 lg:text-2xl text-xl" />
                        Filtros
                    </h3>
                    <nav className="w-full max-w-3xl flex gap-4 md:flex-row flex-col">
                        <div className="flex flex-row gap-4">
                            <select
                                className="border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="Status" disabled>Status</option>
                                <option value="Todos">Todos</option>
                                <option value="Para Comprar">Para Comprar</option>
                                <option value="Para Entregar">Para Entregar</option>
                                <option value="Entregue">Entregue</option>
                            </select>
                            <select
                                className="border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                            >
                                <option value="desc">Decrescente</option>
                                <option value="asc">Crescente</option>
                            </select>
                        </div>
                        <input
                            placeholder="Pesquise por nome, endereço, telefone..."
                            type="text"
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                        />
                    </nav>
                </aside>

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
                            {ordersFilter.map((item) => {
                                const formatedDate = new Date(item.delivery_date + "T00:00:00").toLocaleDateString("pt-BR")
                                return (
                                    <tr key={item.id} className="border-b border-gray-200 odd:bg-white even:bg-gray-100/30 transition-all hover:odd:bg-gray-100/10 hover:even:bg-gray-100/50 block lg:table-row">
                                        <td data-label="Nome" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                            {item.name}
                                        </td>
                                        <td data-label="Data de Entrega" className="text-zinc-800 py-4 px-2 block lg:table-cell lg:px-0 before:content-[attr(data-label)] before:font-medium before:text-gray-500 before:block lg:before:hidden before:float-left lg:text-center text-right">
                                            {formatedDate}
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
                                                <button onClick={() => { setModalOpenDetailsOrder(true), setOrderId(item.id) }}>
                                                    <FaUser size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                                </button>
                                                <button onClick={() => { setModalEditOrder(true), setOrderId(item.id) }}>
                                                    <FaEdit size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                                </button>
                                                <button onClick={() => { handleDeleteOrder(item.id), setOrderId(item.id) }}>
                                                    <FaTrash size={20} className="text-zinc-600 cursor-pointer transition-all hover:scale-120" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }

                            )}
                        </tbody>
                    </table>
                </section>

                {modalOpenAddOrder && <ModalAddOrder closeModal={() => { setModalOpenAddOrder(false), window.location.reload() }} />}
                {modalOpenDetailsOrder && <ModalDetailsOrders id={orderId} closeModal={() => setModalOpenDetailsOrder(false)} />}
                {modalEditOrder && <ModalEditOrder id={orderId} closeModal={() => { setModalEditOrder(false), window.location.reload() }} />}

            </main>
        </div>
    )
}