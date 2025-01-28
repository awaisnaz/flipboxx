"use client"

import { useState } from 'react';
let body = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flipboxx Coming Soon!</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2d3436; text-align: center;">🚀 Flipboxx is Coming Soon!</h1>
        
        <p style="text-align: center;">Thank you for joining our waitlist! We’re working hard to bring you curated deals and a seamless shopping experience.</p>
        
        <a href="https://flipboxx.com" target="_blank" style="display: block; text-align: center;">
            <img src="https://flipboxx.com/_next/image?url=https%3A%2F%2Fi0.wp.com%2Ft-labz.com%2Fwp-content%2Fuploads%2F2023%2F07%2FUnboxed-Deals-Banner-Final.png%3Fresize%3D1300%252C235%26ssl%3D1&w=1920&q=75" 
                 alt="Flipboxx Preview" 
                 style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px;" />
        </a>

        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <p style="margin: 0;">🔔 <strong>You’ll be the first to know!</strong><br />We’ll notify you the moment we go live.</p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
            <a href="https://flipboxx.com" 
               style="background-color: #2d3436; color: white; padding: 12px 25px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
                Visit Flipboxx.com
            </a>
        </div>

        <p style="color: #7f8c8d; text-align: center; margin-top: 30px;">
            Thank you for your patience!<br />
            – The Flipboxx Team
        </p>
    </div>
</body>
</html>
`;


export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

      alert('Email sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Notify Me'}
      </button>
    </form>
  );
}
