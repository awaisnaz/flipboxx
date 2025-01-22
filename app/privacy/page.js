'use client';

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Your Company Name</title>
        <meta name="description" content="Privacy Policy of Your Company Name." />
      </Head>
      <main className="bg-gray-50 dark:bg-gray-900 dark:text-gray-300 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Privacy Policy</h1>

          <p className="mb-4">
            At Your Company Name, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website or services. By using our website, you agree to the terms outlined in this policy.
          </p>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">1. Information We Collect</h2>
            <p>
              We may collect personal information that you provide directly to us, such as your name, email address, phone number, and payment details. Additionally, we may collect information about your device, browsing behavior, and interactions with our website.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, improve, and personalize our services. This includes:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li>Processing transactions and fulfilling orders.</li>
              <li>Responding to customer inquiries and support requests.</li>
              <li>Sending promotional communications, where permitted.</li>
              <li>Analyzing usage patterns to enhance user experience.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">3. Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. However, we may share your information with trusted partners to provide services on our behalf, comply with legal obligations, or protect our rights.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also object to certain data processing activities. To exercise your rights, please contact us at privacy@yourcompany.com.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">7. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <address className="mt-2 not-italic">
              Email: <a href="mailto:privacy@yourcompany.com" className="text-orange-500 hover:underline">privacy@yourcompany.com</a>
            </address>
          </section>
        </div>
      </main>
    </>
  );
}
