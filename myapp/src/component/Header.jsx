import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Header = () => {
    const [sideNav, setSideNav] = useState(false)
    const [catego,setCatego] = useState({category_name:"",description:"",image:null})

    const router = useNavigate()

    const handleChange = (event)=>{
        setCatego({...catego,[event.target.name]:event.target.value})
    }
    const handleFileChange = (event)=>{
        setCatego({...catego,image:event.target.files[0]})
    }

    const handleSubmit = async(event)=>{
        event.preventDefault()
        const formData = new FormData();
        formData.append('category_name',catego.category_name);
        formData.append('description',catego.description);
        formData.append('image',catego.image);
            try {
                 await axios.post("http://localhost:8000/api/v1/categories/add-cat",formData,{
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                  window.location.reload()
                
            } catch (error) {
                console.log(error,"something went wrong")
            }
            
    }
  return (
    <div>
          <div style={{ display: "flex", justifyContent: "space-between", height: "50px", marginTop: "50px", marginBottom: "100px" }}>
                <div style={{ marginLeft: "200px", color: "blue", cursor: "pointer" }} onClick={()=>router('/view-category')}>
                    <h3>Views Service Category</h3>
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

                                <form onSubmit={handleSubmit} style={{ textAlign: "start", marginLeft: "50px" }}>
                                    <div style={{marginTop:"10px"}}>
                                        <label style={{fontWeight:"bold"}}>Category Name</label><br />
                                        <input style={{width:"320px",height:"35px",marginTop:"5px",borderRadius:"5px",paddingLeft:"10px",marginBottom:"10px"}} type="text" placeholder='eg.Hair service' name='category_name' onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label style={{fontWeight:"bold"}}>Description</label><br />
                                        <textarea style={{marginTop:"8px",marginBottom:"8px"}} name="description"  cols="42" rows="10" onChange={handleChange}></textarea>
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
  )
}

export default Header