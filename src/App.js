import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userData, setData] = useState([]);
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmailId] = useState('');



 

  const click = () => {

 

    fetch("http://localhost:9901/getAll")

 

      .then((response) => response.json())

 

      .then((userData) => {

 

        setData(userData);

 

      });

 

  };

  const updateUserId = (event) =>
  {
    setUserId(event.target.value);

  }

  const updatePassword = (event) =>
  {
    setPassword(event.target.value);

  }

  const updateEmail = (event) =>
  {
    setEmailId(event.target.value);

  }

  const [showData, setShowData] = useState(false);

 

  const handleButtonClick = () => {
    setShowData(true);
  };

  const insertUser=(event)=>{
    event.preventDefault();
      axios.post("http://localhost:9901/insert",{userid:userid,password:password,emailid:email}).then(res => console.log(res));
  }
  const deleteUser = (event) => {
    event.preventDefault();
    axios.delete("http://localhost:9901/delete?userid=" + userid) // Pass the user ID as a query parameter
      .then((res) => {
        console.log(res);
       
      
      });
  }
  const updateUser=(event)=>{
    event.preventDefault();
    axios.put('http://localhost:9901/update',{userid:userid,password:password,emailid:email}).then(res=>console.log(res));
  }
  useEffect(() => {
    // fetch('http://localhost:9000/getAll')
    //   .then((response) => response.json())
    //   .then(data => {
    //     setData(data)
    //   });
  }, []);
  return (
    <div>
      {/* <button onClick={handleButtonClick}>Show Data</button>

{showData && (

  <ul>

    {data.map((item, index) => (

      <li key={index}>

        UserID: {item.userid}<br />

        Password: {item.password}<br />

        E-mail: {item.emailid}

        <hr />

      </li>

    ))}

  </ul>

)} */}
<center>
     <form onSubmit={insertUser}>
      <b>User ID</b><input type="text" value={userid} onChange={updateUserId} /> <br />
      <b>Password</b><input type = "password" value={password} onChange={updatePassword} /><br />
      <b>Email ID</b><input type = "email" value = {email}  onChange={updateEmail}/> <br />
      <input type = "submit" value="Add" />  
      <input type="reset" value = "Reset " />
      <button type="button" onClick={deleteUser}>Delete</button>
      <button type="button" onClick={updateUser}>Update</button>
      <button type="button" onClick={click} value="" >DisplayAllUser</button>
     </form>
     </center>
     <table style={{ border: "2px solid black" }}>

 

        <tr> <th>User ID</th> <th>Password</th> <th>Email ID</th></tr>

 

        {Array.isArray(userData)? (

 

            userData.map((user,index) => (

 

                <tr key={index}>

 

                <td>{user.userid} </td>

 

               <td>{user.password}</td>

 

            <td>{user.emailid}</td>

 

          </tr>)

 

        )):

 

        setData([])

 

          }

 

      </table>
    </div>
  );
}

export default App;
