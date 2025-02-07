
import { useState,useEffect } from "react";

const MakeUpApp = () =>{
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const fetchMakeUpApi = async () =>{

    try{
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const makeupData = await response.json();
      console.log(makeupData)
      setProducts(makeupData);

      const allBrands = makeupData.map((product)=> product.brand);
      const validBrands = allBrands.filter(Boolean);
      const uniqueBrands = [...new Set(validBrands)];
      setBrand(uniqueBrands);

    }catch(error){
      console.error("Error fetching makeup products:" , error)
    }
  }
  
  useEffect(()=>{
    fetchMakeUpApi()
  }, [])

  const filteredProducts = selectedBrand
  ? products.filter((product) => product.brand === selectedBrand)
  : products;

  return(
    <div>
      <h1>Makeup Products Showcase</h1>
      <label htmlFor="brand-select">Filter By Brand: </label>
      <select
        id="brand-select"
        value={selectedBrand}
        onChange ={(e) => setSelectedBrand(e.target.value)}
      >
        <option>All brands</option>
        {brand.map((brand) => (
          <option key={brand} value={brand}> {brand} </option>
        ))}
      </select>

      <button onClick={fetchMakeUpApi} > Choose Products</button>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img src={product.image_link} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>💰{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MakeUpApp;