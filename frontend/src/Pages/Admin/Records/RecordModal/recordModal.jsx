import React, {useState} from 'react';
import './recordModal.css';
const RecordModal = (props) =>{
    const [searchTerm, setSearchTerm] = useState('');
    const filteredMedicines = props.selectedHistory?.medicines?.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return(
        <div className='record-modal'>
            <div className='student-modal-report'>
                <div>{props.selectedHistory?.student?.name}</div>
                <div>{props.selectedHistory?.student?.email}</div>
                <div>{props.selectedHistory?.roll}</div>
            </div>

            {/* 🔍 Search Input Field */}
      <div className='student-search'>
        <input
          type='text'
          placeholder='Search Medicine'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-medicine-input'
        />
      </div>
            
            <div className='student-details-scroll'>
                <div className='student-modal-detail'>
                    <div className='student-modal-header'>
                        {props.selectedHistory?.createdAt.slice(0,10).split("-").reverse().join("-")}

                    </div>
                    <div className='student-modal-body-student'>
                        <div className='student-modal-body-header'>
                            <div>Medicine Name</div>
                            <div>Quantity</div>
                        
                        </div>
                        <div className='student-modal-body-item'>
                            {
                                filteredMedicines?.length > 0 ? ( 
                                    filteredMedicines.map((item,index)=>(
                                    return(<div className='student-item-model'>
                                <div> {item?.name} </div>
                                <div> {item.requiredQuantity} </div>
                                   </div>)) 
                                ): (
                                    <div className='student-item-model'>
                                        <div>No matching medicines found</div>
                                    </div>
                                )

                                                          
                            }
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>
    )
}
export default RecordModal

