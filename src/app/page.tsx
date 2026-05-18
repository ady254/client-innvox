"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Herr_Von_Muellerhoff } from "next/font/google";
import gsap from "gsap";
import {
  Armchair,
  Gem,
  ClipboardList,
  Leaf,
  Play,
  Pause,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Compass,
  Layers,
  Hammer,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Volume2,
  Globe
} from "lucide-react";

// --- Custom Premium Slide-In Hover Button ---
interface SlideInButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "submit" | "button";
  variant?: "gold" | "dark" | "light" | "border-gold" | "border-dark";
  className?: string;
  target?: string;
  rel?: string;
}

const SlideInButton: React.FC<SlideInButtonProps> = ({
  children,
  onClick,
  href,
  type = "button",
  variant = "gold",
  className = "",
  target,
  rel
}) => {
  const baseStyles = "relative overflow-hidden font-medium text-xs tracking-[0.2em] uppercase transition-colors duration-500 py-3.5 px-7 select-none flex items-center justify-center gap-2.5 rounded-none";
  const bgLayerStyles = "absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom scale-y-0 group-hover:scale-y-100";

  let textColorStyles = "";
  let bgStyles = "";

  if (variant === "gold") {
    textColorStyles = "text-[#0B0C0E] hover:text-gold-300 bg-gold-300";
    bgStyles = "bg-[#0B0C0E]";
  } else if (variant === "dark") {
    textColorStyles = "text-white hover:text-[#0B0C0E] bg-[#1C1C1C]";
    bgStyles = "bg-gold-300";
  } else if (variant === "light") {
    textColorStyles = "text-[#0B0C0E] hover:text-white bg-white";
    bgStyles = "bg-[#0B0C0E]";
  } else if (variant === "border-gold") {
    textColorStyles = "text-gold-300 hover:text-[#0B0C0E] border border-gold-300/30 hover:border-gold-300 bg-transparent";
    bgStyles = "bg-gold-300";
  } else if (variant === "border-dark") {
    textColorStyles = "text-[#1C1C1C] hover:text-white border border-black/15 hover:border-gold-500 bg-transparent";
    bgStyles = "bg-[#1C1C1C]";
  }

  const InnerContent = () => (
    <>
      <span className={`${bgLayerStyles} ${bgStyles} z-0`} />
      <span className="relative z-10 flex items-center justify-center gap-2.5 w-full">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`group ${baseStyles} ${textColorStyles} ${className}`}
      >
        <InnerContent />
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group ${baseStyles} ${textColorStyles} ${className}`}
    >
      <InnerContent />
    </button>
  );
};

// --- Custom Premium Canvas Mouse Trail Component ---
const CanvasMouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const maxPoints = 20; // Perfect trail length for an elegant tail

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Update ages and clean up
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }

      while (points.length > maxPoints) {
        points.shift();
      }

      // Draw elegant staggered trailing light dots
      if (points.length > 1) {
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const opacity = (i / points.length) * 0.45;
          const size = (i / points.length) * 3.5; // Smooth tapered fading tail

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);

          // Luxury glowing gold color matches brand colors
          ctx.fillStyle = `rgba(229, 218, 194, ${opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(197, 160, 89, 0.5)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] w-full h-full mix-blend-screen"
      style={{ display: "block" }}
    />
  );
};

// Initialize the master signature font
const signatureFont = Herr_Von_Muellerhoff({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// --- Custom Premium Cursive Handwriting Animated Signature Component ---
const AnimatedSignature: React.FC = () => {
  const letters = ["H", "'", "B", "a", "r", "l", "e", "t", "t", "o"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // fast elegant draw pace
        delayChildren: 0.15,
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.75,
      rotate: -8
    },
    visible: {
      opacity: 0.18,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] as any
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`absolute bottom-[-30px] right-[-20px] md:bottom-[-50px] md:right-[-30px] z-0 select-none pointer-events-none ${signatureFont.className} text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12.5rem] text-gold-500 font-light flex items-center`}
      style={{ transformOrigin: "bottom right", rotate: -15 }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Custom Premium Scroll-Driven Word Fade Component ---
const ScrollRevealText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025, // incredibly fluid reading flow stagger
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0.2, // starts beautiful, muted, low opacity
      y: 2
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as any
      }
    }
  };

  return (
    <motion.p
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block mr-[0.24em] will-change-[opacity,transform]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// --- Custom Premium 3D Isometric Tactile Button Component ---
interface Book3DButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Book3DButton: React.FC<Book3DButtonProps> = ({ href, onClick, children, className = "" }) => {
  const baseStyles = "relative inline-block group select-none cursor-pointer focus:outline-none";

  const buttonContent = (
    <>
      {/* 3D Extruded Depth Under-Edge */}
      <span className="absolute inset-0 rounded-full bg-gold-600 translate-y-[4px] transition-transform duration-200 ease-out" />

      {/* Soft Tactile Drop Shadow */}
      <span className="absolute inset-0 rounded-full bg-black/50 blur-[5px] translate-y-[6px] opacity-70 group-hover:translate-y-[8px] group-hover:opacity-90 transition-all duration-200" />

      {/* Interactive Tactile Face */}
      <span className="relative block px-8 py-3.5 rounded-full bg-gold-300 text-dark-400 text-[10px] tracking-[0.2em] font-bold uppercase transition-transform duration-200 ease-out translate-y-0 group-hover:-translate-y-[3px] group-active:translate-y-[1px] border border-gold-300/40 shadow-md">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {buttonContent}
    </button>
  );
};

// --- Types ---
interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  category: "residential" | "commercial";
  year: string;
  description: string;
}

