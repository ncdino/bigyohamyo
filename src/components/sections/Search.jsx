import ProductCompare from './ProductCompare'
import ProductDetail from './ProductDetail'

export default function Search() {
    return (
        <div className="container">
            <div className="flex">
                <ProductDetail />
                <ProductCompare />
            </div>
        </div>
    )
}
