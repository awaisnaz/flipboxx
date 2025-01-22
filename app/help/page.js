// pages/help.js

'use client';

import { useState } from 'react';

export default function Help() {
  const [formData, setFormData] = useState({ email: '', description: '', captcha: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // Simple CAPTCHA validation
    if (formData.captcha !== '5') {
      setMessage('Invalid CAPTCHA. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Example POST request to send form data
      const response = await fetch('/api/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Your query has been submitted successfully.');
        setFormData({ email: '', description: '', captcha: '' });
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setMessage('Error submitting your query. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Help & Support</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        If you have any questions or need assistance, please fill out the form below. Our team will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            CAPTCHA: What is 2 + 3?
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            value={formData.captcha}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
}
