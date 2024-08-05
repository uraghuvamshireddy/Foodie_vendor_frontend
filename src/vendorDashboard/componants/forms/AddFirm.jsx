import React,{useState} from 'react'
import { API_URL } from '../../data/apipath';

const AddFirm=()=> {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleImageUpload = (e)=>{
const image = e.target.files[0];
setFile(image);
  }

  const handleCategoryChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value]);
    }
  }
  const handleRegionChange=(e)=>{
    const value=e.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value));
    }else{
      setRegion([...region,value]);
    }
  }

  const handleFirmSubmit = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.log("User not authenticated");
      }
      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append('offer',offer);
      formData.append('file',file);
      category.forEach((value)=>{
        formData.append('category',value);
      });
      region.forEach((value)=>{
        formData.append('region',value);
      });
     const response = await fetch(`${API_URL}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${loginToken}`
      },
      body: formData

     });
     const data = await response.json();
     if(response.ok){
      console.log(data);
      setFirmName("");
      setArea("")
      setCategory([]);
      setRegion([]);
      setOffer("");
      setFile(null)
      alert("firm added successfully");

     }
     else if(data.message==="vendor can have only one firm"){
      alert("vendor can have only one firm");
     }else{
      alert("Failed to add firm");
     }
     const firmId = data.firmId;
     const vendorRestuarant = data.vendorFirmName

     localStorage.setItem('firmId', firmId);

    } catch (error) {
      console.log("Failed ");
      
    }
  }


  return (
    <div className='firmSection'>
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
        <label htmlFor="">Firm Name</label>
        <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)} /><br />
        <label htmlFor="">Area</label>
        <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
        {/* <label htmlFor="">Category</label>
        <input type="text" /><br /> */}
        <div className="checkInp">
            <label htmlFor="">Category :</label>
           <div className="inputsContainer">
           <div className="checkboxContainer">
                <label htmlFor="">Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')}  onChange={handleCategoryChange}/>
          
            </div>
            <div className="checkboxContainer">
            <label htmlFor="">Non-Veg</label>
            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
            </div>
           </div>
        </div>
        {/* <label htmlFor="">Region</label>
        <input type="text" /><br /> */}
         <div className="checkInp">
            <label htmlFor="">Region :</label>
           <div className="inputsContainer">
           <div className="regboxContainer">
                <label htmlFor="">South-Indian</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
          
            </div>
            <div className="regboxContainer">
            <label htmlFor="">North-Indian</label>
            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
            </div>
            <div className="regboxContainer">
            <label htmlFor="">Chinese</label>
            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
            </div>
            <div className="regboxContainer">
            <label htmlFor="">Bakery</label>
            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
            </div>
           </div>
        </div>
        <label htmlFor="">Offer</label>
        <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br />
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={handleImageUpload}/><br />

        <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
      </form>
    </div>
  )
}

export default AddFirm
