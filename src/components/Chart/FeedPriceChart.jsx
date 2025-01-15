'use client'

import React from 'react'

export default function FeedPriceChart({
    value,
    maxValue,
    size,
    color = '#85A389',
    emptyColor = '#e2e8f0',
    className
}) {
    const percentage = value / maxValue

    const FeedIcon = () => (
        <svg
            width={`${size}px`}
            height={`${size}px`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <clipPath id="virusClip">
                    <rect
                        x="0"
                        y={`${24 - 24 * percentage}`}
                        width="24"
                        height={`${24 * percentage}`}
                    />
                </clipPath>
            </defs>
            <g>
                {/* 1. 바이러스 아이콘 전체 (배경) - 회색 */}
                <path
                    fill={emptyColor} // 회색으로 채우기
                    fillRule="evenodd"
                    d="M11.1792761,10.0089144 C9.38577235,9.8086768 7.07299854,10.6085465 5.47667412,12.2077121 C3.48343099,14.204503 3.54879682,16.6859789 5.42668828,18.5672127 C7.30457973,20.4484465 9.78164682,20.5139287 11.7748899,18.5171379 C13.3509061,16.9383166 14.1492183,14.6599163 13.9769254,12.8732082 C13.8987291,12.0622975 13.6206011,11.3526688 13.1245076,10.8556923 C12.6424991,10.3728259 11.9600987,10.0960901 11.1792761,10.0089144 Z M15.1810701,10.2501896 L16.9944222,8.43361006 L17.6758441,8.88587272 C18.2647143,9.27670851 19.0564377,9.20138579 19.5630483,8.69387349 C20.1488348,8.10704443 20.1488348,7.15560655 19.5630483,6.5687775 C19.3295734,6.33488702 19.0345086,6.18916819 18.7153647,6.14373067 L17.9717082,6.03785395 L17.8660196,5.29287388 C17.8206628,4.973162 17.6752029,4.67757198 17.441728,4.44368151 C16.8559415,3.85685245 15.9061941,3.85685245 15.3204076,4.44368151 C14.813797,4.9511938 14.7386081,5.74432636 15.1287495,6.33424473 L15.5802087,7.01687939 L13.7753518,8.8249486 C14.0490649,9.00103142 14.3045574,9.20556479 14.5381304,9.4395535 C14.7848577,9.68671989 14.9987769,9.95838781 15.1810701,10.2501896 Z M11.7106931,8.05982086 L13.0835999,6.68447047 C12.6398266,5.43768457 12.9292649,4.00561884 13.9061941,3.02695084 C15.2730291,1.65768305 17.4891065,1.65768305 18.8559415,3.02695084 C19.2284937,3.40016611 19.5064463,3.84475891 19.6782931,4.32823159 C20.1609068,4.50038424 20.6047097,4.77883157 20.9772619,5.15204684 C22.3440969,6.52131463 22.3440969,8.74133636 20.9772619,10.1106041 C20.0003327,11.0892721 18.5708113,11.3792255 17.3262406,10.9346625 L15.9255864,12.3378096 C16.2987049,14.8358602 15.2507577,17.8642613 13.1848122,19.9338839 C10.3939526,22.7297109 6.65437776,22.6308538 4.01232238,19.984096 C1.370267,17.3373381 1.27158561,13.5911074 4.06244527,10.7952804 C6.14656053,8.7074557 9.20465976,7.65745829 11.7106931,8.05982086 Z"
                />
                {/* 2. 바이러스 아이콘 일부 (잘리는 부분) - value에 따라 색상 변경 */}
                <path
                    clipPath="url(#virusClip)"
                    fill={color} // value에 따라 색상 변경
                    fillRule="evenodd"
                    d="M11.1792761,10.0089144 C9.38577235,9.8086768 7.07299854,10.6085465 5.47667412,12.2077121 C3.48343099,14.204503 3.54879682,16.6859789 5.42668828,18.5672127 C7.30457973,20.4484465 9.78164682,20.5139287 11.7748899,18.5171379 C13.3509061,16.9383166 14.1492183,14.6599163 13.9769254,12.8732082 C13.8987291,12.0622975 13.6206011,11.3526688 13.1245076,10.8556923 C12.6424991,10.3728259 11.9600987,10.0960901 11.1792761,10.0089144 Z M15.1810701,10.2501896 L16.9944222,8.43361006 L17.6758441,8.88587272 C18.2647143,9.27670851 19.0564377,9.20138579 19.5630483,8.69387349 C20.1488348,8.10704443 20.1488348,7.15560655 19.5630483,6.5687775 C19.3295734,6.33488702 19.0345086,6.18916819 18.7153647,6.14373067 L17.9717082,6.03785395 L17.8660196,5.29287388 C17.8206628,4.973162 17.6752029,4.67757198 17.441728,4.44368151 C16.8559415,3.85685245 15.9061941,3.85685245 15.3204076,4.44368151 C14.813797,4.9511938 14.7386081,5.74432636 15.1287495,6.33424473 L15.5802087,7.01687939 L13.7753518,8.8249486 C14.0490649,9.00103142 14.3045574,9.20556479 14.5381304,9.4395535 C14.7848577,9.68671989 14.9987769,9.95838781 15.1810701,10.2501896 Z M11.7106931,8.05982086 L13.0835999,6.68447047 C12.6398266,5.43768457 12.9292649,4.00561884 13.9061941,3.02695084 C15.2730291,1.65768305 17.4891065,1.65768305 18.8559415,3.02695084 C19.2284937,3.40016611 19.5064463,3.84475891 19.6782931,4.32823159 C20.1609068,4.50038424 20.6047097,4.77883157 20.9772619,5.15204684 C22.3440969,6.52131463 22.3440969,8.74133636 20.9772619,10.1106041 C20.0003327,11.0892721 18.5708113,11.3792255 17.3262406,10.9346625 L15.9255864,12.3378096 C16.2987049,14.8358602 15.2507577,17.8642613 13.1848122,19.9338839 C10.3939526,22.7297109 6.65437776,22.6308538 4.01232238,19.984096 C1.370267,17.3373381 1.27158561,13.5911074 4.06244527,10.7952804 C6.14656053,8.7074557 9.20465976,7.65745829 11.7106931,8.05982086 Z"
                />
            </g>
        </svg>
    )

    return (
        <div className="flex items-center justify-center">
            <FeedIcon />
        </div>
    )
}