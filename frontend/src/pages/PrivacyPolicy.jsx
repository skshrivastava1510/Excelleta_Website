import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { companyLogo, companyInfo } from '../data/mock';
import '../styles/landing.css';

export default function PrivacyPolicy() {
  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <header className="bg-black/90 border-b border-white/10 sticky top-0 z-50">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={companyLogo} alt="Excelleta Tech" className="h-12 w-auto" />
          </a>
          <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={18} /> Back to Home
          </a>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-[#4285F4]/20 rounded-xl flex items-center justify-center">
              <Shield className="text-[#4285F4]" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-gray-400">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-400 leading-relaxed">
                Excelleta Tech Pvt. Ltd. (&ldquo;Excelleta,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our RFQ and quotation management platform.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, company name, job title, and other contact details provided through forms.</li>
                <li><strong className="text-white">Business Information:</strong> RFQ data, quotation details, BOM information, and other business-related data you input into our platform.</li>
                <li><strong className="text-white">Technical Information:</strong> IP address, browser type, device information, and usage patterns collected automatically.</li>
                <li><strong className="text-white">Communication Data:</strong> Records of correspondence when you contact us.</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process your requests and respond to inquiries</li>
                <li>To improve and personalize our platform</li>
                <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, and access controls to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
              <p className="text-gray-400 leading-relaxed mb-4">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability where applicable</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed">
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <div className="mt-4 text-gray-300">
                <p><strong>Email:</strong> {companyInfo.email}</p>
                <p><strong>Phone:</strong> {companyInfo.phone}</p>
                <p><strong>Address:</strong> {companyInfo.address}</p>
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of the revised policy.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2025 {companyInfo.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
