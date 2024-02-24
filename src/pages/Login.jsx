import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
   
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }


    //Validate user data in backend - Compaire password and email with database
    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {
        email,
        password
      });

      //Save token in localstorage
      localStorage.setItem('apv_token_$', data.token);
      setAuth(data);
      navigate('/admin');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span> </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta
              alerta={alerta}
            />}
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Email
                </label>
                <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de Registro" value={email} onChange={e => setEmail(e.target.value) }/>
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
                </label>
                <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu password" value={password} onChange={e => setPassword(e.target.value) }/>
                <input type="submit" value="Iniciar Sesion" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto p-10" />
              </div>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi Password</Link>
              <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Crea una</Link>
            </nav>
        </div>    
    </>
  )
}

export default Login