import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;

const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;

const DateText = styled.small`
    font-size: 12px;
    color: grey;
    margin-top: 8px;
`;

function CommentListItem(props) {
    const { comment } = props;
    const formattedDate = new Date(comment.created_at).toLocaleString();
    return (
        <Wrapper>
            <ContentText>{comment.content}</ContentText>
            <DateText>{formattedDate}</DateText>
        </Wrapper>
    );
}

export default CommentListItem;