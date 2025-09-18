import { GiCardboardBoxClosed } from "react-icons/gi";
import { Link } from "react-router-dom";

export function Register() {
    return (
        <div className="w-full h-screen bg-zinc-300/10 flex items-center justify-center">
            <main className="w-full max-w-7xl flex gap-12 p-12 lg:flex-row flex-col">

                <section className="flex flex-1 flex-col p-6 bg-white rounded-2xl border-gray-200 border shadow-2xl">
                    <header className="flex flex-col items-center justify-center mb-6">
                        <h1 className="font-bold lg:text-xl text-lg text-zinc-800">Seja bem-vindo{'('}a{')'}</h1>
                        <p className="text-zinc-600 text-center sm:text-base text-sm">Preencha seus dados para se cadastrar no sistema.</p>
                    </header>

                    <form className="flex flex-col">
                        <label className="text-zinc-600 font-medium my-2">Nome</label>
                        <input
                            className="border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                            placeholder="Seu nome completo"
                            type="text" />
                        <label className="text-zinc-600 font-medium my-2">Email</label>
                        <input
                            className="border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                            placeholder="seu@email.com"
                            type="text" />
                        <label className="text-zinc-600 font-medium my-2">Senha</label>
                        <input
                            className="border border-gray-200 rounded-lg px-2 h-10 outline-none focus:border-gray-400"
                            placeholder="••••••••"
                            type="password" />
                        <button className="my-6 bg-blue-700 rounded-lg h-10 text-white font-medium transition-all hover:scale-103 cursor-pointer">Entrar</button>
                    </form>
                    <p className="text-center text-gray-600">Já tem uma conta? <Link to="/login" className="underline text-blue-800 cursor-pointer">Fazer login</Link></p>
                </section>
                <section className="flex flex-1 items-center justify-center flex-col p-2 lg:mt-0 mt-28 ">
                    <header className="flex flex-col mb-4 items-center gap-4">
                        <div className="bg-blue-700 rounded-lg p-1">
                            <GiCardboardBoxClosed color="#fff" className="md:size-28 sm:size-20 size-14" />
                        </div>
                        <h1 className="font-bold lg:text-4xl md:text-3xl text-2xl text-zinc-800">OrderFlow</h1>
                    </header>

                    <div className="mt-6 flex flex-col items-center justify-center">
                        <h2 className="lg:text-2xl md:text-xl text-lg text-zinc-800 font-medium mb-2 text-center">Gerencie suas encomendas com facilidade</h2>
                        <p className="text-zinc-600 lg:text-lg text-base max-w-10/12 text-center">Controle completo dos seus pedidos, clientes e pagamentos em uma plataforma intuitiva e moderna.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}