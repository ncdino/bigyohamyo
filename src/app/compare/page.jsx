import { Suspense } from 'react'
import Compare from '@/components/SuspenseSection/Compare-client'

export default function ComparePage() {
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <Compare />
        </Suspense>
    )
}
