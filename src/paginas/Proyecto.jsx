import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import Alerta from "../components/Alerta"
import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminar from "../components/ModalEliminar"
import { formatearFecha } from "../helpers/FormatearFecha"
import io from 'socket.io-client'

let socket;

const Proyecto = () => {
    const { obtenerProyecto,
            proyecto,
            cargando,
            handleModalTarea,
            alerta,
            modalFormularioTarea,
            handleShowModalEliminar,
            isAdmin,
            submitTareasProyecto,
            eliminarTareaProyecto,
            actualizarTareaProyecto,
            actualizarEstadoTareaProyecto } = useProyectos()
    const { nombre, descripcion, fechaEntrega, cliente, tareas, colaboradores, creador } = proyecto

    const { id } = useParams()
    const { auth } = useAuth()

    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('abrir proyecto', id)
    }, [])
    
    useEffect(() => {
        socket.on('tarea agregada', tareaNueva => {
            submitTareasProyecto(tareaNueva)
        })

        socket.on('tarea eliminada', tareaEliminada => {
            eliminarTareaProyecto(tareaEliminada)
        })

        socket.on('tarea actualizada', tareaActualizada => {
            actualizarTareaProyecto(tareaActualizada)
        })

        socket.on('estado tarea actualizado', tareaActualizada => {
            actualizarEstadoTareaProyecto(tareaActualizada)
        })
    })
    
    if(cargando) return <Spinner/> 

    if(!cargando && alerta?.msg && !modalFormularioTarea) return <Alerta /> 

    return (
        <>
            <div className="divide-y">
                <div className="grid grid-cols-5 grid-rows-1 w-full bt-2 pb-1">
                    <div className="col-span-3 pr-5">
                        <div className="flex">
                            <h1 className="font-black text-2xl pb-3 lg:text-4xl">{nombre}</h1>
                            {auth._id !== creador && (
                                <span className="flex gap-1 items-center ml-4 mt-2 bg-blue-600 text-xs text-white rounded-xl h-8 px-2">
                                    <span>
                                        Colaborador
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </span>
                            )}
                        </div>
                        <div>
                            <span className="text-lg font-bold text-gray-800 uppercase">{cliente}</span>
                        </div>
                        {fechaEntrega && 
                            <div>
                                <span className="text-sm font-bold italic text-gray-700 uppercase">{formatearFecha(fechaEntrega)}</span>
                            </div>
                        }
                        <div>
                            <span className="text-sm text-gray-600 uppercase">{descripcion}</span>
                        </div>
                    </div>

                    <div className="col-span-2">
                        {/* Botones */}
                        {isAdmin && 
                            <div className="grid grid-rows-2 justify-items-end gap-1 text-sm lg:flex lg:justify-end lg:gap-4">
                                <div className="flex items-center gap-2 shadow-md hover:shadow-xl rounded-lg text-gray-600 hover:text-sky-600 px-4 py-2 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    <Link
                                        to={`/proyectos/editar/${id}`}
                                        className="uppercase font-bold"
                                    >
                                    Editar
                                    </Link>
                                </div>
                                <div className="flex items-center gap-2 shadow-md hover:shadow-xl rounded-lg text-gray-600 hover:text-red-600 px-4 py-2 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <button
                                        onClick={() => handleShowModalEliminar('Proyecto')}
                                        className="uppercase font-bold"
                                    >
                                    Eliminar
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* Listado Tareas */}
                <div className="mt-10 md:flex lg:flex sm:block pt-12">
                    <div className="md:w-4/5 lg:w-4/6 py-2">
                        <p className="font-bold text-xl">Tareas</p>
                    </div>
                    {isAdmin && 
                        <div className="md:w-2/5 lg:w-2/6 mt-2">
                            <button
                                onClick={handleModalTarea}
                                type='button'
                                className="flex gap-2 items-center justify-center w-full
                                            text-sm uppercase
                                            bg-sky-600 hover:bg-sky-800
                                            shadow-sm hover:shadow-xl
                                            text-white text-center rounded-xl
                                            p-2 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Agregar Tarea
                            </button>
                        </div>
                    }
                </div>

                <div className="bg-white shadow-lg mt-4 rounded-lg mb-12">
                    {tareas?.length > 0 
                            ? tareas.map(tarea => (
                                    <Tarea 
                                        tarea={tarea}
                                        key={tarea._id}
                                    />
                                ))
                            : <p className="font-bold text-lg text-center my-5 p-10">
                                No existen Tareas agregadas al Proyecto
                                </p>
                    }
                </div>

                {/* Listado Colaboradores */}
                <div className="md:flex lg:flex sm:block pt-12">
                    <div className="md:w-4/5 lg:w-4/6 py-2">
                        <p className="font-bold text-xl">Colaboradores</p>
                    </div>

                    {isAdmin && 
                        <div className="md:w-2/5 lg:w-2/6 mt-2">
                            <Link
                                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                                className="flex gap-2 items-center justify-center w-full
                                            text-sm uppercase
                                            bg-sky-600 hover:bg-sky-800
                                            shadow-sm hover:shadow-xl
                                            text-white text-center rounded-xl
                                            p-2 mr-4"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                            </svg>
                                Agregar Colaborador
                            </Link>
                        </div>
                    }
                </div>

                <div  className="bg-white shadow-lg mt-4 rounded-lg px-5 py-1">
                    {colaboradores?.length > 0 
                            ? colaboradores.map(colaborador => (
                                    <Colaborador 
                                    colaborador={colaborador}
                                        key={colaborador._id}
                                    />
                                ))
                            : <p className="font-bold text-lg text-center my-5 p-10">
                                No existen Colaboradores agregados al Proyecto
                                </p>
                    }
                </div>

                <ModalEliminar />
                <ModalFormularioTarea />
            </div>
        </>
    )
}

export default Proyecto