import React from "react";
import Book from "./Book";

const booktype = [
    {
        name : "처음 만난 파이썬",
        numOfPage : 300,
    },
    {
        name : "처음 만난 AWS",
        numOfPage : 400,
    },
    {
        name : "처음 만난 리액트",
        numOfPage : 500,
    },
]
function Library(props){
    return(
        <div>
            {booktype.map((type)=> {
                return(
                    <Book name = {type.name} numOfPage = {type.numOfPage}/>
                );
            })}
        </div>
    )
}

export default Library;