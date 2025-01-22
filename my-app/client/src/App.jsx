import React, { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import styled from 'styled-components';
import MainPage from './ks.page/page/MainPage';

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
            <MainTitleTextButton>
                <LinkToMain to="/">KS Page</LinkToMain>
            </MainTitleTextButton>
            <Routes>
                <Route index element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;