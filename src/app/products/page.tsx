import Link from 'next/link'
import { ShoppingCart, Star, Filter } from 'lucide-react'

export default function Products() {
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299, originalPrice: 399, rating: 4.8, reviews: 124, image: '🎧', category: 'Audio' },
    { id: 2, name: 'Smart Fitness Watch', price: 199, originalPrice: 249, rating: 4.6, reviews: 89, image: '⌚', category: 'Wearables' },
    { id: 3, name: 'Bluetooth Speaker', price: 149, originalPrice: 199, rating: 4.9, reviews: 156, image: '🔊', category: 'Audio' },
    { id: 4, name: 'Gaming Keyboard', price: 129, originalPrice: 159, rating: 4.7, reviews: 78, image: '⌨️', category: 'Gaming' },
    { id: 5, name: 'Wireless Mouse', price: 79, originalPrice: 99, rating: 4.5, reviews: 203, image: '🖱️', category: 'Gaming' },
    { id: 6, name: 'USB-C Hub', price: 89, originalPrice: 119, rating: 4.4, reviews: 67, image: '🔌', category: 'Accessories' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">TestStore</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/products" className="text-blue-600 font-semibold">Products</Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/analytics" className="text-gray-500 hover:text-gray-900">Analytics</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span>Products</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-2">Discover our amazing collection of tech products</p>
          </div>
          <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  id={`product-add-cart-${product.id}`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}
