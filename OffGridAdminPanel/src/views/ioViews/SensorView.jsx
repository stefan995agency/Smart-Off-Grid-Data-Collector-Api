import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {Link} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function SensorView(){

    const [sensor, setSensor] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getSensors();
      }, [])

    const onDeleteClick = sensor => {
        if (!window.confirm("Are you sure you want to delete this Sensor?")) {
          return
        }
        axiosClient.delete(`/sensor/${sensor.id}`) 
          .then(() => {
            setNotification('Sensor was successfully deleted')
            getSensors()
        })
    }
    const getSensors = () => {
        setLoading(true)
        axiosClient.get('/sensor') 
          .then(({ data }) => {
            setLoading(false)
            setSensor(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }
  
    
      return (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Sensors</h1>
            <Link className="btn-add" to="/sensor/new">Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>at_device</th>
                <th>voltage</th>
                <th>current</th>
                <th>power</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }
              {!loading &&
                <tbody>
                {sensor.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.at_device}</td>
                    <td>{u.voltage}</td>
                    <td>{u.current}</td>
                    <td>{u.power}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/sensor/' + u.id}>Edit</Link> 
                      &nbsp;
                      <button className="btn-delete" onClick={ ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              }
            </table>
          </div>
        </div>
      )

    
}