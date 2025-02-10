import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product: Product) => (
        <div key={product.id} className="justify-center items-center border rounded-lg shadow-xl flex flex-col p-4">
          <Link href={`/products/${product.id}`}>
            <Image src={product.image} alt={product.title} width={200} height={200} className="h-auto object-cover mb-4 rounded-lg" />
          </Link>
          <h1 className="text-lg font-semibold mt-2">{product.title}</h1>
          <p className="text-green-600 font-bold">${product.price}</p>
          <Link href={`/products/${product.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}
