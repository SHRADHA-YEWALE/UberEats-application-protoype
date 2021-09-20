import React , { useState }  from 'react'
import UbLogo from '../../assets/ubereats.png';
import { Link } from 'react-router-dom';
import ReorderIcon from "@material-ui/icons/Reorder";
import './Navbar.css';
function NavbarHome() {

    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
      };
    return (
    <div className = "navbar">
        <div className = "leftSide" id={openLinks ? "open" : "close"}>
            <img src= {UbLogo} /> 
            <div className="hiddenLinks">
            <Link to="/login"> Profile </Link> 
            <Link to="/signup"> Signout </Link>
            </div>
        </div>    
        <div className = "rightSide">
            <Link to="/login"> Profile </Link> 
            <Link to="/signup"> SignOut </Link>
        </div>    
    </div>
    );
}

export default NavbarHome;
