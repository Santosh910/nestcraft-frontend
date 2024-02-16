import React, { useEffect, useState } from 'react'
import api from './AxiosConfig';

const SearchCat = () => {
    const [query, setQuery] = useState('');
    const [catego, setCatego] = useState([])

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

    
        
        const filtered = catego.filter(item => item.category_name &&
            item.category_name.toLowerCase().includes(query.toLowerCase()))
     
    return (
        <div>
            <input style={{ width: "300px", height: "40px", marginTop: "10px", borderRadius: "15px", paddingLeft: "50px" }} type="text" placeholder='search category' value={query} onChange={(e)=>setQuery(e.target.value)} />

            <ul>
                {filtered.map((item) => (
                    <li key={item._id} >{item.category_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchCat