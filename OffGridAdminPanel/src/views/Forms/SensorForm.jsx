import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function SensorForm(){

    const navigate = useNavigate();
  let {id} = useParams();
  const [sensor, setSensor] = useState({
    id: null,
    name: '',
    at_device: '',
  })
  
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
  
    //  ovde unosim podatke u formu

    useEffect(() => {
        if (id) {
        setLoading(true)
        axiosClient.get(`/sensor/${id}`)
          .then(({data}) => {
            setLoading(false)
            setSensor(data)
          })
          .catch(() => {
            setLoading(false)
          })
          }    
      }, [])
     
     
    
  
    const onSubmit = ev => {
      ev.preventDefault()
      if (sensor.id) {
        axiosClient.put(`/sensor/${sensor.id}`, sensor)
          .then(() => {
            setNotification('User was successfully updated')
            navigate('/sensor')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      } else {
        axiosClient.post('/sensor', sensor)
          .then(() => {
            setNotification('Sensor was successfully created')
            navigate('/sensor')
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    }
  
    

    
    
      return (
        <>
          {sensor.id && <h1>Update sensor: {sensor.name}</h1>}
          {!sensor.id && <h1>New Sensor</h1>}
          <div className="card animated fadeInDown">
            {loading && (
              <div className="text-center">
                Loading...
              </div>
            )}
            {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
            {!loading && (
              <form onSubmit={onSubmit}>
                <input value={sensor.name} onChange={ev => setSensor({...sensor, name: ev.target.value})} placeholder="Name"/>
                <input value={sensor.at_device} onChange={ev => setSensor({...sensor, at_device: ev.target.value})} placeholder="Sensor Location"/>
              </form>
            )}
          </div>
        </>
      )
  }