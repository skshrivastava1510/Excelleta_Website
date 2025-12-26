import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Car, Factory, Layers, Hammer, Briefcase, Truck,
  Lock, Shield, FileSearch, Cloud, Webhook, ArrowRight,
  Quote, ChevronLeft, ChevronRight, Mail, Phone, MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import {
  benefitsData, industriesData, workflowSteps,
  securityFeatures, testimonials
} from '../data/mock';

// Icon mapping
const iconMap = {
  Car, Factory, Layers, Hammer, Briefcase, Truck,
  Lock, Shield, FileSearch, Cloud, Webhook
};

// Benefits Section with Animated Counters
export const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0a] relative overflow-hidden" id="benefits">
      {/* Factory Texture Background */}
      <motion.div style={{ y }} className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 grid-background" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Results That Matter
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Measurable impact on your manufacturing operations
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-8 bg-white/5 border border-white/10 hover:border-brand/30 transition-all duration-300"
            >
              <AnimatedCounter
                value={benefit.value}
                suffix={benefit.suffix}
                label={benefit.label}
                inView={isInView}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Counter Component with improved detection
const AnimatedCounter = ({ value, suffix, label, inView }) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const counterRef = React.useRef(null);
  const localInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  // Use either passed inView or local detection
  const shouldAnimate = (inView || localInView) && !hasAnimated;
  
  React.useEffect(() => {
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
      <div className="text-5xl md:text-6xl font-bold text-brand mb-2" data-value={value}>
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-lg">{label}</div>
    </div>
  );
};

// Industries Section
export const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-black" id="industries">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Built For Your Industry
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tailored costing solutions for diverse manufacturing sectors
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesData.map((industry, i) => {
            const Icon = iconMap[industry.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="industry-tile group"
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/50 hover:bg-white/[0.08] transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-brand/20 flex items-center justify-center mb-6 group-hover:bg-brand/30 transition-colors">
                      <Icon className="text-brand" size={28} />
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-2">{industry.title}</h3>
                    <p className="text-gray-400">{industry.description}</p>
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

// Workflow Section (Scrollytelling Timeline)
export const WorkflowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From RFQ to Won Deal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Streamlined workflow that turns quotes into orders
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 hidden lg:block">
            <motion.div
              className="h-full bg-brand"
              style={{ width: progress.get() + '%' }}
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 mx-auto bg-black border-2 border-brand/50 flex items-center justify-center mb-4 relative z-10 hover:bg-brand/20 transition-colors">
                  <span className="text-brand font-bold text-lg">0{i + 1}</span>
                </div>
                <h4 className="text-white font-semibold mb-1">{step.step}</h4>
                <p className="text-gray-500 text-sm">{step.description}</p>
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5">
                    <ChevronRight className="absolute -right-2 -top-2 text-brand/50" size={16} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Security Section
export const SecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden" id="security">
      {/* Parallax Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-32 h-32 border border-brand/20 opacity-30" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-48 h-48 border border-brand/10 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your data is protected with industry-leading security measures
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {securityFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/30 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto bg-brand/20 flex items-center justify-center mb-4">
                      <Icon className="text-brand" size={24} />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.description}</p>
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

// Testimonials Section
export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-32 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
        </motion.div>
        
        <div className="relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 relative"
          >
            <Quote className="absolute top-6 left-6 text-brand/30" size={48} />
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 relative z-10">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand/20 flex items-center justify-center text-brand font-bold">
                {testimonials[activeIndex].author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-semibold">{testimonials[activeIndex].author}</div>
                <div className="text-gray-400 text-sm">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-brand hover:text-brand transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-brand' : 'bg-white/30'}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-brand hover:text-brand transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store in localStorage (mock)
    const demos = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    demos.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem('demoRequests', JSON.stringify(demos));
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="py-32 bg-black relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/5 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/3 blur-3xl rounded-full" />
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Stop guessing.<br />
            <span className="text-brand">Start quoting with confidence.</span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            Join leading manufacturers who have transformed their costing and quotation process with CostGenie.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 h-14 px-6 flex-1"
            />
            <Button type="submit" className="bg-brand text-black hover:bg-brand/90 h-14 px-8 font-semibold">
              Request Demo
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </form>
          
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand mb-4"
            >
              Thank you! We'll be in touch shortly.
            </motion.p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
            <span>No credit card required</span>
            <span className="hidden sm:block">•</span>
            <span>Free 14-day trial</span>
            <span className="hidden sm:block">•</span>
            <span>Setup in 30 minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand flex items-center justify-center">
                <span className="text-black font-bold text-xl">C</span>
              </div>
              <span className="text-white text-xl font-semibold">CostGenie</span>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              The complete costing and quotation platform for manufacturing excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-500 hover:text-brand transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">Pricing</a></li>
              <li><a href="#industries" className="text-gray-500 hover:text-brand transition-colors">Industries</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-brand transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500">
                <Mail size={16} className="text-brand" />
                <span>hello@costgenie.io</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <Phone size={16} className="text-brand" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <MapPin size={16} className="text-brand mt-0.5" />
                <span>123 Tech Park, Silicon Valley, CA 94025</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 CostGenie. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default {
  BenefitsSection,
  IndustriesSection,
  WorkflowSection,
  SecuritySection,
  TestimonialsSection,
  CTASection,
  Footer
};
