import WetCompare from '@/components/SuspenseSection/WetCompare-client'
import { Suspense } from 'react'

export default function WetComparePage() {
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <WetCompare />
        </Suspense>
    )
}
