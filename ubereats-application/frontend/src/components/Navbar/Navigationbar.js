import React , { useState }  from 'react'
import UbLogo from '../../assets/uberEatsLogo.png';
import { Link } from 'react-router-dom';
import ReorderIcon from "@material-ui/icons/Reorder";
import './Navbar.css';
function Navigationbar() {

    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
      };
    return (
    <div className = "navbar">
        <div className = "leftSide" id={openLinks ? "open" : "close"}>
            <img width= "800" height = "100" src= { UbLogo }  /> 
            <div className="hiddenLinks">
            <Link to="/customerLogin"> Login </Link> 
            <Link to="/customerSignup"> Signup </Link>
            </div>
        </div>    
        <div className = "rightSide">
            <Link to="/customerLogin"> Login </Link> 
            <Link to="/customerSignup"> Signup </Link>
        </div>    
    </div>
    );
}

export default Navigationbar;
