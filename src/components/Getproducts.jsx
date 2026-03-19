import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const Getproducts = () => {

  // Initialize the hook to help you manage the state of your application
  const [products , setProducts]= useState([]);
  const [loading,setLoading]=useState(false);
  const [error, setError]=useState("");


  // Below we specify the image base url
  const img_url = "https://telvin.alwaysdata.net/static/images/"


  //create a function to help you fetch products from your API
  const fetchProducts = async() =>{
    try{
      // Update the loading hook
      setLoading(true)
      // Interact with your endpoint for fetching the products
      const response = await axios.get("https://telvin.alwaysdata.net/api/get_products")

      // update the products hook with the response given by the API
      setProducts(response.data)

      // Set the loading hook back to default
      setLoading(false)

    }
    catch(error){
      // Step 8
      // If there is an error 
      // set the loading back to default
      setLoading(false)

      //update the error hook with a message
      setError(error.message)

    }
  } 

  // we shall use the useEffect hook .This hook enables use to automatically re-render new features incase of any changes.
  useEffect(() => {
    fetchProducts()
  },[]) 


  // console.log("The products fetched are..",products)
  return (
    <div className='row'>
      <h3 className="text-primary">Available Products</h3>
      {loading && <Loader/>}
      <h4 className="text-danger">{error}</h4>

      {/* map the products fetched from the API to the user interface */}

      {products.map((product) => (
        <div className="col-md-3 justify-content-center mb-3">
       <div className="card shadow">
         <img src={img_url + product.product_photo}
          alt="product name" 
          className='product_img mt-3'/>

          
         <div className="card-body">
          <h5 className="text-primary">{product.product_name}</h5>
          <p className="text-dark">{product.product_description.slice(0,100)}....</p>
          <h4 className="text-warning">Kes {product.product_cost}</h4>
         </div>
       </div>
      </div>

      ) )}
  
    </div>
  )
}

export default Getproducts;
