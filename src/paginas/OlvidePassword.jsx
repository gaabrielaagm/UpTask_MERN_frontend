import { useState } from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('')
  const [ alerta, setAlerta ] = useState({}) 

  const handleSubmit = async e => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

    setAlerta('')

    try {
      const url =  `/usuarios/olvide-password`
      const { data } = await clienteAxios.post(url,  {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu  {' '}
        <span className="text-slate-700">Acceso</span>
      </h1>

      {alerta && alerta.msg && <Alerta />}
      <form 
        className="my-12 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label 
              htmlFor="email"
              className="uppercase text-gray-600 block text-xl font-bold">
                  Email
          </label>
          <input 
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          value="Enviar Correo"
          className="bg-sky-700 w-full py-3 my-8 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-slate-700 transition-colors"
        />
      </form>

      <nav className="md:flex md:justify-between lg:justify-between">
            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
            >
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>

            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="registrar"
            >
                ¿No tienes una cuenta? Registrate
            </Link>
        </nav>
    </>
  )
}

export default OlvidePassword