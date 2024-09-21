

import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function PowerSourceView() {
  const [powerSource, setPowerSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getPowerSource();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this powerSource?")) {
      return
    }
    axiosClient.delete(`/powersource/${powerSource.id}`) 
      .then(() => {
        setNotification('powerSource was successfully deleted')
        getPowerSource()
      })
  }

  const getPowerSource = () => {
    setLoading(true)
    axiosClient.get('/powersource') 
      .then(({ data }) => {
        setLoading(false)
        setPowerSource(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Users</h1>
        <Link className="btn-add" to="/powersource/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Max output</th>
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
            {powerSource.map(ps => (
              <tr key={ps.id}>
                <td>{ps.id}</td>
                <td>{ps.name}</td>
                <td>{ps.type}</td>
                <td>{ps.max_output}</td>
                <td>{ps.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + ps.id}>Edit</Link> 
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(ps)}>Delete</button>
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
