import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return
    }

    if (password.length < 6) {
      setAlerta({
        msg: 'El campo Password es muy corto. Agrega mínimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    // crear el usuario
    try {
      const { data: { msg } } = await clienteAxios.post('/usuarios', {nombre, password,  email})
      setAlerta({ msg, error: false })

      // reiniciar formulario
      resetFormulario()
    } catch (error) {
      const { response: { data: { msg } } } = error
      setAlerta({ msg, error: true })
    }
  }

  const resetFormulario = () => {
    setNombre('')
    setEmail('')
    setPassword('')
    setRepetirPassword('')
  }

  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl ">
            Crea tu  {' '}
            <span className="text-slate-700">Cuenta :)</span>
        </h1>

        { alerta && alerta.msg && <Alerta /> }
        
        <form 
          onSubmit={handleSubmit}
          className="my-12 bg-white shadow rounded-lg p-10">
          <div className="my-5">
            <label 
                htmlFor="nombre"
                className="uppercase text-gray-600 block text-xl font-bold">
                    Nombre
            </label>
            <input 
                id="nombre"
                type="text"
                placeholder="Tu Nombre"
                className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
          </div>
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
          <div className="my-5">
            <label 
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold">
                    Password
            </label>
            <input 
                id="password"
                type="password"
                placeholder="Password de Registro"
                className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label 
                htmlFor="password2"
                className="uppercase text-gray-600 block text-xl font-bold">
                    Repetir Password
            </label>
            <input 
                id="password2"
                type="password"
                placeholder="Repetir tu Password"
                className="w-full mt-3 p-3 rounded-xl border bg-gray-50"
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input 
            type="submit"
            value="Crear Cuenta"
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
                to="/olvide-password"
            >
                Olvide mi Password
            </Link>
        </nav>
    </>
  )
}

export default Registrar