// 'use client' directive ensures compatibility with Next.js client components
'use client';

import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions of our website" />
      </Head>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to our website. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully before using the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this website, including but not limited to text, images, graphics, and logos, is the property of the website owner and is protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-gray-700">
            By using this website, you agree not to engage in any activities that may harm the website, its content, or other users. This includes, but is not limited to, unauthorized access, spamming, or spreading malware.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            We are not liable for any damages that may arise from the use of this website, including direct, indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by and construed in accordance with the laws of your jurisdiction. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in your jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about these terms, please contact us at:
          </p>
          <p className="text-gray-700 mt-2">
            Email: <a href="mailto:support@domain.com" className="text-blue-600 hover:underline">support@domain.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
