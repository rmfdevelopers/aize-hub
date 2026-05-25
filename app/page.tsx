'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Gem, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Award, 
  Instagram, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ImageOff
} from 'lucide-react';

// --- DATA ---
const brief = {
  brand: {
    name: "Aize Hub",
    tagline: "Investment for A Lifetime",
    description: "Exquisite Italian gold curated for the discerning collector. Timeless elegance meets enduring value in every piece.",
    industry: "fashion",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2348156635944",
    instagram: "aizehub",
    address: "Benin & Lagos, Nigeria"
  },
  products: [
    { name: "Italian Curb Link Chain", description: "Solid 18kt gold meticulously crafted for weight and brilliance.", price: "₦2,450,000", url: "https://images.unsplash.com/photo-1703034390242-1174e133db0a?q=80&w=1080" },
    { name: "Filigree Statement Bracelet", description: "Intricate Italian craftsmanship featuring delicate gold latticework.", price: "₦850,000", url: "https://images.unsplash.com/photo-1617191880362-aac615de3c26?q=80&w=1080" },
    { name: "Heritage Gold Studs", description: "Pure gold studs designed for daily luxury and lifetime wear.", price: "₦120,000", url: "https://images.unsplash.com/photo-1653903414969-0df006d9b6fe?q=80&w=1080" },
    { name: "Signet Investment Ring", description: "A heavy-weight gold signet ring, the pinnacle of masculine elegance.", price: "₦1,100,000", url: "https://images.unsplash.com/photo-1655229238709-3acc0128eedb?q=80&w=1080" }
  ],
  features: [
    { title: "Authentic Italian Gold", description: "Every piece is sourced directly from certified Italian workshops.", icon: Gem },
    { title: "Investment Value", description: "Jewelry that retains and grows in value over generations.", icon: TrendingUp },
    { title: "Discreet Delivery", description: "Secure, insured shipping to Lagos, Benin, and nationwide.", icon: ShieldCheck }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1622704776938-bed6cd156e04?q=80&w=1080",
    "https://images.unsplash.com/photo-1689560025810-4599bc195814?q=80&w=1080",
    "https://images.unsplash.com/photo-1580582202907-d01fd0bd4c87?q=80&w=1080",
    "https://images.unsplash.com/photo-1774110101478-bb066db7ccf0?q=80&w=1080"
  ],
  stats: [
    { number: "1,000+", label: "Satisfied Clients" },
    { number: "18kt+", label: "Gold Purity" },
    { number: "50+", label: "Curated Styles" }
  ],
  testimonials: [
    { name: "Osasumwen I.", role: "Collector", text: "The weight and shine of the gold are unmatched. Truly an investment piece." },
    { name: "Amaka N.", role: "Repeat Client", text: "Fast delivery to Lagos and the packaging was incredibly premium. Highly recommend." },
    { name: "Enoma O.", role: "Fashion Stylist", text: "Aize Hub is my only trusted source for original Italian gold in Benin City." }
  ]
};

