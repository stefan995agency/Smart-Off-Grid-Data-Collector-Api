import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


export default function DefaultLayout(){
    const {user, token, setUser, setToken} =   useStateContext()
    useEffect(() => {
        axiosClient.get ('/user').then(({data}) => {
            setUser(data)
        } )
    }, [])
    const onLogout= (ev) => {
        ev.preventDefault()
        axiosClient.post('/logout').then(() => {
            setUser({})
            setToken(null)
        })
    }

    if (!token) {
        return (<Navigate to = "/login"/>)
    }
    return(
        <div id="defaultLayout">
            <aside> 
                <Link to="/dashboard" >Dashboard</Link>
                <Link to="/users" >Users</Link>
                <Link to="/appliance">Appliances</Link>
                <Link to="/battery">Batteris</Link>
                <Link to="inverter">Inverters</Link>
                <Link to="/log">Log</Link>
                <Link to="/powersource">Power Sources</Link>
                <Link to="/sensor">Sensors</Link>
                

                
            </aside>
            <div className="content">
                <header>
                    <div>{user.name}</div>
                    <div>
                        
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>


                    </div>
                </header>
                <main>
                    
                    <Outlet/>
                </main>
            </div>
            
        </div>
    )
}