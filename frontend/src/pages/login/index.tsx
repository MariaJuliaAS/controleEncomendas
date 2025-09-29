import { GiCardboardBoxClosed } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../service/api";

const schema = z.object({
    email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").nonempty("Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface LoginProps {
    email: string;
    password: string;
    token: string;
}

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const navigate = useNavigate();

    async function login(data: FormData) {
        try {
            const email = data.email;
            const password = data.password;

            const response = await api.post<LoginProps>("/session", {
                email,
                password
            })

            localStorage.setItem("@tokenOrderFlow", response.data.token)
            navigate("/", { replace: true })
        } catch (error) {
            alert("Email ou senha incorretos")
            console.log("Erro ao logar usuário " + error)
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-300/10 flex items-center justify-center">
            <main className="w-full max-w-7xl flex gap-12 p-12 lg:flex-row flex-col">
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

                <section className="flex flex-1 flex-col p-6 bg-white rounded-2xl border-gray-200 border shadow-2xl">
                    <header className="flex flex-col items-center justify-center mb-6">
                        <h1 className="font-bold lg:text-xl text-lg text-zinc-800">Bem-vindo de volta</h1>
                        <p className="text-zinc-600 text-center sm:text-base text-sm">Entre com suas credenciais para acessar o sistema.</p>
                    </header>

                    <form onSubmit={handleSubmit(login)} className="flex flex-col">
                        <label className="text-zinc-600 font-medium my-2">Email</label>
                        <Input
                            placeholder="seu@email.com"
                            type="text"
                            name="email"
                            register={register}
                            error={errors.email?.message}
                        />
                        <label className="text-zinc-600 font-medium my-2">Senha</label>
                        <Input
                            placeholder="••••••••"
                            type="password"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />
                        <button className="my-6 bg-blue-700 rounded-lg h-10 text-white font-medium transition-all hover:scale-103 cursor-pointer">Entrar</button>
                    </form>
                    <p className="text-center text-gray-600">Não tem uma conta? <Link to="/register" className="underline text-blue-800 cursor-pointer">Criar conta</Link></p>
                </section>
            </main>
        </div>
    )
}