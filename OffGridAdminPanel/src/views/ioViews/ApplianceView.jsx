
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function ApplianceView() {
  const [appliance, setAppliance] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getAppliances();
  }, [])

  const onDeleteClick = appliance => {
    if (!window.confirm("Are you sure you want to delete this appliance?")) {
      return
    }
    axiosClient.delete(`/appliance/${appliance.id}`) 
      .then(() => {
        setNotification('Appliance was successfully deleted')
        getAppliances()
      })
  }

  const getAppliances = () => {
    setLoading(true)
    axiosClient.get('/appliance') 
      .then(({ data }) => {
        setLoading(false)
        setAppliance(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Appliances</h1>
        <Link className="btn-add" to="/appliance/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Power Consumption</th>
            <th>Create Date</th>
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
            {appliance.map(apl => (
              <tr key={apl.id}>
                <td>{apl.id}</td>
                <td>{apl.name}</td>
                <td>{apl.power_consumption}</td>
                <td>{apl.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/appliance/' + apl.id}>Edit</Link> 
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(apl)}>Delete</button>
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