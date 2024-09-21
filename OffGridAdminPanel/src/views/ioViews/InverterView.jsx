import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function InverterView(){
    const [inverter, setInverter] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getInverter();
      }, [])

     
    const onDeleteClick = ev => {
        if (!window.confirm("Are you sure you want to delete this inverter?")) {
          return
        }
        axiosClient.delete(`/inverter/${inverter.id}`) 
          .then(() => {
            setNotification('Inverter was successfully deleted')
            getInverter()
        })
    }

    const getInverter = () => {
        setLoading(true)
        axiosClient.get('/inverter') 
          .then(({ data }) => {
            setLoading(false)
            setInverter(data)
          })
          .catch(() => {
            setLoading(false)
          })
      }
   
      return (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
            <h1>Inverters</h1>
            <Link className="btn-add" to="/inverter/new">Add new</Link>
          </div>
          <div className="card animated fadeInDown">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>input voltage</th>
                <th>output voltage</th>
                <th>output current</th>
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
                {inverter.map(inv => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{inv.name}</td>
                    <td>{inv.input_voltage}</td>
                    <td>{inv.output_voltage}</td>
                    <td>{inv.output_current}</td>
                    <td>{inv.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/inverter/' + inv.id}>Edit</Link> 
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(inv)}>Delete</button>
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