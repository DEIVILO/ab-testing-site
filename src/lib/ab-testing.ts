// A/B Testing Configuration and Utilities
export interface ABTestConfig {
  id: string
  name: string
  variants: ABTestVariant[]
  trafficAllocation: number // 0-1, percentage of traffic to include in test
  isActive: boolean
}

export interface ABTestVariant {
  id: string
  name: string
  weight: number // 0-1, relative weight within the test
  modifications: ElementModification[]
}

export interface ElementModification {
  selector: string
  property: string
  value: string
  type: 'style' | 'text' | 'attribute' | 'class'
}

// Predefined A/B tests for your snippet to work with
export const AB_TESTS: ABTestConfig[] = [
  {
    id: 'hero-cta-colors',
    name: 'Hero CTA Button Colors',
    trafficAllocation: 1.0,
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Blue)',
        weight: 0.5,
        modifications: [
          {
            selector: '#hero-cta-primary',
            property: 'backgroundColor',
            value: '#2563eb',
            type: 'style'
          }
        ]
      },
      {
        id: 'variant-a',
        name: 'Green CTA',
        weight: 0.5,
        modifications: [
          {
            selector: '#hero-cta-primary',
            property: 'backgroundColor',
            value: '#059669',
            type: 'style'
          }
        ]
      }
    ]
  },
  {
    id: 'product-cta-colors',
    name: 'Product CTA Button Colors',
    trafficAllocation: 1.0,
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Blue)',
        weight: 0.33,
        modifications: [
          {
            selector: '[id^="product-cta-"], [id^="product-add-cart-"]',
            property: 'backgroundColor',
            value: '#2563eb',
            type: 'style'
          }
        ]
      },
      {
        id: 'variant-a',
        name: 'Purple CTA',
        weight: 0.33,
        modifications: [
          {
            selector: '[id^="product-cta-"], [id^="product-add-cart-"]',
            property: 'backgroundColor',
            value: '#7c3aed',
            type: 'style'
          }
        ]
      },
      {
        id: 'variant-b',
        name: 'Red CTA',
        weight: 0.34,
        modifications: [
          {
            selector: '[id^="product-cta-"], [id^="product-add-cart-"]',
            property: 'backgroundColor',
            value: '#dc2626',
            type: 'style'
          }
        ]
      }
    ]
  },
  {
    id: 'checkout-button-text',
    name: 'Checkout Button Text',
    trafficAllocation: 1.0,
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control Text',
        weight: 0.5,
        modifications: [
          {
            selector: '#checkout-complete-btn',
            property: 'textContent',
            value: 'Complete Order',
            type: 'text'
          }
        ]
      },
      {
        id: 'variant-a',
        name: 'Urgency Text',
        weight: 0.5,
        modifications: [
          {
            selector: '#checkout-complete-btn',
            property: 'textContent',
            value: 'Buy Now - Limited Time!',
            type: 'text'
          }
        ]
      }
    ]
  },
  {
    id: 'headline-text',
    name: 'Homepage Headline Text',
    trafficAllocation: 1.0,
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control Headline',
        weight: 0.5,
        modifications: [
          {
            selector: 'h1',
            property: 'textContent',
            value: 'Welcome to TestStore',
            type: 'text'
          }
        ]
      },
      {
        id: 'variant-a',
        name: 'Benefit-Focused Headline',
        weight: 0.5,
        modifications: [
          {
            selector: 'h1',
            property: 'textContent',
            value: 'Shop Smarter, Save More at TestStore',
            type: 'text'
          }
        ]
      }
    ]
  }
]

// Utility functions for A/B testing
export class ABTestingEngine {
  private assignedVariants: Map<string, string> = new Map()
  private analytics: ABTestAnalytics

  constructor() {
    this.analytics = new ABTestAnalytics()
    this.loadAssignedVariants()
  }

  // Assign user to a variant for a given test
  assignVariant(testId: string, config: ABTestConfig): string {
    // Check if user already assigned to this test
    if (this.assignedVariants.has(testId)) {
      return this.assignedVariants.get(testId)!
    }

    // Check if user should be included in test
    if (!this.shouldIncludeInTest(config)) {
      return 'control'
    }

    // Assign variant based on weights
    const variant = this.selectVariant(config.variants)
    this.assignedVariants.set(testId, variant.id)
    this.saveAssignedVariants()

    // Track assignment
    this.analytics.trackAssignment(testId, variant.id, config.name)

    return variant.id
  }

