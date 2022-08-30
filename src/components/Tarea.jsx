import { useState, useEffect } from "react"
import { formatearFecha } from "../helpers/FormatearFecha"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const { nombre, descripcion, fechaEntrega, prioridad, _id, estado } = tarea
    const { handleModalEditarTarea, handleShowModalEliminar, isAdmin, changeTaskStatus } = useProyectos()

    const [cargando, setCargando] = useState(false)
    const [buttonTitle, setButtonTitle] = useState(estado ? 'Completada' : 'Pendiente')

    useEffect(() => {
        setCargando(false)        
        handleButtonLeave()
    }, [estado])

    useEffect(() => { 
        if(cargando) setButtonTitle('Cargando...')
        handleButtonLeave()
    }, [cargando])

    const handleButtonOver = () => {
        (cargando) 
            ? setButtonTitle('Cargando...')
            : setButtonTitle((estado) ? 'Pendiente' : 'Completada')
    }

    const handleButtonLeave = () => {
        (cargando) ? setButtonTitle('Cargando...')
            : setButtonTitle((estado) ? 'Completada' : 'Pendiente')
    }

    return (
        <div className="border-b p-5 m-2 block lg:flex lg:justify-between items-center">
            <div className="pr-12 mb-5">
                <p className="mb-1 text-xl pb-2">{nombre}</p>
                <p className="mb-1 text-md font-bold italic text-gray-500 capitalize">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-md  text-gray-600 capitalize">{descripcion}</p>
                <p className="mb-1 text-lg text-gray-600 pt-5">
                    Prioridad: {''}
                    <span className={`font-bold ${ prioridad === 'Alta' ? 'text-red-600' : prioridad === 'Media' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {prioridad}
                    </span>
                </p>
                {estado && 
                    <p className="text-sm bg-green-600 p-2 mt-3 text-white font-bold rounded-lg text-center">
                        Completada por: {tarea.completado?.nombre}
                    </p>
                }
            </div>

            <div className="grid gap-2 grid-cols-1 grid-rows-3 lg:flex lg:gap-2">
                <button
                    onMouseOver={handleButtonOver}
                    onMouseLeave={handleButtonLeave}
                    onClick={() => {
                        setCargando(true)
                        changeTaskStatus(_id)
                    }}
                    className={`${cargando ? 'bg-black' : estado ? 'bg-green-600' : 'bg-yellow-500'} 
                                    hover:bg-black 
                                    shadow-md hover:shadow-xl p-3 text-white uppercase font-bold text-xs rounded-lg`}
                >
                    {cargando ? 'Cargando...' : buttonTitle }
                </button>

                
                {isAdmin && 
                    <>
                        <button
                            onClick={() => handleModalEditarTarea(tarea)}
                            className="bg-indigo-600 hover:bg-indigo-800 shadow-md hover:shadow-xl p-3 text-white uppercase font-bold text-xs rounded-lg"
                        >Editar</button>
                        <button
                            onClick={() => handleShowModalEliminar('Tarea', tarea)}
                            className="bg-red-600 hover:bg-red-800 p-3 shadow-md hover:shadow-xl text-white uppercase font-bold text-xs rounded-lg"
                        >Eliminar</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Tarea