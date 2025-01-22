import React from "react";
import Button from "../ui/Button";
export default function MainPage(props) {
    return (
        <form>
            <Button title={"KS Page"}></Button>
            <Button title={"게시판"}></Button>
            <Button title={"채팅방"}></Button>
            <Button title={"로그인"}></Button>
        </form>
    )
}