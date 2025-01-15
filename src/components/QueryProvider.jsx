'use client'

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

import dryFeedData from '@/app/data/food.json'
import wetFeedData from '@/app/data/wet_output.json'

const queryClient = new QueryClient()

function DataLoader() {
    const {
        data: dryFood,
        isLoading: dryFoodIsLoading,
        error: dryFoodError,
    } = useQuery({
        queryKey: ['dryFood'],
        queryFn: () => Promise.resolve(dryFeedData),
        staleTime: 60 * 60 * 1000,
    })

    const {
        data: wetFood,
        isLoading: wetFoodIsLoading,
        error: wetFoodError,
    } = useQuery({
        queryKey: ['wetFood'],
        queryFn: () => Promise.resolve(wetFeedData),
        staleTime: 60 * 60 * 1000,
    })

    // if (dryFoodIsLoading || wetFoodIsLoading)
    //     return <p>데이터 불러오는 중...</p>
    // if (dryFoodError || wetFoodError) return <p>데이터 불러오기 오류 발생</p>
}

export default function QueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <DataLoader />
            {children}
        </QueryClientProvider>
    )
}
