import useProyectos from "../hooks/useProyectos"

const Colaborador = ({colaborador}) => {
    const { nombre, email } = colaborador
    const { handleShowModalEliminar } = useProyectos()

    return (
        <div className="block pb-5 md:grid md:grid-cols-10 border-b last:border-none md:pb-0 pt-5">
            <div className="md:col-span-8 sm:col-span-8 mb-4">
                <p className="font-bold">{nombre}</p>
                <p className="text-sm text-gray-700">{email}</p>
            </div>
            <div className="md:col-span-2 sm:col-span-2">
                <button
                    onClick={() => handleShowModalEliminar('Colaborador', colaborador)}
                    className="bg-red-600 hover:bg-red-700 p-3 shadow-md hover:shadow-xl text-white uppercase text-xs rounded-lg w-full"
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Colaborador