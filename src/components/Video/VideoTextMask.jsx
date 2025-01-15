import React from 'react'

export default function TextWithVideo() {
    return (
        <div className="relative flex items-center justify-center h-screen overflow-hidden">
            {/* 비디오 */}
            <video
                className="absolute top-0 left-0 w-full h-1/2 object-cover"
                autoPlay
                muted
                loop
                preload="auto"
            >
                <source src="/videos/cat3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 텍스트 */}
            <h1 className="text-black font-bold uppercase text-center tracking-tighter mix-blend-screen">
                비교하묘
            </h1>

            <style jsx>{`
                body {
                    display: flex;
                    height: 100vh;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                video,
                h1 {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }

                h1 {
                    font-size: 16vw;
                    font-weight: 800;
                    line-height: 90vh;
                    text-transform: uppercase;
                    text-align: center;
                    background: white;
                    mix-blend-mode: screen;
                }
            `}</style>
        </div>
    )
}
