import React,{useState,useEffect} from 'react';
import './stock.css'
import SearchBox from '../../components/SearchBox/searchBox';
import TableComp from '../../components/Table/tableComp';
import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_URL;

const Stock= (props) => {
    const[medicineName,setMedicineName]=useState("");
    const [stocks,setStocks] = useState([]);
    const handleInputchange=(value)=>{
      setMedicineName(value);
    }

    const headers=["Sr No.","Name","Quantity","Usage"];

    const getFormatedData=(data)=>{
      let newarr = data.map((item,ind)=>{
        return {
          srNo:ind+1+".",
          name:item.name,
          quantity:item.quantity,
          usage:item.usage
        }

      })
      setStocks(newarr);
    }

    const fetchData = async()=>{
      props.showLoader()
      await axios.get(`${API}/api/medicine/search-by-name?name=${medicineName}`,{withCredentials: true} ).then((response)=>{
    

        if(response.data.medicines.length === 0){
          setStocks([]);
        }
        getFormatedData(response.data.medicines);
        props.hideLoader();

        
      }).catch(err=>{
        console.log(err);
        //alert(err?.response?.data?.error || "Something went wrong");
      }).finally(()=>{
        props.hideLoader();
      })

    }


    useEffect(() => {
      fetchData()
    },[medicineName])
  return (
    <div className='stock-page'>
        <SearchBox placeholder="Search medicine" value={medicineName} onChange={handleInputchange}/>
    
        <div className='stock-page-card'>
          <TableComp header={headers} data={stocks}/>

        </div>
    </div>
  )
}

export default Stock
