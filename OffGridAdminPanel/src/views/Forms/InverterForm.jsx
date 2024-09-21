import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";


export default function InverterForm(){
    const navigate = useNavigate();

    let {id} = useParams();
  const [inverter, setInvertor] = useState({
    id: null,
    name: '',
    input_voltage: '',
    output_voltage: '',
    output_current: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

   
    useEffect(() => {
      if (id) {
      setLoading(true)
      axiosClient.get(`/inverter/${id}`)
        .then(({data}) => {
          setLoading(false)
          setInvertor(data)
        })
        .catch(() => {
          setLoading(false)
        })
      }
    }, [])
  

  const onSubmit = ev => {
    ev.preventDefault();
    if (inverter.id) {
      axiosClient.put(`/battery/${inverter.id}`, inverter)
        .then(() => {
          setNotification('Battery was successfully updated');
          navigate('/invertor');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/inverter', inverter)
        .then(() => {
          setNotification('New battery was successfully added');
          navigate('/battery');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  }

  return (
    <>
      {inverter.id && <h1>Update inverter: {inverter.name}</h1>}
      {!inverter.id && <h1>New inverter</h1>}
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
            <input value={inverter.name} onChange={ev => setInvertor({...inverter, name: ev.target.value})} placeholder="Name"/>
            <input value={inverter.input_voltage} onChange={ev => setInvertor({...inverter, input_voltage: ev.target.value})} placeholder="input voltage"/>
            <input value={inverter.output_voltage} onChange={ev => setInvertor({...inverter, output_voltage: ev.target.value})} placeholder="output voltage"/>
            <input value={inverter.output_current} onChange={ev => setInvertor({...inverter, output_current: ev.target.value})} placeholder="output current"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )

}