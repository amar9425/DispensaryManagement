import React,{useState} from 'react'
import './registerStudent.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import SearchBox from '../../../components/SearchBox/searchBox';
import Modal from '../../../components/Modal/modal';
import Report from './Report/report';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const RegisterStudent=(props)=>{
    const [searchStudent,setSearchStudent]=useState("");
    const [reportModal,setReportModal]=useState(false);

    const[studentDetail,setStudentDetail]=useState({_id:"",email:"",name:"",roll:"",mobileNo:"",fatherMobileNo:"",Adress:"",healthIssue:"",age:"",bloodGroup:""});
    const handleOnChangeInputField=(event,key)=>{
        setStudentDetail({...studentDetail,[key]:event.target.value});
    }

    const openCloseModal=()=>{
        setReportModal(prev=>!prev);
    }

    const handleOnChange =(value)=>{
        setSearchStudent(value);


    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        

    }

    const handleSearch=async()=>{
        if(searchStudent.trim().length===0){
            return toast.error("Please enter roll no.");
        }
        props.showLoader();
        await axios.get(`${API}/api/auth/get-student-by-roll/${searchStudent}`,{withCredentials:true}).then((response)=>{
            console.log(response)
           // toast.success(response.data.message);
            setStudentDetail({...studentDetail,...response.data.student})
        }).catch((err)=>{
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"",fatherName:"",fatherMobile:"",address:"",previous_health:"",age:"",bloodGroup:""});
            toast.error(err?.response?.data?.error);
        }).finally(()=>{
            props.hideLoader();
        })

    }


    const handleUpdateFunc = async()=>{
        if(studentDetail.name.trim().length===0 || studentDetail.email.trim().length===0 || String(studentDetail.roll).trim().length===0 || studentDetail.mobileNo.trim().length===0) return toast.error("Name,Mobile nO and Roll cantbe empty ");
        props.showLoader();
        const {_id,updatedAt,...student} = {...studentDetail};
        await axios.put(`${API}/api/auth/update-student/${_id}`,student,{withCredentials:true}).then(response=>{
            console.log(response)
            toast.success(response.data.message);

        }).catch(err=>{
            toast.error(err?.response?.data?.error);
            console.log(err);

        }).finally(()=>{
            props.hideLoader()
        })


    }
    const registerStudent = async()=>{
        if(String(studentDetail.name).trim().length ===0 || String(studentDetail.email).trim().length===0 || String(studentDetail.roll).trim().length===0 || String(studentDetail.mobileNo).trim().length===0) return toast.error("Name,Mobile No,Email and Roll cant be empty");
         props.showLoader();
         await axios.post(`${API}/api/auth/registerStudentByStaff`,studentDetail,{withCredentials:true}).then(response=>{
            toast.success(response.data.message);

        }).catch(err=>{
            console.log(err);
            setStudentDetail({_id:"",email:"",name:"",roll:"",mobileNo:"",fatherName:"",fatherMobile:"",address:"",previous_health:"",age:"",bloodGroup:""})
            toast.error(err?.response?.data?.error);

        }).finally(()=>{
            props.hideLoader()
        })



    }




    return(
        <div className='register-student'>
            <div className='go-back'><Link to={'/admin/dashboard'}><ArrowBackIcon/>Back To DashBoard</Link></div>

            <SearchBox handleClick={handleSearch} placeholder={"Search by roll no."} value={searchStudent} onChange={handleOnChange}/>

            <div className='register-form-block'>
                <div className='register-form-header'>Register Student</div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <div className='register-form-div'>
                        <div className='register-input-box'>
                            <input value={studentDetail.name} onChange={(event)=>handleOnChangeInputField(event,"name")} className='input-box-register' placeholder='Student Name' type="text" />


                        </div>
                        <div className='register-input-box'>
                            <input disabled={studentDetail?._id} value={studentDetail.email} onChange={(event)=>handleOnChangeInputField(event,"email")} className='input-box-register' placeholder='Email' type="email" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.roll} onChange={(event)=>handleOnChangeInputField(event,"roll")} className='input-box-register' placeholder='Roll No.' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.mobileNo} onChange={(event)=>handleOnChangeInputField(event,"mobileNo")} className='input-box-register' placeholder='Mobile No.' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherName} onChange={(event)=>handleOnChangeInputField(event,"fatherName")} className='input-box-register' placeholder='fatherName' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.fatherMobile} onChange={(event)=>handleOnChangeInputField(event,"fatherMobile")} className='input-box-register' placeholder='fatherMobile' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.address} onChange={(event)=>handleOnChangeInputField(event,"address")} className='input-box-register' placeholder='address' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.previous_health} onChange={(event)=>handleOnChangeInputField(event,"previous_health")} className='input-box-register' placeholder='Previous Health issue' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.age} onChange={(event)=>handleOnChangeInputField(event,"age")} className='input-box-register' placeholder='Age' type="text" />
                            

                        </div>
                        <div className='register-input-box'>
                            <input value={studentDetail.bloodGroup} onChange={(event)=>handleOnChangeInputField(event,"bloodGroup")} className='input-box-register' placeholder='Blood Group' type="text" />
                            

                        </div>
                    </div>
                   {
                    studentDetail?._id? <div className='block-divs'>
                        <button type='submit' className='form-btn reg-btn'onClick={handleUpdateFunc}>Update</button>
                        <button type='submit' className='form-btn reg-btn' onClick={openCloseModal}>Report</button>
                    </div>
                    :<button type='submit' className='form-btn reg-btn' onClick={registerStudent}>Register</button>

                   }
                </form>
            </div>
            {reportModal && <Modal header="Report" handleClose={openCloseModal} children={<Report studentDetail={studentDetail}/>}/>}
            <ToastContainer />
        </div>
    )
}
export default RegisterStudent
