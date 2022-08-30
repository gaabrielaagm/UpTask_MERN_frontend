import { useState } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const PRIORIDADES = ['Baja', 'Media', 'Alta']

const FormularioTarea = () => {
  const { mostrarAlerta, alerta, subtmitTarea, tarea } = useProyectos()

  const [ id, setId ] = useState(tarea?._id ? tarea?._id : null)
  const [ nombre, setNombre ] = useState(tarea?.nombre ? tarea?.nombre : '')
  const [ descripcion, setDescripcion ] = useState(tarea?.descripcion ? tarea?.descripcion : '')
  const [ fechaEntrega, setfechaEntrega ] = useState(tarea?.fechaEntrega ? tarea?.fechaEntrega.split('T')[0] : '2022-08-11')
  const [ prioridad, setPrioridad ] = useState(tarea?.prioridad ? tarea?.prioridad : '')
  
  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre, descripcion, prioridad].includes('')) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    } 

    await subtmitTarea({id, nombre, descripcion, fechaEntrega, prioridad, proyecto: params.id})

    resetFields()
  }

  const resetFields = () => {
    setId(null)
    setNombre('')
    setDescripcion('')
    setfechaEntrega('')
    setPrioridad('')
  }

  return (
    <>
      <form 
        onSubmit={handleSubmit}
        className="my-10"
      >
        {alerta && alerta.msg && <Alerta />}

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"> Título
          </label>
          <input 
            id="nombre"
            type="text"
            placeholder="Título de la Tarea"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="descripcion"> Descripción
          </label>
          <textarea 
            id="descripcion"
            placeholder="Descripción de la Tarea"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="fecha-entrega"> Fecha Entrega
          </label>
          <input 
            id="fecha-entrega"
            type="date"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={fechaEntrega}
            onChange={e => setfechaEntrega(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="prioridad"> Prioridad
          </label>
          <select 
            id="prioridad"
            className="border-2 p-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={prioridad}
            onChange={e => setPrioridad(e.target.value)}
          >
            <option value=""> Seleccionar </option>
            {PRIORIDADES.map(prioridad => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>
        </div>

        <input 
          type="submit"
          className="text-sm bg-blue-800 hover:bg-blue-600 w-full p-3 text-white uppercase font-bold cursor-pointer transition-color rounded-md"
          value={`${id ? 'Actualizar' : 'Crear'} Tarea`}
        />
      </form>
    </>
  )
}

export default FormularioTarea