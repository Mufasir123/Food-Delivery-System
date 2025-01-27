import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from './components/AdminHome';
import AddItems from './components/AddItems';
import ListItems from './components/ListItems';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <>
      <Router>
        <ToastContainer/>
        <Navbar/>
        <Routes>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="/add" element={<AddItems />} />
            <Route path="/list" element={<ListItems />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
