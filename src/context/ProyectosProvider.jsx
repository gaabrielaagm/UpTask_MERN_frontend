import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'
import io from 'socket.io-client'

let socket;

const TIMEOUT = 2800;

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
    const [modalEliminarProyecto, setModalEliminarProyecto] = useState(false)
    const [showModalEliminar, setShowModalEliminar] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalType, setModalType] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
    const [modalSearch, setModalSearch] = useState(false)

    const navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() => {
        obtenerProyectos()
    }, [])

    useEffect(() => {
        obtenerProyectos()
    }, [auth])

    useEffect(() => {
        setIsAdmin(proyecto.creador === auth._id ? true : false)
    }, [proyecto])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    // ________________________________________________________
    // ________________________________________________________
    //
    //                       { PROJECTS }
    // ________________________________________________________
    // ________________________________________________________

    const obtenerProyectos = async () => {
        setCargando(true)
        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios('/proyectos', config)
            setProyectos(data)
        } catch (error) {
            console.error(error)
            setProyectos([])
        } finally {
            setCargando(false)
        }
    }

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, TIMEOUT)
    }

    const submitProyecto = async(proyectoSubmit) => {
        (proyectoSubmit?.id)
            ? await actualizarProyecto(proyectoSubmit)
            : await crearProyecto(proyectoSubmit)
    }

    const crearProyecto = async proyecto => {
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos, data])

            mostrarAlerta({
                msg: `Proyecto Creado Correctamente`,
                error: false
            })

            setTimeout(() => {
                navigate('/proyectos')
            }, TIMEOUT)

        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setProyecto({})
        }
    }

    const actualizarProyecto = async proyecto => {
        setCargando(true)

        if(!proyecto) return

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            mostrarAlerta({
                msg: `Proyecto Actualizado Correctamente`,
                error: false
            })

            setTimeout(() => {
                navigate('/proyectos')
            }, TIMEOUT)

        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setProyecto({})
        }
    }

    const obtenerProyecto = async id => {
        if(!id) return
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setCargando(false)
            setTimeout(() => {
                setProyecto({})
                navigate('/proyectos')
            }, TIMEOUT)
        } finally {
            setCargando(false)
        }
    }

    const eliminarProyecto = async id => {
        if(!id) return
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`proyectos/${id}`, config)

            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setModalEliminarProyecto(false)

            mostrarAlerta({
                msg: data.msg,
                error: false
            })

            navigate('/proyectos')
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setCargando(false)
                setProyecto({})
                setModalEliminarProyecto(false)
            }, TIMEOUT)
        }
    }

    const handleModalSearch = () => {
        setModalSearch(!modalSearch)
    }

    // ________________________________________________________
    // ________________________________________________________
    //
    //                         { TASKS }
    // ________________________________________________________
    // ________________________________________________________

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const subtmitTarea = async tareaSubmit => {
        if(!tareaSubmit) return

        (tarea?._id)
            ? await actualizarTarea(tareaSubmit)
            : await crearTarea(tareaSubmit)
    }

    const crearTarea = async tarea => {
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/tareas', tarea, config)

            setModalFormularioTarea(false)

            mostrarAlerta({
                msg: 'Tarea Agregada al Proyecto',
                error: false
            })

            //socket.io
            socket.emit('nueva tarea', data)
        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setTarea({})
        }
    }

    const actualizarTarea = async tareaSubmit => {
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/tareas/${tarea._id}`, tareaSubmit, config)
        
            // socket.io
            socket.emit('actualizar tarea', data)

            setModalFormularioTarea(false)

            mostrarAlerta({
                msg: 'Tarea Actualizada',
                error: false
            })
        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setTarea({})
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    const eliminarTarea = async () => {
        if(!tarea?._id) return

        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}/proyecto/${proyecto._id}`, config)
            
            // Socket.io 
            socket.emit('eliminar tarea', tarea)
            
            setModalEliminarTarea(false)
            mostrarAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setTimeout(() => {
                setTarea({})
            }, TIMEOUT)
        }
    }

    const changeTaskStatus = async (id) => {
        if(!id) return
        // setCargando(true)
        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data: tareaAlmacenada } = await clienteAxios.put(`/tareas/estado/${id}`, {}, config)
 
            // socket.io
            socket.emit('actualizar estado tarea', tareaAlmacenada)
        } catch (error) {
            console.error(error)
        } 
    }
    
    const submitTareasProyecto = tareaNueva => {
        if(proyecto?._id) {
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = [...proyectoActualizado.tareas, tareaNueva]
            setProyecto(proyectoActualizado)
        }
    }

    const eliminarTareaProyecto = tareaEliminada => {
        if(proyecto?._id) {
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tareaEliminada._id)
            setProyecto(proyectoActualizado)
        }
    }

    const actualizarTareaProyecto = tareaActualizada => {
        if(proyecto?._id) {
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tareaActualizada._id ? {...tareaActualizada} : {...tareaState})
            setProyecto(proyectoActualizado)
        }
    }

    const actualizarEstadoTareaProyecto = tareaAlmacenada => {
        if(proyecto?._id) {
            const tareas = 
                    proyecto.tareas.map(tareaState => {
                        if (tareaState._id === tareaAlmacenada._id) 
                            return {
                                    ...tareaState, 
                                    estado: tareaAlmacenada.estado,
                                    completado: tareaAlmacenada.completado
                                }
                        return {...tareaState}
                    })
            setProyecto({...proyecto, tareas})
        }
    }

    // ________________________________________________________
    // ________________________________________________________
    //
    //                   { COLLABORATORS }
    // ________________________________________________________
    // ________________________________________________________

    const buscarColaborador = async email => {
        if(!email) return
        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/proyectos/colaboradores', {proyecto: proyecto._id, email}, config)
            setColaborador(data)
        } catch (error) {
            setCargando(false)
            setColaborador({})
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setTimeout(() => {
                setCargando(false)
            }, TIMEOUT)
        }
    }

    const agregarColaborador = async () => {
        const { email } = colaborador

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, {email}, config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = (proyectoActualizado?.colaboradores)
                ? proyectoActualizado.colaboradores.push(data)
                : [data]
            setProyecto(proyecto)

            setColaborador({})
            mostrarAlerta({
                msg: 'Colaborador Agregado',
                error: false
            })
            setTimeout(() => {
                navigate(`/proyectos/${proyecto._id}`);
            }, TIMEOUT);
        } catch (error) {
            mostrarAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setTimeout(() => {
                setColaborador({})
            }, TIMEOUT);
        }
    }

    const eliminarColaborador = async () => {
        if(!colaborador._id) return

        setCargando(true)

        const token = localStorage.getItem('token')
        if(!token) return
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/proyectos/${proyecto._id}/colaboradores/${colaborador._id}`
            const { data } = await clienteAxios.delete(url, config)

            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado)

            mostrarAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
            setTimeout(() => {
                setColaborador({})
            }, 2800)
        }
    }

    // SHOW GENERAL MODAL TO DELETE PROJECTS, TASKS AND COLLABORATORS
    const handleShowModalEliminar = (type, object) => {
        if(type) setModalType(type)

        switch(type) {
            case 'Proyecto':
                // setProyecto(object)
                break;
            case 'Tarea':
                setTarea(object)
                break;
            case 'Colaborador':
                setColaborador(object)
                break;
        }

        setShowModalEliminar(!showModalEliminar)
    }

    // HANDLE DELETE FROM GENERAL MODAL
    const handleEliminar = async () => {
        switch(modalType) {
            case 'Proyecto':
                await eliminarProyecto(proyecto._id)
                break;
            case 'Tarea':
                await eliminarTarea(tarea._id)
                break;
            case 'Colaborador':
                await eliminarColaborador(colaborador._id)
            break;
        }

        handleShowModalEliminar()
    }

    const resetState = () => {
        setProyecto({})
        setProyectos([])
        setAlerta({})
    }
    

    return (
        <ProyectosContext.Provider
            value={{
                isAdmin,
                proyectos,
                mostrarAlerta,
                alerta,
                setAlerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                setProyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                subtmitTarea,
                handleModalEditarTarea,
                tarea,
                setTarea,
                modalEliminarTarea,
                eliminarTarea,
                modalEliminarProyecto,
                buscarColaborador,
                colaborador,
                agregarColaborador,
                eliminarColaborador,
                handleShowModalEliminar,
                showModalEliminar,
                handleEliminar,
                modalTitle,
                modalType,
                setModalTitle,
                changeTaskStatus,
                handleModalSearch,
                modalSearch,
                submitTareasProyecto,
                eliminarTareaProyecto,
                actualizarTareaProyecto,
                actualizarEstadoTareaProyecto,
                resetState
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext