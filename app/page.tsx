"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CalendarHeart,
  Gift,
  PartyPopper,
  Music,
  Volume2,
  VolumeX,
  Heart,
  ExternalLink,
  Send,
  CheckCircle2,
  Recycle
} from "lucide-react";

// --- COMPONENTES DE DECORACIÓN FLORAL DORADA (SVG INLINE) ---

const FloralCorner = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`absolute fill-current ${className}`}>
    <path d="M10,90 Q15,75 30,70 Q45,65 50,50 Q45,35 30,30 Q15,25 10,10" stroke="#C5A059" strokeWidth="2" fill="none" opacity="0.6"/>
    <circle cx="10" cy="90" r="3" fill="#C5A059" opacity="0.8"/>
    <circle cx="10" cy="10" r="3" fill="#C5A059" opacity="0.8"/>
    <path d="M30,70 Q35,75 40,90" stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M30,30 Q35,25 40,10" stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M50,50 Q60,55 70,50 Q80,45 90,50" stroke="#C5A059" strokeWidth="2" fill="none" opacity="0.6"/>
    <circle cx="90" cy="50" r="3" fill="#C5A059" opacity="0.8"/>
  </svg>
);

const FloralGarlandVertical = ({ className = "" }) => (
  <svg viewBox="0 0 50 200" className={`absolute fill-current ${className}`}>
    <path d="M25,0 Q15,25 25,50 Q35,75 25,100 Q15,125 25,150 Q35,175 25,200" stroke="#C5A059" strokeWidth="2" fill="none" opacity="0.5"/>
    <circle cx="25" cy="10" r="2.5" fill="#C5A059" opacity="0.7"/>
    <circle cx="25" cy="190" r="2.5" fill="#C5A059" opacity="0.7"/>
    <path d="M25,50 Q35,45 45,50 Q35,55 25,60" stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <path d="M25,100 Q15,95 5,100 Q15,105 25,110" stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.4"/>
    <path d="M25,150 Q35,145 45,150 Q35,155 25,160" stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.4"/>
  </svg>
);

// --- VARIANTES DE ANIMACIÓN ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const fadeVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- CONFIGURACIÓN DE DATOS ---
const itineraryEvents = [
  { time: "18:00", title: "Recepción", desc: "Bienvenida con cóctel de autor.", icon: <PartyPopper size={20} /> },
  { time: "19:00", title: "La Ceremonia", desc: "Unión bajo el atardecer.", icon: <CalendarHeart size={20} /> },
  { time: "20:30", title: "Banquete", desc: "Cena gourmet & maridaje.", icon: <Gift size={20} /> },
  { time: "23:00", title: "La Fiesta", desc: "Música en vivo y barra abierta.", icon: <Music size={20} /> },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800",
];

const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];
const paddingDays = Array(6).fill(null);
const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

