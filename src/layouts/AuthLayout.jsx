import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="">
        <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center sm:justify-center">
            <div className="sm:w-2/3 md:w-2/3 lg:w-1/7">
                <Outlet/>
            </div>
        </main>
            
    </div>
  )
}

export default AuthLayout