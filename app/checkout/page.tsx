"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { clearCart } from "../store/storeSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => { dispatch(clearCart()); router.push("/"); }}>Complete Purchase</button>
    </div>
  );
}
