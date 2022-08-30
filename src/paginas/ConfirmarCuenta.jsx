import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {
  const { id } = useParams()
  const [ alerta, setAlerta ] = useState({}) 
  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false)

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({ 
          msg: data.msg, 
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        setCuentaConfirmada(false)
      }
    }
    confirmarCuenta()
  }, [])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl ">
        Confirma tu cuenta y comienza a crear tus {' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta && alerta.msg && <Alerta />}

        {cuentaConfirmada && (
          <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/"
          >
              Inicia Sesión
          </Link>
        )}
      </div>
  </>
  )
}

export default ConfirmarCuenta