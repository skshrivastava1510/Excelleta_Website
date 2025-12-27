import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import {
  ArrowRight, Play, FileSpreadsheet, AlertTriangle, Clock, Eye,
  Zap, Database, Target, Shield, Inbox, Layers, Calculator, GitBranch,
  BarChart3, Car, Factory, Wrench, Building2, Check, X as XIcon,
  ChevronRight, Quote, Menu, X, Phone, Mail, MapPin, MessageCircle,
  Download, Calendar, Users, CheckCircle, ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  heroData, benefitBlocks, howItWorks, problemData, platformModules,
  comparisonData, industriesData, implementationSteps, testimonials,
  companyInfo, navLinks, stats, companyLogo, clientLogos, siteImages, calendlyLink
} from '../data/mock';
import '../styles/landing.css';

// Icon mapping
const iconMap = {
  FileSpreadsheet, AlertTriangle, Clock, Eye, Zap, Database, Target, Shield,
  Inbox, Layers, Calculator, GitBranch, BarChart3, Car, Factory, Wrench, Building2
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix, label, inView }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);
  const localInView = useInView(counterRef, { once: true, amount: 0.5 });
  const shouldAnimate = (inView || localInView) && !hasAnimated;

  useEffect(() => {
    if (shouldAnimate) {
      setHasAnimated(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [shouldAnimate, value]);

  return (
    <div className="text-center" ref={counterRef}>
      <div className="text-5xl md:text-6xl font-bold text-brand mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-lg">{label}</div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img 
            src={companyLogo} 
            alt="Excelleta Tech" 
            className="h-12 md:h-14 w-auto object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] hover:text-[#5a9cf5] flex items-center gap-2">
            <MessageCircle size={18} />
            <span className="text-sm">WhatsApp</span>
          </a>
          <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#4285F4] text-white hover:bg-[#5a9cf5] px-6 rounded-lg">
              Book a Demo
            </Button>
          </a>
        </div>

        <button
          className="md:hidden text-white p-2 hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-400 hover:text-white py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#4285F4] flex items-center gap-2 py-2">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="bg-[#4285F4] text-white w-full mt-2 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  Book a Demo
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="min-h-screen relative overflow-hidden bg-black pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={siteImages.hero} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
      </div>
      <div className="absolute inset-0 grid-background opacity-10" />

      <div className="max-w-7xl mx-auto px-6 pt-20 lg:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#4285F4]/10 border border-[#4285F4]/30 px-4 py-2 mb-6 rounded-full">
              <span className="text-[#4285F4] text-sm font-medium">Purpose-Built for Manufacturing</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {heroData.headline}
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              {heroData.subtext}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#4285F4] text-white hover:bg-[#5a9cf5] px-8 py-6 text-lg font-medium group rounded-lg">
                  {heroData.primaryCta}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {heroData.trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="text-[#34A853]" size={16} />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 overflow-visible">
              <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-brand rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

// Key Benefits Section
const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Manufacturing Leaders Choose Excelleta</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Transform your RFQ operations with measurable outcomes</p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefitBlocks.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || Zap;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto bg-brand/20 flex items-center justify-center mb-4">
                      <Icon className="text-brand" size={28} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{problemData.heading}</h2>
            <p className="text-gray-400 text-lg mb-8">
              Most manufacturing companies still manage RFQs, BOMs, and costing in scattered Excel files and email threads.
              This leads to version chaos, missed deadlines, and costly errors that directly impact profitability.
            </p>
            <div className="space-y-4">
              {problemData.painPoints.map((point, i) => {
                const Icon = iconMap[point.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20"
                  >
                    <Icon className="text-red-400 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-300">{point.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">The Excelleta Difference</h3>
            <div className="space-y-4">
              {[
                "One centralized platform for all RFQ data",
                "Automated costing with norms libraries",
                "Built-in approval workflows and audit trails",
                "Real-time dashboards for management visibility",
                "ERP integration—no manual re-entry"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-brand flex-shrink-0" size={20} />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const stepColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Excelleta Works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">From RFQ receipt to winning quote in four streamlined steps</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="text-5xl font-bold mb-4" style={{ color: stepColors[i], opacity: 0.3 }}>0{step.step}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              {i < howItWorks.length - 1 && (
                <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 text-white/20" size={32} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Platform Modules Section
const PlatformSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeModule, setActiveModule] = useState(platformModules[0].id);

  const currentModule = platformModules.find(m => m.id === activeModule);

  return (
    <section ref={ref} id="platform" className="py-24 bg-black relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={siteImages.platform} 
          alt="" 
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Excelleta Platform</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Comprehensive modules covering the entire RFQ-to-Order journey</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Module Navigation */}
          <div className="lg:col-span-1 space-y-2">
            {platformModules.map((module) => {
              const Icon = iconMap[module.icon] || Database;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-all rounded-lg ${activeModule === module.id ? 'bg-[#4285F4]/20 border-l-4 border-[#4285F4]' : 'bg-white/5 border-l-4 border-transparent hover:bg-white/10'}`}
                >
                  <Icon className={activeModule === module.id ? 'text-[#4285F4]' : 'text-gray-500'} size={20} />
                  <span className={activeModule === module.id ? 'text-white font-medium' : 'text-gray-400'}>{module.title}</span>
                </button>
              );
            })}
          </div>

          {/* Module Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {currentModule && (
                <motion.div
                  key={currentModule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{currentModule.title}</h3>
                  <p className="text-gray-400 text-lg mb-8">{currentModule.overview}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[#4285F4] font-semibold mb-4 flex items-center gap-2">
                        <Layers size={18} /> Key Features
                      </h4>
                      <ul className="space-y-2">
                        {currentModule.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <Check className="text-[#34A853] flex-shrink-0 mt-1" size={16} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[#FBBC05] font-semibold mb-4 flex items-center gap-2">
                        <Target size={18} /> Business Benefits
                      </h4>
                      <ul className="space-y-2">
                        {currentModule.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <ArrowRight className="text-[#FBBC05] flex-shrink-0 mt-1" size={16} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// Import remaining sections
import {
  ClientLogosSection,
  ComparisonSection,
  SolutionsSection,
  ImplementationSection,
  StatsSection,
  TestimonialsSection,
  AboutSection,
  DemoFormSection,
  Footer
} from '../components/LandingSections';

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <ClientLogosSection />
      <BenefitsSection />
      <ProblemSection />
      <HowItWorksSection />
      <PlatformSection />
      <ComparisonSection />
      <SolutionsSection />
      <StatsSection />
      <ImplementationSection />
      <TestimonialsSection />
      <AboutSection />
      <DemoFormSection />
      <Footer />
    </div>
  );
}