export default function InvitacionBoutiqueDefinitiva() {
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    const audio = new Audio("/song.mp3");
    audio.loop = true;
    setAudioElement(audio);
    return () => { audio.pause(); audio.src = ""; };
  }, []);

  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date(2026, 10, 15, 18, 0, 0).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
          horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else { clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAbrirSobre = () => {
    setInvitacionAbierta(true);
    if (audioElement) { audioElement.play().catch(console.log); setIsPlaying(true); }
  };

  const toggleAudio = () => {
    if (isPlaying) { audioElement?.pause(); } else { audioElement?.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true);
  };

  return (
    <main 
      className={`relative min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#C5A059]/40 overflow-x-hidden ${!invitacionAbierta ? "h-screen overflow-hidden" : ""}`}
    >
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ 
          backgroundImage: `url('/textura.jpg')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'screen',
          zIndex: 10
        }}
      ></div>

      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(197,160,89,0.15)_0%,rgba(13,13,13,1)_70%)]"></div>

      <AnimatePresence>
        {!invitacionAbierta && (
          <motion.div
            key="sobre" exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 1.2, ease: [0.83, 0, 0.39, 1] }}
            className="fixed inset-0 z-100lex flex-col items-center justify-center bg-[#050505] perspective-[1000px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)]"></div>
            <motion.div 
              exit={{ rotateX: 90, y: -200, opacity: 0 }} 
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-center z-10 space-y-12 transform-3d origin-bottom"
            >
              <p className="text-[#C5A059] tracking-[0.6em] uppercase text-[11px] font-bold animate-pulse">Invitación Privada</p>
              <div onClick={handleAbrirSobre} className="w-52 h-52 mx-auto rounded-full border border-[#C5A059]/20 flex items-center justify-center bg-white/3 backdrop-blur-xl cursor-pointer hover:scale-110 hover:shadow-[0_0_80px_rgba(197,160,89,0.3)] transition-all duration-700 relative group shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                <span className="text-6xl font-serif italic tracking-tighter">V<span className="text-3xl text-[#C5A059] mx-1">&</span>D</span>
              </div>
              <button onClick={handleAbrirSobre} className="px-14 py-4 bg-[#C5A059] text-black font-black tracking-[0.2em] uppercase text-[10px] rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                Abrir Sobre
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {invitacionAbierta && (
        <motion.button 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
          onClick={toggleAudio}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#1A1A1A]/60 backdrop-blur-2xl border border-[#C5A059]/20 rounded-full flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all shadow-2xl"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      )}

      <div className="relative z-20 pb-20">
        <section className="relative text-center md:px-6 pt-32 md:pt-40">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} >
            <motion.p variants={fadeVariant} className="text-[#C5A059] tracking-[0.5em] uppercase text-[10px] md:text-sm mb-6 font-black">Estás Invitado</motion.p>
            <motion.h1 variants={fadeVariant} className="text-6xl md:text-[9rem] font-serif italic leading-[0.9] mb-4 text-white drop-shadow-2xl">
              Valentina
            </motion.h1>
            <motion.h1 variants={fadeVariant} className="text-5xl md:text-[7rem] font-serif italic leading-[0.9] text-[#C5A059] mb-8">
              <span className="text-white/30 mx-4">&</span> Diego
            </motion.h1>
            <motion.p variants={fadeVariant} className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-400 pb-24 md:pb-40">
              15 · Noviembre · 2026
            </motion.p>
          </motion.div>

          <motion.section 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
            className="relative w-full h-[60vh] md:h-[80vh] mb-12"
          >
            <img 
              src="/hero-boutique.jpg" 
              alt="Hero" 
              className="w-full md:w-2/3 h-full object-cover mx-auto md:rounded-4xl shadow-4xl" 
            />
          </motion.section>
        </section>

        <section className="py-24 px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-4xl mx-auto text-center relative">
            
            {/* DECORACIÓN: GARLANDAS LATERALES (VISIBLES EN MÓVIL) */}
            <FloralGarlandVertical className="w-16 md:w-20 h-75 md:h-125 -left-8 md:-left-20 top-1/2 -translate-y-1/2 opacity-40 md:opacity-60 block" />
            <FloralGarlandVertical className="w-16 md:w-20 h-75 md:h-125 -right-8 md:-right-20 top-1/2 -translate-y-1/2 opacity-40 md:opacity-60 scale-x-[-1] block" />

            <motion.div variants={fadeVariant} className="mb-20 flex flex-col items-center justify-center relative">
              <p className="text-gray-400 text-xs tracking-widest uppercase mb-4 font-light relative z-10">
                Reproduce nuestra canción mientras lees la invitación
              </p>
              
              {/* CONTENEDOR BOTÓN Y CORAZONES */}
              <div className="relative flex items-center justify-center group w-16 h-16 mx-auto">
                
                <AnimatePresence>
                  {isPlaying && (
                    // Corazones posicionados a la derecha del botón
                    <div className="absolute left-full top-0 ml-2 h-full flex flex-col justify-center items-start pointer-events-none w-20">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 0, scale: 0.5, x: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0], 
                            y: -20 - (Math.random() * 30), // Suben
                            scale: [0.5, 1.2, 0.8],
                            x: 10 + (Math.random() * 30) // Se desplazan a la derecha
                          }}
                          transition={{ 
                            duration: 2 + Math.random(), 
                            repeat: Infinity, 
                            delay: i * 0.4,
                            ease: "easeOut"
                          }}
                          className="absolute text-[#C5A059]"
                        >
                          <Heart size={14} fill="#C5A059" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
                
                <button 
                  onClick={toggleAudio}
                  className={`relative z-10 w-16 h-16 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] transition-all bg-[#0d0d0d]/50 backdrop-blur-md shadow-[0_0_30px_rgba(197,160,89,0.1)] hover:bg-[#C5A059] hover:text-black ${isPlaying ? 'animate-pulse' : ''}`}
                >
                  {isPlaying ? <Music size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </motion.div>

            <motion.h2 variants={fadeVariant} className="text-white uppercase text-[11px] tracking-[0.5em] font-light mb-12">Cuenta Regresiva</motion.h2>
            
            <div className="relative flex justify-center gap-3 md:gap-8 mb-24 px-4 md:px-10 z-10">
              {[{ v: timeLeft.dias, l: "Días" }, { v: timeLeft.horas, l: "Hrs" }, { v: timeLeft.minutos, l: "Min" }, { v: timeLeft.segundos, l: "Seg" }].map((t, i) => (
                <motion.div variants={fadeVariant} key={i} className="relative flex flex-col items-center group">
                  {/* DECORACIÓN: ESQUINA CUENTA REGRESIVA (VISIBLE EN MÓVIL) */}
                  <FloralCorner className="w-8 h-8 md:w-10 md:h-10 -top-3 -left-3 md:-top-4 md:-left-4 rotate-90 opacity-40 md:opacity-60 block" />
                  
                  <div className="w-16 h-20 md:w-28 md:h-32 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl relative overflow-hidden">
                    <span className="text-2xl md:text-5xl font-serif text-[#C5A059] relative z-10">{t.v.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-500 mt-4 font-bold">{t.l}</span>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeVariant} className="max-w-sm mx-auto bg-white/3 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden z-10">
              {/* DECORACIÓN: ESQUINAS CALENDARIO (VISIBLES EN MÓVIL) */}
              <FloralCorner className="w-10 h-10 md:w-12 md:h-12 top-1 left-1 opacity-50 md:opacity-70 block" />
              <FloralCorner className="w-10 h-10 md:w-12 md:h-12 bottom-1 right-1 rotate-180 opacity-50 md:opacity-70 block" />
              
              <h3 className="text-xl md:text-2xl font-serif italic text-white mb-6 relative z-10">Noviembre 2026</h3>
              
              <div className="grid grid-cols-7 gap-y-4 gap-x-1 md:gap-x-2 text-center relative z-10">
                {diasSemana.map((dia, idx) => (
                  <div key={idx} className="text-[#C5A059] text-[9px] md:text-[10px] font-bold tracking-widest">{dia}</div>
                ))}
                
                {paddingDays.map((_, idx) => (
                  <div key={`pad-${idx}`} className="text-transparent">0</div>
                ))}
                
                {novemberDays.map((dia) => (
                  <div key={dia} className="flex items-center justify-center">
                    {dia === 15 ? (
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#C5A059] text-black flex items-center justify-center font-bold text-xs md:text-sm shadow-[0_0_15px_rgba(197,160,89,0.5)] transform scale-110 relative z-10">
                        {dia}
                      </div>
                    ) : (
                      <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-gray-400 text-xs md:text-sm font-light relative z-10">
                        {dia}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="py-12 px-6 relative">
          <div className="max-w-4xl mx-auto text-center relative">
            
            {/* DECORACIÓN: GARLANDAS NUESTRA HISTORIA (VISIBLES EN MÓVIL) */}
            <FloralGarlandVertical className="w-16 md:w-20 h-75 md:h-125 -left-8 md:-left-20 top-1/2 -translate-y-1/2 opacity-40 md:opacity-60 block" />
            <FloralGarlandVertical className="w-16 md:w-20 h-75 md:h-125 -right-8 md:-right-20 top-1/2 -translate-y-1/2 opacity-40 md:opacity-60 scale-x-[-1] block" />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-white/3 border border-white/10 p-8 md:p-16 rounded-4xl md:rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              
              {/* DECORACIÓN: ESQUINAS NUESTRA HISTORIA (VISIBLES EN MÓVIL) */}
              <FloralCorner className="w-12 h-12 md:w-16 md:h-16 top-2 left-2 opacity-60 md:opacity-80 block" />
              <FloralCorner className="w-12 h-12 md:w-16 md:h-16 bottom-2 right-2 rotate-180 opacity-60 md:opacity-80 block" />

              <motion.div variants={fadeVariant} className="flex justify-center mb-6 relative z-10">
                <Heart className="text-[#C5A059] w-8 h-8 md:w-12 md:h-12" />
              </motion.div>
              <motion.h2 variants={fadeVariant} className="text-3xl md:text-5xl font-serif italic mb-6 text-white relative z-10">Nuestra Historia</motion.h2>
              <motion.p variants={fadeVariant} className="text-gray-400 font-light text-sm md:text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
                Todo comenzó de forma inesperada y hoy nos lleva al altar. 
                Han sido años llenos de aventuras, risas, aprendizajes y, sobre todo, de construir un amor sincero.
                Estamos inmensamente felices de dar este gran paso juntos y no hay mejor forma de celebrarlo
                que acompañados de las personas que más queremos.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} className="text-center mb-24 relative z-10">
              {/* DECORACIÓN: GARLANDAS TÍTULO ITINERARIO (VISIBLES EN MÓVIL) */}
              <FloralGarlandVertical className="w-12 h-32 md:w-16 md:h-40 -left-6 md:-left-16 top-1/2 -translate-y-1/2 opacity-40 md:opacity-50 block" />
              <FloralGarlandVertical className="w-12 h-32 md:w-16 md:h-40 -right-6 md:-right-16 top-1/2 -translate-y-1/2 opacity-40 md:opacity-50 scale-x-[-1] block" />

              <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-white">Itinerario</h2>
              <div className="h-px w-20 bg-[#C5A059] mx-auto opacity-50 mb-6"></div>
              
              <p className="text-gray-400 text-[10px] md:text-xs tracking-widest uppercase font-light max-w-xl mx-auto leading-relaxed">
                Acompáñanos en cada uno de los momentos especiales que hemos preparado con tanto cariño para celebrar este día.
              </p>
            </motion.div>

            <div className="relative border-l border-[#C5A059]/20 ml-4 md:ml-0 md:border-none z-10">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C5A059]/20 -translate-x-1/2"></div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-12 relative z-10">
                {itineraryEvents.map((item, i) => (
                  <motion.div key={i} variants={fadeVariant} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute -left-1.25 md:left-1/2 w-2.5 h-2.5 rounded-full bg-[#C5A059] md:-translate-x-1/2 shadow-[0_0_15px_#C5A059] z-20"></div>
                    <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} relative group pl-6 md:pl-0`}>
                      {/* DECORACIÓN: GARLANDA TARJETAS (VISIBLES EN MÓVIL) */}
                      <FloralGarlandVertical className={`w-8 h-24 md:w-10 md:h-32 ${i % 2 === 0 ? 'left-0 md:left-2' : 'right-0 md:right-2 scale-x-[-1]'} top-1/2 -translate-y-1/2 opacity-30 md:opacity-0 md:group-hover:opacity-60 transition-all duration-700 block z-10`} />
                      
                      <div className="bg-white/3 border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-xl hover:bg-white/10 hover:border-[#C5A059]/30 transition-all duration-300 transform hover:-translate-y-1 relative z-20 overflow-hidden">
                        <div className="text-[#C5A059] mb-4 flex items-center justify-between relative z-10">
                          {item.icon}
                          <span className="text-lg md:text-xl font-mono opacity-40">{item.time}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif mb-2 text-white/90 relative z-10">{item.title}</h3>
                        <p className="text-gray-500 font-light text-sm relative z-10">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} className="text-center mb-16 md:mb-20 relative z-10">
              {/* DECORACIÓN: GARLANDAS TÍTULO GALERÍA (VISIBLES EN MÓVIL) */}
              <FloralGarlandVertical className="w-12 h-32 md:w-16 md:h-40 -left-6 md:-left-16 top-1/2 -translate-y-1/2 opacity-40 md:opacity-50 block" />
              <FloralGarlandVertical className="w-12 h-32 md:w-16 md:h-40 -right-6 md:-right-16 top-1/2 -translate-y-1/2 opacity-40 md:opacity-50 scale-x-[-1] block" />

              <h2 className="text-4xl md:text-6xl font-serif italic mb-4 text-white relative z-10">Galería</h2>
              <p className="text-[#C5A059] uppercase text-[10px] tracking-[0.4em] font-black relative z-10 mb-6">Nuestros Momentos</p>
              
              <p className="text-gray-400 text-[10px] md:text-xs tracking-widest uppercase font-light max-w-xl mx-auto leading-relaxed relative z-10">
                Un pequeño vistazo a la historia y los recuerdos que hemos construido juntos y que nos trajeron hasta aquí.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {galleryImages.map((src, i) => (
                <motion.div key={i} variants={fadeVariant} className="aspect-4/5 overflow-hidden rounded-xl group relative bg-[#111] shadow-2xl">
                  {/* DECORACIÓN: ESQUINAS GALERÍA (VISIBLES EN MÓVIL Y HOVER) */}
                  <FloralCorner className="w-8 h-8 md:w-10 md:h-10 top-1 left-1 opacity-60 md:opacity-0 md:group-hover:opacity-80 transition-all duration-500 block z-10" />
                  <FloralCorner className="w-8 h-8 md:w-10 md:h-10 bottom-1 right-1 rotate-180 opacity-60 md:opacity-0 md:group-hover:opacity-80 transition-all duration-500 block z-10" />
                  
                  <img 
                    src={src} alt="Nuestros momentos" 
                    className="w-full h-full object-cover grayscale opacity-50 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-1000 ease-out relative z-20" 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 relative">
          {/* DECORACIÓN: GARLANDA SECCIÓN REGALOS/SPOTIFY (VISIBLES EN MÓVIL) */}
          <FloralGarlandVertical className="w-16 md:w-24 h-[60vh] md:h-[80vh] -left-8 md:-left-20 top-1/2 -translate-y-1/2 opacity-30 md:opacity-60 block" />
          <FloralGarlandVertical className="w-16 md:w-24 h-[60vh] md:h-[80vh] -right-8 md:-right-20 top-1/2 -translate-y-1/2 opacity-30 md:opacity-60 scale-x-[-1] block" />

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} className="h-full relative group">
              {/* DECORACIÓN: GARLANDAS INTERNAS REGALOS (VISIBLES EN MÓVIL) */}
              <FloralGarlandVertical className="w-10 h-48 md:w-12 md:h-64 -left-4 md:-left-12 top-1/2 -translate-y-1/2 opacity-30 md:opacity-0 md:group-hover:opacity-60 transition-all duration-700 block z-10" />
              <FloralGarlandVertical className="w-10 h-48 md:w-12 md:h-64 -right-4 md:-right-12 top-1/2 -translate-y-1/2 opacity-30 md:opacity-0 md:group-hover:opacity-60 transition-all duration-700 scale-x-[-1] block z-10" />

              <div className="bg-white/3 border border-white/10 p-8 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-2xl text-left flex flex-col justify-between h-full group hover:border-[#C5A059]/30 hover:bg-white/5 transition-all shadow-2xl relative overflow-hidden z-20">
                {/* DECORACIÓN: ESQUINA SUP-DER REGALOS (VISIBLE EN MÓVIL) */}
                <FloralCorner className="w-12 h-12 md:w-14 md:h-14 top-2 right-2 -rotate-90 opacity-50 md:opacity-60 block z-10" />
                
                <div className="relative z-20">
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <Gift size={28} className="text-[#C5A059] shrink-0" />
                    <h3 className="text-xl md:text-2xl font-serif text-white">Ver Lista de Novios</h3>
                  </div>
                  <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-8 relative z-10">
                    Tu presencia es nuestro mayor regalo, pero si deseas tener un detalle con nosotros, hemos preparado una lista de novios para ayudarnos a construir nuestro futuro hogar. ¡Gracias por tanto cariño!
                  </p>
                </div>
                
                <a 
                  href="https://tupagina.com/lista-de-novios" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-3 w-full py-4 bg-transparent border border-[#C5A059] text-[#C5A059] rounded-xl hover:bg-[#C5A059] hover:text-black transition-all uppercase text-[10px] tracking-widest font-bold relative z-20"
                >
                  Ir a la lista <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} transition={{ delay: 0.2 }} className="h-full relative group">
              {/* DECORACIÓN: GARLANDAS INTERNAS SPOTIFY (VISIBLES EN MÓVIL) */}
              <FloralGarlandVertical className="w-10 h-48 md:w-12 md:h-64 -left-4 md:-left-12 top-1/2 -translate-y-1/2 opacity-30 md:opacity-0 md:group-hover:opacity-60 transition-all duration-700 block z-10" />
              <FloralGarlandVertical className="w-10 h-48 md:w-12 md:h-64 -right-4 md:-right-12 top-1/2 -translate-y-1/2 opacity-30 md:opacity-0 md:group-hover:opacity-60 transition-all duration-700 scale-x-[-1] block z-10" />

              <div className="bg-white/3 border border-white/10 p-8 rounded-2xl md:rounded-3xl backdrop-blur-2xl h-full flex flex-col group hover:border-[#1DB954]/30 transition-all shadow-2xl relative overflow-hidden z-20">
                {/* DECORACIÓN: ESQUINA SUP-IZQ SPOTIFY (VISIBLE EN MÓVIL) */}
                <FloralCorner className="w-12 h-12 md:w-14 md:h-14 top-2 left-2 opacity-50 md:opacity-60 block z-10" />
                
                <div className="flex items-center justify-between mb-4 relative z-20">
                  <div className="flex items-center gap-4 relative z-10">
                    <Music size={28} className="text-[#1DB954]" />
                    <h3 className="text-xl md:text-2xl font-serif text-white">Playlist Colaborativa</h3>
                  </div>
                </div>
                
                <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-6 relative z-20">
                  Queremos que nuestra boda suene a nosotros... y a ti. Ayúdanos a crear la banda sonora perfecta agregando tus canciones favoritas a esta playlist. ¡Para que no paremos de bailar!
                </p>
                
                <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-[#121212] mt-auto relative z-20">
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{ borderRadius: '12px' }} 
                    src="https://open.spotify.com/embed/playlist/5PYaT9X1fdUsA391Whje9r?utm_source=generator" 
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant}>
            <h2 className="text-4xl font-serif italic mb-6 text-white relative z-10">Confirma tu asistencia</h2>
            
            <p className="text-gray-400 text-[10px] md:text-xs tracking-widest uppercase font-light max-w-xl mx-auto leading-relaxed mb-12 relative z-10">
              Tu presencia es muy importante para nosotros. Por favor, confírmanos tu asistencia para que podamos organizar todos los detalles.
            </p>

            <div className="max-w-2xl mx-auto bg-white/2 border border-white/10 p-8 md:p-16 rounded-4xl md:rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden z-10">
              {/* DECORACIÓN: ESQUINA SUP-IZQ RSVP (VISIBLE EN MÓVIL) */}
              <FloralCorner className="w-14 h-14 md:w-16 md:h-16 top-1 left-1 opacity-60 md:opacity-80 block z-10" />
              {/* DECORACIÓN: ESQUINA INF-DER RSVP (VISIBLE EN MÓVIL) */}
              <FloralCorner className="w-14 h-14 md:w-16 md:h-16 bottom-1 right-1 rotate-180 opacity-60 md:opacity-80 block z-10" />

              <AnimatePresence mode="wait">
                {!rsvpSent ? (
                  <motion.form key="form" onSubmit={handleRsvpSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6 md:space-y-8 text-left relative z-20">
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                      <div className="space-y-2 relative group">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2 relative z-10">Nombre Completo</label>
                        <input required type="text" placeholder="Ej: Juan Pérez" className="w-full bg-white/3 border border-white/10 rounded-lg px-4 md:px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light placeholder:text-gray-700 text-white relative z-20 text-sm md:text-base" />
                        <FloralCorner className="w-6 h-6 -top-1 right-1 -rotate-90 opacity-30 focus-within:opacity-50 transition-all duration-300 block pointer-events-none z-10" />
                      </div>
                      <div className="space-y-2 relative group">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2 relative z-10">¿Asistirás?</label>
                        <select required className="w-full bg-transparent border border-white/10 rounded-lg px-4 md:px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light text-white appearance-none cursor-pointer relative z-20 text-sm md:text-base">
                          <option value="" className="bg-[#111]">Selecciona una opción</option>
                          <option value="si" className="bg-[#111]">¡Sí, ahí estaré!</option>
                          <option value="no" className="bg-[#111]">Lo siento, no podré</option>
                        </select>
                        <FloralCorner className="w-6 h-6 -top-1 left-1 opacity-30 focus-within:opacity-50 transition-all duration-300 block pointer-events-none z-10" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                      <div className="space-y-2 relative">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2 relative z-10">Acompañantes</label>
                        <input type="number" min="0" max="5" defaultValue="0" className="w-full bg-white/3 border border-white/10 rounded-lg px-4 md:px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light text-white relative z-20 text-sm md:text-base" />
                        <FloralGarlandVertical className="w-8 h-24 md:w-10 md:h-32 -left-4 md:-left-12 top-1/2 -translate-y-1/2 opacity-0 focus-within:opacity-40 transition-all duration-700 scale-x-[-1] block pointer-events-none z-10" />
                      </div>
                      <div className="space-y-2 relative group">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2 relative z-10">Menú / Alergias</label>
                        <input type="text" placeholder="Ej: Vegano, Celíaco..." className="w-full bg-white/3 border border-white/10 rounded-lg px-4 md:px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light placeholder:text-gray-700 text-white relative z-20 text-sm md:text-base" />
                        <FloralCorner className="w-4 h-4 top-1 right-1 -rotate-90 opacity-0 group-hover:opacity-30 focus-within:opacity-50 transition-all duration-300 block pointer-events-none z-10" />
                      </div>
                    </div>

                    <div className="relative group z-10">
                      <textarea placeholder="Mensaje para los novios (Opcional)" rows={3} className="w-full bg-white/3 border border-white/10 rounded-lg px-4 md:px-6 py-4 outline-none focus:border-[#C5A059] transition-all font-light placeholder:text-gray-700 text-white resize-none relative z-20 text-sm md:text-base"></textarea>
                      <FloralGarlandVertical className="w-6 h-20 md:w-8 md:h-24 right-2 top-1/2 -translate-y-1/2 opacity-0 focus-within:opacity-40 transition-all duration-700 block pointer-events-none z-10" />
                    </div>
                    
                    <button type="submit" className="w-full py-5 md:py-6 bg-[#C5A059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all flex justify-center items-center gap-2 relative z-20 overflow-hidden group">
                      <Send size={16} className="relative z-10" /> <span className="relative z-10">Enviar Confirmación</span>
                      <FloralCorner className="w-8 h-8 md:w-10 md:h-10 top-1 left-1 opacity-20 md:opacity-0 group-hover:opacity-60 transition-all duration-500 block z-10" />
                      <FloralCorner className="w-8 h-8 md:w-10 md:h-10 bottom-1 right-1 rotate-180 opacity-20 md:opacity-0 group-hover:opacity-60 transition-all duration-500 block z-10" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10 relative z-20">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-[#C5A059]/20 rounded-full flex items-center justify-center mb-6 relative z-10">
                      <CheckCircle2 size={32} className="text-[#C5A059] md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-2 relative z-10">¡Mensaje Recibido!</h3>
                    <p className="text-gray-400 font-light text-sm md:text-base relative z-10">Gracias por responder a nuestra invitación.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <footer className="py-12 md:py-16 border-t border-white/5 bg-[#080808]/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-4 relative z-10 px-6 text-center">
          <div className="flex items-center gap-2 text-[#C5A059]/70 relative z-10">
            <Recycle size={16} />
            <span className="text-[10px] md:text-xs font-light tracking-wide">Invitación 100% digital y amigable con el medio ambiente.</span>
          </div>
          <p className="text-gray-600 text-[8px] md:text-[9px] uppercase tracking-[0.4em] relative z-10">Copyright © 2026 · Boutique Design · FaroWeb</p>
        </footer>
      </div>
    </main>
  );
}