import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const [ password, setPassword ] = useState('')
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ alerta, setAlerta ] = useState({}) 
  const [ passwordModificado, setPasswordModificado ] = useState(false)
  
  const { token } = useParams()
  
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const url = `/usuarios/olvide-password/${token}`
        await clienteAxios(url)
        setTokenValido(true)
      } catch (error) {
        setTokenValido(false)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6) {
      setAlerta({
        msg: 'El Password debe contener mínimo 6 caracteres.',
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const { data: { msg } } = await clienteAxios.post(url, { nuevaPassword: password })
      setPasswordModificado(true)
      setAlerta({
        msg,
        error: false
      })
    } catch (error) {
      setPasswordModificado(false)
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl ">
            Restablece tu Password  {' '}
            <span className="text-slate-700"></span>
        </h1>

        {alerta && alerta.msg && <Alerta />}

        {tokenValido && !passwordModificado && (
            <form 
              className="my-12 bg-white shadow rounded-lg p-10"
              onSubmit={handleSubmit}
            >
              <div className="my-5">
                <label 
                    htmlFor="password"
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Nuevo Password
                </label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Escribe tu Nuevo Password"
                    className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input 
                type="submit"
                value="Guardar nuevo Password"
                className="bg-sky-700 w-full py-3 my-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-700 transition-colors"
              />
            </form>
          )
        }
        {passwordModificado && (
          <Link
              className="block text-center my-5 text-slate-500 uppercase text-sm"
              to="/"
          >
              Inicia Sesión
          </Link>
        )}
    </>
  )
}

export default NuevoPassword