import { useState, useEffect, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            try {
                const url = '/usuarios/perfil'
                const { data } = await clienteAxios(url, config)
                setAuth(data)
                setTimeout(() => {
                    setCargando(false)
                    if(location.pathname === '/') navigate('/proyectos')
                }, 500)
            } catch (error) {
                setAuth({})
                setCargando(false)
                console.error(error)
            }
        }
        autenticarUsuario()
    }, [])

    const closeSesion = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                closeSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext