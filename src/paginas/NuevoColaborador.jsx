import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import Spinner from "../components/Spinner"
import Alerta from "../components/Alerta"

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyectos()
  const { id } = useParams()

  useEffect(() => {
    if(!proyecto?._id)
      obtenerProyecto(id)
  }, [])

  return (
    <>
        {cargando 
          ? <Spinner />
          : !proyecto?._id && alerta?.error
            ? <Alerta />
            : (
              <>
                <h2 className="text-4xl font-black text-center">
                  Añadir Colaborador(a)
                </h2>

                <h3 className="text-xl italic font-bold mt-1 text-center">
                  {/* Proyecto: {' '} */}
                  <span className="font-normal">{proyecto.nombre}</span>
                </h3>

                <div className="mt-10 flex justify-center">
                    <FormularioColaborador />
                </div>

                {cargando 
                  ? <Spinner /> 
                  : colaborador?._id && (
                    <div className="flex justify-center mt-10">
                      <div className="bg-white py-10 px-5 md:w-4/6 rounded-lg shadow w-full">
                        <div className="flex justify-between items-center">
                          <p>{colaborador.nombre}</p>
                          <button
                            type="button"
                            onClick={e => agregarColaborador()}
                            className="bg-slate-500 px-5 py-2 rounded-lg text-white font-bold text-sm"
                          >
                            Agregar al Proyecto
                          </button>
                        </div>
                      </div>
                    </div>
                )}
              </>
            )
        }
    </>
  )
}

export default NuevoColaborador