import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name:"금시언",
        comment: "안녕하세요 금시입니다.",
    },
    {
        name:"조예원",
        comment: "난 예원이야.",
    },
    {
        name:"김경민",
        comment:"경식맘",
    },
]

function CommentList(props){
    return(
        <div>
            {comments.map((comment)=>{
                return(
                    <Comment name={comment.name} comment={comment.comment}/>
                );
            })}
        </div>
        );
}

export default CommentList;