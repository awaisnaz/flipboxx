"use client"

import { useState } from 'react';
let body = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Flipboxx!</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; line-height: 1.6; background-color: #f8fafc; color: #334155;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <!-- Header -->
        <div style="background-color: #ffffff; padding: 40px 20px; text-align: center;">
            <img src="https://flipboxx.com/flipboxx.png" alt="Flipboxx Logo" style="width: 180px; height: auto; margin-bottom: 24px;" />
            <h1 style="color: #1e293b; font-size: 32px; margin: 0; font-weight: 700; line-height: 1.2;">Welcome to the Future of Shopping</h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 32px;">
            <p style="font-size: 18px; color: #475569; text-align: center; margin-bottom: 32px;">
                Thank you for joining our exclusive waitlist! You're now part of a community that values smart shopping and sustainability.
            </p>

            <!-- Feature Image -->
            <div style="margin-bottom: 40px; text-align: center;">
                <img src="https://flipboxx.com/premium-shopping-experience.png" 
                     alt="Premium Shopping Experience" 
                     style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
            </div>

            <!-- What to Expect Section -->
            <div style="background-color: #f8fafc; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
                <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 16px 0; text-align: center;">What to Expect</h2>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin-bottom: 16px; display: flex; align-items: center;">
                        <span style="color: #fbbf24; margin-right: 12px;">✓</span>
                        <span style="color: #475569;">Exclusive access to premium open-box deals</span>
                    </li>
                    <li style="margin-bottom: 16px; display: flex; align-items: center;">
                        <span style="color: #fbbf24; margin-right: 12px;">✓</span>
                        <span style="color: #475569;">Up to 70% off retail prices on top brands</span>
                    </li>
                    <li style="margin-bottom: 16px; display: flex; align-items: center;">
                        <span style="color: #fbbf24; margin-right: 12px;">✓</span>
                        <span style="color: #475569;">Early access to limited-time offers</span>
                    </li>
                    <li style="display: flex; align-items: center;">
                        <span style="color: #fbbf24; margin-right: 12px;">✓</span>
                        <span style="color: #475569;">Sustainable shopping that reduces waste</span>
                    </li>
                </ul>
            </div>

            <!-- Featured Brands -->
            <div style="text-align: center; margin-bottom: 40px;">
                <h3 style="color: #1e293b; font-size: 20px; margin-bottom: 20px;">Trusted by Leading Retailers</h3>
                <div style="display: flex; justify-content: space-between; gap: 24px; flex-wrap: wrap;">
                    <img src="https://flipboxx.com/layout/logos/target.png" alt="Target" style="height: 24px; width: auto;" />
                    <img src="https://flipboxx.com/layout/logos/old_navy.png" alt="Old Navy" style="height: 24px; width: auto;" />
                    <img src="https://flipboxx.com/layout/logos/macys.png" alt="Macy's" style="height: 24px; width: auto;" />
                    <img src="https://flipboxx.com/layout/logos/nordstorm.png" alt="Nordstorm" style="height: 24px; width: auto;" />
                </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin-bottom: 40px;">
                <a href="https://flipboxx.com" 
                   style="display: inline-block; background-color: #fbbf24; color: #1e293b; padding: 16px 32px; 
                          text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px;
                          box-shadow: 0 4px 6px -1px rgba(251, 191, 36, 0.3);">
                    Visit Flipboxx.com
                </a>
            </div>

            <!-- Social Proof -->
            <div style="text-align: center; margin-bottom: 32px;">
                <div style="color: #fbbf24; font-size: 24px; margin-bottom: 8px;">★★★★★</div>
                <p style="color: #475569; font-style: italic; margin: 0;">
                    "Join thousands of smart shoppers who've already signed up for exclusive access!" - Titus Doboyou
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1e293b; color: #f8fafc; padding: 32px; text-align: center;">
            <p style="margin: 0 0 16px 0; font-size: 14px;">
                You're receiving this email because you signed up for Flipboxx updates.
            </p>
            <p style="margin: 0; font-size: 14px;">
                © 2025 Flipboxx Inc. All rights reserved. San Francisco, California.
            </p>
        </div>
    </div>
</body>
</html>
`;

export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Send email to user
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify({ email, body }),
      });

      // Send copy to support
      const supportResponse = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify({ 
          email: 'support@flipboxx.com',
          body: `New subscription: ${email}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setShowSuccess(true);
      setEmail('');
      setTimeout(() => setShowSuccess(false), 10000);
    } catch (error) {
      console.error('Error:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="text-lg w-full sm:w-auto flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none text-gray-900 border border-gray-200"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="text-lg bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Notify Me'
          )}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-xl transform transition-all animate-slideUp">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                You're on the list!
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Thank you for joining our waitlist. We'll notify you as soon as we launch with amazing deals just for you!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-300 font-semibold shadow-sm hover:shadow-md"
                type="button"
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-xl transform transition-all animate-slideUp">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 text-center mb-6">
                We couldn't process your subscription. Please check your email and try again.
              </p>
              <button
                onClick={() => setShowError(false)}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-semibold shadow-sm hover:shadow-md"
                type="button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
