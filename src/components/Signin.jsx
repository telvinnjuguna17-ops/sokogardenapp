import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => { 
  //Define the two hooks for capturing/storing the users input
  const [email,setEmail]= useState("");
  const [password, setPassword] = useState("");

  // Declare the three additional hooks 
  const [loading ,setLoading]=useState("");
  const[success, setSuccess]=useState("")
  const[error,setError]=useState("");

  // below we use the useNavigate hook to redirect us to a diff page upon successful log in
  const navigate = useNavigate()

  //Below is the function to handle the signin action
  const handlesubmit = async(e) =>{
    // prevent the site from reloading
    e.preventDefault()

    // update the loading hook with a message
    setLoading("Validating your account...")

    try{
      //Create a formData object that will hold the email and the password
      const formdata = new FormData()

      // Insert/append the email and the password on the formData created.
      formdata.append("email",email);
      formdata.append("password",password)
      
      // Interact with axios for the response
      const response = await axios.post("https://telvin.alwaysdata.net/api/signin",formdata);

      //set the loading hook back to default
      setLoading("");

      // check whether the user exists as part of your response from the API
      if (response.data.user) {

        // Store user details in local storag
        localStorage.setItem("user", JSON.stringify(response.data.user))

        // if user is there definately the details entered during signin are correct
        setSuccess("Login successful")
        navigate("/");
      }
      else{
        //user is not found , that means the credentials entered on the form are incorrect
        setError("Login Failed.Please try again...")
      }

    }
    catch(error){
      // set loading back to default 
      setLoading("")

      //Update the error hook with a message
      setError("Oops,something went wrong .Try again...") 

    }

  }
  



  return (
    <div className='row justify-content-center mt-4'>
      <div className="col-md-6 card shadow p-4">
        <h1 className='text-primary'>Sign In</h1>

        <h5 className='text-info'>{loading}</h5>
        <h3 className="text-success">{success}</h3>
        <h4 className="text-danger">{error}</h4>

        <form onSubmit={handlesubmit}>
          <input type="email"
          placeholder='Enter the Email Address here....'
          className='form-control'
          required
          value={email}
          onChange={(e) =>setEmail(e.target.value)} /> <br />

          {/* {email} */}


          <input type="password"
          placeholder='Enter the password here...'
          className='form-control'
          required 
          value={password}
          onChange={(e) =>setPassword(e.target.value)}/> <br />

          {/* {password} */}

          <input type="submit"
          value="Signin"
          className='btn btn-primary' /> <br /> <br />

          Don't have an account? <Link to={"/signup"}>Register</Link>


        </form>
      </div>
    </div>
  )
}

export default Signin;
