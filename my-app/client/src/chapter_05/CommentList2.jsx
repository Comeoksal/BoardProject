import React from "react";
import Comment from "./Comment";

function CommentList2(props){
    return(
       <div>
         <Comment name={"금시언"} comment={"안녕하세요요"}/>
         <Comment name={"이민정"} comment={"안녕녕"}/>
       </div>
    );
}

export default CommentList2