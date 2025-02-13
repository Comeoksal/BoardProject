import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import styled from "styled-components";
import code from "../images/code.jpg"
import StandardBoard from "../ui/StandardBoard";
const Container = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    min-height: 94vh; /* 최소 높이를 뷰포트에 맞추고, 컨텐츠에 따라 확장 */
    background-image: url(${code});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed; /* 배경 고정 */
    overflow:auto;
`;

export default function BoardPage() {
    //🔥QueryClient 생성, 옵션으로 유효시간과, 캐싱 시간 설정
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                cacheTime: 1000 * 60 * 10,
            }
        }
    });
    //🔥쿼리를 담을 공간을 localStorage로 지정
    const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
    });
    //🔥QueryClient 내용을 maxAge만큼 지속하도록 지정
    persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 1,
    })
    return (
        //🔥🔥쿼리를 사용할 페이지를 꼭! QueryCleintProvider로 감싸줘야함.
        <QueryClientProvider client={queryClient}>
            <Container>
                <StandardBoard />
            </Container>
        </QueryClientProvider>
    )
}