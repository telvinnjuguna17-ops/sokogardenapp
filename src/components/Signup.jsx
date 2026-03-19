import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  // initialize the hooks
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [phone , setPhone] = useState("");

  //Define the three states an application can be in: loading, success, and error
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Below is a function that will handle the submit action.
  const handleSubmit = async(e) => {
    // below we prevent our site from refreshing when the submit button is clicked.
    e.preventDefault();

    // update our loading hook with a message that will be displayed to the users that are trying to register.
    setLoading("Registering...");

    try {
      // Create a form data object that will enable  you capture the four details that the user has entered in the form.
      const formData = new FormData();
      // Insert the four details (username, email, password, phone) in terms of key and value pairs in the form data object.
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);

      //by use of axios we can access the method post
      const response =await axios.post('https://telvin.alwaysdata.net/api/signup', formData);

      // set back the loading default
      setLoading("");

      // just incase everything goes well we update our success hook with a message .
      setSuccess(response.data.message)

      //Clear your hooks
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
    }
     catch (error) {
      // set the loading hook back to default
      setLoading("")
      
      // update the error hook with the message given back from the response
      setError(error.message)
    } 
    setTimeout(() =>{
      setSuccess("");
    },5000);
    
  }

  return (
    <div className='row justify-content-center mt-4'>
       <div className='card col-md-6 shadow p-4'>
          <h1 className='text-primary'>Sign Up</h1>
          <h5 className='text-secondary'>{loading}</h5>
          <h3 className='text-success'>{success}</h3>
          <h4 className='text-danger'>{error}</h4>
          

          <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder='Enter the Username'
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/> <br />

            {/* {username} */}

            <input type="email"
            placeholder='Enter the Email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/> <br />

            {/* {email} */}

            <input type="password"
            placeholder='Enter the Password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/> <br />

            {/* {password} */}

            <input type="number"
            placeholder='Enter the Phone Number'
            className='form-control'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required/> <br />

            {/* {phone} */}

            <input type="submit" value="Sign Up" className='btn btn-primary'/><br />

            already have an account? <Link to={"/signin"}>Login</Link>

          </form>
       </div>
    </div>
  )
}

export default Signup;
//  Research on Axios  module in reactjs
