import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import styled from 'styled-components';
import MainPage from './ks.page/page/MainPage';
import LoginPage from './ks.page/page/LoginPage'
import ChatPage from './ks.page/page/ChatPage'
import BoardPage from './ks.page/page/BoardPage'
import Navbars from './ks.page/ui/Navbars';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MainTitleTextButton = styled.header`
    display: 'flex';
    alignItems: 'center';
    padding: '10px';
    borderBottom: '1px solid #ccc';
`;
const LinkToMain = styled(Link)`
    text-decoration: none;
    font-size: 32px; /* 글자 크기 키움 */
    font-weight: bold;
    color: #333;
    margin-left: 20px; /* 좌측 상단에서 오른쪽으로 띄움 */
    margin-top: 10px; /* 상단에서 아래로 띄움 */
    display: inline-block; /* 마진 적용을 위해 inline-block 사용 */

    &:hover {
    color: #007bff; /* 호버 시 색상 변경 */
    }
`

function App() {

    return (
        <BrowserRouter>
            <Navbars />
            <Routes>
                <Route index element={<MainPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/boardroom' element={<BoardPage />} />
                <Route path='/chatroom' element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;