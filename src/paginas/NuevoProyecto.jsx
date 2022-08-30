import { useEffect } from "react"
import FormularioProyecto from "../components/FormularioProyecto"
import useProyectos from "../hooks/useProyectos"

const NuevoProyecto = () => {
  const { setProyecto } = useProyectos()

  useEffect(() => {
    setProyecto({})
  }, [])
  
  return (
    <>
      <h1 className="text-4xl font-black flex justify-center">
        Crear Proyecto
      </h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  )
}

export default NuevoProyecto