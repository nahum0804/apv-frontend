import { Link } from "react-router-dom" 

const AdminNav = () => {
  return (
    <nav>
      <Link to="/admin/perfil" className="font-bold uppercase text-gray-500 m-3">
        Editar Perfil
      </Link>

      <Link to="/admin/cambiar-password" className="font-bold uppercase text-gray-500 m-3">
        Cambiar Contraseña
      </Link>
    </nav>
  )
}

export default AdminNav