// --- HOOKS ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 1080) : undefined}
      height={!fill ? (height ?? 720) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

// --- COMPONENTS ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-secondary flex items-center justify-center text-primary font-heading font-black text-xl">A</div>
          <span className="font-heading text-2xl font-bold tracking-tight text-accent">Aize Hub</span>
        </a>

        <div className="hidden md:flex items-center gap-12">
          {['Collection', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} 
              className="text-accent/60 hover:text-secondary font-medium tracking-wide transition-colors text-sm uppercase">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-secondary text-primary px-8 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all">
            Private Inquiry
          </a>
        </div>

        <button onClick={() => setMobileMenu(true)} className="md:hidden text-accent">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[200] flex flex-col p-8 transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => setMobileMenu(false)} className="self-end text-accent mb-12">
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8">
          {['Collection', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}
              className="text-4xl font-heading font-bold text-accent">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)}
            className="mt-8 bg-secondary text-primary px-8 py-5 text-center font-bold text-lg">
            Private Inquiry
          </a>
        </div>
      </div>
    </nav>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    <span className="text-secondary font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {brief.brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
  </div>
);

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" ref={ref} className={`min-h-screen relative flex items-center justify-center overflow-hidden curtain-reveal ${revealed ? 'revealed' : ''}`}>
      <div className="absolute inset-0 z-0">
        <SafeImage 
          src="https://images.unsplash.com/photo-1703034390153-7d1d72111e8a?q=80&w=1080" 
          alt="Aize Hub Italian Gold" 
          fill 
          className="object-cover opacity-40 scale-105" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/60 to-primary" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      
      <div className={`relative z-10 text-center max-w-5xl px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="font-heading text-7xl md:text-[9rem] font-black text-accent leading-[0.85] tracking-tighter">
          The Art of <br />
          <span className="text-secondary italic">Eternal</span> Gold
        </h1>
        <p className="text-accent/60 mt-10 text-xl max-w-2xl mx-auto leading-relaxed font-light">
          {brief.brand.description} From Benin to Lagos, secure your wealth with original Italian gold.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <a href="#products" className="bg-secondary text-primary px-12 py-5 font-bold text-base
            hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-2xl">
            VIEW COLLECTION
          </a>
          <a href="#about" className="border border-white/20 text-accent px-12 py-5 font-medium text-base
            hover:bg-white/5 transition-all duration-300">
            OUR HERITAGE
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-accent">Uncompromising Quality</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brief.features.map((f, i) => (
            <div key={i} className={`p-10 rounded-3xl border border-white/5 bg-white/2
              hover:bg-secondary/5 hover:border-secondary/20 transition-all duration-500 group cursor-default
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="mb-6 text-secondary p-4 bg-secondary/10 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                <f.icon size={32} />
              </div>
              <h3 className="font-heading font-bold text-accent text-3xl mb-4">{f.title}</h3>
              <p className="text-accent/40 leading-relaxed text-lg">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="collection" ref={ref} className="py-28 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'} transition-all duration-1000`}>
            <h2 className="font-heading text-6xl font-black text-accent mb-4">Featured Investments</h2>
            <p className="text-secondary font-mono tracking-widest text-sm uppercase">Curated for the 1%</p>
          </div>
          <p className="text-accent/30 max-w-xs text-left md:text-right text-lg">
            Each piece is hallmarked and authenticated for resale value and generational wealth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Featured */}
          <div className={`md:col-span-7 group relative rounded-[2rem] overflow-hidden bg-primary h-[600px] border border-white/5 transition-all duration-1000 delay-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <SafeImage src={brief.products[0].url} alt={brief.products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
            <div className="absolute bottom-0 p-12">
              <span className="bg-secondary text-primary px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Bestseller</span>
              <h3 className="font-heading text-4xl font-black text-accent mb-2">{brief.products[0].name}</h3>
              <p className="text-accent/50 text-lg mb-6 max-w-md">{brief.products[0].description}</p>
              <div className="flex items-center gap-8">
                <span className="text-secondary font-black text-3xl">{brief.products[0].price}</span>
                <a href="#contact" className="text-accent border-b border-secondary pb-1 hover:text-secondary transition-colors font-bold uppercase tracking-widest text-sm">Inquire →</a>
              </div>
            </div>
          </div>

          {/* Side Grid */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {brief.products.slice(1, 3).map((p, i) => (
              <div key={i} className={`group relative rounded-[2rem] overflow-hidden bg-primary border border-white/5 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ transitionDelay: `${500 + i * 200}ms` }}>
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <h3 className="font-heading text-2xl font-bold text-accent">{p.name}</h3>
                  <p className="text-secondary font-black mt-2 text-xl">{p.price}</p>
                  <a href="#contact" className="mt-4 inline-block text-xs text-accent/40 hover:text-secondary transition-colors uppercase tracking-widest font-bold">Details</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="mt-16 text-center">
          <p className="text-accent/40 italic mb-8">Sharp delivery, nationwide across Nigeria.</p>
          <a href="https://wa.me/2348156635944" target="_blank" className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 text-accent hover:bg-white/10 transition-all font-bold tracking-widest uppercase text-sm">
            Browse Full Catalog <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <span className="text-secondary font-mono tracking-[0.4em] uppercase text-xs">Our Heritage</span>
          <h2 className="font-heading text-6xl font-black text-accent leading-tight">A Legacy of <br /><span className="text-secondary italic">Excellence</span></h2>
          <p className="text-accent/60 text-xl leading-relaxed font-light">
            Based in the heart of Benin and Lagos, Aize Hub was founded on the principle that jewelry should be more than an accessory—it should be an asset. We specialize in authentic Italian gold that defines status and secures wealth.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
            {brief.stats.map((s, i) => (
              <div key={i} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="font-heading text-4xl font-black text-secondary mb-1">{s.number}</p>
                <p className="text-accent/40 text-xs uppercase tracking-widest leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative aspect-square rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage src="https://images.unsplash.com/photo-1764512680324-048f158cab2b?q=80&w=1080" alt="Showroom" fill className="object-cover" />
          <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay" />
          <div className="absolute inset-0 border-[20px] border-primary/20" />
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-28 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-accent text-center mb-20">Voices of Elegance</h2>
        <div className="columns-1 md:columns-3 gap-6 space-y-6">
          {brief.testimonials.map((t, i) => (
            <div key={i} className={`break-inside-avoid bg-white/2 p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-secondary/20 transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-secondary" />)}
              </div>
              <p className="text-accent/80 text-xl leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black text-lg border border-secondary/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-accent text-lg">{t.name}</p>
                  <p className="text-accent/30 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary">
      <div className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
        <p className="text-secondary font-mono text-xs tracking-[0.4em] uppercase mb-4 opacity-60">Concierge</p>
        <h2 className="font-heading text-6xl font-black text-accent mb-6">Inquire Privately</h2>
        <p className="text-accent/40 text-lg">Leave your details and our personal collectors will reach out to facilitate your acquisition.</p>
      </div>

      <div className="max-w-xl mx-auto">
        {sent ? (
          <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-50" />
            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 relative z-10">
              <CheckCheck size={40} className="text-secondary" />
            </div>
            <h3 className="font-heading text-4xl font-black text-accent mb-4 relative z-10">Inquiry Received</h3>
            <p className="text-accent/50 text-lg relative z-10">A dedicated Aize Hub specialist will contact you shortly to discuss your Italian gold acquisition.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-950 p-10 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none transition-all focus:bg-white/10 focus:border-secondary"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none transition-all focus:bg-white/10 focus:border-secondary"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none transition-all focus:bg-white/10 focus:border-secondary"
                />
              </div>
              <textarea 
                rows={4} 
                placeholder="Message or specific pieces of interest..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-accent placeholder-white/20 outline-none resize-none transition-all focus:bg-white/10 focus:border-secondary"
              />
            </div>

            <button type="submit" disabled={loading}
              className="w-full mt-8 bg-secondary text-primary py-6 rounded-2xl font-black text-lg hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group relative z-10">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={24} /> Processing...
                </span>
              ) : (
                <>
                  SEND PRIVATE INQUIRY <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary font-heading font-black text-2xl">A</div>
              <span className="font-heading text-3xl font-bold tracking-tight text-accent">Aize Hub</span>
            </a>
            <p className="text-accent/40 max-w-sm text-lg font-light leading-relaxed">
              Exquisite Italian gold curated for the discerning collector. Serving Benin, Lagos, and the world with integrity.
            </p>
            <div className="flex gap-6">
              <a href={`https://instagram.com/${brief.contact.instagram}`} target="_blank" className="text-accent/40 hover:text-secondary transition-colors">
                <Instagram size={24} />
              </a>
              <a href={`https://wa.me/${brief.contact.whatsapp}`} target="_blank" className="text-accent/40 hover:text-secondary transition-colors">
                <Phone size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xl font-bold text-accent mb-8 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Collection', 'About', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-accent/40 hover:text-secondary transition-colors text-sm uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-accent mb-8 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-accent/40 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-secondary" />
                <span>{brief.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-secondary" />
                <span>+{brief.contact.whatsapp}</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="shrink-0 text-secondary" />
                <span>@{brief.contact.instagram}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-accent/20 text-xs tracking-widest uppercase font-medium">
            © {new Date().getFullYear()} Aize Hub. Original Italian Gold.
          </p>
          <div className="flex gap-8">
            <span className="text-accent/20 text-[10px] uppercase tracking-[0.3em]">Privacy Policy</span>
            <span className="text-accent/20 text-[10px] uppercase tracking-[0.3em]">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <SectionDivider />
      <Products />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}