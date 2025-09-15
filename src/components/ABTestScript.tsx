'use client'

import { useEffect } from 'react'
import { ABTestingEngine, AB_TESTS } from '@/lib/ab-testing'

// This component represents your A/B testing snippet
// In a real implementation, this would be injected by your external script
export default function ABTestScript() {
  useEffect(() => {
    // Initialize A/B testing engine
    const abEngine = new ABTestingEngine()
    
    // Run all active A/B tests
    abEngine.runAllTests()
    
    // Set up click tracking for CTA buttons
    const setupClickTracking = () => {
      const ctaButtons = document.querySelectorAll('[id^="hero-cta-"], [id^="product-cta-"], [id^="product-add-cart-"], [id^="checkout-"], [id^="about-cta"]')
      
      ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const elementId = (e.target as HTMLElement).id
          
          // Find which test this element belongs to and track the click
          AB_TESTS.forEach(test => {
            const variant = test.variants.find(v => 
              v.modifications.some(mod => 
                elementId.includes(mod.selector.replace(/[#\[\]^=]/g, '').split(' ')[0])
              )
            )
            
            if (variant) {
              // Get the assigned variant for this test
              const assignedVariant = localStorage.getItem(`ab-testing-variants`)
              if (assignedVariant) {
                try {
                  const variants = JSON.parse(assignedVariant)
                  const testVariant = variants.find(([testId]: [string, string]) => testId === test.id)?.[1]
                  
                  if (testVariant) {
                    // Track conversion
                    const analytics = (window as unknown as { abTestAnalytics: { trackConversion: (testId: string, variantId: string, conversionType: string) => void; trackClick: (testId: string, variantId: string, elementId: string) => void } }).abTestAnalytics
                    if (analytics) {
                      analytics.trackConversion(test.id, testVariant, 'button_click')
                      analytics.trackClick(test.id, testVariant, elementId)
                    }
                  }
                } catch (e) {
                  console.warn('Failed to track click:', e)
                }
              }
            }
          })
        })
      })
    }
    
    // Set up click tracking after a short delay to ensure DOM is ready
    setTimeout(setupClickTracking, 100)
    
                    // Make analytics available globally for debugging
    ;(window as unknown as { abTestAnalytics: typeof abEngine }).abTestAnalytics = abEngine
    
    // Log current assignments for debugging
    console.log('A/B Test Assignments:', localStorage.getItem('ab-testing-variants'))
    console.log('A/B Test Analytics:', localStorage.getItem('ab-test-analytics'))
    
  }, [])

  return null // This component doesn't render anything
}

// Standalone script that can be injected (for your external snippet)
export const ABTestSnippet = `
(function() {
  'use strict';
  
  // Your A/B testing snippet code would go here
  // This is a simplified version for demonstration
  
  console.log('A/B Testing Snippet Loaded');
  
  // This would be replaced with your actual snippet implementation
  // that handles injection, modification, and analytics
  
  // Example of what your snippet might do:
  // 1. Load A/B test configurations
  // 2. Assign users to variants
  // 3. Apply modifications to elements
  // 4. Track user interactions
  // 5. Send analytics data to your service
  
})();
`
