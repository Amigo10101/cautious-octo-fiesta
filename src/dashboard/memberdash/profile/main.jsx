import React,{useEffect,useState} from 'react'
import useToken from '../../../useToken';

export default function MemberProfile() {
  const [userid, setuserid] = useState(sessionStorage.getItem("accountid"))
  const{token}=useToken();
  useEffect(() => {
    const axios = require('axios');

let config = {
  method: 'post',
  url: 'https://backend-demo.revmd.co/api/v1/normal/memd-login/'+userid+'/',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    Authorization: "Token" + " " + `${token}`,
  }
};

axios(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

  
    
  }, [])
  
  return (
    <div></div>
  )
}
