import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';


const PacienteContext = createContext();


export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth(); //Get auth from useAuth hook (custom hook) - Check if user is authenticated

    // Get pacientes when component is loaded -------------------------------------------------------
    useEffect(() => {
        const getPacientes = async () => {
            try {
                const token = localStorage.getItem('apv_token_$');

                if(!token) return;

                //Config headers
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };
                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);

            } catch (error) {
                console.log("Error al cargar pacientes")
                console.log(error)
            }
        };

        getPacientes();
    }, [auth]);
    // Get pacientes when component is loaded -------------------------------------------------------



    // Guardar paciente ----------------------------------------------------------------------------
    const guardarPaciente = async (paciente) => {

        //Security token
        const token = localStorage.getItem('apv_token_$');
        //Config headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState);

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                //Save in DB
                const { data } = await clienteAxios.post('/pacientes', paciente, config); //Parametros: endpoint, data, config (headers)
                
                const { createAt, updateAt, __v, ...pacienteAlmacenado } = data;  //Destructuring data (without createAt, updateAt, __v)
                setPacientes([pacienteAlmacenado, ...pacientes]); //Update state
    
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }
    // Guardar paciente ----------------------------------------------------------------------------



    // Editar paciente ----------------------------------------------------------------------------
    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }
    // Editar paciente ----------------------------------------------------------------------------



    // Eliminar paciente ----------------------------------------------------------------------------
    const eliminarPaciente = async (id) => {
        //Confirm delete?
        const confirmar = confirm('¿Estás seguro de eliminar este paciente?');

        if(confirmar){
            try {
                //Delete from DB ----------------------------

                //Security token
                const token = localStorage.getItem('apv_token_$');
                //Config headers
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id);

                setPacientes(pacientesActualizado);

                //Delete from DB ----------------------------

            } catch (error) {
                console.log(error);
            }
        }
    }
    // Eliminar paciente ----------------------------------------------------------------------------


    
    return(
        <PacienteContext.Provider 
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}
        >
            {children}
        </PacienteContext.Provider>
    )
}


export default PacienteContext;