import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { companyLogo, companyInfo } from '../data/mock';
import '../styles/landing.css';

export default function TermsOfService() {
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
            <div className="w-14 h-14 bg-[#34A853]/20 rounded-xl flex items-center justify-center">
              <FileText className="text-[#34A853]" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-gray-400">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing or using the Excelleta platform and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Services</h2>
              <p className="text-gray-400 leading-relaxed">
                Excelleta provides a cloud-based RFQ (Request for Quotation) and quotation management platform designed for manufacturing companies. Our services include RFQ tracking, BOM management, automated quote generation, approval workflows, and analytics dashboards.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">4. Acceptable Use</h2>
              <p className="text-gray-400 leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Use the services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the services</li>
                <li>Upload malicious code or harmful content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the intellectual property rights of others</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Ownership</h2>
              <p className="text-gray-400 leading-relaxed">
                You retain ownership of all data you input into the platform. By using our services, you grant us a limited license to process, store, and display your data solely for the purpose of providing our services to you.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-400 leading-relaxed">
                The Excelleta platform, including its software, design, trademarks, and content, is owned by Excelleta Tech Pvt. Ltd. and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our platform without written permission.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">7. Subscription and Payments</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Subscription fees are billed according to the plan selected</li>
                <li>Payments are non-refundable unless otherwise specified</li>
                <li>We reserve the right to modify pricing with advance notice</li>
                <li>Failure to pay may result in suspension of services</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">8. Service Availability</h2>
              <p className="text-gray-400 leading-relaxed">
                We strive to maintain high availability but do not guarantee uninterrupted access. We may perform maintenance that temporarily affects service availability. We are not liable for any damages resulting from service interruptions.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed">
                To the maximum extent permitted by law, Excelleta shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the services in the twelve months preceding the claim.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">10. Indemnification</h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to indemnify and hold harmless Excelleta, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">11. Termination</h2>
              <p className="text-gray-400 leading-relaxed">
                Either party may terminate the agreement with written notice. We may suspend or terminate your access immediately for violation of these terms. Upon termination, you may request export of your data within 30 days.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">12. Governing Law</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">13. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through the platform. Continued use after changes constitutes acceptance of the revised terms.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">14. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed">
                For questions about these Terms, contact us at:
              </p>
              <div className="mt-4 text-gray-300">
                <p><strong>Email:</strong> {companyInfo.email}</p>
                <p><strong>Phone:</strong> {companyInfo.phone}</p>
                <p><strong>Address:</strong> {companyInfo.address}</p>
              </div>
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
