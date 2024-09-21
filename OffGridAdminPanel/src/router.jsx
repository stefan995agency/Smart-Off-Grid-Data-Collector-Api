import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import ApplianceView from "./views/ioViews/ApplianceView";
import BatteryView from "./views/ioViews/BatteryView";
import InverterView from "./views/ioViews/InverterView";
import LogView from "./views/ioViews/LogView";
import PowerSourceView from "./views/ioViews/PowerSourceView";
import SensorView from "./views/ioViews/SensorView";
import UserForm from "./views/Forms/UserForm";
import ApplianceForm from "./views/Forms/ApplianceForm";
import BatteryForm from "./views/Forms/BatteryForm";
import InverterForm from "./views/Forms/InverterForm";
import PowerSourceForm from "./views/Forms/PoverSourceForm";
import SensorForm from "./views/Forms/SensorForm";
const router = createBrowserRouter([

    {
        path: '/',
        element: < DefaultLayout/>,
        children: [
                {
                    path: '/',
                    element: <Navigate to ="/dashboard"/>
                },
                {
                    path: '/users',
                    element: < Users/>
                },
                {
                    path: '/users/new',
                    element: <UserForm key="userCreate" />
                },
                {
                    path: '/users/:id',
                    element: <UserForm key="userUpdate" />
                },
                {
                    path: '/dashboard',
                    element: < Dashboard/>
                },
                {
                    path: '/appliance',
                    element: < ApplianceView/>
                },
                {
                    path: '/appliance/new',
                    element: <ApplianceForm key="applianceCreate"/>
                },
                {
                    path: '/appliance/:id',
                    element: <ApplianceForm key="applianceUpdate"/>
                },

                {
                    path: '/battery',
                    element: < BatteryView/>
                },
                {
                    path: '/battery/new',
                    element: <BatteryForm key="batteryCreate"/>
                },
                {
                    path: '/battery/:id',
                    element: <BatteryForm key="batteryUpdate"/>
                },
                {
                    path: '/inverter',
                    element: < InverterView/>
                },
                {
                    path: '/inverter/new',
                    element: <InverterForm key="inverterCreate"/>
                },
                {
                    path: '/inverter/:id',
                    element: <InverterForm key="inverterUpdate"/>
                },
                {
                    path: '/log',
                    element: < LogView/>
                },
                {
                    path: '/powersource',
                    element: < PowerSourceView/>
                },
                {
                    path: '/powersource/new',
                    element: <PowerSourceForm key="powersourceCreate"/>
                },
                {
                    path: '/powersource/:id',
                    element: <PowerSourceForm key="powersourceUpdate"/>
                },
                {
                    path: '/sensor',
                    element: < SensorView/>
                },
                {
                    path: '/sensor/new',
                    element: <SensorForm key="sensorCreate"/>
                },
                {
                    path: '/sensor/:id',
                    element: <SensorForm key="sensorUpdate"/>
                }
                
            
        ]
    },
    {
        path: '/',
        element: < GuestLayout/>,
        children:[
                {
                    path: '/login',
                    element: < Login/>
                },
                {
                    path: '/signup',
                    element: < Signup/>
                }
        ]
    },
    {
        path: '*',
        element: < NotFound/>
    },

    
    

])
export default router;