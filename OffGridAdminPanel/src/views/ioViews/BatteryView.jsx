import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import {Link} from "react-router-dom";


export default function BatteryView(){

  const [battery, setBattery] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext

  useEffect(() => {
    getBattery();
  }, [])

  const onDeleteClick = bat => {
  if(!window.confirm("Are you sure you want to delete this battery?")){
    return
  }
  axiosClient.delete(`/battery/${battery.id}`)
  .then(() => {
    setNotification('Battery was successfully deleted')
    getBattery()
  })
  } 

  const getBattery = () => {
    setLoading(true)
    axiosClient.get('/battery')
    .then(({data}) => {
      setLoading(false)
      setBattery(data)
    })
    .catch(() => {
      setLoading(false)
    })
  }
  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Batteries</h1>
        <Link className="btn-add" to="/battery/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Charging current</th>
            <th>State of charge</th>
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
            {battery.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.capacity}</td>
                <td>{b.state_of_charge}</td>
                <td>{b.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/battery/' + b.id}>Edit</Link> 
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(b)}>Delete</button>
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