interface PodcastEpisode {
  id: number;
  episode: string;
  title: string;
  guest: string;
  duration: string;
  image: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

// --- Data ---
const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "OCEANVIEW VILLA",
    location: "DUBAI, UAE",
    image: "/living-room.jpg",
    category: "residential",
    year: "2025",
    description: "An elegant waterfront sanctuary boasting expansive open spaces, tailored geometric stone flooring, and warm, custom-crafted bronze details."
  },
  {
    id: 2,
    title: "PALM RESIDENCE",
    location: "MIAMI, USA",
    image: "/palm-residence.png",
    category: "residential",
    year: "2025",
    description: "A bright, light-filled seaside haven with floor-to-ceiling vistas, premium cream velvet seating, and curated brass highlights."
  },
  {
    id: 3,
    title: "SKYLINE PENTHOUSE",
    location: "NEW YORK, USA",
    image: "/bedroom.jpg",
    category: "commercial",
    year: "2024",
    description: "A high-altitude luxury retreat showing warm wood paneled walls, bespoke floating bedside credenzas, and integrated golden lighting."
  },
  {
    id: 4,
    title: "DESERT HARMONY",
    location: "RIYADH, SAUDI ARABIA",
    image: "/poolside.jpg",
    category: "residential",
    year: "2026",
    description: "An oasis of tranquility that blends sand-textured walls with modern water features and high-end geometric poolside sculpture work."
  }
];

const PODCASTS_DATA: PodcastEpisode[] = [
  {
    id: 1,
    episode: "EP. 25",
    title: "Crafting Sacred Spaces",
    guest: "Greg Watale",
    duration: "32:45",
    image: "/podcast-mic.png"
  },
  {
    id: 2,
    episode: "EP. 24",
    title: "The Future of Principles",
    guest: "Greg Watale",
    duration: "28:10",
    image: "/living-room.jpg"
  },
  {
    id: 3,
    episode: "EP. 22",
    title: "Sustainable Design That Lasts",
    guest: "Vincent Van Duysen",
    duration: "28:10",
    image: "/bedroom.jpg"
  },
  {
    id: 4,
    episode: "EP. 21",
    title: "Materiality Matters",
    guest: "Patricia Urquiola",
    duration: "27:08",
    image: "/poolside.jpg"
  }
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    quote: "H'Barletto transformed our house into a home beyond what we imagined. Their attention to detail, precision, and architectural mastery is unmatched.",
    author: "Aisha & Omar",
    location: "Dubai, UAE"
  },
  {
    id: 2,
    quote: "Working with H'Barletto was an absolute masterclass in luxury design. From concept selection to complete execution, they managed it flawlessly.",
    author: "Charles & Sarah",
    location: "Miami, USA"
  },
  {
    id: 3,
    quote: "Every single corner of our penthouse feels deliberate, artistic, and deeply comfortable. They delivered on every single promise, and then some.",
    author: "Liam Sterling",
    location: "New York, USA"
  }
];

interface ProductItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 1,
    title: "LUXE LOUNGE CHAIR",
    category: "Premium comfort with Italian craftsmanship",
    image: "/chair.png",
    description: "An elegant ergonomic lounge chair upholstered in luxurious bouclé fabric with solid ash wood details.",
    link: "https://www.meroniecolzani.it/indoor/tables-indoor/"
  },
  {
    id: 2,
    title: "DOGE DINING TABLE",
    category: "Sculptural marble and wooden dining table",
    image: "/doge-table.png",
    description: "A statement of luxury featuring a polished dark marble top supported by an architectural double-pedestal base.",
    link: "https://www.meroniecolzani.it/indoor/tables-indoor/"
  },
  {
    id: 3,
    title: "INDOOR LUXURY SOFA",
    category: "Cloud-like comfort & premium linen",
    image: "/indoor-sofa.png",
    description: "Minimalist Italian design with deep plush cushions and custom woven premium blend textiles.",
    link: "https://www.meroniecolzani.it/indoor/tables-indoor/"
  },
  {
    id: 4,
    title: "MARBLE COFFEE TABLE",
    category: "Timeless design with natural stone elegance",
    image: "/coffee-table.png",
    description: "Circular coffee table highlighting natural stone textures on premium geometric solid walnut legs.",
    link: "https://www.meroniecolzani.it/indoor/tables-indoor/"
  },
  {
    id: 5,
    title: "MINIMALIST SIDE TABLE",
    category: "Accent piece with bronzed metallic framing",
    image: "/side-table.png",
    description: "Slender custom table designed to complement modern high-end architectural living spaces.",
    link: "https://www.meroniecolzani.it/indoor/tables-indoor/"
  }
];

const HERO_SLIDES = [
  {
    id: 1,
    image: "/hero-bg.png",
    subtitle: "Bespoke Interior Design",
    titleStart: "Designing",
    titleItalic: "Extraordinary",
    titleEnd: "Spaces",
    description: "Bespoke interiors that reflect your unique style and elevate your lifestyle. We merge grand architectural ideas with pristine custom craftsmanship."
  },
  {
    id: 2,
    image: "/palm-residence.png",
    subtitle: "Coastal Luxury Living",
    titleStart: "Refining",
    titleItalic: "Modern",
    titleEnd: "Sanctuaries",
    description: "Curating exceptionally bright coastal spaces with rich marble bases, sleek gold features, and uninterrupted views of palm-lined shores."
  },
  {
    id: 3,
    image: "/bedroom.jpg",
    subtitle: "Sophisticated Comfort",
    titleStart: "Timeless",
    titleItalic: "Architectural",
    titleEnd: "Retreats",
    description: "Integrating warm wood-paneled accents, custom-floating bedside credenzas, and ambient lighting arrays designed to enrich relaxation."
  },
  {
    id: 4,
    image: "/living-room.jpg",
    subtitle: "Grand Salons & Lounges",
    titleStart: "Sculpting",
    titleItalic: "Masterpiece",
    titleEnd: "Lounges",
    description: "Pioneering layout solutions, tailored geometric floor details, and luxurious velvet sectionals meant for grand entertainment."
  },
  {
    id: 5,
    image: "/poolside.jpg",
    subtitle: "Harmonious Exteriors",
    titleStart: "Merging",
    titleItalic: "Water &",
    titleEnd: "Landscape",
    description: "Bringing modern poolside sculptures, structural palm placement, and natural sandy stone finishes to form custom high-end outdoor havens."
  }
];

