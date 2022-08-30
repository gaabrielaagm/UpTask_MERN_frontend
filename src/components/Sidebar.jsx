import { Link } from "react-router-dom"

const Sidebar = () => {

    return (
        <aside className="w-full sm:w-full md:w-2/6 lg:w-2/6 px-5 py-10">
            <Link 
                to="crear-proyecto"
                className="flex gap-2 justify-center bg-white font-bold shadow-md hover:shadow-xl w-full p-3 text-sm text-black uppercase mt-5 text-center rounded"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Nuevo Proyecto
            </Link>
            <Link 
                to="/proyectos"
                className="flex gap-2 justify-center bg-white font-bold shadow-md hover:shadow-xl w-full p-3 text-sm text-black uppercase mt-5 text-center rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Lista Proyectos
            </Link>
        </aside>
    )
}

export default Sidebar