import Link from 'next/link'
import { ShoppingCart, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TestStore</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 font-semibold">Home</Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-900">Products</Link>
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

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to TestStore
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover amazing products and experience seamless shopping with our A/B testing platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                id="hero-cta-primary"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/about" 
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                id="hero-cta-secondary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, name: 'Premium Headphones', price: '$299', rating: 4.8, image: '🎧' },
              { id: 2, name: 'Smart Watch', price: '$199', rating: 4.6, image: '⌚' },
              { id: 3, name: 'Wireless Speaker', price: '$149', rating: 4.9, image: '🔊' }
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    id={`product-cta-${product.id}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and discover your next favorite product
          </p>
          <Link 
            href="/products" 
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            id="cta-bottom"
          >
            Browse All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">TestStore</h3>
            <p className="text-gray-400 mb-6">
              Your trusted partner for A/B testing and e-commerce analytics
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}