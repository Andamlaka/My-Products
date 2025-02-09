
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
async function fetchProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}
export default async function Home() {
  const products = await fetchProducts()
  return (
    <div
      className="container mx-auto grid grid-cols-1 sm:grid-cols-2 
    md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {products.map((product: any) => (
        <div
          key={product.id}
          className="justify-center items-center border rounded-lg shadow-xl flex flex-col p-4"
        >
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className=" h-auto object-cover mb-4 rounded-lg"
            />
          </Link>
          <h1 className="text-lg font-semibold mt-2">{product.title}</h1>
          <p className="text-green-600 font-b0ld">${product.price}</p>
          <Link href={`/products/${product.id}`}>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700
           text-white font-bold py-2 px-4 rounded mt-4"
            >
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}
