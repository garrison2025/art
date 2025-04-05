export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      features: [
        '5 image transformations per month',
        'Standard quality output',
        'Basic support',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Pro',
      price: '9.99',
      features: [
        'Unlimited transformations',
        'High quality output',
        'Priority support',
        'Custom styles',
        'Batch processing',
      ],
      buttonText: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '29.99',
      features: [
        'Everything in Pro',
        'API access',
        'Custom integration',
        'Dedicated support',
        'Team collaboration',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-300 text-center mb-12">Choose the plan that's right for you</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-800 rounded-xl p-8 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              )}
              <h2 className="text-2xl font-bold mt-4">{plan.name}</h2>
              <div className="mt-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 