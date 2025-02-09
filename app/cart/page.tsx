"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "../store/storeSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image src={item.image} alt={item.title} width={80} height={80} className="rounded-md" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              <p className="text-green-600 font-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                ➖
              </button>
              <span className="text-lg font-bold">{item.quantity}</span>
              <button 
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                ➕
              </button>
            </div>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded ml-4"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button 
          className="bg-green-500 text-white px-4 py-2 mt-3 rounded"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
