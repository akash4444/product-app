import Image from "next/image";
import Rating from "../Rating";
import Link from "next/link";
import { CartItem } from "@/types/productTypes";

export default function ProductCard({
  product,
  addToCart,
}: {
  product: CartItem;
  addToCart: (product: CartItem) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link href={`product/${product?.id}`}>
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden cursor-pointer">
          <Image
            src={product.thumbnail || "/images/placeholder.png"} // fallback image
            alt={product.title || "Product Image"}
            className="object-contain"
            width={100}
            height={100}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <Link href={`product/${product?.id}`}>
          <h3 className="text-gray-800 font-medium text-base mb-2 line-clamp-2 cursor-pointer">
            {product.title || "Untitled Product"}
          </h3>
        </Link>

        <div>
          <Rating rating={product.rating} />
        </div>
        <Link href={`product/${product?.id}`}>
          <div className="text-gray-900 font-semibold text-lg cursor-pointer">
            {`$ `}
            {product.price || "$0.00"}
          </div>
        </Link>
      </div>

      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
