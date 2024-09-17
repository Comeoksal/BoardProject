import React from "react";
import Book2 from "./Book2";

function Library2(props){
    return(
        <div>
            <Book2 name="노아의 방주" price = {9000} />
            <Book2 name="어린왕자" price = {12000} />
            <Book2 name="백설공주" price = {15000} />
        </div>
    )
}

export default Library2;