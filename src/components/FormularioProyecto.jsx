import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from '../components/Alerta'
import Spinner from "./Spinner"

const FormularioProyecto = () => {
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('2022-08-11')
    const [cliente, setCliente] = useState('')
    const [colaboradores, setColaboradores] = useState([])
    const [creador, setCreador] = useState('')

    const { alerta, mostrarAlerta, submitProyecto, proyecto , cargando } = useProyectos()
    const { id: idParams } = useParams()

    useEffect(() => {
        if(idParams && proyecto?._id) {
            const { _id, nombre, descripcion, fechaEntrega, cliente,colaboradores, creador } = proyecto
            setId(_id)
            setNombre(nombre)
            setDescripcion(descripcion)
            setFechaEntrega(fechaEntrega?.split('T')[0])
            setCliente(cliente)
            setColaboradores(colaboradores)
            setCreador(creador)
        }
    }, [proyecto])


    const handleSubtmit = async e => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })

            return
        }

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente, colaboradores, creador})
        resetForm()
    }

    const resetForm = () => {
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
        setColaboradores([])
        setCreador('')
    }

    if(cargando) return (<Spinner />)

    return (
        <form 
            onSubmit={handleSubtmit}
            className="bg-white py-10 px-5 md:w-4/5 sm:w-full rounded-lg"
        >
            {alerta && alerta.msg 
                ? <Alerta />
                : (
                    <>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="nombre"
                            >   
                                Nombre Proyecto
                            </label>
            
                            <input 
                                id="nombre"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                placeholder="Nombre del Proyecto"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />
                        </div>
            
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="descripcion"
                            >   
                                Descripción Proyecto
                            </label>
            
                            <textarea 
                                id="descripcion"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md h-60"
                                placeholder="Descripción del Proyecto"
                                value={descripcion}
                                onChange={e => setDescripcion(e.target.value)}
                            />
                        </div>
            
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="fecha-entrega"
                            >   
                                Fecha Entrega
                            </label>
            
                            <input 
                                id="fecha-entrega"
                                type="date"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                value={fechaEntrega}
                                onChange={e => setFechaEntrega(e.target.value)}
                            />
                        </div>
            
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="cliente"
                            >   
                                Nombre Cliente
                            </label>
            
                            <input 
                                id="cliente"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                placeholder="Nombre del Cliente"
                                value={cliente}
                                onChange={e => setCliente(e.target.value)}
                            />
                        </div>
            
                        <input
                            type="submit"
                            value={`${idParams && proyecto?._id ? 'Actualizar' : 'Crear'} Proyecto`}
                            className="bg-sky-600 w-full p-3 text-white uppercase font-bold rounded-xl cursor-pointer hover:bg-sky-700 transition-colors"
                        />
                    </>
                )
            }

        </form>
    )
}

export default FormularioProyecto