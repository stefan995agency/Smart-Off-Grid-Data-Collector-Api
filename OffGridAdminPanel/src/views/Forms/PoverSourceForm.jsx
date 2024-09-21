import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
export default function PowerSourceForm(){
    
    const navigate = useNavigate();
    let {id} = useParams();
    const [powerSource, setPowerSource] = useState({
        id: null,
        name: '',
        type: '',
        max_output: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

     
        useEffect(() => {
        if (id) {
          setLoading(true)
          axiosClient.get(`/powersource/${id}`)
            .then(({data}) => {
              setLoading(false)
              setPowerSource(data)
            })
            .catch(() => {
              setLoading(false)
            })
        }
        }, [])
      

      const onSubmit = ev => {
        ev.preventDefault()
        if (powerSource.id) {
          axiosClient.put(`/powersource/${powerSource.id}`, powerSource)
            .then(() => {
              setNotification('User was successfully updated')
              navigate('/powersource')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/powersource', powerSource)
            .then(() => {
              setNotification('User was successfully created')
              navigate('/powersource')
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
          {powerSource.id && <h1>Update Power Source: {powerSource.name}</h1>}
          {!powerSource.id && <h1>New Power Source</h1>}
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
                <input value={powerSource.name} onChange={ev => setPowerSource({...powerSource, name: ev.target.value})} placeholder="Name"/>
                <input value={powerSource.type} onChange={ev => setPowerSource({...powerSource, type: ev.target.value})} placeholder="Type"/>
                <input value={powerSource.max_output} onChange={ev => setPowerSource({...powerSource, max_output: ev.target.value})} placeholder="Max Output"/>
                
                <button className="btn">Save</button>
              </form>
            )}
          </div>
        </>
    )
}
    
    
    
