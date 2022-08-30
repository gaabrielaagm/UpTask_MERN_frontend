import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"

export const Header = () => {
    const { auth, closeSesion } = useAuth()
    const { resetState } = useProyectos()

    return (
        <header className="px-4 py-2 pt-8 bg-white boder-b">
            <div className="md:flex md:justify-between block">
                <div className="md:w-1/6 mb-8">
                    <h2 className="text-4xl text-sky-600 font-black text-center">
                        UpTask
                    </h2>
                </div>

                <div className="md:w-1/6 md:justify-end md:items-center flex justify-center w-full text-md mb-5">
                    <div className="w-auto pr-2">
                        <p className="font-bold">
                            Usuario: {' '}
                        </p>
                    </div>
                    <div className="w-auto pr-2">
                        <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            <span className="capitalize">
                                {auth.nombre}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="md:w-1/6 lg:w-1/6  md:flex md:justify-end items-start">
                    <button
                        onClick={() => { 
                                resetState()
                                closeSesion()
                            }}
                        type="button"
                        className="flex gap-2 justify-center md:justify-center text-white text-md md:text-xs lg:text-md bg-sky-600 hover:bg-sky-700 shadow-md hover:shadow-xl p-3 rounded-xl uppercase md:w-auto lg:w-auto w-full items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden md:flex lg:flex " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar sesión
                    </button>

                </div>
            </div>

        </header>
    )
}
