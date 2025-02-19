import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import StandardPostView from "../ui/StandardPostView";
import post from "../images/post.jpg"
import styled from "styled-components";
const Container = styled.div`
        display : flex;
        justify-content : center;
        align-items : center;
        min-height: 94vh; /* 최소 높이를 뷰포트에 맞추고, 컨텐츠에 따라 확장 */
        background-image: url(${post});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed; /* 배경 고정 */
        overflow : auto;
`
export default function PostViewPage() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                cacheTime: 1000 * 6 * 10,
            }
        }
    })
    const sessionStoragePersister = createSyncStoragePersister({
        storage: window.sessionStorage,
    })
    persistQueryClient({
        queryClient,
        persister: sessionStoragePersister,
        maxAge: 1000 * 60 * 30,
    })
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <StandardPostView />
            </Container>
        </QueryClientProvider>
    )
}