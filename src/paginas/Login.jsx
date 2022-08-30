import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta"; 
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Spinner from '../components/Spinner'

const Login = () => {
    const [ email, setEmail ] = useState('monserratgm905@gmail.com')
    const [ password, setPassword ] = useState('guoa1259')
    const [ alerta, setAlerta ] = useState({})

    const { setAuth, cargando } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const url = '/usuarios/login'
            const { data } = await clienteAxios.post(url, { email, password })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            console.log(error.response.data.msg)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        }
    }

    return (
        <>
            {cargando 
                ? <Spinner />
                : (
                    <>
                        <h1 className="text-sky-600 font-black text-6xl capitalize">
                            Inicia Sesión y Administra tus {' '}
                            <span className="text-slate-700">Proyectos</span>
                        </h1>

                        {alerta && alerta.msg && <Alerta alertaLogin={alerta} />}

                        <form 
                            className="my-12 bg-white shadow rounded-lg p-10"
                            onSubmit={handleSubmit}
                        >   
                            <div className="my-5">
                                <label 
                                    htmlFor="email"
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                        Email
                                </label>
                                <input 
                                    id="email"
                                    type="email"
                                    placeholder="Email de Registro"
                                    className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="my-5">
                                <label 
                                    htmlFor="password"
                                    className="uppercase text-gray-600 block text-xl font-bold">
                                        Password
                                </label>
                                <input 
                                    id="password"
                                    type="password"
                                    placeholder="Password de Registro"
                                    className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input 
                                type="submit"
                                value="Iniciar Sesión"
                                className="bg-sky-700 w-full py-3 my-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-700 transition-colors"
                            />
                        </form>

                        <nav className="md:flex md:justify-between lg:justify-between">
                            <Link
                                className="block text-center my-5 text-slate-500 uppercase text-sm"
                                to="registrar"
                            >
                                ¿No tienes una cuenta? Registrate
                            </Link>

                            <Link
                                className="block text-center my-5 text-slate-500 uppercase text-sm"
                                to="olvide-password"
                            >
                                Olvide mi Password
                            </Link>
                        </nav>
                    </>
                )
            }
        </>
    )
}

export default Login