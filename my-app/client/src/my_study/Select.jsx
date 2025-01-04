import React, {useState, useEffect} from "react";

function Select(props){
    const {value, handleSubmit, setValue} = props;
    const [name, setName] = useState('grape');

    useEffect(()=>{
        setName(value);
    }, [value])

    const handleChange = (event) =>{
        setName(event.target.value);
        setValue(event.target.value);
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>
                과일을 선택하세요:
                <select type="text" value={name} onChange={handleChange}>
                    <option value="apple">사과</option>
                    <option value="banana">바나나</option>
                    <option value="grape">포도</option>
                    <option value="watermelon">수박</option>
                    <option value="melon">멜론</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    )
}

export default Select