"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/storeSlice";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <Image
        src={product.image}
        alt={product.title}
        width={500}
        height={500}
        className="bg-gray-100 h-auto object-cover mb-4 rounded-lg"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-green-500 font-bold">${product.price}</p>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
