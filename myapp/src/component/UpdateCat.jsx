import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'

const UpdateCat = () => {
    const [categoryData,setCategoryData] = useState({})
    const [getSerCat,setGetSerCat] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        const getSingleCat = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/api/v1/categories/get-single?id=${id}`)
                if(response.data.success){
                   setCategoryData(response.data.category)
                }
            }catch(error){
                console.log(error)
            }
          }

        if(id){
            getSingleCat()
        }
      },[id])

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
  return (
    <div>
         <tbody>
              {getSerCat.map((getS)=>(
                       <tr >
                        <th><input type="checkbox" value={categoryData._id} key={getS._id}/></th>
                        
                        <td value={categoryData.services} name="services"  onChange={handleUpdate} >{getS.services}</td>
                        <td value={categoryData.category} name="category"  onChange={handleUpdate}>{getS.category}</td>
                        <td value={categoryData.price} name="price"  onChange={handleUpdate}>{getS.price}</td>
                        <td value={categoryData.duration} name="duration"  onChange={handleUpdate}>{getS.duration}min</td>
                        <td value={categoryData.gender} name="gender"  onChange={handleUpdate}>{getS.gender}</td>

                        <td style={{display:"flex",marginLeft:"20px",gap:"10px"}}>

                      
                        <i onClick={handleUpClick} class="fa-solid fa-pen-to-square"></i>
                        </td>
     
                       </tr> 
                        ))

                    }
                    </tbody>
    </div>
  )
}

export default UpdateCat