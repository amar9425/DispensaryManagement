import React, { useEffect, useState } from 'react';
import './gallary.css';
import axios from 'axios';

const Gallary = (props) => {
  const [data, setData] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URL; // <-- use env variable

  useEffect(() => {
    const fetchData = async () => {
      props.showLoader();
      try {
        const response = await axios.get(`${API}/api/gallary/get`, {
          withCredentials: true,
        });
        setData(response.data.images);
      } catch (err) {
        console.error(err);
      } finally {
        props.hideLoader();
      }
    };

    fetchData();
  }, []);

  return (
    <div className='gallary-home'>
      {data.map((item, index) => (
        <div key={index} className='gallary-home-image-block'>
          <img src={item.link} className='gallary-home-image' alt={`gallery-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Gallary;
