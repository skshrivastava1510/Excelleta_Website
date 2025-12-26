import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import {
  ArrowRight, Play, FileSpreadsheet, AlertTriangle, TrendingDown, Clock,
  Layers, Cog, Wrench, Calculator, FileText, Workflow, ListTree, GitBranch,
  Users, FileStack, CheckSquare, Building2, Plug, Car, Factory, Hammer,
  Briefcase, Truck, Lock, Shield, FileSearch, Cloud, Webhook, ChevronRight,
  Quote, Menu, X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  heroData, problemData, featuresSteps, featureCards,
  benefitsData, industriesData, workflowSteps, securityFeatures,
  testimonials, navLinks
} from '../data/mock';
import '../styles/landing.css';

// Icon mapping
const iconMap = {
  FileSpreadsheet, AlertTriangle, TrendingDown, Clock,
  Layers, Cog, Wrench, Calculator, FileText, Workflow, ListTree, GitBranch,
  Users, FileStack, CheckSquare, Building2, Plug, Car, Factory, Hammer,
  Briefcase, Truck, Lock, Shield, FileSearch, Cloud, Webhook
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix, label, inView }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (inView) {
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
  }, [inView, value]);

  return (
    <div className="text-center">
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
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand flex items-center justify-center">
            <span className="text-black font-bold text-xl">C</span>
          </div>
          <span className="text-white text-xl font-semibold">CostGenie</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-brand">
            Sign In
          </Button>
          <Button className="bg-brand text-black hover:bg-brand/90 px-6">
            Request Demo
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              <Button className="bg-brand text-black w-full mt-2">Request Demo</Button>
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
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 pt-20 lg:pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {heroData.headline.split('.').map((part, i) => (
                <span key={i}>
                  {part}{i < 2 && '.'}
                  {i < 2 && <br />}
                </span>
              ))}
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              {heroData.subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button className="bg-brand text-black hover:bg-brand/90 px-8 py-6 text-lg font-medium group">
                {heroData.primaryCta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Play className="mr-2" size={20} />
                {heroData.secondaryCta}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {heroData.trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right - 3D Spline */}
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
      
      {/* Scroll Indicator */}
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

// Problem Section
const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden">
      {/* Floating Cost Sheet Background */}
      <motion.div style={{ y }} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="w-[600px] h-[800px] bg-gradient-to-br from-brand/20 to-transparent rounded-lg border border-brand/20" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {problemData.heading}
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto" />
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problemData.painPoints.map((point, i) => {
            const Icon = iconMap[point.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/50 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/30 transition-colors">
                      <Icon className="text-red-400" size={24} />
                    </div>
                    <p className="text-gray-300 text-lg">{point.text}</p>
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

// Features Steps Section (Sticky Scroll)
const FeaturesStepsSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(Math.floor(latest * featuresSteps.length), featuresSteps.length - 1);
      setActiveStep(stepIndex);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative bg-[#0a0a0a]" style={{ height: `${featuresSteps.length * 100}vh` }} id="features">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Product UI Visual */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-lg p-8 relative overflow-hidden">
                <div className="absolute inset-0 grid-background opacity-30" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 h-full flex flex-col justify-center"
                  >
                    {(() => {
                      const Icon = iconMap[featuresSteps[activeStep]?.icon];
                      return Icon ? (
                        <div className="w-20 h-20 bg-brand/20 border border-brand/30 flex items-center justify-center mb-6">
                          <Icon className="text-brand" size={40} />
                        </div>
                      ) : null;
                    })()}
                    <div className="text-6xl font-bold text-brand/20 mb-4">
                      0{activeStep + 1}
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-brand"
                        initial={{ width: 0 }}
                        animate={{ width: `${((activeStep + 1) / featuresSteps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Right - Steps */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                What CostGenie Does
              </h2>
              {featuresSteps.map((step, i) => {
                const Icon = iconMap[step.icon];
                return (
                  <motion.div
                    key={step.id}
                    animate={{ opacity: activeStep === i ? 1 : 0.3, x: activeStep === i ? 0 : -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-4 p-4 rounded-lg transition-all ${activeStep === i ? 'bg-white/5 border border-brand/30' : ''}`}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${activeStep === i ? 'bg-brand' : 'bg-white/10'}`}>
                      <Icon className={activeStep === i ? 'text-black' : 'text-gray-500'} size={24} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-1 ${activeStep === i ? 'text-white' : 'text-gray-500'}`}>
                        {step.title}
                      </h3>
                      <p className={activeStep === i ? 'text-gray-400' : 'text-gray-600'}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Cards Grid Section
const FeatureCardsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Key Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to create accurate cost sheets and winning quotations
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/50 hover:bg-white/[0.08] transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-brand/20 flex items-center justify-center mb-4 group-hover:bg-brand/30 transition-colors">
                      <Icon className="text-brand" size={24} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{card.title}</h3>
                    <p className="text-gray-400 text-sm">{card.description}</p>
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

// Import additional sections
import {
  BenefitsSection,
  IndustriesSection,
  WorkflowSection,
  SecuritySection,
  TestimonialsSection,
  CTASection,
  Footer
} from '../components/LandingSections';

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <FeaturesStepsSection />
      <FeatureCardsSection />
      <BenefitsSection />
      <IndustriesSection />
      <WorkflowSection />
      <SecuritySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
