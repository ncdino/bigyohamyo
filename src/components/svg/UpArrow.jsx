export default function UpArrow({ width, height, color }) {
    return (
        <svg
            width={width || '50px'}
            height={height || '50px'}
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 8.414V18h2V8.414l4.293 4.293 1.414-1.414L12 4.586l-6.707 6.707 1.414 1.414z"
                fill={color || 'black'}
            />
        </svg>
    )
}
