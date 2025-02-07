
import { useState,useEffect } from "react";

const MakeUpApp = () =>{
  const [products, setProducts] = useState([]);
  

  const fetchMakeUpApi = async () =>{

    try{
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const makeupData = await response.json();
      setProducts(makeupData);
      console.log(makeupData)

    }catch(error){
      console.error("Error fetching makeup products:" , error)
    }
  }
  useEffect(()=>{
    const fetchData = async () =>{
      await fetchMakeUpApi();
    };
    fetchData();
  }, [])

  return(
    <div>
      <h1>Makeup Products Showcase</h1>
      <button onClick={fetchMakeUpApi}> Refresh Products</button>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image_link} alt={product.name} />
            <h2>{product.name}</h2>
            <p>💰${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MakeUpApp;