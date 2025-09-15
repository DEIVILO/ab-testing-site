'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart3, Users, MousePointer, TrendingUp, Download } from 'lucide-react'

interface ABTestEvent {
  type: 'assignment' | 'variant_application' | 'conversion' | 'click'
  testId: string
  variantId: string
  testName?: string
  conversionType?: string
  elementId?: string
  timestamp: number
  url: string
  userAgent?: string
}

export default function Analytics() {
  const [events, setEvents] = useState<ABTestEvent[]>([])
  const [assignedVariants, setAssignedVariants] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load analytics data from localStorage
    try {
      const storedEvents = JSON.parse(localStorage.getItem('ab-test-analytics') || '[]')
      const storedVariants = JSON.parse(localStorage.getItem('ab-testing-variants') || '[]')
      
      setEvents(storedEvents)
      setAssignedVariants(Object.fromEntries(storedVariants))
    } catch (e) {
      console.warn('Failed to load analytics data:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const getTestStats = (testId: string) => {
    const testEvents = events.filter(event => event.testId === testId)
    const variants = [...new Set(testEvents.map(event => event.variantId))]
    
    return variants.map(variantId => {
      const variantEvents = testEvents.filter(event => event.variantId === variantId)
      const clicks = variantEvents.filter(event => event.type === 'click').length
      const conversions = variantEvents.filter(event => event.type === 'conversion').length
      
      return {
        variantId,
        totalEvents: variantEvents.length,
        clicks,
        conversions,
        conversionRate: clicks > 0 ? (conversions / clicks * 100).toFixed(2) : '0.00'
      }
    })
  }

  const exportData = () => {
    const data = {
      events,
      assignedVariants,
      exportDate: new Date().toISOString(),
      userAgent: navigator.userAgent
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ab-test-analytics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    )
  }

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
              <Link href="/products" className="text-gray-500 hover:text-gray-900">Products</Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-900">About</Link>
              <Link href="/analytics" className="text-blue-600 font-semibold">Analytics</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportData}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">A/B Testing Analytics</h1>
          <p className="text-gray-600">Monitor your A/B test performance and user behavior</p>
        </div>

        {/* Current Assignments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Current Test Assignments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(assignedVariants).map(([testId, variantId]) => (
              <div key={testId} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 capitalize">{testId.replace(/-/g, ' ')}</h3>
                <p className="text-sm text-gray-600 mt-1">Variant: <span className="font-semibold">{variantId}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-8">
          {Object.keys(assignedVariants).map(testId => {
            const stats = getTestStats(testId)
            const totalClicks = stats.reduce((sum, stat) => sum + stat.clicks, 0)
            const totalConversions = stats.reduce((sum, stat) => sum + stat.conversions, 0)
            
            return (
              <div key={testId} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                  {testId.replace(/-/g, ' ')} Test Results
                </h2>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <MousePointer className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Clicks</p>
                        <p className="text-2xl font-bold text-blue-900">{totalClicks}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm text-green-600 font-medium">Conversions</p>
                        <p className="text-2xl font-bold text-green-900">{totalConversions}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Conversion Rate</p>
                        <p className="text-2xl font-bold text-purple-900">
                          {totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0.00'}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Variant Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Variant Performance</h3>
                  {stats.map(stat => (
                    <div key={stat.variantId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {stat.variantId.replace(/-/g, ' ')}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {stat.variantId === assignedVariants[testId] && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Clicks</p>
                          <p className="font-semibold">{stat.clicks}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversions</p>
                          <p className="font-semibold">{stat.conversions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversion Rate</p>
                          <p className="font-semibold">{stat.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Raw Events Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Element</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.slice(-20).reverse().map((event, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        event.type === 'conversion' ? 'bg-green-100 text-green-800' :
                        event.type === 'click' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'assignment' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.testId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.variantId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.elementId || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
