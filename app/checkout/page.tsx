"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../store/store";
import { clearCart } from "./../store/storeSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700">
        <h2 className="text-2xl font-semibold">Your cart is empty! 🛒</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">🛍️ Checkout</h1>

      <div className="border-t border-gray-300 py-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span className="font-medium">{item.title}</span>
            <span className="text-gray-600">x{item.quantity}</span>
            <span className="text-green-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold">Total:</h2>
        <span className="text-2xl text-green-600 font-bold">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => {
          dispatch(clearCart());
          router.push("/");
        }}
        className="mt-6 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300"
      >
        ✅ Complete Purchase
      </button>
    </div>
  );
}
