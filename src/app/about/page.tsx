import Link from 'next/link'
import { Users, Target, BarChart3, Shield } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">TestStore</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-900">Products</Link>
              <Link href="/about" className="text-blue-600 font-semibold">About</Link>
              <Link href="/analytics" className="text-gray-500 hover:text-gray-900">Analytics</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link 
                href="/products" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                id="about-cta"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span>About</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About TestStore
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re not just another e-commerce store. We&apos;re a testing ground for the future of online shopping, 
            powered by advanced A/B testing and analytics technology.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">A/B Testing</h3>
            <p className="text-gray-600 text-sm">
              Advanced testing platform to optimize user experience and conversion rates
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 text-sm">
              Real-time data collection and analysis for informed decision making
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Focused</h3>
            <p className="text-gray-600 text-sm">
              Every change we make is designed to improve your shopping experience
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">
              Your data and privacy are protected with enterprise-grade security
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                TestStore was born from a simple idea: what if we could create the perfect online shopping 
                experience by constantly testing and improving every element? From button colors to checkout 
                flows, we believe that data-driven decisions lead to better user experiences.
              </p>
              <p className="mb-6">
                Our platform serves as a testing ground for innovative A/B testing technologies. Every 
                interaction, every click, and every purchase helps us understand what works best for our 
                customers. We&apos;re not just selling products – we&apos;re pioneering the future of e-commerce.
              </p>
              <p>
                Join us on this journey as we explore the intersection of technology, psychology, and 
                commerce to create shopping experiences that truly delight.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover our products and see how our testing platform creates the perfect shopping experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
              id="about-cta-primary"
            >
              Browse Products
            </Link>
            <Link 
              href="/checkout" 
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors"
              id="about-cta-secondary"
            >
              Try Checkout
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
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