// --- Custom Components ---
const Logo = ({ light = false }: { light?: boolean }) => (
  <div className="flex items-center gap-3 select-none group cursor-pointer">
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Golden rotating outer boundary */}
      <svg className="absolute inset-0 w-full h-full text-gold-300/40 group-hover:text-gold-300 transition-colors duration-500" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="8 6" />
      </svg>
      {/* Architectural gold emblem */}
      <svg className="w-6 h-6 text-gold-300" viewBox="0 0 40 40" fill="none">
        <path d="M10 5V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 5V35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 20H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 10L20 5L24 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 30L20 35L24 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div>
      <span className={`font-serif text-xl tracking-[0.25em] font-light ${light ? "text-[#1C1C1C]" : "text-white"} block leading-none`}>H'BARLETTO</span>
      <span className="text-[7.5px] tracking-[0.45em] text-gold-300 uppercase block mt-1 font-medium">INTERIOR DESIGN</span>
    </div>
  </div>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [autoplayTimeline, setAutoplayTimeline] = useState(true);
  const [activePodcastId, setActivePodcastId] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [splashCompleted, setSplashCompleted] = useState(false);
  const [activePillar, setActivePillar] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Residential Design",
    date: "",
    message: ""
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  // Scroll handler for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autoplay hero slideshow every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev % HERO_SLIDES.length) + 1);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  // Autoplay process timeline steps every 4.5 seconds
  useEffect(() => {
    if (!autoplayTimeline) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplayTimeline]);

  // GSAP opening sequence and splash screen animation
  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setSplashCompleted(true);
        document.body.style.overflow = "unset";
      }
    });

    // 1. Entrance of splash elements
    tl.fromTo(".splash-logo-symbol",
      { opacity: 0, scale: 0.8, rotation: -45 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.4, ease: "power3.out" }
    );

    tl.fromTo([".splash-logo-title", ".splash-logo-sub"],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power2.out" },
      "-=0.8"
    );

    // 2. Loading bar growth
    tl.fromTo(".splash-loading-bar",
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
      "-=0.4"
    );

    // 3. Zoom-out and fade out of splash items
    tl.to([".splash-logo-symbol", ".splash-logo-title", ".splash-logo-sub", ".splash-loading-bar"], {
      opacity: 0,
      y: -25,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.in"
    });

    // 4. Reveal sweep-up panel
    tl.to(splashRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2");

    // 5. Trigger Hero entrance sequence
    tl.fromTo(".hero-sub",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(".hero-title span",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "power4.out" },
      "-=0.8"
    );

    tl.fromTo(".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );

    tl.fromTo(".hero-cta",
      { opacity: 0, x: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    tl.fromTo(".hero-slide-nav",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.8"
    );

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct premium formatted message
    const msg = `Hello H'Barletto Team,

I would like to book a luxury interior design consultation. Here are my details:
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Selected Service: ${formData.service}
• Preferred Date: ${formData.date}
• Message: ${formData.message || "N/A"}

Looking forward to creating something beautiful together.`;

    // Trigger WhatsApp redirect in a new tab
    const waUrl = `https://wa.me/919601415227?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setConsultationModalOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "Residential Design",
        date: "",
        message: ""
      });
    }, 2000);
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const togglePodcast = (id: number) => {
    if (activePodcastId === id) {
      setPodcastPlaying(!podcastPlaying);
    } else {
      setActivePodcastId(id);
      setPodcastPlaying(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0B0C0E]">
      <CanvasMouseTrail />

      {/* --- SPLASH SCREEN EFFECT --- */}
      {!splashCompleted && (
        <div
          ref={splashRef}
          className="fixed inset-0 z-[9999] bg-[#070809] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Architectural revolving circular background lines */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-gold-300/5 animate-[spin_60s_linear_infinite] flex items-center justify-center pointer-events-none">
            <div className="w-[420px] h-[420px] rounded-full border border-dashed border-gold-300/10" />
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Architectural Gold Emblem (Animate this scaling up and rotating!) */}
            <div className="splash-logo-symbol relative w-16 h-16 flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full text-gold-300/40" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 8" />
              </svg>
              <svg className="w-9 h-9 text-gold-300" viewBox="0 0 40 40" fill="none">
                <path d="M10 5V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M30 5V35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10 20H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 10L20 5L24 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 30L20 35L24 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Brand Title (Animate letter spacing and fade in!) */}
            <h2 className="splash-logo-title font-serif text-3xl md:text-4xl tracking-[0.35em] text-white font-light leading-none mb-3">
              H'BARLETTO
            </h2>
            <p className="splash-logo-sub text-[9px] tracking-[0.55em] text-gold-300 font-medium uppercase">
              INTERIOR DESIGN
            </p>

            {/* Architectural Loading Bar */}
            <div className="w-48 h-[1px] bg-white/10 relative mt-10 overflow-hidden">
              <div className="splash-loading-bar absolute left-0 top-0 h-full w-full bg-gold-300 origin-left scale-x-0" />
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING BACKGROUND GLOW --- */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gold-400/3 blur-[150px] pointer-events-none" />

      {/* --- NAVIGATION BAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${scrolled
        ? "bg-[#0B0C0E]/95 backdrop-blur-md py-4 border-gold-300/10 shadow-lg shadow-black/30"
        : "bg-transparent py-7 border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8 mx-6 xl:mx-10">
            {["HOME", "ABOUT", "SERVICES", "PROJECTS", "PRODUCT", "PODCAST", "CONTACT"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] xl:text-xs tracking-[0.2em] xl:tracking-[0.25em] text-white/80 hover:text-gold-300 font-medium transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-gold-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <SlideInButton
              onClick={() => setConsultationModalOpen(true)}
              variant="border-gold"
              className="py-2.5 px-6"
            >
              BOOK CONSULTATION
            </SlideInButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gold-300 hover:text-white transition-colors duration-300"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0B0C0E] z-50 flex flex-col justify-between p-8 border-l border-gold-300/10"
          >
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-gold-300/10">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gold-300 hover:text-white transition-colors duration-300"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="flex flex-col gap-6 mt-12">
                {["HOME", "ABOUT", "SERVICES", "PROJECTS", "PRODUCT", "PODCAST", "CONTACT"].map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg tracking-[0.2em] font-serif text-white hover:text-gold-300 transition-colors duration-300 py-1"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setConsultationModalOpen(true);
                }}
                className="w-full py-4 bg-gold-300 hover:bg-gold-400 text-[#0B0C0E] font-medium tracking-[0.2em] text-xs transition-all duration-300 uppercase text-center"
              >
                BOOK CONSULTATION
              </button>
              <div className="text-center text-xs tracking-widest text-white/40">
                +971 50 123 4567 • hello@hbarletto.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- HERO SECTION --- */}
      <section id="home" ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Dynamic background with cross-fade transition */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_SLIDES[activeHeroSlide - 1].image}
                alt={HERO_SLIDES[activeHeroSlide - 1].subtitle}
                fill
                priority
                quality={95}
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent md:to-black/35 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-black/30 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-16 md:mt-24">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="hero-sub block text-xs md:text-sm tracking-[0.35em] text-gold-300 font-semibold mb-6 uppercase">
                  {HERO_SLIDES[activeHeroSlide - 1].subtitle}
                </span>

                <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-serif font-light text-white leading-[1.1] mb-6 flex flex-col">
                  <span>{HERO_SLIDES[activeHeroSlide - 1].titleStart}</span>
                  <span className="gold-gradient-text italic font-normal py-2">{HERO_SLIDES[activeHeroSlide - 1].titleItalic}</span>
                  <span>{HERO_SLIDES[activeHeroSlide - 1].titleEnd}</span>
                </h1>

                <p className="hero-desc text-white/70 text-sm md:text-base leading-relaxed tracking-wide font-light max-w-lg mb-10">
                  {HERO_SLIDES[activeHeroSlide - 1].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="hero-cta flex flex-wrap items-center gap-6 mt-6">
              <Book3DButton
                href="https://wa.me/919601415227?text=Hello%20H'Barletto%20Design,%20I%20would%20like%20to%20book%20a%20luxury%20design%20call."
              >
                BOOK A CALL
              </Book3DButton>

              <SlideInButton
                href="#projects"
                variant="border-gold"
                className="px-8 py-3.5"
              >
                EXPLORE PROJECTS
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </SlideInButton>
            </div>
          </div>
        </div>

        {/* Slider Indicator Overlay */}
        <div className="hero-slide-nav absolute bottom-12 right-6 md:right-12 z-10 flex items-center gap-6 text-white bg-black/30 backdrop-blur-md py-3 px-6 border border-white/5">
          <div className="flex items-center gap-2 font-serif text-sm tracking-widest text-white/60">
            <span className="text-white font-medium">0{activeHeroSlide}</span>
            <span className="text-white/20">/</span>
            <span>05</span>
          </div>
          <div className="w-16 h-[1px] bg-white/20 relative">
            <motion.div
              animate={{ left: `${(activeHeroSlide - 1) * 20}%` }}
              className="absolute top-0 w-4 h-[1px] bg-gold-300 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveHeroSlide((prev) => (prev === 1 ? 5 : prev - 1))}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-300 hover:text-gold-300 transition-all duration-300 bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveHeroSlide((prev) => (prev === 5 ? 1 : prev + 1))}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold-300 hover:text-gold-300 transition-all duration-300 bg-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>




      {/* --- ALL UNDER ONE ROOF PILLARS SECTION --- */}
      <section className="relative z-20 bg-[#F9F8F6] py-24 border-b border-[#E5DAC2]/30 text-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Main Title & Concept Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="block text-xs tracking-[0.4em] text-gold-500 font-semibold mb-4 uppercase">
              A Unified Luxury Concierge
            </span>
            <div className="overflow-hidden mb-6">
              <h2 className="mask-text block font-serif text-3xl md:text-5xl font-light tracking-wide text-[#1C1C1C] leading-tight">
                All Under One Direct Roof.
              </h2>
            </div>
            <ScrollRevealText
              text="By seamlessly merging visionary architecture, bespoke interior styling, and direct global import logistics, we eliminate standard designer markups, coordination delays, and brokerage friction. A single signature team overseeing your masterpiece from concept to white-glove handover."
              className="text-sm text-black/60 leading-relaxed font-light"
            />
          </div>

          {/* The Three Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 relative">

            {/* Pillar 1: Architecture */}
            <div
              onMouseEnter={() => setActivePillar(1)}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => setActivePillar(activePillar === 1 ? null : 1)}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left p-6 lg:p-10 transition-all duration-700 cursor-pointer select-none rounded-2xl ${activePillar === 1
                  ? "bg-white shadow-xl ring-1 ring-[#E5DAC2]/30 scale-[1.03] translate-y-[-4px] z-10"
                  : activePillar !== null
                    ? "opacity-35 filter grayscale scale-[0.97]"
                    : "bg-transparent border-b lg:border-b-0 lg:border-r border-[#E5DAC2]/30 rounded-none"
                }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold-300/10 text-gold-600 mb-6">
                <Compass className="w-7 h-7 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-lg tracking-[0.15em] font-medium uppercase text-[#1C1C1C] mb-4">
                Architecture
              </h3>
              <p className="text-xs leading-relaxed text-black/60 font-light mb-6">
                Sculpting the structural soul of your environment. We engineer elevations, layout configurations, and technical floor blueprints, matching spatial volume with pristine custom lighting frameworks.
              </p>
              <ul className="text-[10px] tracking-wider text-gold-600 font-semibold space-y-2 uppercase">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Spatial Engineering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Architectural Blueprinting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Lighting & Volume Design
                </li>
              </ul>
            </div>

            {/* Pillar 2: Interior Designing */}
            <div
              onMouseEnter={() => setActivePillar(2)}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => setActivePillar(activePillar === 2 ? null : 2)}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left p-6 lg:p-10 transition-all duration-700 cursor-pointer select-none rounded-2xl ${activePillar === 2
                  ? "bg-white shadow-xl ring-1 ring-[#E5DAC2]/30 scale-[1.03] translate-y-[-4px] z-10"
                  : activePillar !== null
                    ? "opacity-35 filter grayscale scale-[0.97]"
                    : "bg-transparent border-b lg:border-b-0 lg:border-r border-[#E5DAC2]/30 rounded-none"
                }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold-300/10 text-gold-600 mb-6">
                <Armchair className="w-7 h-7 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-lg tracking-[0.15em] font-medium uppercase text-[#1C1C1C] mb-4">
                Interior Designing
              </h3>
              <p className="text-xs leading-relaxed text-black/60 font-light mb-6">
                Infusing spaces with deep human warmth and visual narrative. We select harmonized color systems, custom upholstery, premium textiles, and luxury bespoke layouts tailored around your specific lifestyle.
              </p>
              <ul className="text-[10px] tracking-wider text-gold-600 font-semibold space-y-2 uppercase">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Bespoke Space Styling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Custom Millwork & Furnishings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Fine Art & Decor Curation
                </li>
              </ul>
            </div>

            {/* Pillar 3: Import & Export */}
            <div
              onMouseEnter={() => setActivePillar(3)}
              onMouseLeave={() => setActivePillar(null)}
              onClick={() => setActivePillar(activePillar === 3 ? null : 3)}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left p-6 lg:p-10 transition-all duration-700 cursor-pointer select-none rounded-2xl ${activePillar === 3
                  ? "bg-white shadow-xl ring-1 ring-[#E5DAC2]/30 scale-[1.03] translate-y-[-4px] z-10"
                  : activePillar !== null
                    ? "opacity-35 filter grayscale scale-[0.97]"
                    : "bg-transparent"
                }`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold-300/10 text-gold-600 mb-6">
                <Globe className="w-7 h-7 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-lg tracking-[0.15em] font-medium uppercase text-[#1C1C1C] mb-4">
                Import & Export
              </h3>
              <p className="text-xs leading-relaxed text-black/60 font-light mb-6">
                Your direct pipeline to global luxury. We bypass middlemen to directly procure, inspect, ship, and custom-clear rare Italian marbles, French light fixtures, and customized foreign craftsmanship straight to your site.
              </p>
              <ul className="text-[10px] tracking-wider text-gold-600 font-semibold space-y-2 uppercase relative z-10">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Global Materials Sourcing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Direct White-Glove Customs Freight
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" /> Zero-Markup Logistics
                </li>
              </ul>
            </div>

            {/* Premium Hand-Drawn Signature Overlay with Handwriting Reveal */}
            <AnimatedSignature />

          </div>

        </div>
      </section>


      {/* --- FEATURED PROJECTS SECTION --- */}
      <section id="projects" className="bg-[#F4F3EF] py-24 text-[#1C1C1C] border-b border-[#E5DAC2]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="block text-[11px] tracking-[0.3em] text-gold-500 uppercase font-semibold mb-3">
                Curated Showcase
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-[#1C1C1C]">
                Featured Projects
              </h2>
            </div>
            <a
              href="#contact"
              className="group text-xs font-semibold tracking-[0.25em] text-gold-500 hover:text-[#1C1C1C] transition-colors duration-300 uppercase flex items-center gap-2"
            >
              VIEW ALL PROJECTS
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Grid Layout of 4 Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {PROJECTS_DATA.map((proj) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group flex flex-col relative overflow-hidden bg-white/40 border border-[#E5DAC2]/20 shadow-sm cursor-pointer"
              >
                {/* Image Container with Hover zoom */}
                <div className="relative h-[280px] sm:h-[350px] overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                  />
                  {/* Subtle vignette over the card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Bottom Text Overlays Inside Card */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                    <div>
                      <h3 className="font-serif text-lg tracking-[0.15em] font-medium uppercase">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-white/70">
                        <MapPin className="w-3.5 h-3.5 text-gold-300" />
                        <span>{proj.location}</span>
                      </div>
                    </div>
                    <span className="text-[10px] tracking-widest text-gold-300 border border-gold-300/30 px-3 py-1 font-mono uppercase bg-black/45 backdrop-blur-sm">
                      {proj.year}
                    </span>
                  </div>
                </div>

                {/* Additional Slide Up Details Box */}
                <div className="p-6 bg-white border-t border-[#E5DAC2]/10 flex flex-col justify-between flex-grow">
                  <p className="text-xs text-black/60 leading-relaxed font-light mb-4">
                    {proj.description}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-gold-500 bg-gold-300/10 px-2 py-0.5 rounded">
                      {proj.category}
                    </span>
                    <span className="font-medium text-gold-500 group-hover:text-[#1C1C1C] transition-colors duration-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      VIEW PROJECT DETAILS <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* --- OUR PRODUCTS SECTION --- */}
      <section id="product" className="bg-[#F9F8F6] py-24 text-[#1C1C1C] border-b border-[#E5DAC2]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
            <div className="max-w-md">
              <span className="block text-[11px] tracking-[0.35em] text-gold-500 uppercase font-semibold mb-3">
                Curated Collection
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-[#1C1C1C]">
                Our Products
              </h2>
            </div>

            <div className="flex items-center gap-6 self-end lg:self-center">
              <a
                href="https://www.meroniecolzani.it/indoor/tables-indoor/"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-xs font-semibold tracking-[0.25em] text-gold-500 hover:text-[#1C1C1C] transition-colors duration-300 uppercase flex items-center gap-2"
              >
                VIEW ALL PRODUCTS
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Products Responsive Vertical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS_DATA.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col relative bg-white border border-[#E5DAC2]/20 shadow-sm p-4 group"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-[220px] w-full overflow-hidden mb-5 bg-[#F9F8F6]">
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-grow">
                  <span className="text-[10px] tracking-[0.2em] text-gold-500 uppercase font-semibold mb-2 block min-h-[30px] leading-tight">
                    {prod.category}
                  </span>

                  <h3 className="font-serif text-lg text-[#1C1C1C] leading-snug mb-3 group-hover:text-gold-600 transition-colors">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-black/60 leading-relaxed font-light mb-5 flex-grow">
                    {prod.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-black/5">
                    <SlideInButton
                      href={prod.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="border-dark"
                      className="flex-grow py-2.5 px-2 text-[10px] tracking-widest font-semibold"
                    >
                      VIEW DETAILS
                    </SlideInButton>
                    <SlideInButton
                      href={`https://wa.me/919601415227?text=Hello,%20I%20am%20interested%20in%20inquiring%20about%20the%20${encodeURIComponent(prod.title)}%20from%20H'Barletto%20Interior%20Design.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="dark"
                      className="flex-grow py-2.5 px-2 text-[10px] tracking-widest font-semibold"
                    >
                      GET INQUIRY
                    </SlideInButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* --- OUR DESIGN PROCESS SECTION --- */}
      <section id="process" className="relative bg-[#0B0C0E] py-24 overflow-hidden">
        {/* Subtle grid backdrop for architectural feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
            {/* Title Block */}
            <div className="lg:col-span-4 max-w-sm">
              <span className="block text-xs tracking-[0.35em] text-gold-300 font-semibold mb-3 uppercase">
                Methodology
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide mb-6">
                Our Design Process
              </h2>
              <ScrollRevealText
                text="A seamless journey from initial consultation to immaculate space handover, delivered with unwavering precision and deep-seated artistic passion."
                className="text-white/60 text-sm font-light leading-relaxed mb-8"
              />
              <SlideInButton
                onClick={() => setConsultationModalOpen(true)}
                variant="border-gold"
                className="px-6 py-3"
              >
                LEARN MORE
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </SlideInButton>
            </div>

            {/* Timeline Steps Block */}
            <div className="lg:col-span-8 relative">

              {/* Horizontal Connector Line for Desktop */}
              <div className="absolute top-[40px] left-[5%] right-[5%] h-[1px] bg-white/10 hidden md:block z-0" />

              {/* Active Golden Progress Line */}
              <div className="absolute top-[40px] left-[5%] h-[1px] bg-gold-300 hidden md:block z-0 transition-all duration-700"
                style={{ width: `${(activeStep - 1) * 22.5}%` }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
                {[
                  {
                    id: 1,
                    title: "CONSULTATION",
                    icon: MessageSquare,
                    desc: "Understanding your vision, space constraints, and unique lifestyle requirements."
                  },
                  {
                    id: 2,
                    title: "CONCEPT",
                    icon: Compass,
                    desc: "Creating layout options, palette strategies, and custom spatial concepts."
                  },
                  {
                    id: 3,
                    title: "DEVELOPMENT",
                    icon: Layers,
                    desc: "Refining designs, 3D renderings, and curating precise architectural materials."
                  },
                  {
                    id: 4,
                    title: "EXECUTION",
                    icon: Hammer,
                    desc: "Supervising master craftsmen and custom fit-out detailing flawlessly on-site."
                  },
                  {
                    id: 5,
                    title: "COMPLETION",
                    icon: CheckCircle2,
                    desc: "Completing bespoke styling touches and handing over your dream sanctuary."
                  }
                ].map((step) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === step.id;

                  return (
                    <div
                      key={step.id}
                      className="flex flex-col items-center md:items-start group cursor-pointer"
                      onClick={() => {
                        setActiveStep(step.id);
                        setAutoplayTimeline(false); // Pause automatic cycling on manual interaction
                      }}
                    >
                      {/* Step Circle Pin */}
                      <div className="relative mb-5 flex items-center justify-center md:justify-start w-full">
                        {isActive && (
                          <svg className="absolute w-[92px] h-[92px] text-gold-300 pointer-events-none -rotate-90 z-20 left-[calc(50%-46px)] md:left-[-6px]" viewBox="0 0 100 100">
                            <motion.circle
                              key={`progress-${step.id}-${autoplayTimeline}`}
                              cx="50"
                              cy="50"
                              r="46"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 46}
                              initial={{ strokeDashoffset: autoplayTimeline ? 2 * Math.PI * 46 : 0 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={autoplayTimeline ? { duration: 4.5, ease: "linear" } : { duration: 0.3 }}
                            />
                          </svg>
                        )}
                        <div className={`w-[80px] h-[80px] rounded-full border flex items-center justify-center mx-auto md:mx-0 transition-all duration-500 relative z-10 ${isActive
                          ? "bg-gold-300 border-gold-300 text-dark-400 shadow-lg shadow-gold-300/20"
                          : "bg-[#0B0C0E] border-white/10 text-gold-300 hover:border-gold-300/40"
                          }`}>
                          <IconComponent className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        {/* Little absolute numeric badge */}
                        <span className={`absolute top-0 right-[calc(50%-45px)] md:right-auto md:left-[60px] text-[10px] font-mono px-2 py-0.5 rounded-full border transition-all duration-300 z-20 ${isActive
                          ? "bg-white text-dark-400 border-white"
                          : "bg-dark-100 text-white/50 border-white/5"
                          }`}>
                          0{step.id}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="text-center md:text-left md:pr-2">
                        <h4 className={`font-serif text-xs tracking-[0.2em] font-semibold mb-2 uppercase transition-colors duration-300 ${isActive ? "text-gold-300" : "text-white group-hover:text-gold-300"
                          }`}>
                          {step.title}
                        </h4>
                        <p className="text-[11px] leading-relaxed text-white/50 font-light max-w-[200px] mx-auto md:mx-0">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* --- PODCAST SECTION --- */}
      <section id="podcast" className="bg-[#F9F8F6] py-24 text-[#1C1C1C] border-b border-[#E5DAC2]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row items-start justify-between mb-16 gap-8">
            <div className="max-w-md">
              <span className="block text-[11px] tracking-[0.3em] text-gold-500 uppercase font-semibold mb-3">
                Knowledge & Musings
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide text-[#1C1C1C] mb-6">
                H'Barletto Podcast
              </h2>
              <p className="text-black/60 text-sm leading-relaxed font-light">
                Inspiring conversations with pioneering luxury designers, architects, and creatives sharing spaces, visionary ideas, and daily design inspiration.
              </p>
            </div>

            <div className="flex items-center gap-6 self-end lg:self-center">
              <a
                href="#contact"
                className="px-6 py-3 border border-black/10 hover:border-gold-500 text-[#1C1C1C] hover:text-gold-500 text-xs tracking-[0.2em] font-medium transition-all duration-300 uppercase rounded-none"
              >
                VIEW ALL EPISODES
              </a>
            </div>
          </div>

          {/* Podcast Responsive Vertical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PODCASTS_DATA.map((ep) => {
              const isPlaying = activePodcastId === ep.id && podcastPlaying;
              return (
                <div
                  key={ep.id}
                  className="flex flex-col relative bg-white border border-[#E5DAC2]/20 shadow-sm p-4 group"
                >
                  {/* Image wrapper */}
                  <div className="relative h-[220px] w-full overflow-hidden mb-5 bg-[#0B0C0E]">
                    <Image
                      src={ep.image}
                      alt={ep.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />

                    {/* Hover playing indicator or Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => togglePodcast(ep.id)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 ${isPlaying
                          ? "bg-gold-300 text-dark-400 scale-105"
                          : "bg-white/10 text-white hover:bg-gold-300 hover:text-dark-400 hover:scale-110"
                          }`}
                        aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
                      >
                        {isPlaying ? (
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-6 bg-dark-400 animate-[sound-bar_1.2s_infinite_0.1s] rounded-full" />
                            <span className="w-1.5 h-6 bg-dark-400 animate-[sound-bar_1.2s_infinite_0.3s] rounded-full" />
                            <span className="w-1.5 h-6 bg-dark-400 animate-[sound-bar_1.2s_infinite_0.5s] rounded-full" />
                          </div>
                        ) : (
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        )}
                      </button>
                    </div>

                    <span className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-[#0B0C0E] bg-gold-300 px-3 py-1 font-semibold uppercase">
                      {ep.episode}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] tracking-wider text-black/40 font-mono block mb-1">
                        with {ep.guest}
                      </span>
                      <h3 className="font-serif text-base font-semibold tracking-wide text-[#1C1C1C] line-clamp-2 mb-4 group-hover:text-gold-500 transition-colors">
                        {ep.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/5 text-xs text-black/50">
                      <span className="font-mono">{ep.duration} mins</span>
                      <button
                        onClick={() => togglePodcast(ep.id)}
                        className="font-semibold text-gold-500 hover:text-gold-600 transition-colors uppercase flex items-center gap-1.5"
                      >
                        {isPlaying ? "PAUSE NOW" : "LISTEN NOW"}
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* --- INFO GRID: ABOUT, TESTIMONIAL, LET'S CREATE --- */}
      <section className="bg-[#F4F3EF] py-10 text-[#1C1C1C] border-b border-[#E5DAC2]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Box 1: About H'Barletto */}
            <div className="bg-white border border-[#E5DAC2]/20 shadow-sm p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gold-500" />
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-gold-500 uppercase">
                    AESTHETICS STUDIO
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light tracking-wide text-[#1C1C1C] mb-6">
                  About H'Barletto
                </h3>

                {/* Horizontal side by side layout: poolside image + brief copy */}
                <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start">
                  <div className="relative w-28 h-36 bg-gray-100 flex-shrink-0">
                    <Image
                      src="/poolside.jpg"
                      alt="Studio Sculpture artwork"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-black/60 leading-relaxed font-light">
                    We are a premier, multidisciplinary luxury interior architecture and interior styling studio. We translate sophisticated concepts into functional, pristine, and historically timeless residential sanctuaries worldwide.
                  </p>
                </div>
              </div>

              <a
                href="#projects"
                className="group w-fit text-xs font-semibold tracking-[0.25em] text-gold-500 hover:text-black transition-colors duration-300 uppercase flex items-center gap-2"
              >
                READ MORE
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Box 2: Testimonial slider */}
            <div className="bg-white border border-[#E5DAC2]/20 shadow-sm p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gold-500" />
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-gold-500 uppercase">
                    CLIENT TESTIMONY
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light tracking-wide text-[#1C1C1C] mb-6">
                  What Our Clients Say
                </h3>

                {/* Testimonial Quote slider */}
                <div className="relative min-h-[120px] mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="text-xs italic leading-relaxed text-black/70 font-light"
                    >
                      “{TESTIMONIALS_DATA[testimonialIndex].quote}”
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-black/5">
                <div>
                  <h4 className="font-serif text-xs font-semibold text-[#1C1C1C]">
                    {TESTIMONIALS_DATA[testimonialIndex].author}
                  </h4>
                  <span className="text-[10px] text-black/40">
                    {TESTIMONIALS_DATA[testimonialIndex].location}
                  </span>
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevTestimonial}
                    className="w-8 h-8 rounded-full border border-black/5 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center bg-transparent transition-all duration-300"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-8 h-8 rounded-full border border-black/5 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center bg-transparent transition-all duration-300"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Box 3: Dark Let's Create */}
            <div className="bg-[#0B0C0E] border border-gold-300/10 p-8 flex flex-col justify-between text-white relative overflow-hidden group">
              {/* Subtle neon vortex lines backdrop */}
              <div className="absolute inset-0 z-0 opacity-15">
                <Image
                  src="/vortex.jpg"
                  alt="Swirl lines"
                  fill
                  className="object-cover scale-[1.3] animate-[spin_120s_linear_infinite]"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gold-300" />
                  <span className="text-[10px] tracking-[0.25em] font-semibold text-gold-300 uppercase">
                    COLLABORATION
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-light tracking-wide text-white leading-tight mb-4">
                  Let's Create<br />Something Beautiful
                </h3>
                <p className="text-white/60 text-xs leading-relaxed font-light mb-8 max-w-[240px]">
                  Embark on your architectural styling journey with H'Barletto. Start consulting with our leading designers today.
                </p>
              </div>

              <SlideInButton
                onClick={() => setConsultationModalOpen(true)}
                variant="border-gold"
                className="relative z-10 w-full py-3.5"
              >
                BOOK CONSULTATION
                <ArrowRight className="w-4 h-4" />
              </SlideInButton>
            </div>

          </div>

        </div>
      </section>


      {/* --- FOOTER SECTION --- */}
      <footer id="contact" className="relative bg-[#0B0C0E] pt-24 pb-12 overflow-hidden border-t border-white/5 z-10">

        {/* Blueprint fine lines backdrop for architectural structural feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none z-0" />

        {/* Ambient warm breathing gold light wells */}
        <div className="absolute top-[-20%] left-[10%] w-[380px] h-[380px] rounded-full bg-gold-400/5 blur-[90px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite] z-0" />
        <div className="absolute bottom-[-10%] right-[20%] w-[480px] h-[480px] rounded-full bg-gold-400/3 blur-[110px] pointer-events-none animate-[pulse_14s_ease-in-out_infinite] z-0" />

        {/* Subtle spinning circular backdrop on the right */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none mix-blend-screen scale-[1.1] select-none z-0">
          <Image
            src="/vortex.jpg"
            alt="Galaxy Swirl"
            fill
            className="object-cover animate-[spin_80s_linear_infinite]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5"
          >

            {/* Column 1: Logo & Brief */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as any } }
              }}
              className="lg:col-span-4 max-w-sm flex flex-col justify-between"
            >
              <div>
                <Logo />
                <ScrollRevealText
                  text="We shape environments that elevate life itself. Transforming spaces from architectural concepts into bespoke visual masterpieces crafted around our patrons."
                  className="text-white/40 text-xs leading-relaxed font-light mt-6"
                />
              </div>

              <div className="flex gap-4 mt-8">
                {["Instagram", "Pinterest", "LinkedIn"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="text-[10px] tracking-widest text-white/40 hover:text-gold-300 font-semibold uppercase transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Navigation Links */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as any } }
              }}
              className="lg:col-span-3 lg:col-start-6"
            >
              <h4 className="text-[10px] tracking-[0.25em] font-bold text-gold-300 uppercase mb-6">
                Navigation
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#projects" },
                  { name: "Services", href: "#projects" },
                  { name: "Projects", href: "#projects" },
                  { name: "Product", href: "#product" },
                  { name: "Podcast", href: "#podcast" },
                  { name: "Contact", href: "#contact" }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-xs text-white/50 hover:text-gold-300 transition-colors font-light"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Services Links */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as any } }
              }}
              className="lg:col-span-2"
            >
              <h4 className="text-[10px] tracking-[0.25em] font-bold text-gold-300 uppercase mb-6">
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  "Residential Design",
                  "Commercial Design",
                  "Custom Furniture",
                  "Interior Styling",
                  "3D Visualization"
                ].map((serv) => (
                  <span
                    key={serv}
                    className="text-xs text-white/50 font-light"
                  >
                    {serv}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Column 4: Contact Info */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as any } }
              }}
              className="lg:col-span-3"
            >
              <h4 className="text-[10px] tracking-[0.25em] font-bold text-gold-300 uppercase mb-6">
                Contact
              </h4>
              <div className="flex flex-col gap-4 text-xs font-light text-white/50">
                <a href="mailto:hello@hbarletto.com" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-300/60" />
                  <span>hello@hbarletto.com</span>
                </a>
                <a href="tel:+971501234567" className="hover:text-gold-300 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-300/60" />
                  <span>+971 50 123 4567</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold-300/60 mt-0.5" />
                  <span>Downtown Design District,<br />Dubai, UAE</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-12 text-[10px] text-white/30 tracking-widest uppercase">
            <p>
              © {new Date().getFullYear()} H'BARLETTO INTERIOR DESIGN. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold-300 transition-colors">Terms & Conditions</a>
              <a
                href="https://innvox.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-300 transition-colors text-gold-300/70 font-semibold tracking-widest"
              >
                DESIGN BY INNVOX.IN
              </a>
            </div>
          </div>

        </div>
      </footer>


      {/* --- CONSULTATION MODAL --- */}
      <AnimatePresence>
        {consultationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConsultationModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-xl bg-[#0B0C0E] border border-gold-300/35 p-6 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >

              {/* Close Button */}
              <button
                onClick={() => setConsultationModalOpen(false)}
                className="absolute top-5 right-5 text-gold-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <span className="text-[10px] tracking-[0.3em] text-gold-300 font-semibold uppercase block mb-2">
                  CONSULTATION
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-light text-white">
                  Book A Consultation
                </h3>
                <div className="w-12 h-[1px] bg-gold-300/60 mx-auto mt-4" />
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-300/10 text-gold-300 flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-white mb-3">
                    Request Received
                  </h4>
                  <p className="text-xs text-white/60 max-w-sm leading-relaxed">
                    Our lead architectural styling consultant will reach out to you within 24 hours to schedule your exclusive briefing session.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                      Service Requested
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none"
                    >
                      <option className="bg-[#0B0C0E]">Residential Design</option>
                      <option className="bg-[#0B0C0E]">Commercial Design</option>
                      <option className="bg-[#0B0C0E]">Custom Furniture & Styling</option>
                      <option className="bg-[#0B0C0E]">3D Spatial Rendering Briefing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-widest text-white/50 uppercase mb-2">
                      Brief Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly about your spatial vision..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark-200 border border-white/10 focus:border-gold-300 py-3 px-4 text-sm text-white focus:outline-none transition-colors rounded-none resize-none"
                    />
                  </div>

                  <SlideInButton
                    type="submit"
                    variant="gold"
                    className="w-full py-4"
                  >
                    SUBMIT REQUEST →
                  </SlideInButton>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD CUSTOM STYLES (Animations & Keyframes) --- */}
      <style jsx global>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.06); }
        }
        @keyframes sound-bar {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 16s linear infinite;
        }
        /* Custom scroll hiding class for podcast slider */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
