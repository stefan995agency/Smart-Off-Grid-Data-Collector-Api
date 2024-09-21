import requests
import time
import random

api_url = "http://localhost:8000/api/sensor"
auth_token = "75|j63AlIeMfrDvW7U7sVvsh1OA3JCTilNmqXY2tvK878ca73cf"
def send_sensor_data():
    
    headers = {"Authorization": f"Bearer {auth_token}","Content-type": "application/json"}    
    data = {
        "at_device": "battery",
        "voltage": random.uniform(10.0, 100.0),
        "load": random.uniform(5.0, 50.0),          
        "current": random.uniform(50.0, 100.0)}                                                         
        

    try:
        response = requests.post(api_url, headers=headers, json=data, timeout=5)
        response.raise_for_status()
        json_data = response.json()
    # Handle ConnectionError
    except requests.exceptions.ConnectionError as ce:
        print('Connection error:', ce)
    # Handle Timeout
    except requests.exceptions.Timeout as te:
        print('Request timed out:', te)
    # Handle HTTPError
    except requests.exceptions.HTTPError as he:
        print('HTTP error occurred:', he)
    # Handle ValueError
    except ValueError as ve:
        print('JSON decoding error:', ve)
    else:
        print('Request was successful')
        print(json_data)

if __name__ == "__main__":
    while True:
        send_sensor_data()
        time.sleep(10)  
