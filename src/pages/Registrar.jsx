import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')

  const [alerta, setAlerta] = useState({})

  //handleSubmit function to handle the submit event
  const handleSubmit = async e => {
    e.preventDefault();    //preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
 
    if([nombre, email, password, repetirPassword].includes('')) {  //.includes('') means if any of the fields are empty
      setAlerta({msg:'Todos los campos son obligatorios', error: true})
      return
    }

    if(password !== repetirPassword) {
      setAlerta({msg:'Los passwords no son iguales', error: true})
      return
    }

    if(password.length < 6) {
      setAlerta({msg:'El password debe ser de al menos 6 caracteres', error: true})
      return
    }

    setAlerta({});

    //Create the user - send the data to the API
    try {
      await clienteAxios.post('/veterinarios', {
        nombre,
        email,
        password
      })

      setAlerta({
        msg: 'Creado Correctamente. Revisa tu Email',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra <span className="text-black">tus Pacientes</span> </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          { msg && <Alerta
              alerta={alerta}
          />}
          <form onSubmit={handleSubmit}>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Email de Registro" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Crea un password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Repite tu Password
              </label>
              <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" placeholder="Confirma tu password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
            </div>

            <div className="my-5">
              <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto p-10" />
            </div>

          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
              <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
              <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi Password</Link>
          </nav>

      </div>    
    </>
  )
}

export default Registrar
