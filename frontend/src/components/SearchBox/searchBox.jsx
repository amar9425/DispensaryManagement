import React from 'react';
import './searchBox.css'
import SearchIcon from '@mui/icons-material/Search';

const SearchBox= (props) => {
    const placeholder=props.placeholder?props.placeholder:"";
    const value=props.value?props.value:"";

    const handleoOnChange=( event )=>{
      if(props.onChange){
        props.onChange(event.target.value);
      }

    }

    const handleClick = () => {
      if(props.handleClick) {
        props.handleClick();
      }
    }


  return (
    <div className='page-searchBox'>
        <input className='input-box' value={value} onChange={(event)=>handleoOnChange(event)} placeholder={placeholder} />
        <div className='search-button' onClick={handleClick}><SearchIcon/></div>


    </div>
  )
}

export default SearchBox
