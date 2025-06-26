import React,{useState} from 'react'
import './home.css'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AboutUs from '../../components/AboutUs/aboutus';
import Staff from'../../components/Staffs/staff';
import Facility from '../../components/Facilities/facility';
import NearByHospitals from '../../components/NearByHospitals/nearByHospitals';
import Gallary from '../../components/Gallary/gallary';
import { Link } from 'react-router-dom';



const Home = (props) => {
    const[page,setPage]=useState("About")
    let[rightSideHeader,setRightSideHeader]= useState("About US");
    let userInfo =localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")) : null;

    const handleChangeTab=(PageName)=>{
        setPage(PageName);
        switch(PageName){
            case "About":
                setRightSideHeader("About US");
                break;
            case "Staff":
                setRightSideHeader("Our Staffs");
                break;
            case "Facility":
                setRightSideHeader("Facility");
                break;
            case "NearByHospitals":
                setRightSideHeader("Near By Hospitals");
                break;
            case "Gallary":
                setRightSideHeader("Gallary");
                break;
            default:
                setRightSideHeader("About Us");
        }
    }
    const getComponent = () =>{
        switch(page){
            case "About":
                return <AboutUs/>;
            case "Staff":
            
                return < Staff showLoader={props.showLoader} hideLoader={props.hideLoader}/>;
            case "Facility":
                return < Facility showLoader={props.showLoader} hideLoader={props.hideLoader}/>;
            case "NearByHospitals":
                return<NearByHospitals showLoader={props.showLoader} hideLoader={props.hideLoader}/>;
            case "Gallary":
                return < Gallary showLoader={props.showLoader} hideLoader={props.hideLoader}/>;
            default:
                return null;
        }
    }
    return (


        <div className='home'>
            <div className='home-block'>
                <div className='home-left-page'>
                    {
                        userInfo && userInfo?.role!=='student' && <Link to={'/admin/dashboard'} className={`home-left-option`} >
                        <HomeIcon/> Dashboard
                    </Link>
                    }
                    {
                        userInfo && userInfo?.role ==='student' && <Link to={`/student/${userInfo?._id}`} className={`home-left-option`} >
                        <HomeIcon/> Profile
                    </Link>
                    }
                    <div className={`home-left-option  ${page=="About"?"active-opt":null}`} onClick={()=> {handleChangeTab("About")}}>
                        <HomeIcon/> About Us
                    </div>
                    <div className={`home-left-option  ${page=="Staff"?"active-opt":null}`} onClick={()=> {handleChangeTab("Staff")}}>
                        <GroupIcon/> Staffs
                    </div>
                    <div className={`home-left-option  ${page=="Facilities"?"active-opt":null}`} onClick={()=> {handleChangeTab("Facility")}}>
                        <Diversity3Icon/> Facilities
                    </div>
                    <div className={`home-left-option  ${page=="NearByHospitals"?"active-opt":null}`} onClick={()=> {handleChangeTab("NearByHospitals")}}>
                        <LocalHospitalIcon/> Near By Hospitals
                    </div>
                    <div className={`home-left-option  ${page=="Gallary"?"active-opt":null}`} onClick={()=> {handleChangeTab("Gallary")}}>
                        < InsertPhotoIcon /> Gallary
                    </div>
                </div>
                <div className='home-right-page'>
                    <div className='home-right-header'>
                        {rightSideHeader}
                    </div>
                    <div className="home-right-section">
                        {getComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
