import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
 
const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  //------- GET THE ID FROM THE URL ---------
  const params = useParams();  //useParams() is a hook that returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.

  const { id } = params;  //destructure the id from params 
  //------- GET THE ID FROM THE URL ---------

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url); //destructure the data from the response

        setCuentaConfirmada(true);
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
      setCargando(false);
    }
    confirmarCuenta();
  },[])

  return (
    <>
       <div>
          <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar <span className="text-black">tus Pacientes</span> </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
         {!cargando && 
        <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link to="/" className='block text-center my-5 text-gray-500'>Inicia Sesión</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
