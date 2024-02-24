import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if(email.trim() === '' || email.length < 6){
      setAlerta({
        msg: 'Debe ingresar un email',
        error: true
      })
      return;
    }
    try {
      // 
      const { data } = await clienteAxios.post('/veterinarios/recuperar', { email });
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
  }

  const { msg } = alerta;

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">Recupera tu Acceso y no Pierdas <span className="text-black">tus Pacientes</span> </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            { msg && <Alerta 
              alerta={alerta}
            />
            }
            <form
              onSubmit={handleSubmit}
            >
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Email
                </label>
                <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de Registro" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <div className="my-5">
                <input type="submit" value="Enviar Instrucciones" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto p-10" />
              </div>
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Crea una</Link>
              <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
        </div>    
    </>
  )
}

export default OlvidePassword
