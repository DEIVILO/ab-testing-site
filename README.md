# TestStore - A/B Testing E-commerce Platform

A comprehensive testing platform for validating A/B testing and analytics snippets. This Next.js application provides a realistic e-commerce environment with multiple pages, checkout flows, and built-in A/B testing infrastructure.

## 🚀 Features

- **E-commerce Pages**: Homepage, product listings, checkout flow, and about page
- **A/B Testing Infrastructure**: Built-in testing engine with variant assignment and tracking
- **Analytics Dashboard**: Real-time monitoring of test performance and user behavior
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Vercel Ready**: Optimized for deployment on Vercel

## 🧪 A/B Tests Included

1. **Hero CTA Button Colors** - Tests blue vs green primary buttons
2. **Product CTA Button Colors** - Tests blue vs purple vs red product buttons
3. **Checkout Button Text** - Tests standard vs urgency-focused copy
4. **Headline Text** - Tests different value propositions

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Vercel Analytics** for performance monitoring

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ab-testing-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

### Option 1: Deploy from GitHub
1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository in Vercel
4. Deploy with default settings

### Option 2: Deploy with Vercel CLI
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from the project directory:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### Option 3: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ab-testing-site)

## 🔧 A/B Testing Integration

### Replacing the Placeholder Snippet

The application includes a placeholder for your A/B testing snippet in `src/app/layout.tsx`. Replace the placeholder with your actual snippet:

```javascript
// Replace this placeholder in layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      // Your actual A/B testing snippet goes here
      (function() {
        // Your snippet code
      })();
    `
  }}
/>
```

### Testing Your Snippet

1. **Local Testing**: Run `npm run dev` and visit different pages to see how your snippet affects the UI
2. **Analytics Monitoring**: Visit `/analytics` to see real-time test data and user behavior
3. **Variant Assignment**: Users are automatically assigned to variants based on a hash of their user ID
4. **Event Tracking**: All user interactions are tracked and stored in localStorage for analysis

### Customizing Tests

Modify the test configurations in `src/lib/ab-testing.ts`:

```typescript
export const AB_TESTS: ABTestConfig[] = [
  {
    id: 'your-test-id',
    name: 'Your Test Name',
    trafficAllocation: 1.0, // 100% of traffic
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control',
        weight: 0.5,
        modifications: [
          {
            selector: '#your-element',
            property: 'backgroundColor',
            value: '#000000',
            type: 'style'
          }
        ]
      }
      // Add more variants...
    ]
  }
]
```

## 📊 Analytics & Monitoring

### Built-in Analytics
- **Real-time tracking** of user interactions
- **Variant performance** comparison
- **Conversion rate** monitoring
- **Event logging** for debugging

### Data Export
- Export all analytics data as JSON
- Includes user assignments, events, and timestamps
- Perfect for external analysis tools

### Traffic Generation
For testing with fake traffic, consider:
- **Puppeteer/Playwright** for automated browser testing
- **Load testing tools** like Artillery or k6
- **Traffic simulation services** for realistic user behavior

## 🎯 Testing Scenarios

### Button Color Testing
- Primary CTAs change from blue to green/red/purple
- Product buttons test different color schemes
- Analytics track click-through rates by variant

### Copy Testing
- Headlines test different value propositions
- Checkout buttons test urgency vs standard copy
- Track conversion rates by message type

### Checkout Flow Testing
- Multi-step checkout process
- Different button styles and text
- Form field modifications

## 🔍 Debugging

### Console Logs
- A/B test assignments are logged to console
- Event tracking shows in browser dev tools
- Analytics data stored in localStorage

### Analytics Dashboard
- Visit `/analytics` to see current test status
- View variant performance metrics
- Export data for external analysis

## 📝 Environment Variables

No environment variables required for basic functionality. For production deployments, consider adding:

```env
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_PUBLIC_AB_TESTING_ENDPOINT=your_testing_service_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your A/B testing needs!

## 🆘 Support

For issues or questions:
1. Check the analytics dashboard for test status
2. Review browser console for error messages
3. Verify your snippet integration in the layout file
4. Test locally before deploying to production

---

**Happy Testing!** 🧪✨