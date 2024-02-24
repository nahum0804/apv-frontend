import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

  // State del formulario de pacientes - Patients data
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();


  //Check if there is a patient selected to edit and update the form
  useEffect(() => {
    if(paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id)
    }
  }, [paciente]);



  const handleSubmit = e => {
    e.preventDefault();


    //Validate form
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    setAlerta({});

    guardarPaciente({nombre, propietario, email, fecha, sintomas, id});

    setAlerta({
      msg: 'Guardado Correctamente',
      error: false
    });

    //Reset form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId('');
  }

  // Message alert
  const { msg } = alerta;

  return (
    <>
      <p className='text-lg text-center mb-10'>
        Añade a tus pacientes y <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md lg:mb-5' onSubmit={handleSubmit}>
        <div className='mb-5'>
            <label htmlFor='name' className='text-gray-700 uppercase font-bold'>Nombre de la Mascota</label>
            <input type="text" id='name' placeholder='Nombre de la Mascota' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={nombre} onChange={e => setNombre(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor='propietario' className='text-gray-700 uppercase font-bold'>Nombre del Propietario</label>
            <input type="text" id='propietario' placeholder='Nombre del Propietario' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={propietario} onChange={e => setPropietario(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Email del Propietario</label>
            <input type="email" id='email' placeholder='Email de Contacto' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={email} onChange={e => setEmail(e.target.value)}/>
        </div>

        <div className='mb-5'>
            <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>Fecha Alta</label>
            <input type="date" id='fecha'  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={fecha} onChange={e => setFecha(e.target.value)}/>
        </div>
        
        <div className='mb-5'>
            <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>Sintomas</label>
            <textarea id='sintomas' placeholder='Describe los sintomas que presenta la mascota...' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' value={sintomas} onChange={e => setSintomas(e.target.value)}/>
        </div>  

        <input type="submit" value={id ? 'Guardar Cambios' : 'Agregar Paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'/>
      </form>

      {msg && <Alerta alerta={alerta} />}    

    </>
  )
}

export default Formulario
    