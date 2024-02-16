
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './component/Homepage';
import ViewSerCat from './component/ViewSerCat';
// import Homepage2 from './component/Homepage2';
// import UpdateCat from './component/UpdateCat';




function App() {
  return (
    <div className="App">
      
      <Routes>
         <Route exact path='/' element={<Homepage/>}/>
         <Route exact path='/view-category' element={<ViewSerCat/>}/>
         {/* <Route exact path='/update/:id' element={<UpdateCat/>}/> */}
         {/* <Route exact path='/homepage2' element={<Homepage2/>}/> */}
      </Routes>
     
    </div>
  );
}

export default App;
