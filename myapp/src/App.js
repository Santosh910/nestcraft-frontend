
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './component/Homepage';
import ViewSerCat from './component/ViewSerCat';




function App() {
  return (
    <div className="App">
      
      <Routes>
         <Route exact path='/' element={<Homepage/>}/>
         <Route exact path='/view-category' element={<ViewSerCat/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
