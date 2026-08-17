// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import artistPortrait from "./assets/pallavi_portrait.jpg";
import cert1 from "./assets/cert_1.jpg";
import cert2 from "./assets/cert_2.jpg";
import cert3 from "./assets/cert_3.jpg";
import cert4 from "./assets/cert_4.jpg";
import review1 from "./assets/review_1.jpg";
import review2 from "./assets/review_2.jpg";
import review3 from "./assets/review_3.jpg";
import review4 from "./assets/review_4.jpg";
import review5 from "./assets/review_5.jpg";
import {
  Menu, X, ChevronLeft, ChevronRight, ChevronDown, Check, Star,
  MapPin, Phone, Mail, Clock, Calendar as CalendarIcon,
  MessageCircle, ArrowRight, Quote, Sparkles
} from "lucide-react";

// Custom Instagram icon component because Lucide v1+ officially removed brand logos
function Instagram({ size = 24, strokeWidth = 2, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/* ============================================================
   CENTRAL CONFIG — every editable business fact lives here.
   ============================================================ */
const siteConfig = {
  artistName: "Pallavi",
  brandName: "Makeup by Pallavi",
  tagline: "Bridal Makeup & Hair Artist",
  city: "Chikkamagaluru",
  region: "Chikkamagaluru, Hassan & Bengaluru",
  phone: "+91 86180 54514",
  whatsapp: "918618054514",
  email: "pallaviaryan712@gmail.com",
  instagram: "https://instagram.com/makeup_by_pallavi_blr",
  instagramHandle: "@makeup_by_pallavi_blr",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
    { day: "Saturday – Sunday", time: "8:00 AM – 8:00 PM (Wedding season)" },
  ],
  stats: [
    { value: "6+", label: "Years Experience" },
    { value: "180+", label: "Happy Clients" },
    { value: "60+", label: "Weddings Styled" },
    { value: "4.9", label: "Average Rating" },
  ],
};

const whatsappLink = (message) =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

/* ============================================================
   IMAGE HANDLING — graceful fallback if a photo fails to load,
   so the layout never breaks while real portfolio photos are
   swapped in later.
   ============================================================ */
function Ph({ src, alt, className = "", label, imgClassName = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#EDE1CE] to-[#D9C2A3] text-[#5b4636] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-center px-4">
          <Sparkles className="mx-auto mb-2 opacity-50" size={22} strokeWidth={1.2} />
          <p className="font-serif italic text-sm opacity-70">{label || alt}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ============================================================
   DATA
   ============================================================ */
const services = [
  {
    id: "bridal",
    name: "Bridal Makeup",
    desc: "A full bridal look built around your face, your outfit and how you want to feel walking down the aisle — long-wear, photograph-ready, entirely you.",
    price: "Starting ₹18,000",
    duration: "2.5 – 3 hrs",
    category: "Bridal",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "engagement",
    name: "Engagement Makeup",
    desc: "Soft, radiant and camera-friendly makeup for the day you say yes in front of everyone who matters.",
    price: "Starting ₹12,000",
    duration: "1.5 – 2 hrs",
    category: "Engagement",
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "reception",
    name: "Reception Makeup",
    desc: "Bolder, evening-ready glam with richer color and finish — built to hold up under lights and long celebrations.",
    price: "Starting ₹14,000",
    duration: "2 hrs",
    category: "Reception",
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "party",
    name: "Party Makeup",
    desc: "Polished, festive makeup for sangeet nights, cocktail parties and celebrations where you want to shine, not overdo it.",
    price: "Starting ₹6,500",
    duration: "1 – 1.5 hrs",
    category: "Party",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "photoshoot",
    name: "Photoshoot Makeup",
    desc: "Makeup calibrated for the lens — pre-wedding shoots, portfolios and editorial shoots that need precision under studio light.",
    price: "Enquire for pricing",
    duration: "1.5 – 2 hrs",
    category: "Photoshoot",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "special-event",
    name: "Special Event Makeup",
    desc: "Milestone birthdays, anniversaries, family functions and every other occasion worth getting ready for.",
    price: "Starting ₹5,500",
    duration: "1 – 1.5 hrs",
    category: "Special Event",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
  },
];

const packages = [
  {
    name: "Essential Bride",
    tagline: "Everything a beautiful wedding-day look needs.",
    price: "₹28,000",
    features: ["Bridal makeup", "Hairstyling", "Saree / dupatta draping", "Individual lash application", "Personal touch-up kit"],
    highlighted: false,
  },
  {
    name: "Signature Bride",
    tagline: "Our most-booked package, with a trial run beforehand.",
    price: "₹45,000",
    features: ["Bridal makeup", "Hairstyling", "Draping assistance", "Premium lash styling", "In-person bridal trial", "On-call touch-up support (4 hrs)"],
    highlighted: true,
  },
  {
    name: "Luxury Bride",
    tagline: "Full multi-event coverage for the bride who wants it all handled.",
    price: "₹85,000",
    features: ["Bridal makeup", "Hairstyling", "Draping assistance", "Bridal trial", "Looks for up to 3 events", "Touch-up assistant for the day", "Premium skin preparation"],
    highlighted: false,
  },
];

const portfolioCategories = ["All", "Bridal", "Engagement", "Reception"];

const portfolioItems = [
  { id: 1, category: "Bridal", title: "Kavya — South Indian Bridal", img: "https://scontent-iad6-1.cdninstagram.com/v/t51.82787-15/543669063_17961243527975634_4827618933279251216_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=pvDiGSREse0Q7kNvwGqjmt4&_nc_oc=AdoHG8QilgVVOkkLctCtsYjgbotolLEbJ7Rll35ujXF0DGxrHPMD4LXq7Y4Mh1UZvlU&_nc_zt=23&_nc_ht=scontent-iad6-1.cdninstagram.com&_nc_gid=VBbJAR5JtZBPDrfsiavD9w&_nc_ss=7b60f&oh=00_AQEgQjBNyk8QVfb6iFjjLVh3rrvpTBCgBhgjl3wTHM9Cew&oe=6A87DAA6", tall: true },
  { id: 2, category: "Bridal", title: "Pallavi — Traditional Silk Glow", img: "https://scontent-atl3-3.cdninstagram.com/v/t51.82787-15/723131305_17994899354975634_7672510774064024499_n.jpg?stp=c384.0.1152.1152a_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=LYyGQufZACoQ7kNvwHazkH9&_nc_oc=Adr8wZkZF_Df1M7noOOx5QBaLLFx-QmQkAkRvFFpTxXFBVnrrh81UQP0BVn1RJWeNUE&_nc_zt=23&_nc_ht=scontent-atl3-3.cdninstagram.com&_nc_gid=o8yN58kYMYVaTEv7k9nN8Q&_nc_ss=7b60f&oh=00_AQHE4lfIQ-aHr3WTH6T0kAkaWYKLUsCUrjL4KBj6U2_AAQ&oe=6A87B07F" },
  { id: 3, category: "Reception", title: "Elegant Reception Glam", img: "https://scontent.cdninstagram.com/v/t51.82787-15/708006348_17992264067975634_8578202062715660089_n.jpg?stp=c288.0.864.864a_dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=NBlas6ZOfjoQ7kNvwGiLm86&_nc_oc=AdpFFel8GKIMod5LlnUiAjp3anXOyBvZkV8O-yVfZwQEPtKj_jZ0kQVxWkR0tW8rrPO3_GDMptBQ2plB0w2sL07u&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=VKP6ZNRLObUuJxN7HnbwKQ&_nc_ss=7f60f&oh=00_AQGclKARrMI9RhexrSqpy1NBndVZnE5rrTxwr1rFdSjywg&oe=6A87B879", tall: true },
  { id: 4, category: "Engagement", title: "Engagement Glow", img: "https://scontent.cdninstagram.com/v/t51.82787-15/634415760_17979456131975634_3539944459022375461_n.jpg?stp=c192.0.576.576a_dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=84uC7eE5BtAQ7kNvwFe5RPy&_nc_oc=AdqrjaJ3J6GEVccmhOKghD6uyPFOhSL4LTxWpdnTQt8rFL_UcZe-sbHERbPAU4HZ6fWCiAYWPl4icCM509kRCZYu&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=8u5BpFdMiJ-_wnsgkOBn4A&_nc_ss=7f60f&oh=00_AQEK1sUDcx0pxLh9jGDz-X6EvVB883kj_uMudzmrqSdoGg&oe=6A87E60D" },
  { id: 5, category: "Bridal", title: "Kavya's Traditional Glow", img: "https://scontent.cdninstagram.com/v/t51.82787-15/628057527_17978649467975634_5670920948774377205_n.jpg?stp=c213.0.639.639a_dst-jpg_e35_s640x640_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Ok5orG1Gr1gQ7kNvwE2YsHB&_nc_oc=Adpzmv-9J6iViCD_-tPVsP7z5f8dlbSyJPDfHiQP-BfrcN6uOIsnlra6rqkc8hr-pnxcto7FCuJiFELpzZHwdrtK&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=8Bp_eNXCwzs3THCt8hsMCA&_nc_ss=7f60f&oh=00_AQFgsTAs7zoDWGFMi0LHjY1psRfj3vmFQUiaigFKVAdj0A&oe=6A87BA84", tall: true },
];

const realBrides = [
  { name: "Ananya R.", event: "Wedding, Mysuru Palace Grounds", style: "Classic South Indian Bridal", quote: "She understood exactly what I wanted and made me feel like the best version of myself — my mother cried when she saw me.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop" },
  { name: "Priyanka S.", event: "Engagement, Bengaluru", style: "Soft Glam", quote: "Pallavi listened to every worry I had about my oily skin and gave me a look that lasted the entire evening, flawlessly.", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=700&auto=format&fit=crop" },
  { name: "Fathima K.", event: "Reception, Coorg", style: "Bold Reception Glam", quote: "Punctual, calm, and incredibly talented. I've never felt more like myself while looking so different in the mirror.", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=700&auto=format&fit=crop" },
];

const testimonials = [
  { name: "Ananya", event: "Bride", rating: 5, review: "She understood exactly what I wanted and made me feel like the best version of myself.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200&auto=format&fit=crop" },
  { name: "Priyanka", event: "Bride", rating: 5, review: "From the trial to the wedding day, everything was calm, organized and beautifully done.", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&auto=format&fit=crop" },
  { name: "Rhea", event: "Engagement Client", rating: 5, review: "My makeup lasted through a 9-hour outdoor function without a single touch-up. Unbelievable.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
  { name: "Fathima", event: "Bride", rating: 5, review: "Punctual, professional and so kind — she made my whole family feel at ease on a stressful morning.", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=200&auto=format&fit=crop" },
  { name: "Divya", event: "Photoshoot Client", rating: 5, review: "Understood exactly how to make my skin look flawless under studio lighting. True professional.", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop" },
  { name: "Neha", event: "Reception Client", rating: 4, review: "Beautiful bold look for my reception, exactly the drama I asked for without feeling heavy.", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=200&auto=format&fit=crop" },
];

const visualReviews = [
  { id: 1, title: "Natural & Long-lasting Makeup", img: review1 },
  { id: 2, title: "Special Day Makeover & Hair", img: review2 },
  { id: 3, title: "Natural Look & Ethics Appreciation", img: review3 },
  { id: 4, title: "Flawless & Comfortable Bridal Makeup", img: review4 },
  { id: 5, title: "Incredible Makeover & Patience", img: review5 },
];

const faqs = [
  { q: "How far in advance should I book?", a: "For weddings, 4–6 months ahead is ideal, especially for dates in the November–February wedding season. Engagement and party bookings can usually be made 3–4 weeks in advance." },
  { q: "Do you offer bridal trials?", a: "Yes. The Signature and Luxury bridal packages include an in-person trial so we can finalize your look together before the wedding day." },
  { q: "Do you travel for weddings?", a: "Yes, travel is available across Mysuru and Bengaluru, and beyond for destination weddings. Travel and stay costs are quoted separately based on location." },
  { q: "What is included in bridal makeup?", a: "Skin preparation, HD or airbrush base, eye makeup, contouring, lashes and long-wear setting — tailored to your outfit, venue lighting and personal style." },
  { q: "Do you provide hairstyling?", a: "Yes, hairstyling is included in all bridal packages and available as an add-on for engagement, party and reception bookings." },
  { q: "Do you provide draping?", a: "Yes, saree and dupatta draping assistance is included in every bridal package." },
  { q: "How do I reserve my date?", a: "Submit a booking request through the Availability section with your event date and details. A deposit confirms and locks in your date." },
  { q: "Is a deposit required?", a: "A non-refundable deposit of 25% is required to confirm any wedding booking. The balance is due on the day of the event." },
  { q: "Do you offer makeup for bridesmaids?", a: "Yes, bridal party packages for mothers, sisters and bridesmaids are available — mention the group size in your booking enquiry for a custom quote." },
  { q: "How long does bridal makeup take?", a: "A full bridal look typically takes 2.5–3 hours depending on the complexity of the style and draping involved." },
];

/* ============================================================
   AVAILABILITY — mock, deterministic status generator.
   Ready to be swapped for a real Supabase / Firebase /
   Google Calendar / backend API query later.
   ============================================================ */
function getMockStatus(dateObj) {
  const day = dateObj.getDate();
  const dow = dateObj.getDay();
  const past = dateObj < new Date(new Date().setHours(0, 0, 0, 0));
  if (past) return "past";
  if (day % 7 === 0) return "booked";
  if (dow === 0 || dow === 6 || day % 5 === 0) return "limited";
  return "available";
}

function getDateStatus(dateObj) {
  if (!dateObj) return "past";
  const key = `status_${dateObj.getFullYear()}_${dateObj.getMonth()}_${dateObj.getDate()}`;
  const saved = localStorage.getItem(key);
  if (saved) return saved;
  return getMockStatus(dateObj);
}

const statusMeta = {
  available: { label: "Available", dot: "bg-[#7C9070]", ring: "" },
  limited: { label: "Limited availability", dot: "bg-[#C9A24B]", ring: "" },
  booked: { label: "Booked", dot: "bg-[#B5605A]", ring: "" },
  past: { label: "", dot: "bg-transparent", ring: "" },
};

/* ============================================================
   SHARED UI ATOMS
   ============================================================ */
function Eyebrow({ children, dark = false }) {
  return (
    <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
      <span className={`h-px w-8 ${dark ? "bg-[#C9A85C]" : "bg-[#C9A85C]"}`} />
      <span className={`uppercase text-[11px] tracking-[0.28em] font-medium ${dark ? "text-[#E9D9B8]" : "text-[#8A6A3A]"}`}>
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub, dark = false, center = true }) {
  return (
    <div className={`max-w-2xl mb-14 ${center ? "mx-auto text-center" : ""}`}>
      <div className={center ? "flex justify-center" : ""}>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </div>
      <h2 className={`font-serif text-[2rem] sm:text-[2.6rem] leading-[1.1] ${dark ? "text-white" : "text-[#2B1D14]"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-[#D8C6A8]" : "text-[#6B5B48]"}`}>{sub}</p>}
    </div>
  );
}

function GoldButton({ children, onClick, href, variant = "solid", className = "", icon = true, type = "button" }) {
  const base = "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] tracking-[0.08em] uppercase font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9823D]";
  const styles = {
    solid: "bg-[#2B1D14] text-[#F6EEDD] hover:bg-[#4a3221]",
    outline: "border border-[#2B1D14]/30 text-[#2B1D14] hover:border-[#2B1D14] hover:bg-[#2B1D14]/5",
    light: "bg-[#F6EEDD] text-[#2B1D14] hover:bg-white",
    ghostLight: "border border-white/50 text-white hover:bg-white/10",
  };
  const content = (
    <>
      {children}
      {icon && <ArrowRight size={15} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />}
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${base} ${styles[variant]} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`group ${base} ${styles[variant]} ${className}`}>
      {content}
    </button>
  );
}

/* Scroll-reveal wrapper — respects prefers-reduced-motion */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */
const navLinks = [
  ["Home", "home"], ["About", "about"], ["Credentials", "credentials"], ["Portfolio", "portfolio"],
  ["Availability", "availability"], ["Testimonials", "testimonials"],
  ["FAQ", "faq"], ["Contact", "contact"],
];

function Nav({ onBook }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-[#FBF7F0]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(43,29,20,0.08)]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-[76px]">
        <button onClick={() => go("home")} className="flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9823D]">
          <span className="font-serif text-xl sm:text-2xl tracking-[0.1em] border border-[#C9A85C] px-2.5 py-1 text-[#C9A85C]">
            ASP
          </span>
          <div>
            <span className={`block font-serif text-base sm:text-lg tracking-wide leading-none ${scrolled || open ? "text-[#2B1D14]" : "text-white"}`}>
              {siteConfig.brandName}
            </span>
            <span className={`block text-[8px] tracking-[0.2em] uppercase mt-1 font-sans ${scrolled || open ? "text-[#8A6A3A]" : "text-[#E9D9B8]"}`}>
              {siteConfig.tagline}
            </span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`text-[12.5px] tracking-[0.06em] uppercase transition-colors relative pb-1 ${
                scrolled ? "text-[#4a3a2a]" : "text-white/90"
              } hover:${scrolled ? "text-[#2B1D14]" : "text-white"} ${active === id ? "font-medium" : ""}`}
            >
              {label}
              {active === id && (
                <span className={`absolute left-0 -bottom-0.5 h-px w-full ${scrolled ? "bg-[#A9823D]" : "bg-white"}`} />
              )}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <GoldButton onClick={onBook} variant={scrolled ? "solid" : "ghostLight"} icon={false} className="!py-2.5 !px-5">
            Book Now
          </GoldButton>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden p-2 -mr-2 ${scrolled || open ? "text-[#2B1D14]" : "text-white"}`}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-[#FBF7F0] border-t border-[#E4D3B8] px-6 pb-8 pt-2">
          <div className="flex flex-col divide-y divide-[#E4D3B8]">
            {navLinks.map(([label, id]) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-left py-4 text-[#3B2A20] uppercase text-[13px] tracking-[0.1em]"
              >
                {label}
              </button>
            ))}
          </div>
          <GoldButton onClick={() => { setOpen(false); onBook(); }} icon={false} className="w-full mt-6">
            Book Now
          </GoldButton>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onBook, onView }) {
  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen flex items-end sm:items-center overflow-hidden">
      <div className="absolute inset-0">
        <Ph
          src={portfolioItems[0].img}
          alt="Bride with soft editorial bridal makeup, warm golden light"
          label="Editorial bridal hero image"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c130c] via-[#1c130c]/45 to-[#1c130c]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c130c]/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-16 sm:pb-0 pt-32 sm:pt-0">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#E9D9B8] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7C9070]" />
            Available for bookings · {siteConfig.city}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-serif text-white text-[2.6rem] leading-[1.08] sm:text-[3.6rem] md:text-[4.4rem] max-w-3xl">
            Makeup for Your Most Beautiful Moments
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-[#F1E6D2] text-[15.5px] sm:text-lg max-w-xl leading-relaxed font-light">
            Bridal, engagement, party and special-event makeup designed to make you feel confident,
            radiant and completely yourself.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <GoldButton onClick={onBook} variant="light">Check Availability</GoldButton>
            <GoldButton onClick={onView} variant="ghostLight">View My Work</GoldButton>
          </div>
        </Reveal>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/70 z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="h-10 w-px bg-white/40" />
      </div>
    </section>
  );
}

/* ============================================================
   TRUST STATS
   ============================================================ */
function TrustStats() {
  return (
    <section className="bg-[#2B1D14] py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
        {siteConfig.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center">
            <p className="font-serif text-[#E9D9B8] text-[2.1rem] sm:text-[2.5rem] leading-none">{s.value}</p>
            <p className="mt-2 text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[#B79E78]">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About({ onBook }) {
  const points = [
    { t: "6+ years", d: "Styling brides and clients across South India, from intimate ceremonies to 800-guest weddings." },
    { t: "Certified training", d: "Certified by @makeoverwithlakshmi_shetty and @richa_dave." },
    { t: "A personal philosophy", d: "Makeup should enhance your features, not mask them — every look starts with your skin, not a template." },
  ];
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FBF7F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <Ph
              src={artistPortrait}
              alt={`${siteConfig.artistName}, bridal makeup artist, portrait`}
              label="Portrait of the makeup artist"
              className="aspect-[4/5] w-full"
            />
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#F6EEDD] border border-[#E4D3B8] px-6 py-5 max-w-[220px]">
              <p className="font-serif text-2xl text-[#2B1D14]">6+</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#8A6A3A] mt-1">Years crafting bridal looks</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow>The Artist</Eyebrow>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.1] text-[#2B1D14]">
              Meet {siteConfig.artistName}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 text-[#6B5B48] leading-relaxed text-[15px]">
              {siteConfig.artistName} is a bridal makeup and hair artist based in {siteConfig.city},
              working with clients across {siteConfig.region}. What began as a fascination with color
              and skin has grown into a six-year practice built on one idea: your makeup should look
              like a more radiant version of your own face, not someone else's.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <blockquote className="mt-6 border-l-2 border-[#C9A85C] pl-5 font-serif italic text-xl text-[#2B1D14]">
              "Makeup should enhance who you are, not hide you."
            </blockquote>
          </Reveal>

          <div className="mt-8 space-y-5">
            {points.map((p, i) => (
              <Reveal key={p.t} delay={200 + i * 80} className="flex gap-4">
                <Check size={17} strokeWidth={2} className="text-[#A9823D] mt-1 shrink-0" />
                <p className="text-[#4a3a2a] text-[14.5px] leading-relaxed">
                  <span className="font-medium text-[#2B1D14]">{p.t}.</span> {p.d}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={450} className="mt-10">
            <GoldButton onClick={onBook} variant="outline">Meet Your Makeup Artist</GoldButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
function Services({ onEnquire }) {
  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F5EDE1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Makeup for Every Occasion"
            sub="Each service is tailored in a one-on-one consultation — skin type, outfit, venue lighting and the mood you're after all shape the final look."
          />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 90} className="group bg-[#FBF7F0] border border-[#E4D3B8] flex flex-col">
              <Ph src={s.img} alt={`${s.name} example look`} className="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl text-[#2B1D14]">{s.name}</h3>
                <p className="mt-2 text-[13.5px] text-[#6B5B48] leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between text-[12.5px] text-[#8A6A3A] border-t border-[#E4D3B8] pt-4">
                  <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={1.5} />{s.duration}</span>
                  <span className="font-medium text-[#2B1D14]">{s.price}</span>
                </div>
                <button
                  onClick={() => onEnquire(s.name)}
                  className="mt-5 text-[12px] uppercase tracking-[0.12em] text-[#A9823D] hover:text-[#2B1D14] flex items-center gap-1.5 transition-colors"
                >
                  Enquire <ArrowRight size={13} strokeWidth={1.5} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PACKAGES
   ============================================================ */
function Packages({ onCustomize }) {
  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#FBF7F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Bridal Packages" title="Curated Bridal Packages" sub="Three ways to be looked after on your wedding day — every package can be customized to your ceremonies and timeline." />
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`h-full flex flex-col p-9 border ${
                  p.highlighted ? "border-[#2B1D14] bg-[#2B1D14] text-[#F1E6D2]" : "border-[#E4D3B8] bg-white text-[#2B1D14]"
                }`}
              >
                {p.highlighted && (
                  <span className="self-start mb-4 text-[10px] tracking-[0.2em] uppercase bg-[#C9A85C] text-[#2B1D14] px-3 py-1 font-medium">
                    Most Booked
                  </span>
                )}
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <p className={`mt-2 text-[13.5px] leading-relaxed ${p.highlighted ? "text-[#D8C6A8]" : "text-[#6B5B48]"}`}>{p.tagline}</p>
                <p className="mt-6 font-serif text-3xl">{p.price}</p>
                <p className={`text-[11px] uppercase tracking-[0.15em] mt-1 ${p.highlighted ? "text-[#B79E78]" : "text-[#8A6A3A]"}`}>Starting price</p>
                <ul className="mt-7 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[14px] leading-snug">
                      <Check size={16} strokeWidth={2} className={`mt-0.5 shrink-0 ${p.highlighted ? "text-[#C9A85C]" : "text-[#A9823D]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onCustomize(p.name)}
                  className={`mt-8 w-full py-3.5 text-[13px] uppercase tracking-[0.08em] font-medium transition-colors ${
                    p.highlighted ? "bg-[#F6EEDD] text-[#2B1D14] hover:bg-white" : "bg-[#2B1D14] text-[#F6EEDD] hover:bg-[#4a3221]"
                  }`}
                >
                  Customize My Package
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICATIONS & ACHIEVEMENTS
   ============================================================ */
const certifications = [
  {
    id: 1,
    title: "ASCODET Skill Development Training",
    institution: "Council for Software Education & Skill Development Training",
    specialization: "Makeup & Hair Style Training",
    date: "July 2023",
    img: cert1,
  },
  {
    id: 2,
    title: "Lakshmi Shetty Master Class",
    institution: "Lakshmi Shetty Hair & Makeup Academy",
    specialization: "1-Day Master Class Certificate of Completion",
    date: "March 2019",
    img: cert2,
  },
  {
    id: 3,
    title: "Jasmine Beauty Care Professional Training",
    institution: "Jasmine Beauty Care, Bengaluru",
    specialization: "Professional Makeup & Hair Certification",
    date: "August 2023",
    img: cert3,
  },
  {
    id: 4,
    title: "Divya Kushi Academy Certification",
    institution: "Divya Kushi Academy",
    specialization: "Professional Advanced Hair Style Course",
    date: "March 2024",
    img: cert4,
  },
];

function Certifications() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const step = useCallback(
    (dir) => {
      setLightboxIdx((idx) => {
        if (idx === null) return idx;
        const len = certifications.length;
        return (idx + dir + len) % len;
      });
    },
    []
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, step]);

  const active = lightboxIdx !== null ? certifications[lightboxIdx] : null;

  return (
    <section id="credentials" className="py-24 sm:py-32 bg-[#F5EDE1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title="Certified Professional Expertise"
            sub="Trained and certified by some of the most prestigious names and academies in the hair and makeup industry."
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 80} className="group bg-[#FBF7F0] border border-[#E4D3B8] flex flex-col justify-between">
              <button
                onClick={() => openLightbox(i)}
                className="text-left w-full h-full flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9823D] group/btn"
              >
                <div className="relative aspect-[3/4] overflow-hidden shrink-0">
                  <Ph
                    src={c.img}
                    alt={c.title}
                    label={c.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1c130c]/0 group-hover:bg-[#1c130c]/25 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-[#FBF7F0]/95 backdrop-blur-sm text-[#2B1D14] px-4 py-2 text-[12px] tracking-[0.08em] uppercase border border-[#E4D3B8]">
                      View Certificate
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#A9823D] font-medium block mb-1">
                      {c.date}
                    </span>
                    <h3 className="font-serif text-lg text-[#2B1D14] leading-snug group-hover/btn:text-[#A9823D] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[#6B5B48] leading-relaxed">
                      {c.specialization}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#E4D3B8] text-[11px] text-[#8A6A3A] tracking-wider uppercase font-medium">
                    {c.institution}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-[#140d08]/95 flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Previous certificate"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2"
          >
            <ChevronLeft size={30} strokeWidth={1.3} />
          </button>
          <button
            aria-label="Next certificate"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2"
          >
            <ChevronRight size={30} strokeWidth={1.3} />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Ph
              src={active.img}
              alt={active.title}
              label={active.title}
              className="max-h-[74vh] w-full"
              imgClassName="object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-[#E9D9B8] font-serif text-lg">{active.title}</p>
              <p className="text-[#B79E78] text-[11px] uppercase tracking-[0.2em] mt-1">
                {active.institution} · {active.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   PORTFOLIO + LIGHTBOX
   ============================================================ */
function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = useMemo(
    () => (filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter)),
    [filter]
  );

  const openLightbox = (item) => setLightboxIdx(filtered.findIndex((p) => p.id === item.id));
  const closeLightbox = () => setLightboxIdx(null);
  const step = useCallback((dir) => {
    setLightboxIdx((idx) => {
      if (idx === null) return idx;
      const len = filtered.length;
      return (idx + dir + len) % len;
    });
  }, [filtered]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, step]);

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#F5EDE1]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="A Look Inside the Studio" sub="A selection of real work — every category below can be filtered to see looks by style and occasion." />
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {portfolioCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-[11.5px] tracking-[0.08em] uppercase border transition-colors ${
                  filter === c
                    ? "bg-[#2B1D14] text-[#F6EEDD] border-[#2B1D14]"
                    : "border-[#D9C2A3] text-[#6B5B48] hover:border-[#2B1D14] hover:text-[#2B1D14]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="columns-2 sm:columns-3 gap-4 sm:gap-5 [column-fill:balance]">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={(i % 6) * 60} className="mb-4 sm:mb-5 break-inside-avoid">
              <button onClick={() => openLightbox(item)} className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9823D]">
                <div className="relative">
                  <Ph
                    src={item.img}
                    alt={item.title}
                    label={item.title}
                    className={item.tall ? "aspect-[3/4]" : "aspect-[4/5]"}
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* proof-sheet corner marks — signature framing motif */}
                  <span className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t border-l border-[#C9A85C]/0 group-hover:border-[#C9A85C]/90 transition-colors duration-300" />
                  <span className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#C9A85C]/0 group-hover:border-[#C9A85C]/90 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-[#1c130c]/0 group-hover:bg-[#1c130c]/25 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-[12.5px] font-light">{item.title}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-[#8A6A3A] py-16">No looks in this category yet — check back soon.</p>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-[#140d08]/95 flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2"
          >
            <ChevronLeft size={30} strokeWidth={1.3} />
          </button>
          <button
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2"
          >
            <ChevronRight size={30} strokeWidth={1.3} />
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Ph src={active.img} alt={active.title} label={active.title} className="max-h-[74vh] w-full" imgClassName="object-contain" />
            <div className="mt-4 text-center">
              <p className="text-[#E9D9B8] font-serif text-lg">{active.title}</p>
              <p className="text-[#B79E78] text-[11px] uppercase tracking-[0.2em] mt-1">{active.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   REAL BRIDES
   ============================================================ */
function RealBrides() {
  return (
    <section className="py-24 sm:py-32 bg-[#FBF7F0]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Real Clients" title="Real Brides, Real Stories" sub="A few of the women trusted us with their most important day." />
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-8">
          {realBrides.map((b, i) => (
            <Reveal key={b.name} delay={i * 100} className="group">
              <Ph src={b.img} alt={`${b.name}, ${b.event}`} className="aspect-[3/4]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <div className="pt-5">
                <p className="font-serif text-lg text-[#2B1D14]">{b.name}</p>
                <p className="text-[11.5px] uppercase tracking-[0.12em] text-[#A9823D] mt-1">{b.event}</p>
                <p className="text-[12.5px] text-[#8A6A3A] italic mt-0.5">{b.style}</p>
                <p className="mt-3 text-[14px] text-[#6B5B48] leading-relaxed">"{b.quote}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS CAROUSEL
   ============================================================ */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const perView = 1;
  const timer = useRef(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer.current);
  }, []);

  const go = (dir) => {
    clearInterval(timer.current);
    setIdx((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const step = useCallback(
    (dir) => {
      setLightboxIdx((idx) => {
        if (idx === null) return idx;
        const len = visualReviews.length;
        return (idx + dir + len) % len;
      });
    },
    []
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, step]);

  const t = testimonials[idx];
  const activeReview = lightboxIdx !== null ? visualReviews[lightboxIdx] : null;

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[#2B1D14] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="Good & Positive Reviews" sub="Book now to look your best on your great day." dark />
        </Reveal>
        <Reveal>
          <Quote className="mx-auto text-[#C9A85C]/60 mb-6" size={34} strokeWidth={1} />
          <div className="flex justify-center gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className={i < t.rating ? "fill-[#C9A85C] text-[#C9A85C]" : "text-[#5b4a34]"} />
            ))}
          </div>
          <p className="font-serif text-xl sm:text-2xl text-[#F1E6D2] leading-relaxed italic min-h-[6rem]">
            "{t.review}"
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Ph src={t.img} alt={t.name} className="w-11 h-11 rounded-full" />
            <div className="text-left">
              <p className="text-[#E9D9B8] text-sm font-medium">{t.name}</p>
              <p className="text-[#B79E78] text-[11px] uppercase tracking-[0.12em]">{t.event}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button aria-label="Previous testimonial" onClick={() => go(-1)} className="text-[#B79E78] hover:text-white p-2">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => { clearInterval(timer.current); setIdx(i); }}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-[#C9A85C]" : "w-1.5 bg-[#5b4a34]"}`}
              />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => go(1)} className="text-[#B79E78] hover:text-white p-2">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Visual Chat Reviews Section */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-24 relative z-10 border-t border-[#5b4a34]/40 pt-16">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow dark>Real Stories</Eyebrow>
            <h3 className="font-serif text-[1.8rem] sm:text-[2.2rem] leading-tight text-[#F1E6D2]">
              What Our Brides Say (WhatsApp & Chats)
            </h3>
            <p className="mt-3 text-[14.5px] text-[#B79E78] leading-relaxed max-w-xl mx-auto">
              Real screenshots and direct messages shared by our brides after their makeovers. Click to read the full conversations.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex sm:grid sm:grid-cols-5 gap-5 overflow-x-auto sm:overflow-x-visible pb-6 sm:pb-0 snap-x snap-mandatory">
            {visualReviews.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setLightboxIdx(i)}
                className="group relative flex-none w-[260px] sm:w-auto snap-start block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A85C]"
              >
                <div className="relative aspect-[9/16] overflow-hidden border border-[#5b4a34] bg-[#2B1D14] shadow-md group-hover:border-[#C9A85C] transition-colors duration-300">
                  <Ph
                    src={r.img}
                    alt={r.title}
                    label={r.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[#1c130c]/30 group-hover:bg-[#1c130c]/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="bg-[#2B1D14]/95 text-[#F1E6D2] border border-[#5b4a34] px-3.5 py-2 text-[10.5px] uppercase tracking-[0.08em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read Message
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-[#B79E78] text-center font-medium tracking-wider uppercase group-hover:text-white transition-colors">
                  {r.title}
                </p>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {activeReview && (
        <div
          className="fixed inset-0 z-[100] bg-[#140d08]/95 flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={activeReview.title}
          onClick={() => setLightboxIdx(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
          <button
            aria-label="Previous review"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2"
          >
            <ChevronLeft size={30} strokeWidth={1.3} />
          </button>
          <button
            aria-label="Next review"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2"
          >
            <ChevronRight size={30} strokeWidth={1.3} />
          </button>
          <div className="max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <Ph
              src={activeReview.img}
              alt={activeReview.title}
              label={activeReview.title}
              className="max-h-[80vh] w-full"
              imgClassName="object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-[#E9D9B8] font-serif text-lg">{activeReview.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   AVAILABILITY CALENDAR
   ============================================================ */
function AvailabilityCalendar({ onSelectDate, isAdmin, onStatusChange }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const today = useMemo(() => new Date(), []);
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const monthLabel = viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const startDow = viewDate.getDay();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));

  const handleCellClick = (date) => {
    if (isAdmin) {
      const currentStatus = getDateStatus(date);
      let nextStatus = "available";
      if (currentStatus === "available") nextStatus = "limited";
      else if (currentStatus === "limited") nextStatus = "booked";
      else if (currentStatus === "booked") nextStatus = "available";

      const key = `status_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
      localStorage.setItem(key, nextStatus);
      onStatusChange();
    } else {
      onSelectDate(date);
    }
  };

  return (
    <div className="bg-white border border-[#E4D3B8] p-5 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <button
          aria-label="Previous month"
          onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
          disabled={monthOffset === 0}
          className="p-2 text-[#8A6A3A] hover:text-[#2B1D14] disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <p className="font-serif text-lg text-[#2B1D14]">{monthLabel}</p>
        <button
          aria-label="Next month"
          onClick={() => setMonthOffset((m) => Math.min(11, m + 1))}
          className="p-2 text-[#8A6A3A] hover:text-[#2B1D14]"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center text-[10px] uppercase tracking-[0.1em] text-[#8A6A3A] py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const status = getDateStatus(date);
          const disabled = status === "past" || (!isAdmin && status === "booked");
          const meta = statusMeta[status];
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => handleCellClick(date)}
              aria-label={`${date.toDateString()} — ${meta.label || "unavailable"}`}
              className={`aspect-square flex flex-col items-center justify-center gap-1 text-[12.5px] sm:text-[13px] border transition-colors ${
                disabled
                  ? "border-transparent text-[#C9BBA6] cursor-not-allowed"
                  : "border-[#E4D3B8] text-[#3B2A20] hover:border-[#A9823D] hover:bg-[#F6EEDD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A9823D]"
              } ${isAdmin && status !== "past" ? "cursor-pointer hover:scale-[1.05]" : ""}`}
            >
              <span>{date.getDate()}</span>
              {status !== "past" && <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 pt-5 border-t border-[#E4D3B8]">
        {["available", "limited", "booked"].map((s) => (
          <span key={s} className="flex items-center gap-2 text-[11.5px] text-[#6B5B48]">
            <span className={`w-2 h-2 rounded-full ${statusMeta[s].dot}`} /> {statusMeta[s].label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Availability({ onSelectDate, isAdmin, onStatusChange, onLogout }) {
  return (
    <section id="availability" className="py-24 sm:py-32 bg-[#F5EDE1]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-start">
        <div>
          <Reveal>
            <Eyebrow>Availability</Eyebrow>
            <h2 className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.1] text-[#2B1D14]">Check My Availability</h2>
            <p className="mt-5 text-[#6B5B48] text-[15px] leading-relaxed max-w-md">
              Wedding dates fill quickly, especially in peak season. Use the calendar to see open dates at a
              glance, then submit a request — this reserves your interest, not a confirmed slot.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 bg-[#FBF7F0] border border-[#E4D3B8] p-5 flex gap-3">
              <CalendarIcon size={18} strokeWidth={1.5} className="text-[#A9823D] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#6B5B48] leading-relaxed">
                <span className="font-medium text-[#2B1D14]">Booking Request ≠ Confirmed Booking.</span> Your
                date is only locked in once a deposit is received and you get a written confirmation.
              </p>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={150}>
          <div className="relative">
            {isAdmin && (
              <div className="bg-[#B79E78]/15 border border-[#B79E78]/40 text-[#2B1D14] px-5 py-3 text-[12px] tracking-wider uppercase font-medium flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C9070] animate-pulse" />
                  Admin Mode Active
                </span>
                <button onClick={onLogout} className="text-[#A9823D] hover:text-[#2B1D14] transition-colors font-bold underline uppercase text-[10.5px]">
                  Logout
                </button>
              </div>
            )}
            <AvailabilityCalendar onSelectDate={onSelectDate} isAdmin={isAdmin} onStatusChange={onStatusChange} />
            {isAdmin && (
              <p className="mt-3 text-center text-xs text-[#8A6A3A] italic">
                💡 Admin: Click any future date to cycle: Available ➔ Limited ➔ Booked ➔ Available
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   BOOKING FORM MODAL — 4 steps
   ============================================================ */
const eventTypes = ["Bridal Wedding", "Engagement", "Reception", "Party", "Photoshoot", "Special Event"];
const packageOptions = ["Individual Service", "Not sure yet"];

function BookingForm({ open, onClose, initialDate, initialService }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    date: initialDate ? initialDate.toISOString().slice(0, 10) : "",
    eventType: "", time: "", location: "",
    people: "1", service: initialService || "", style: "", notes: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((f) => ({
        ...f,
        date: initialDate ? initialDate.toISOString().slice(0, 10) : f.date,
        service: initialService || f.service,
      }));
      setStep(1);
      setSubmitted(false);
      setErrors({});
    }
  }, [open, initialDate, initialService]);

  if (!open) return null;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1 && !form.date) e.date = "Select an event date to continue.";
    if (s === 2) {
      if (!form.name.trim()) e.name = "Enter your full name.";
      if (!form.phone.trim()) e.phone = "Enter a phone number.";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
      if (!form.eventType) e.eventType = "Select an event type.";
      if (!form.location.trim()) e.location = "Enter the event location.";
      if (!form.service) e.service = "Select a service or package.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep((s) => s + 1); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const waMessage = () =>
    `Hi ${siteConfig.artistName.split(" ")[0]}! I'd like to request a booking.\n` +
    `Name: ${form.name}\nEvent: ${form.eventType || "-"}\nDate: ${form.date || "-"}\nTime: ${form.time || "-"}\n` +
    `Location: ${form.location || "-"}\nGuests/People: ${form.people}\nService/Package: ${form.service || "-"}\n` +
    `Preferred style: ${form.style || "-"}\nNotes: ${form.notes || "-"}`;

  const submit = () => {
    // NOTE: mock submission only — wire to Supabase / Firebase / backend API here.
    setSubmitted(true);
  };

  const steps = ["Your Date", "Event Details", "Review", "Submitted"];

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-[#140d08]/70 p-0 sm:p-6" role="dialog" aria-modal="true" aria-label="Booking request form">
      <div className="bg-[#FBF7F0] w-full sm:max-w-xl max-h-[92vh] overflow-y-auto sm:rounded-none shadow-2xl relative">
        <div className="sticky top-0 bg-[#FBF7F0] border-b border-[#E4D3B8] px-6 py-5 flex items-center justify-between z-10">
          <div>
            <p className="font-serif text-lg text-[#2B1D14]">Request a Booking</p>
            {!submitted && (
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#A9823D] mt-1">
                Step {step} of 3 · {steps[step - 1]}
              </p>
            )}
          </div>
          <button aria-label="Close booking form" onClick={onClose} className="p-2 text-[#8A6A3A] hover:text-[#2B1D14]">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {!submitted && (
          <div className="flex gap-1.5 px-6 pt-4">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`h-1 flex-1 rounded-full ${n <= step ? "bg-[#A9823D]" : "bg-[#E4D3B8]"}`} />
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#EDE6D3] flex items-center justify-center mx-auto mb-5">
                <Check size={26} strokeWidth={1.5} className="text-[#7C9070]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2B1D14]">Your Enquiry Has Been Received</h3>
              <p className="mt-3 text-[14.5px] text-[#6B5B48] leading-relaxed max-w-sm mx-auto">
                Thank you for considering {siteConfig.artistName}. We've received your details and will get
                back to you shortly to confirm your date. This is a booking request, not a confirmed booking.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <GoldButton href={whatsappLink(waMessage())} variant="solid">Chat on WhatsApp</GoldButton>
                <GoldButton onClick={onClose} variant="outline" icon={false}>Back to Website</GoldButton>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div>
                  <label className="block text-[13px] font-medium text-[#2B1D14] mb-2" htmlFor="bf-date">Event date</label>
                  <input
                    id="bf-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full border border-[#D9C2A3] bg-white px-4 py-3 text-[14px] text-[#2B1D14] focus:outline-none focus:border-[#A9823D]"
                  />
                  {errors.date && <p className="text-[12px] text-[#B5605A] mt-2">{errors.date}</p>}
                  <p className="mt-3 text-[12.5px] text-[#8A6A3A]">
                    Picked a date from the calendar above? It's already filled in — just confirm and continue.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" error={errors.name}>
                      <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" className={inputCls} />
                    </Field>
                    <Field label="Phone number" error={errors.phone}>
                      <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Email" error={errors.email}>
                    <input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Event type" error={errors.eventType}>
                      <select value={form.eventType} onChange={(e) => update("eventType", e.target.value)} className={inputCls}>
                        <option value="">Select event type</option>
                        {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Approximate time">
                      <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Event location" error={errors.location}>
                    <input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Venue or city" className={inputCls} />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Number of people">
                      <input type="number" min="1" value={form.people} onChange={(e) => update("people", e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Service / package" error={errors.service}>
                      <select value={form.service} onChange={(e) => update("service", e.target.value)} className={inputCls}>
                        <option value="">Select service or package</option>
                        {[...services.map((s) => s.name), ...packageOptions].map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Preferred makeup style (optional)">
                    <input value={form.style} onChange={(e) => update("style", e.target.value)} placeholder="e.g. Soft glam, HD, traditional" className={inputCls} />
                  </Field>
                  <Field label="Additional notes (optional)">
                    <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} placeholder="Anything else we should know" className={inputCls} />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-[13px] text-[#8A6A3A] mb-5">Please review your details before submitting.</p>
                  <dl className="divide-y divide-[#E4D3B8] border-t border-b border-[#E4D3B8]">
                    {[
                      ["Full name", form.name], ["Phone", form.phone], ["Email", form.email],
                      ["Event date", form.date], ["Event type", form.eventType], ["Time", form.time || "—"],
                      ["Location", form.location], ["People", form.people], ["Service / package", form.service],
                      ["Style", form.style || "—"], ["Notes", form.notes || "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-2.5 text-[13.5px]">
                        <dt className="text-[#8A6A3A]">{k}</dt>
                        <dd className="text-[#2B1D14] text-right font-medium max-w-[60%]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button onClick={back} className="text-[13px] uppercase tracking-[0.08em] text-[#8A6A3A] hover:text-[#2B1D14] px-2 py-2">Back</button>
                ) : <span />}
                {step < 3 ? (
                  <GoldButton onClick={next} variant="solid" icon={false}>Continue</GoldButton>
                ) : (
                  <GoldButton onClick={submit} variant="solid" icon={false}>Submit Booking Request</GoldButton>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = "w-full border border-[#D9C2A3] bg-white px-4 py-3 text-[14px] text-[#2B1D14] focus:outline-none focus:border-[#A9823D]";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#2B1D14] mb-2">{label}</label>
      {children}
      {error && <p className="text-[12px] text-[#B5605A] mt-1.5">{error}</p>}
    </div>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const items = [
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: whatsappLink("Hi! I'd love to know more about your makeup services.") },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Instagram, label: "Instagram", value: siteConfig.instagramHandle, href: siteConfig.instagram },
    { icon: MapPin, label: "Location", value: siteConfig.region, href: null },
  ];
  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#2B1D14]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14">
        <div>
          <Reveal>
            <SectionHeading eyebrow="Contact" title="Let's Talk About Your Date" dark center={false} />
          </Reveal>
          <div className="space-y-5">
            {items.map((it, i) => (
              <Reveal key={it.label} delay={i * 70} className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-full border border-[#5b4a34] flex items-center justify-center text-[#C9A85C] shrink-0">
                  <it.icon size={17} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#B79E78]">{it.label}</p>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-[#F1E6D2] text-[15px] hover:text-[#C9A85C] transition-colors">
                      {it.value}
                    </a>
                  ) : (
                    <p className="text-[#F1E6D2] text-[15px]">{it.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-9 border-t border-[#5b4a34] pt-7">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#B79E78] mb-3 flex items-center gap-2">
              <Clock size={14} strokeWidth={1.5} /> Business Hours
            </p>
            {siteConfig.hours.map((h) => (
              <div key={h.day} className="flex justify-between text-[13.5px] text-[#D8C6A8] py-1 max-w-sm">
                <span>{h.day}</span><span>{h.time}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="bg-[#3a281c] h-full min-h-[280px] flex flex-col items-center justify-center text-center p-10 border border-[#5b4a34]">
            <MapPin size={26} strokeWidth={1.2} className="text-[#C9A85C] mb-4" />
            <p className="font-serif text-xl text-[#F1E6D2]">Based in {siteConfig.city}</p>
            <p className="mt-2 text-[13.5px] text-[#B79E78] max-w-xs">
              Travelling across {siteConfig.region} for weddings, with destination availability on request.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   INSTAGRAM GRID
   ============================================================ */
function InstagramSection() {
  const grid = portfolioItems.slice(0, 6);
  return (
    <section className="py-24 sm:py-28 bg-[#FBF7F0]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <Reveal><SectionHeading eyebrow="Instagram" title="Follow My Work" /></Reveal>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-10">
          {grid.map((g, i) => (
            <Reveal key={g.id} delay={i * 40}>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="group block relative aspect-square overflow-hidden">
                <Ph src={g.img} alt={g.title} className="w-full h-full" imgClassName="transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#1c130c]/0 group-hover:bg-[#1c130c]/40 transition-colors flex items-center justify-center">
                  <Instagram size={18} strokeWidth={1.5} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <GoldButton href={siteConfig.instagram} variant="outline">Follow on Instagram</GoldButton>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#F5EDE1]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal><SectionHeading eyebrow="FAQ" title="Good to Know" /></Reveal>
        <div className="border-t border-[#D9C2A3]">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 30} className="border-b border-[#D9C2A3]">
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className={`text-[15px] sm:text-[16px] ${isOpen ? "text-[#2B1D14] font-medium" : "text-[#4a3a2a]"}`}>{f.q}</span>
                  <ChevronDown size={18} strokeWidth={1.5} className={`text-[#A9823D] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] text-[#6B5B48] leading-relaxed pb-5 pr-8">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCTA({ onBook }) {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Ph
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1800&auto=format&fit=crop"
          alt="Bride in soft light, final call to action"
          label="Final CTA background"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-[#1c130c]/70" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto text-center px-5 sm:px-8">
        <Reveal>
          <h2 className="font-serif text-white text-[2.1rem] sm:text-[2.8rem] leading-[1.15]">
            Your Date Deserves the Perfect Look.
          </h2>
          <p className="mt-5 text-[#F1E6D2] text-[15px] sm:text-base leading-relaxed">
            Tell us about your event and let's create a look you'll love looking back on for years to come.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton onClick={onBook} variant="light">Check Availability</GoldButton>
            <GoldButton href={whatsappLink("Hi! I'd love to know more about your makeup services.")} variant="ghostLight">WhatsApp Us</GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER + FLOATING WHATSAPP
   ============================================================ */
function Footer({ onAdminClick }) {
  return (
    <footer className="bg-[#1c130c] text-[#B79E78] py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px]">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm tracking-[0.1em] border border-[#C9A85C] px-2 py-0.5 text-[#C9A85C]">
            ASP
          </span>
          <p className="font-serif text-[#E9D9B8] text-base">{siteConfig.brandName}</p>
        </div>
        <p>&copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
        <div className="flex gap-5 items-center">
          <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">Email</a>
          <span className="text-[#5b4a34]">|</span>
          <button onClick={onAdminClick} className="hover:text-white transition-colors cursor-pointer uppercase tracking-[0.05em] text-[11px] font-medium">
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   ADMIN LOGIN MODAL
   ============================================================ */
function AdminLoginModal({ open, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "pallaviaryan712@gmail.com" && password === "pallavi") {
      onLoginSuccess();
      onClose();
    } else {
      setError("Invalid email address or password.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#140d08]/70 p-4" role="dialog" aria-modal="true" aria-label="Admin Login">
      <div className="bg-[#FBF7F0] w-full max-w-md p-8 border border-[#E4D3B8] shadow-2xl relative">
        <button aria-label="Close login modal" onClick={onClose} className="absolute top-5 right-5 p-2 text-[#8A6A3A] hover:text-[#2B1D14] transition-colors">
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="text-center mb-8">
          <span className="font-serif text-lg tracking-[0.1em] border border-[#C9A85C] px-3 py-1 text-[#C9A85C] inline-block mb-3">
            ASP
          </span>
          <h3 className="font-serif text-2xl text-[#2B1D14]">Admin Portal</h3>
          <p className="text-[12px] uppercase tracking-[0.12em] text-[#A9823D] mt-1">
            Access Availability Management
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-[#2B1D14] mb-2" htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pallaviaryan712@gmail.com"
              className="w-full border border-[#D9C2A3] bg-white px-4 py-3 text-[14px] text-[#2B1D14] focus:outline-none focus:border-[#A9823D]"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[#2B1D14] mb-2" htmlFor="admin-pass">Password</label>
            <input
              id="admin-pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#D9C2A3] bg-white px-4 py-3 text-[14px] text-[#2B1D14] focus:outline-none focus:border-[#A9823D]"
            />
          </div>
          {error && (
            <p className="text-[12px] text-[#B5605A] font-medium text-center bg-[#B5605A]/10 py-2 border border-[#B5605A]/20">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#2B1D14] text-[#F6EEDD] hover:bg-[#4a3221] py-3.5 text-[13px] tracking-[0.08em] uppercase font-medium transition-colors"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Hi! I'd love to know more about your makeup services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <MessageCircle size={26} className="text-white" fill="white" strokeWidth={0} />
    </a>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingService, setBookingService] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [calendarTick, setCalendarTick] = useState(0);

  const openBooking = (service) => {
    setBookingService(service || "");
    setBookingDate(null);
    setBookingOpen(true);
  };
  const openBookingWithDate = (date) => {
    setBookingDate(date);
    setBookingOpen(true);
  };
  const closeBooking = () => setBookingOpen(false);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="font-sans text-[#3B2A20] bg-[#FBF7F0]" style={{ fontFamily: "'Jost', ui-sans-serif, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <Nav onBook={() => openBooking("")} />
      <main>
        <Hero onBook={() => openBooking("")} onView={() => scrollTo("portfolio")} />
        <TrustStats />
        <About onBook={() => openBooking("")} />
        <Certifications />
        <Portfolio />
        <Testimonials />
        <Availability
          key={calendarTick}
          onSelectDate={openBookingWithDate}
          isAdmin={isAdminLoggedIn}
          onStatusChange={() => setCalendarTick((t) => t + 1)}
          onLogout={() => setIsAdminLoggedIn(false)}
        />
        <InstagramSection />
        <FAQ />
        <FinalCTA onBook={() => openBooking("")} />
      </main>
      <Contact />
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <FloatingWhatsApp />

      <BookingForm
        open={bookingOpen}
        onClose={closeBooking}
        initialDate={bookingDate}
        initialService={bookingService}
      />

      <AdminLoginModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onLoginSuccess={() => setIsAdminLoggedIn(true)}
      />
    </div>
  );
}
