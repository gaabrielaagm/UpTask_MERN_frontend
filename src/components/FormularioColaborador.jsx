import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from './Alerta'

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')
    const { mostrarAlerta, alerta, buscarColaborador } = useProyectos()

    const handleSubtmit = e => {
        e.preventDefault()

        if(email === '') {
            mostrarAlerta({
                msg: 'Campo Email es requerido',
                error: true
            })
            return
        }

        buscarColaborador(email)
    }


    return (
        <form 
            onSubmit={handleSubtmit}
            className="bg-white p-5 md:w-4/6 w-full rounded-xl shadow"
        >
            {alerta?.msg && <Alerta />}

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="email"> Email
                </label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Email del Usuario"
                    className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                className="text-sm bg-blue-800 hover:bg-blue-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-color rounded-md"
                value={`Buscar Colaborador`}
            />
        </form>
    )
}

export default FormularioColaborador