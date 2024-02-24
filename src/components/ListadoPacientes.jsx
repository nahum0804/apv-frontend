import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";
  
const ListadoPacientes = () => {
  
  const { pacientes } = usePacientes();
  
  return (
    <>
      { pacientes.length ? 
      (
        <>
          {pacientes.map(paciente => (
            <Paciente 
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-center text-indigo-600">
            Agrega pacientes y administralos
          </p>
        </>
      )}
    </>
  )
}
  
export default ListadoPacientes;
