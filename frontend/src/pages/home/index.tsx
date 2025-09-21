import { PiSignOutBold } from "react-icons/pi";
import { GiCardboardBoxClosed } from "react-icons/gi";

export function Home() {
    return (
        <div className="w-full h-screen bg-zinc-300/10 flex items-center justify-center">
            <main className="w-full max-w-7xl p-12">

                <header className="flex  justify-between items-center w-full">
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
                <nav>
                    <div>

                    </div>

                    <button></button>
                </nav>

            </main>
        </div>
    )
}