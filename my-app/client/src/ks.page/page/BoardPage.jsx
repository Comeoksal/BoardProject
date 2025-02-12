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
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                cacheTime: 1000 * 60 * 10,
            }
        }
    });
    const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
    });

    persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 2,
    })
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <StandardBoard />
            </Container>
        </QueryClientProvider>
    )
}