'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Gem, 
  TrendingUp, 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  Award, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Phone, 
  Instagram, 
  Mail,
  ImageOff,
  Menu,
  X
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-QUOTE
// Typography Personality: oversized

// --- CONSTANTS & DATA ---

const BRAND = {
  name: "Aize Hub",
  tagline: "Investment for A Lifetime",
  description: "Exquisite Italian gold and fine jewelry curated for those who understand that luxury is a timeless asset.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const PRODUCTS = [
  {
    name: "18k Italian Rope Chain",
    description: "A classic heavyweight Italian weave, crafted for durability and high-luster brilliance.",
    price: "₦450,000",
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1080"
  },
  {
    name: "Solid Gold Statement Bangle",
    description: "Hand-polished solid gold bangle featuring an intricate geometric Italian hallmark.",
    price: "₦1,250,000",
    image: "https://images.unsplash.com/photo-1653227908236-36813ab5c30a?q=80&w=1080"
  },
  {
    name: "Royal Bridal Set",
    description: "Full set including necklace, earrings, and bracelet, designed for the ultimate celebration.",
    price: "₦4,800,000",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1080"
  },
  {
    name: "Textured Gold Studs",
    description: "Elegant daily wear studs with a unique hammered texture reflecting light from every angle.",
    price: "₦185,000",
    image: "https://images.unsplash.com/photo-1769228092677-9f2d7d7c19f3?q=80&w=1080"
  }
];

const FEATURES = [
  { title: "Authentic Italian Origin", description: "Every piece is sourced directly from elite Italian workshops with certified hallmarks.", icon: Gem },
  { title: "Lifetime Investment", description: "Gold that retains and appreciates in value, serving as a hedge for your future.", icon: TrendingUp },
  { title: "Secure Nationwide Delivery", description: "Insured and tracked shipping from our hubs in Benin and Lagos to your doorstep.", icon: ShieldCheck }
];

