"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, CheckCircle } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Open modal
    setIsModalOpen(true);

    // Clear the cart
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 lg:px-6 space-y-2">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-3 flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Cart
          </h1>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Review your selected items
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-1">Start adding products now</p>
            <Button
              onClick={() => router.push("/")}
              className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white rounded-lg px-5 py-2"
            >
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            <Card className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-md">
              <CardHeader className="flex w-full justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">
                  Cart Items
                </CardTitle>
                {cartItems.length > 0 && (
                  <Button
                    onClick={clearCart}
                    className="flex bg-[#ff4747] items-center gap-2 text-white rounded-lg"
                  >
                    <Trash2 className="h-5 w-5" />
                    Clear Cart
                  </Button>
                )}
              </CardHeader>

              <ScrollArea className="h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
                <CardContent className="space-y-3 p-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#cccccc] rounded-xl p-3 bg-white hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-3/4">
                        <Link href={`/product/${item.id}`}>
                          <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                            <Image
                              src={item.thumbnail || "/images/placeholder.png"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div>
                          <h3 className="text-base font-medium text-gray-800 line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-indigo-500 font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-black-100">
                          <Button
                            size="icon"
                            onClick={() => decrementItem(item.id)}
                            className="rounded-lg"
                          >
                            <Minus className="h-5 w-5 text-red-400" />
                          </Button>
                          <span className="px-3 text-gray-700 font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            onClick={() => incrementItem(item.id)}
                            className="rounded-lg"
                          >
                            <Plus className="h-5 w-5 text-green-400" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-lg"
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </ScrollArea>
            </Card>

            <Card className="h-fit sticky top-20 bg-white border border-gray-200 rounded-2xl shadow-md">
              <CardHeader className="py-4 px-6">
                <CardTitle className="text-lg font-bold text-gray-800">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-6 pb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-indigo-500">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleCheckout}
                    className=" mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white rounded-lg py-3"
                  >
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white text-center">
          <DialogHeader>
            <CheckCircle className="mx-auto mb-2 h-16 w-16 text-green-500" />
            <DialogTitle>Order Placed Successfully!</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mt-2">
            Thank you for your purchase. Your order is on its way.
          </p>
          <DialogFooter>
            <Button
              className="mt-4  bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white"
              onClick={() => {
                setIsModalOpen(false);
                router.push("/");
              }}
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
