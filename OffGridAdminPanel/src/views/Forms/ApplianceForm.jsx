import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

export default function ApplianceForm(){
    const navigate = useNavigate();
    let {id} = useParams();
    const [appl, setAppliance] = useState({
        id: null,
        name: '',
        power_consumption: null

    }) 
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if(id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/appliance/${id}`)
            .then(({data}) => {
                setLoading(false)
                setAppliance(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
    }
   

    const onSubmit = ev => {
        ev.preventDefault()
        if (appl.id) {
          axiosClient.put(`/appliance/${appl.id}`, appl)
            .then(() => {
              setNotification('User was successfully updated')
              navigate('/appliance')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/appliance', appl) ///////////////
            .then(() => {
              setNotification('New appliance was successfully added')
              navigate('/appliance') ///////
              
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
          {appl.id && <h1>Update appliance: {appl.name}</h1>}
          {!appl.id && <h1>New Appliance</h1>}
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
                <input value={appl.name} onChange={ev => setAppliance({...appl, name: ev.target.value})} placeholder="Name"/>
                <input value={appl.power_consumption} onChange={ev => setAppliance({...appl, power_consumption: ev.target.value})} placeholder="Power in Watts"/>
                <button className="btn">Save</button>
              </form>
            )}
          </div>
        </>
      )
}