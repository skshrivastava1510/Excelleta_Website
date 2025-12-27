import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Car, Factory, Wrench, Building2, Check, X as XIcon,
  ChevronLeft, ChevronRight, Quote, Mail, Phone, MapPin,
  MessageCircle, Calendar, Users, Clock, ArrowRight, Send,
  CheckCircle, AlertTriangle, Target, Shield, Zap
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  comparisonData, industriesData, implementationSteps,
  testimonials, companyInfo, stats, clientLogos, companyLogo, siteImages, calendlyLink
} from '../data/mock';

// Icon mapping
const iconMap = {
  Car, Factory, Wrench, Building2
};

// Client Logos Section - Larger and More Visible
export const ClientLogosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="text-[#4285F4] text-sm uppercase tracking-wider mb-3 font-medium">Trusted By Leading Manufacturers</p>
          <h3 className="text-3xl font-bold text-white">Our Valued Clients</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden"
        >
          {/* Scrolling logos container - Larger */}
          <div className="flex animate-scroll gap-8 items-center py-4">
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-24 w-44 bg-white/10 rounded-xl p-4 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group border border-white/5 hover:border-[#4285F4]/30"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Comparison Section (Why Excelleta vs Excel)
export const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <section ref={ref} id="why-excelleta" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* 3D Floating Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-40 h-40 bg-[#EA4335]/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-60 h-60 bg-[#4285F4]/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y1 }} className="absolute top-1/3 right-20 w-20 h-20 border-2 border-[#FBBC05]/20 rounded-xl rotate-12" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/3 left-20 w-16 h-16 border-2 border-[#34A853]/20 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Switch from Excel?</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Spreadsheets served their purpose, but they weren&apos;t designed for complex RFQ workflows.
          </p>
        </motion.div>

        {/* 3D Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ perspective: 1000 }}
          className="overflow-x-auto"
        >
          <motion.div 
            style={{ rotateX }}
            className="bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-[#4285F4]/10"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-5 px-6 text-gray-400 font-semibold text-lg">Dimension</th>
                  <th className="text-left py-5 px-6 font-semibold text-lg">
                    <div className="flex items-center gap-2 text-[#EA4335]">
                      <div className="w-8 h-8 bg-[#EA4335]/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle size={18} />
                      </div>
                      Excel / Google Sheets
                    </div>
                  </th>
                  <th className="text-left py-5 px-6 font-semibold text-lg">
                    <div className="flex items-center gap-2 text-[#4285F4]">
                      <div className="w-8 h-8 bg-[#4285F4]/20 rounded-lg flex items-center justify-center">
                        <CheckCircle size={18} />
                      </div>
                      Excelleta Platform
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
              {comparisonData.dimensions.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * i }}
                  className="border-b border-white/5 hover:bg-[#4285F4]/5 transition-colors group"
                >
                  <td className="py-4 px-6 text-white font-medium">{row.category}</td>
                  <td className="py-4 px-6 text-gray-500 group-hover:text-gray-400 transition-colors">{row.excel}</td>
                  <td className="py-4 px-6 text-[#34A853] font-medium">{row.excelleta}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a href={calendlyLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#4285F4] text-white hover:bg-[#5a9cf5] px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#4285F4]/20 hover:shadow-[#4285F4]/40 transition-all">
              Book a Demo <ArrowRight className="ml-2" size={20} />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Solutions Section (Industries) with Images
const industryImages = [
  "https://images.pexels.com/photos/19233057/pexels-photo-19233057.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/50691/drill-milling-milling-machine-drilling-50691.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=600"
];

export const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="solutions" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Manufacturing</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Excelleta understands the unique challenges of manufacturing RFQ operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {industriesData.map((industry, i) => {
            const Icon = iconMap[industry.icon] || Factory;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-brand/30 transition-all duration-300 h-full overflow-hidden group">
                  {/* Industry Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={industryImages[i]} 
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="text-brand" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-400 mb-4">{industry.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">Challenges We Solve:</p>
                      {industry.challenges.map((challenge, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Check className="text-brand flex-shrink-0 mt-1" size={16} />
                          <span className="text-gray-300 text-sm">{challenge}</span>
                        </div>
                      ))}
                    </div>
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

// Stats Section
export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const statColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Measurable Impact</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real results from manufacturing companies using Excelleta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-8 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={isInView}
                color={statColors[i]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Counter (duplicate for this file)
const AnimatedCounter = ({ value, suffix, label, inView, color = '#4285F4' }) => {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (inView && !hasAnimated) {
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
  }, [inView, value, hasAnimated]);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-lg">{label}</div>
    </div>
  );
};

// Implementation Section
export const ImplementationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Go-Live in Weeks, Not Months</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A structured, proven implementation approach that works with your existing processes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {implementationSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-brand font-bold text-lg">{step.phase}</span>
                    <span className="text-gray-500 text-sm bg-white/10 px-3 py-1">{step.duration}</span>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-brand/10 border border-brand/30 p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">No Big-Bang Changeover Required</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Excelleta integrates with your existing ERP and workflows. Start with one product line or customer,
            then expand as your team gains confidence. Hypercare support ensures smooth adoption.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Section
export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 p-8 md:p-12 relative"
          >
            <Quote className="absolute top-6 left-6 text-brand/30" size={48} />
            <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 relative z-10">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand/20 flex items-center justify-center text-brand font-bold">
                {testimonials[activeIndex].author.charAt(0)}
              </div>
              <div>
                <div className="text-white font-semibold">{testimonials[activeIndex].author}</div>
                <div className="text-gray-400 text-sm">{testimonials[activeIndex].role}</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-brand hover:text-brand transition-colors"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${i === activeIndex ? 'bg-brand' : 'bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:border-brand hover:text-brand transition-colors"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const valueColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

  return (
    <section ref={ref} id="about" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src={siteImages.about} 
                alt="Excelleta Team" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <img src={companyLogo} alt="Excelleta" className="h-10 mb-3" />
                <p className="text-white text-lg font-medium">{companyInfo.tagline}</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Excelleta Tech</h2>
            <p className="text-gray-400 text-lg mb-6">
              An Indian manufacturing software company transforming how auto-component and engineering manufacturers handle RFQ and costing operations.
            </p>
            <p className="text-gray-400 mb-8">
              Recognized by CII DigiTech for innovation, we combine deep manufacturing domain expertise with modern technology to deliver solutions that work on the shop floor.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Our Values: The 4Ps</h3>
            <div className="grid grid-cols-2 gap-4">
              {companyInfo.values.map((value, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-white/20 transition-colors">
                  <h4 className="font-semibold text-lg mb-1" style={{ color: valueColors[i] }}>{value.name}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Demo Form Section
export const DemoFormSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="demo-form" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your RFQ Process?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Book a personalized demo with our manufacturing experts. See how Excelleta can streamline your costing and quotation workflow.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4285F4]/20 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <Calendar className="text-[#4285F4]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">30-Minute Demo</h4>
                  <p className="text-gray-400 text-sm">Tailored walkthrough of the platform</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#34A853]/20 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <Users className="text-[#34A853]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Manufacturing Experts</h4>
                  <p className="text-gray-400 text-sm">Speak with people who understand your industry</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FBBC05]/20 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <CheckCircle className="text-[#FBBC05]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">No Obligation</h4>
                  <p className="text-gray-400 text-sm">Just a friendly conversation about your needs</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Option */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-400 text-sm mb-4">Prefer to chat directly?</p>
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hi, I'd like to learn more about Excelleta RFQ Platform`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right - Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="bg-white rounded-2xl overflow-hidden"
          >
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Demo</h3>
              <p className="text-gray-600 mb-6">Choose a time that works best for you</p>
              <a 
                href={calendlyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-8 py-4 rounded-lg hover:bg-[#5a9cf5] transition-colors text-lg font-medium"
              >
                <Calendar size={24} />
                Book a Demo on Calendly
                <ArrowRight size={20} />
              </a>
              <p className="text-gray-500 text-sm mt-6">Free 30-minute consultation • No commitment required</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}// Footer
export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img 
                src={companyLogo} 
                alt="Excelleta Tech" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm mb-6">
              {companyInfo.tagline}<br />
              Digitizing RFQ & Costing for Manufacturing.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/excelleta/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.facebook.com/people/Excelleta-Tech/61550919895618/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#platform" className="text-gray-500 hover:text-brand transition-colors">RFQ Management</a></li>
              <li><a href="#platform" className="text-gray-500 hover:text-brand transition-colors">BOM & Technical Evaluation</a></li>
              <li><a href="#platform" className="text-gray-500 hover:text-brand transition-colors">Costing Engine</a></li>
              <li><a href="#platform" className="text-gray-500 hover:text-brand transition-colors">Dashboards & Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-500 hover:text-brand transition-colors">About Us</a></li>
              <li><a href="#why-excelleta" className="text-gray-500 hover:text-brand transition-colors">Why Excelleta</a></li>
              <li><a href="#solutions" className="text-gray-500 hover:text-brand transition-colors">Industries</a></li>
              <li><a href="#demo-form" className="text-gray-500 hover:text-brand transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-500">
                <Mail size={16} className="text-brand" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-brand">{companyInfo.email}</a>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <Phone size={16} className="text-brand" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-brand">{companyInfo.phone}</a>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <MapPin size={16} className="text-brand mt-0.5 flex-shrink-0" />
                <span className="text-sm">{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-brand transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default {
  ClientLogosSection,
  ComparisonSection,
  SolutionsSection,
  StatsSection,
  ImplementationSection,
  TestimonialsSection,
  AboutSection,
  DemoFormSection,
  Footer
};
