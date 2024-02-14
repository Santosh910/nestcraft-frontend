import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const ViewSerCat = () => {
    const [serCat,setSerCat] = useState({services:"",category:"",price:"",duration:"",gender:""})
    

    const [getSerCat,setGetSerCat] = useState([])

    const [categoryData,setCategoryData] = useState({})

    const router = useNavigate()
    
    const [category,setCategory] = useState([])

    const [sideNav, setSideNav] = useState(false)
    const [catego,setCatego] = useState({category_name:"",description:"",image:null})

    useEffect(()=>{
        const getCatgory = async()=>{
              try {
                  const {data} = await axios.get("http://localhost:8000/api/v1/categories/get-all")
                  if(data.success){
                         console.log(data,"data here")
                         setCategory(data.category)
                  }
              } catch (error) {
                  console.log(error,"something went wrong")
              }
        }
        getCatgory()
    },[])

    

    

    const handleChange = (event)=>{
        setSerCat({...serCat,[event.target.name]:event.target.value})
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(serCat.services && serCat.category && serCat.price && serCat.duration && serCat.gender){
            try {
                const response = await axios.post("http://localhost:8000/api/v1/sercategory/add-sercat",{serCat})
                if(response.data.success){
                    console.log(response.data,"sercat added successfully...")
                    setSerCat({services:"",category:"",price:"",duration:"",gender:""})

                    window.location.reload()
                    
                }
            } catch (error) {
                console.log(error,"something went wrong")
            }
        }
    }

    const getAllData = async()=>{
        try {
            const {data} = await axios.get("http://localhost:8000/api/v1/sercategory/get-allcat")
            if(data.success){
                console.log(data,"data here")
                setGetSerCat(data.serCategory)
            }
        } catch (error) {
            console.log("something went wrong",error)
        }
    }

    useEffect(()=>{
       
        getAllData()
    },[])

    const handleUpdate = (event)=>{
        setCategoryData({...categoryData,[event.target.name]:event.target.value})
    }

    const handleUpClick = async(event)=>{
        event.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:8000/api/v1/sercategory/update-cat",{categoryData})
            console.log(data,"data updated")
        } catch (error) {
            console.log(error,"something went wrong")
        }
    }

    const handleDelete = async (_id)=>{
        try {
             await axios.delete('http://localhost:8000/api/v1/sercategory/delete-cat',{params:{_id}})
             getAllData()
        } catch (error) {
            console.log("something went wrong",error)
        }
    }

   

    

    const handleChange1 = (event)=>{
        setCatego({...catego,[event.target.name]:event.target.value})
    }
    const handleFileChange = (event)=>{
        setCatego({...catego,image:event.target.files[0]})
    }

    const handleSubmit1 = async(event)=>{
        event.preventDefault()
        const formData = new FormData();
        formData.append('category_name',catego.category_name);
        formData.append('description',catego.description);
        formData.append('image',catego.image);
            try {
                 await axios.post("http://localhost:8000/api/v1/categories/add-cat",{catego},{
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                
            } catch (error) {
                console.log(error,"something went wrong")
            }
            
    }

    

   
  return (
    <div>
         <div>
          <div style={{ display: "flex", justifyContent: "space-between", height: "50px", marginTop: "50px", marginBottom: "100px" }}>
                <div style={{ marginLeft: "200px", color: "blue", cursor: "pointer" }} onClick={()=>router('/')}>
                    <h3>View Service</h3>
                </div>

                <button style={{ marginRight: "200px", paddingLeft: "50px", paddingRight: "50px", borderRadius: "15px", fontSize: "20px", fontWeight: "bold", background: "lightGreen", color: "white", border: "none", cursor: "pointer" }} onClick={() => setSideNav(!sideNav)}>
                    Add New Category +
                </button>
            </div>

            {
                sideNav ? (
                    <div style={{
                        position: "fixed",
                        width: "100%",
                        height: "100vh",

                        top: "0%",
                        left: "0%", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "10"
                    }} onClick={() => setSideNav(!sideNav)} ></div>
                )
                    :
                    ("")
            }
            {
                <div>
                    {
                        sideNav ?
                            <div style={{ position: "fixed", top: "150px", left: "500px", width: "430px", backgroundColor: "white", zIndex: "10", borderRadius: "25px", height: "450px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "50px", borderBottom: "1px solid gray", height: "50px", width: "330px" }}>
                                    <div>
                                        <h3>Add New Service Category</h3>
                                    </div>
                                    <div style={{ marginTop: "25px", marginLeft: "80px" }} >
                                        <i onClick={()=>setSideNav(!sideNav)} className="fa-solid fa-xmark"></i>
                                    </div>


                                </div>

                                <form onSubmit={handleSubmit1} style={{ textAlign: "start", marginLeft: "50px" }}>
                                    <div style={{marginTop:"10px"}}>
                                        <label style={{fontWeight:"bold"}}>Category Name</label><br />
                                        <input style={{width:"320px",height:"35px",marginTop:"5px",borderRadius:"5px",paddingLeft:"10px",marginBottom:"10px"}} type="text" placeholder='eg.Hair service' name='category_name' onChange={handleChange1} />
                                    </div>

                                    <div>
                                        <label style={{fontWeight:"bold"}}>Description</label><br />
                                        <textarea style={{marginTop:"8px",marginBottom:"8px"}} name="description"  cols="42" rows="10" onChange={handleChange1}></textarea>
                                    </div>
                                    <div>
                                        <label style={{fontWeight:"bold"}}>Add Image</label><br />
                                        <input style={{marginTop:"8px"}} type="file" onChange={handleFileChange} name="image" />
                                    </div>
                                    <button style={{background:"black",color:"white ",marginLeft:"300px",width:"60px",height:"30px",borderRadius:"5px",outline:"none"}} type='submit'>Save</button>

                                </form>

                            </div>
                            :
                            <div style={{position:"fixed",top:"0%",left:"-100%"}}>
                                <i onClick={()=>setSideNav(!sideNav)}  className="fa-solid fa-xmark"></i>
                            </div>
                    }
                </div>
            }
    </div>
        <form onSubmit={handleSubmit}>
            <table width="1000px" align='center' >
                <thead>
                    <tr>
                        <th >
                            <input type="checkbox" name="allselect"   />
                        </th>
                        <th>Services</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {getSerCat.map((getS)=>(
                       <tr >
                        <th><input type="checkbox" value={getS._id} /></th>
                        
                        <td value={categoryData.services} name="services"  onChange={handleUpdate} >{getS.services}</td>
                        <td value={categoryData.category} name="category"  onChange={handleUpdate}>{getS.category}</td>
                        <td value={categoryData.price} name="price"  onChange={handleUpdate}>{getS.price}</td>
                        <td value={categoryData.duration} name="duration"  onChange={handleUpdate}>{getS.duration}min</td>
                        <td value={categoryData.gender} name="gender"  onChange={handleUpdate}>{getS.gender}</td>

                        <td style={{display:"flex",marginLeft:"20px",gap:"10px"}}>

                        <i onClick={()=>handleDelete(getS._id)} style={{background:"red",color:"white",width:"20px",height:"20px",borderRadius:"10px",paddingTop:"2px"}}  className="fa-solid fa-xmark"></i>
                        <i onClick={handleUpClick} class="fa-solid fa-pen-to-square"></i>
                        </td>
     
                       </tr> 
                    ))

                    }
                    <tr>
                        <th><input type="checkbox" /></th>
                        <td><input type="text" name="services" placeholder='Enter service name' onChange={handleChange}/></td>
                        <td><select name="category" onChange={handleChange} >
                            <option value="select category">select category</option>
                            {/* {category.map((item)=>{
                                <option >{item.category_name}</option>
                            })

                            } */}
                            <option value="Hair service">Hair Service</option>
                            <option value="massage">massage</option>
                            </select>
                        </td>
                        <td><input type="number" name='price' placeholder='enter amount' onChange={handleChange}/></td>
                        <td><input type="number" name='duration' placeholder='enter mint' onChange={handleChange}/></td>
                        <td><select name="gender" onChange={handleChange}>
                            <option value="select gender">select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="both">Both</option>
                            </select></td>
                        <td><button type='submit' style={{backgroundColor:"green",height:"25px",borderRadius:"5px"}}>Add More</button></td>
                    </tr>
                </tbody>
            </table>
            
        </form>
    </div>
  )
}

export default ViewSerCat