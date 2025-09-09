"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import useCartStore from "@/store/cartStore"; // Replace with your store
import { Button } from "@/components/ui/button";

export default function Pdp({ product }) {
  const { id, title, description, price, images, tags, rating, reviews } =
    product;

  // Cart state
  const { cartItems, addToCart, removeFromCart, incrementItem, decrementItem } =
    useCartStore();
  const cartItem = cartItems.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    incrementItem(id);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeFromCart(id);
      setQuantity(0);
    } else {
      setQuantity((prev) => prev - 1);
      decrementItem(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
      {/* Product Main Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 h-80 relative">
          <Image
            src={images[0] || "/placeholder.png"}
            alt={title}
            fill
            className="object-contain rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-700">{description}</p>
          <p className="text-lg font-semibold">Price: ${price}</p>
          <p className="text-sm text-gray-500">Rating: {rating} ⭐</p>
          {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Cart Controls */}
          <div className="mt-4 flex items-center gap-4">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                <Button
                  onClick={handleDecrement}
                  className="px-3 py-1 rounded-none"
                  size="sm"
                >
                  <Minus size={16} />
                </Button>
                <span className="px-4 py-1">{quantity}</span>
                <Button
                  onClick={handleIncrement}
                  className="px-3 py-1 rounded-none"
                  size="sm"
                >
                  <Plus size={16} />
                </Button>
              </div>
            ) : (
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          <div className="flex flex-col gap-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border p-4 rounded-md bg-gray-50">
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Rating: {review.rating} ⭐
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
