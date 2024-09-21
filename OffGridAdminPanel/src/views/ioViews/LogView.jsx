import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";

export default function LogView(){

    const [log, setLog] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        getLog();
      }, [])

    const getLog = () => {
        setLoading(true)
        axiosClient.get('/log') 
          .then(({ data }) => {
            setLoading(false)
            setLog(data)
          })
          .catch(() => {
            setLog(false)
          })
      }
    return(
        <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Production Log</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Total Production</th>
            <th>Total Load</th>
            <th>Battery status</th>
            <th>Create Date</th>
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
            {log.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.total_production}</td>
                <td>{l.total_load}</td>
                <td>NN</td>
                <td>{l.created_at}</td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
    )
}