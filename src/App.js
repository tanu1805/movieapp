
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './Components/Banner';
import Favourites from './Components/Favourites';
import  MovieList  from './Components/MovieList';
import NavBar from './Components/NavBar';



function App() {
  return (
    <BrowserRouter>
    <NavBar/>

    <Routes>
          <Route path='/' element={<><Banner/><MovieList/></>}/>
          <Route path='/favourites' element={<Favourites/>}/>
  
    </Routes>
    </BrowserRouter>

    
    
          

    
    
    
    
  );
}

export default App;