const TESTIMONIALS = [
  { name: "Efe Omorogbe", text: "The quality of the Italian gold I purchased is unmatched. It truly is an investment for a lifetime.", role: "Lagos Collector" },
  { name: "Nneka Adeleke", text: "Aize Hub is the only place I trust for authentic gold. Their delivery to Benin was seamless and secure.", role: "Entrepreneur" },
  { name: "Oluwatobiloba A.", text: "Stunning pieces. The luster of the gold after months of wear is still as brilliant as day one.", role: "Regular Client" }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1612731486606-2614b4d74921?q=80&w=1080",
  "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1080",
  "https://images.unsplash.com/photo-1562347174-7370ad83dc47?q=80&w=1080",
  "https://images.unsplash.com/photo-1573879500655-98f2012dd1db?q=80&w=1080",
  "https://images.unsplash.com/photo-1577909687863-91bb3ec12db5?q=80&w=1080"
];

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900/50 ${className ?? ''}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
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

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- MAIN PAGE ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroTyped = useTypewriter("Pure Italian Gold. A Legacy You Can Wear.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold tracking-tighter text-primary">AIZE HUB</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 -mt-1">Investment</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collection', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} 
                 className="text-xs font-medium uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-tighter hover:brightness-110 transition">
              View Catalog
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-secondary transition-transform duration-500 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-3xl font-bold text-primary">AIZE HUB</span>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Collection', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)}
                 className="text-4xl font-heading font-light text-white hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Regional Hubs</p>
            <p className="text-white/80 font-medium">Benin & Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      {/* HERO SECTION (HR-D PATTERN) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 grayscale mix-blend-screen pointer-events-none">
           <SafeImage src="https://images.unsplash.com/photo-1779406275908-1dabe4083373?q=80&w=1080" alt="Gold Model" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <p className="text-primary font-heading italic text-xl mb-6 opacity-80 animate-fadeIn">Curating Original Italian Elegance</p>
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {heroTyped}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10">
            <p className="text-white/40 text-lg max-w-md leading-relaxed font-light">
              {BRAND.description} Luxury that holds value across generations.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#products" className="bg-primary text-black px-12 py-5 font-black text-lg
                shadow-[6px_6px_0px_rgba(255,255,255,0.1)]
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(255,255,255,0.1)]
                transition-all duration-200 shrink-0 uppercase tracking-tighter">
                Browse Vault
              </a>
              <div className="flex -space-x-3 items-center">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <SafeImage src={`https://i.pravatar.cc/100?u=${i}`} alt="user" fill className="object-cover opacity-60" />
                  </div>
                ))}
                <span className="pl-6 text-white/40 text-xs font-mono">1K+ INVESTORS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER: D-QUOTE */}
      <div className="py-24 px-8 text-center bg-primary/10 border-y border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight italic">
          &ldquo;Luxury is not an expense, it is the most beautiful way to store your wealth.&rdquo;
        </p>
        <p className="relative text-primary/60 mt-8 text-xs tracking-[0.6em] uppercase font-bold">Aize Hub Signature</p>
      </div>

      {/* FEATURES (F-BENTO) */}
      <SectionWrapper id="features" className="py-32 px-6 bg-secondary">
        {(isVisible) => (
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <h2 className={`font-heading text-6xl font-bold text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Why Aize Hub?
              </h2>
              <p className="text-white/40 mt-4 text-xl font-light">The standard in luxury gold retail — sharp delivery, no stories.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`md:col-span-2 bg-primary/5 rounded-[2.5rem] p-12 border border-primary/20 hover:border-primary/40 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="absolute top-0 right-0 p-12 text-primary/10 group-hover:scale-110 transition-transform duration-700">
                  <Gem size={200} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-8">
                      <Gem size={32} />
                    </div>
                    <h3 className="font-heading text-4xl font-black text-white mb-4">{FEATURES[0].title}</h3>
                    <p className="text-white/50 text-xl max-w-md leading-relaxed">{FEATURES[0].description}</p>
                  </div>
                  <div className="mt-12 font-mono text-primary text-sm tracking-widest">CERTIFIED HALLMARKS 18K/22K</div>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-6">
                {FEATURES.slice(1).map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className={`bg-zinc-900/50 rounded-[2rem] p-8 border border-white/5 hover:border-primary/20 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6">
                         <Icon size={24} />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">{f.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* GALLERY: EDITORIAL SHOWCASE (MASONRY) */}
      <SectionWrapper id="gallery" className="py-32 px-6 bg-black">
        {(isVisible) => (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="font-heading text-6xl font-black text-white mb-6">The Editorial Showcase</h2>
               <div className="h-px w-24 bg-primary mx-auto" />
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {GALLERY.map((src, i) => (
                <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  <SafeImage src={src} alt={`Jewelry ${i}`} width={600} height={800} className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white text-xs tracking-[0.5em] font-bold uppercase border border-white/30 px-6 py-2 backdrop-blur-sm">Aize Vault</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* PRODUCTS (P-EDITORIAL) */}
      <SectionWrapper id="products" className="py-32 px-6 bg-secondary">
        {(isVisible) => (
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div>
                <span className="text-primary font-mono text-xs tracking-[0.4em] uppercase">Private Selection</span>
                <h2 className="font-heading text-7xl font-bold text-white mt-2 leading-none">Featured Assets</h2>
              </div>
              <p className="text-white/40 max-w-sm text-right font-light text-lg">Timeless pieces starting from ₦100k. Secured with our lifetime authenticity guarantee.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRODUCTS.map((p, i) => (
                <div key={i} className={`group relative h-[500px] rounded-[3rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                  style={{ transitionDelay: `${i * 200}ms` }}>
                  <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-12 z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-heading font-bold text-white mb-2">{p.name}</h3>
                    <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24">
                      <p className="text-white/60 mb-6 text-lg leading-relaxed max-w-md">{p.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-primary font-black text-3xl">{p.price}</span>
                      <a href="#contact" className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-black transition-all">
                        Inquire
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* ABOUT: CRAFTING YOUR HERITAGE (STATS) */}
      <SectionWrapper id="about" className="py-32 px-6 bg-black">
        {(isVisible) => (
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5">
                <SafeImage src="https://images.unsplash.com/photo-1591926870242-9b01d19110d0?q=80&w=1080" alt="Founder Style" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-10">
                   <p className="text-primary font-heading text-4xl font-bold">100% Purity</p>
                   <p className="text-white/40 text-xs uppercase tracking-widest">Italian Certified</p>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <h2 className="font-heading text-6xl font-bold text-white mb-10 leading-tight">Crafting Your Heritage</h2>
              <p className="text-white/50 text-xl leading-relaxed font-light mb-12">
                Based in the heart of Benin and Lagos, Aize Hub was founded on the principle that jewelry should be more than an accessory—it should be an investment. We specialize exclusively in original Italian gold, known globally for its superior craftsmanship and purity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {[
                  { icon: Users, num: "1k+", label: "Clients" },
                  { icon: Award, num: "18k/22k", label: "Purity" },
                  { icon: MapPin, num: "2", label: "Hubs" }
                ].map((stat, idx) => {
                   const Icon = stat.icon;
                   return (
                    <div key={idx} className="flex flex-col gap-3">
                      <Icon className="text-primary" size={24} />
                      <p className="text-3xl font-heading font-black text-white">{stat.num}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
                    </div>
                   )
                })}
              </div>
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* TESTIMONIALS (T-SLIDER) */}
      <SectionWrapper id="testimonials" className="py-32 bg-secondary overflow-hidden">
        {(isVisible) => (
          <>
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
              <h2 className="font-heading text-6xl font-black text-white mb-6">Client Stories</h2>
              <div className="flex justify-center gap-2">
                {[1,2,3,4,5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-primary" />)}
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <div key={i} className="w-[400px] shrink-0 bg-black/40 border border-white/5 rounded-[2.5rem] p-12 backdrop-blur-sm">
                    <p className="text-white/70 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-xl border border-primary/20">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{t.name}</p>
                        <p className="text-primary/60 text-xs uppercase tracking-widest font-bold">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </SectionWrapper>

      {/* CONTACT (C4 PATTERN - FULL ACCENT) */}
      <section id="contact" className="py-32 px-6 bg-primary relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-black">
            <h2 className="font-heading text-[12vw] md:text-[7vw] font-black leading-none mb-10 uppercase tracking-tighter">
              Begin Your Investment
            </h2>
            <div className="space-y-8 border-l-8 border-black/10 pl-10">
              <div className="group">
                <p className="text-black/40 text-[10px] uppercase tracking-widest font-black mb-1">Regional Headquarters</p>
                <p className="text-black text-2xl font-heading font-bold italic">Benin & Lagos, Nigeria</p>
              </div>
              <div className="group flex items-center gap-4">
                 <Phone size={24} className="text-black/60" />
                 <p className="text-black text-xl font-bold">+234 815 663 5944</p>
              </div>
              <div className="group flex items-center gap-4">
                 <Instagram size={24} className="text-black/60" />
                 <p className="text-black text-xl font-bold">@aizehub</p>
              </div>
            </div>
          </div>

          <div className="w-full relative z-10">
             <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER (F2) */}
      <footer className="py-20 bg-black px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="font-heading text-4xl font-bold text-primary">AIZE HUB</span>
                <span className="text-xs uppercase tracking-[0.4em] text-white/30">Investment for a lifetime</span>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-10">
                Curating the finest original Italian jewelry for the discerning investor. Based in Benin & Lagos, delivering luxury nationwide.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-white/30 hover:text-primary transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-white/30 hover:text-primary transition-colors"><Phone size={24} /></a>
                <a href="#" className="text-white/30 hover:text-primary transition-colors"><Mail size={24} /></a>
              </div>
            </div>
            
            <div>
              <p className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</p>
              <div className="flex flex-col gap-4 text-white/40 text-sm">
                 <a href="#hero" className="hover:text-primary transition-colors">Home</a>
                 <a href="#products" className="hover:text-primary transition-colors">Collections</a>
                 <a href="#about" className="hover:text-primary transition-colors">Heritage</a>
                 <a href="#contact" className="hover:text-primary transition-colors">Inquiries</a>
              </div>
            </div>

            <div>
              <p className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</p>
              <div className="flex flex-col gap-4 text-white/40 text-sm">
                 <p>Certificate of Purity</p>
                 <p>Delivery Policy</p>
                 <p>Investment Terms</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-white/20 text-[10px] uppercase tracking-widest font-black">
             <p>© {new Date().getFullYear()} AIZE HUB INTERNATIONAL. ALL RIGHTS RESERVED.</p>
             <p className="mt-4 md:mt-0">DESIGNED FOR THE DISCERNING INVESTOR</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SectionWrapper({ id, className, children }: { id: string; className?: string; children: (visible: boolean) => React.ReactNode }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id={id} ref={ref} className={className}>
      {children(isVisible)}
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-black p-12 rounded-[2.5rem] text-center animate-scaleIn shadow-2xl border border-white/5">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8 mx-auto border border-primary/20">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4">Request Received</h3>
        <p className="text-white/50 text-lg leading-relaxed">Our concierge will contact you shortly to process your request.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/5">
      <h3 className="font-heading text-3xl font-bold text-white mb-10">Private Inquiry</h3>
      <div className="space-y-5">
        {[
          { key: 'name', type: 'text', label: 'Full Name' },
          { key: 'email', type: 'email', label: 'Email Address' },
          { key: 'phone', type: 'tel', label: 'Phone Number (WhatsApp preferred)' }
        ].map(field => (
          <div key={field.key} className="relative">
            <input
              type={field.type}
              placeholder={field.label}
              value={(form as any)[field.key]}
              onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
              required={field.key !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none focus:border-primary transition-all duration-300"
            />
          </div>
        ))}
        <textarea
          placeholder="Which piece are you interested in?"
          rows={4}
          value={form.message}
          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none focus:border-primary transition-all duration-300 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-10 bg-primary text-black py-6 rounded-2xl font-black text-xl uppercase tracking-tighter hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
      </button>
      <p className="text-white/20 text-[10px] text-center mt-6 uppercase tracking-widest font-black">Secure Nationwide Delivery — No Stories.</p>
    </form>
  );
}