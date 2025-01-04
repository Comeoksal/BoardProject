import React, {useState} from "react";
import Select from './Select';
function Click(props){
   const [value, setValue] = useState('grape');

   const handleChange = (event)=>{
        setValue(event.target.value);
   }
   const handleSubmit = (event) =>{
        alert('변경 요청사항 : ' + value);
        event.preventDefault();
   }

   return(
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <textarea type="text" value={value} onChange={handleChange}/>
            </label>
            <button type="submit">제출</button>
            <Select value={value} handleSubmit = {handleSubmit} setValue = {setValue}/>
        </form>
   )
}

export default Click