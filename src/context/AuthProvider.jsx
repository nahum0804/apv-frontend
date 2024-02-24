import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    //Check if user is authenticated - Check if token exists in localstorage
    useEffect(() => {
        const autencticateUser = async () => {
            const token = localStorage.getItem('apv_token_$');
            
            if(!token) {
                setCargando(false);
                return;
            }
            
            // Configure headers to send token in every request
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                // Authenticate user through security methods aplied in backend - Bearer token
                const { data } = await clienteAxios.get('/veterinarios/perfil', config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false); //Validate if login is done
        }
        autencticateUser();
    }, [])

    const logout = () => {
        setAuth({});
        localStorage.removeItem('apv_token_$');
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('apv_token_$');
        
        if( !token ) {
            setCargando( false );
            return;
        };
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{

            const url = `/veterinarios/perfil/${datos._id}`;
            const { data } = await clienteAxios.put( url, datos, config);

            return {
                msg: 'Almacenado correctamente'
            }

        } catch ( error ){
            return { 
                msg: error.response.data.msg,
                error: true
            }

        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('apv_token_$');
        
        if( !token ) {
            setCargando( false );
            return;
        };
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
      }

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cargando,
            setCargando,
            logout,
            actualizarPerfil,
            guardarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export {
    AuthProvider
};

export default AuthContext;