  // Apply modifications for a variant
  applyVariant(testId: string, config: ABTestConfig, variantId: string) {
    const variant = config.variants.find(v => v.id === variantId)
    if (!variant) return

    variant.modifications.forEach(mod => {
      this.applyModification(mod)
    })

    // Track variant application
    this.analytics.trackVariantApplication(testId, variantId)
  }

  // Run all active A/B tests
  runAllTests() {
    AB_TESTS.filter(test => test.isActive).forEach(test => {
      const variantId = this.assignVariant(test.id, test)
      this.applyVariant(test.id, test, variantId)
    })
  }

  private shouldIncludeInTest(config: ABTestConfig): boolean {
    // Simple hash-based traffic allocation
    const userId = this.getUserId()
    const hash = this.simpleHash(userId + config.id)
    return hash < config.trafficAllocation
  }

  private selectVariant(variants: ABTestVariant[]): ABTestVariant {
    const random = Math.random()
    let cumulativeWeight = 0

    for (const variant of variants) {
      cumulativeWeight += variant.weight
      if (random <= cumulativeWeight) {
        return variant
      }
    }

    return variants[0] // Fallback
  }

  private applyModification(mod: ElementModification) {
    const elements = document.querySelectorAll(mod.selector)
    
    elements.forEach(element => {
      switch (mod.type) {
        case 'style':
          (element as HTMLElement).style.setProperty(mod.property, mod.value)
          break
        case 'text':
          element.textContent = mod.value
          break
        case 'attribute':
          element.setAttribute(mod.property, mod.value)
          break
        case 'class':
          if (mod.property === 'add') {
            element.classList.add(mod.value)
          } else if (mod.property === 'remove') {
            element.classList.remove(mod.value)
          }
          break
      }
    })
  }

  private getUserId(): string {
    let userId = localStorage.getItem('ab-testing-user-id')
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('ab-testing-user-id', userId)
    }
    return userId
  }

  private simpleHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647 // Normalize to 0-1
  }

  private loadAssignedVariants() {
    try {
      const stored = localStorage.getItem('ab-testing-variants')
      if (stored) {
        this.assignedVariants = new Map(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('Failed to load assigned variants:', e)
    }
  }

  private saveAssignedVariants() {
    try {
      localStorage.setItem('ab-testing-variants', JSON.stringify([...this.assignedVariants]))
    } catch (e) {
      console.warn('Failed to save assigned variants:', e)
    }
  }
}

// Analytics tracking for A/B tests
export class ABTestAnalytics {
  private events: ABTestEvent[] = []

  trackAssignment(testId: string, variantId: string, testName: string) {
    this.trackEvent({
      type: 'assignment',
      testId,
      variantId,
      testName,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    })
  }

  trackVariantApplication(testId: string, variantId: string) {
    this.trackEvent({
      type: 'variant_application',
      testId,
      variantId,
      timestamp: Date.now(),
      url: window.location.href
    })
  }

  trackConversion(testId: string, variantId: string, conversionType: string) {
    this.trackEvent({
      type: 'conversion',
      testId,
      variantId,
      conversionType,
      timestamp: Date.now(),
      url: window.location.href
    })
  }

  trackClick(testId: string, variantId: string, elementId: string) {
    this.trackEvent({
      type: 'click',
      testId,
      variantId,
      elementId,
      timestamp: Date.now(),
      url: window.location.href
    })
  }

  private trackEvent(event: ABTestEvent) {
    this.events.push(event)
    console.log('AB Test Event:', event)
    
    // In a real implementation, you would send this to your analytics service
    // For now, we'll just log it and store locally
    this.sendToAnalytics(event)
  }

  private sendToAnalytics(event: ABTestEvent) {
    // Placeholder for your analytics integration
    // This is where you would send data to your analytics service
    try {
      // Store in localStorage for debugging
      const stored = JSON.parse(localStorage.getItem('ab-test-analytics') || '[]')
      stored.push(event)
      localStorage.setItem('ab-test-analytics', JSON.stringify(stored.slice(-1000))) // Keep last 1000 events
    } catch (e) {
      console.warn('Failed to store analytics event:', e)
    }
  }

  getEvents(): ABTestEvent[] {
    return [...this.events]
  }

  getEventsForTest(testId: string): ABTestEvent[] {
    return this.events.filter(event => event.testId === testId)
  }
}

export interface ABTestEvent {
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
