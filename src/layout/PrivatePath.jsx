import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";  
import Footer from "../components/Footer";


//This component is used to protect routes
//If the user is not logged in, it will redirect to the login page
//Verify if the user is logged in with the useAuth hook

const PrivatePath = () => {

  const { auth, cargando} = useAuth();

  if(cargando) return 'Cargando...';

  return (
    <>
    <Header/>
        {auth?._id ? 
        (
            <main className="container mx-auto mt-10">
                <Outlet/>
             </main>
        ) : <Navigate to='/'/>}
    <Footer/>
    </>
  )
}

export default PrivatePath
