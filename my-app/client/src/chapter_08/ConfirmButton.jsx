import React, { useState, useEffect } from "react";

function ConfirmButton(props){
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const handleConfirm = () =>{
        setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed);
    }
    useEffect(() => {
        let timer;
        if (isConfirmed) {
            timer = setTimeout(() => {
                setIsConfirmed(false);
            }, 4000);
        }
        // 컴포넌트 언마운트 또는 상태가 바뀔 때 타이머 해제
        return () => clearTimeout(timer);
    }, [isConfirmed]);
    return (
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "확인됨" : "확인하기"}
        </button>
    );
}

export default ConfirmButton;