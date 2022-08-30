import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Spinner from "../components/Spinner"
import FormularioProyecto from "../components/FormularioProyecto"
import ModalEliminar from "../components/ModalEliminar"

const EditarProyecto = () => {
    const { obtenerProyecto, proyecto, cargando, handleShowModalEliminar } = useProyectos()
    const { nombre } = proyecto

    const { id } = useParams()

    useEffect(() => {
        obtenerProyecto(id)
    }, [])

    if(cargando) return (<Spinner/>)

    return (
        <>
            <div className="md:flex md:justify-between sm:block">
                <h1 className="font-black text-4xl pb-3">
                    Editar Proyecto {nombre}
                </h1>
                <div className="sm:hidden md:flex justify-center items-center gap-2 text-gray-600 hover:text-red-500 shadow-md hover:shadow-xl px-6 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <button 
                        className="uppercase font-bold sm:p-5 md:p-2"
                        onClick={() => handleShowModalEliminar('Proyecto')}
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

            <div className="md:hidden lg:hidden flex justify-center items-center gap-2 text-gray-600 hover:text-red-500 shadow-md hover:shadow-xl rounded-xl mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <button 
                    className="uppercase font-bold p-3"
                    onClick={() => handleShowModalEliminar('Proyecto')}
                >
                    Eliminar
                </button>
            </div>

            <ModalEliminar />
        </>
    )
}

export default EditarProyecto