import React, { useEffect, useState } from 'react';

import Header from '../component/Header'
import api from './AxiosConfig';
// import SearchCat from './SearchCat';


const Homepage = () => {

   
    const [catego, setCatego] = useState([])

    const [selectedItems, setSelectedItems] = useState([])





    const getCatgory = async () => {
        try {
            const { data } = await api.get("/categories/get-all")
            if (data.success) {
                console.log(data, "data here")
                setCatego(data.category)
            }
        } catch (error) {
            console.log(error, "something went wrong")
        }
    }

    useEffect(() => {

        getCatgory()
    }, [])

    const handleCheckBoxChange = (itemId) => {
        if (selectedItems.includes(itemId)) {
            selectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId])
        }
    }

    const handleDelete = async (_id) => {
        try {
            await api.delete('/categories/delete-item', { data: { ids: selectedItems } })
            getCatgory()
        } catch (error) {
            console.log("something went wrong", error)
        }
    }

    // const handleInputChange = async (event)=>{
    //     setQuery(event.target.value)
    // }

    // const handleSearch = async ()=>{
    //     try {
    //         const response = await api.get(`/categories/search?query = ${query}`)
    //         setQuery(response.data);
    //     } catch (error) {
    //         console.log(error,"something went wrong")
    //     }
    // }

    

    return (

        <div>
            <Header />

            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "200px", marginRight: "200px" }}>
                <input type="checkbox" style={{ width: "30px" }} />

                <h2>Service Category</h2>

               {/* <SearchCat/> */}
               <input style={{ width: "300px", height: "40px", marginTop: "10px", borderRadius: "15px", paddingLeft: "50px" }} type="text" placeholder='search category'  />



                <button style={{ width: "100px", height: "40px", marginTop: "10px", borderRadius: "15px", backgroundColor: "red" }} onClick={handleDelete}>Delete</button>
            </div>

            <div>{catego?.length ?

                <div>
                    {catego.map((cat) => (
                        <div style={{ display: "flex", marginLeft: "200px", width: "950px", justifyContent: "space-between", borderTop: "1px solid black", paddingTop: "10px", height: "60px" }}
                            key={cat._id}>
                            <div>
                                <input type="checkbox" checked={selectedItems.includes(cat._id)} onChange={() => handleCheckBoxChange(cat._id)} />
                            </div>

                            <div style={{ height: "80px" }}>
                                <img style={{ width: "50px", borderRadius: "50%", border: "1px solid black" }} src={cat.image} alt="img" />
                            </div>
                            <div style={{ marginRight: "500px", marginTop: "-30px" }}>
                                <h4 >{cat.category_name}</h4>
                                <p style={{ marginTop: "-20px" }}>{cat.description}</p>
                            </div>


                        </div>
                    ))

                    }
                </div>
                :
                <div>loading...</div>

            }

            </div>



        </div>
    )
}

export default Homepage