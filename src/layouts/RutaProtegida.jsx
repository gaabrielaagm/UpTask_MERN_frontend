import { Outlet, Navigate, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import { Header } from "../components/Header"
import Sidebar from "../components/Sidebar"

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()
    return (
        <>
            { cargando
                ? <Spinner />
                : auth && auth._id 
                    ? (
                        <div className="bg-gray-100">
                            <Header />
                            <div className="md:flex md:min-h-screen">
                                <Sidebar />

                                <main className="flex-1 py-10 pl-3 pr-6 m-5">
                                    <Outlet />
                                </main>
                            </div>
                        </div>
                    )
                    : <Navigate to="/" /> 
            }
            
        </>
    )
}

export default RutaProtegida