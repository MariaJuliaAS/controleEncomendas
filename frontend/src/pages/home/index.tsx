import { PiSignOutBold } from "react-icons/pi";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
/*import { IoMdSearch } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { Input } from "../../components/input";*/

export function Home() {
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
                    <button className="cursor-pointer transition-all hover:scale-105">
                        <PiSignOutBold size={36} className="text-zinc-800" />
                    </button>
                </header>

                <section className="bg-white w-full rounded-2xl border border-gray-200 shadow-md py-4 px-8 flex items-center justify-center max-h-130">
                    <table className="w-full border-collapse table-fixed">
                        <thead className="text-left">
                            <tr className="border-b border-gray-200">
                                <th className="pb-4">Nome</th>
                                <th className="pb-4">Data de Entrega</th>
                                <th className="pb-4">Endereço</th>
                                <th className="pb-4">Contato</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tbody" className="text-left">
                            <tr className="border-b border-gray-200 odd:bg-white even:bg-gray-100/30 transition-all hover:odd:bg-gray-100/10 hover:even:bg-gray-100/50">
                                <td className="py-4">Maria Júlia</td>
                                <td className="py-4">19/10/25</td>
                                <td className="py-4">Rua das flores, n 10</td>
                                <td className="py-4">84991832527</td>
                                <td className="py-4">Para comprar</td>
                                <td className="py-4 flex gap-2">
                                    <FaUser size={20} className="text-zinc-800 cursor-pointer transition-all hover:scale-120" />
                                    <FaEdit size={20} className="text-zinc-800 cursor-pointer transition-all hover:scale-120" />
                                    <FaTrash size={20} className="text-zinc-800 cursor-pointer transition-all hover:scale-120" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    )
}