import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
import Alerta from "../components/Alerta"
import Busqueda from "../components/Busqueda"

const Proyectos = () => {
  const { proyectos, setProyecto, alerta, handleModalSearch } = useProyectos()

  useEffect(() => {
    setProyecto({})
  }, [])

  return (
    <>
      <h1 className="text-4xl font-black">
        Proyectos
      </h1>

      <div className="mt-5">
        <button 
          type="button" 
          className="rounded-lg p-2 border font-bold uppercase w-full bg-slate-800 text-white" 
          onClick={handleModalSearch}
        >
          Buscar proyecto
        </button>
      </div>

      {alerta?.msg && <Alerta />}
      
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length > 0 
          ? proyectos.map(proyecto => (
                <PreviewProyecto 
                  key={proyecto._id}
                  proyecto={proyecto} 
                />
              ))
          : (
            <p className="text-center text-gray-600 uppercase font-bol p-5">No hay proyectos creados</p>
          ) 
        }
      </div>
      <Busqueda />
    </>
  )
}

export default Proyectos