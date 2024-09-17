import React from "react";

function Book2(props) {
    return React.createElement(
    'div',
    null,
    [
        React.createElement(
            'h1',
            null,
            `이 책의 이름은 ${props.name}입니다.`
        ),
        React.createElement(
            'h2',
            null,
            `이 책의 가격은 ${props.price}입니다.`
        )
    ]
    )
}

export default Book2;