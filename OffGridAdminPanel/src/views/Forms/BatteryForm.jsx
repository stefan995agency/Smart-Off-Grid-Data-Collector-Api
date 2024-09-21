import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";

export default function BatteryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [battery, setBattery] = useState({
    id: null,
    name: '',
    capacity: '',
    current_charge: '',
    state_of_charge: ''
  })
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();


  if (battery.id) {
    useEffect(() => {
    
      setLoading(true);
      axiosClient.get(`/battery/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setBattery(data);
        })
        .catch(() => {
          setLoading(false);
        })
      
    }, [])
  }



  const onSubmit = ev => {
    ev.preventDefault();
    if (battery.id) {
      axiosClient.put(`/battery/${battery.id}`, battery)
        .then(() => {
          setNotification('Battery was successfully updated');
          navigate('/battery');
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/battery', battery)
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
      {battery.id && <h1>Update appliance: {battery.name}</h1>}
          {!battery.id && <h1>New Battery</h1>}
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
                <input value={battery.name} onChange={ev => setBattery({...battery, name: ev.target.value})} placeholder="Name"/>
                <input value={battery.capacity} onChange={ev => setBattery({...battery, capacity: ev.target.value})} placeholder="Ah"/>
                <input value={battery.current_charge} onChange={ev => setBattery({...battery, current_charge: ev.target.value})} placeholder="A"/>
                <input value={battery.state_of_charge} onChange={ev => setBattery({...battery, state_of_charge: ev.target.value})} placeholder="Percents"/>
                <button className="btn">Save</button>
              </form>
            )}
      </div>
    </>
  );
}

