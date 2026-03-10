"use client";

import { motion, AnimatePresence, MotionProps, Variants } from "framer-motion";
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
  ChevronDown,
  Copy,
  CheckCircle2,
  Send
} from "lucide-react";

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
  "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800", // <-- Link arreglado
];

export default function InvitacionBoutiqueDefinitiva() {
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Estados interactivos para Mesa de Regalos y RSVP
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText("123456789-K"); // Aquí tu cuenta real
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true); // Muestra el mensaje de éxito
  };

  return (
    <main 
      className={`relative min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#C5A059]/40 overflow-x-hidden ${!invitacionAbierta ? "h-screen overflow-hidden" : ""}`}
    >
      {/* 1. CAPA DE TEXTURA GLOBAL */}
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

      {/* 2. GRADIENTE DORADO INMERSIVO */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(197,160,89,0.15)_0%,rgba(13,13,13,1)_70%)]"></div>

      {/* SOBRE DIGITAL 3D */}
      <AnimatePresence>
        {!invitacionAbierta && (
          <motion.div
            key="sobre" exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 1.2, ease: [0.83, 0, 0.39, 1] }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505] perspective-[1000px]"
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

      {/* BOTÓN MÚSICA */}
      {invitacionAbierta && (
        <motion.button 
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
          onClick={() => { isPlaying ? audioElement?.pause() : audioElement?.play(); setIsPlaying(!isPlaying); }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#1A1A1A]/60 backdrop-blur-2xl border border-[#C5A059]/20 rounded-full flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all shadow-2xl"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 pb-20">

        {/* 1. TÍTULOS (DEBAJO DEL HERO) */}
        <section className="relative text-center px-6 pt-50">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} >
            <motion.p variants={fadeVariant} className="text-[#C5A059] tracking-[0.5em] uppercase text-[10px] md:text-sm mb-6 font-black">Estás Invitado</motion.p>
            <motion.h1 variants={fadeVariant} className="text-6xl md:text-[9rem] font-serif italic leading-[0.9] mb-4 text-white drop-shadow-2xl">
              Valentina
            </motion.h1>
            <motion.h1 variants={fadeVariant} className="text-5xl md:text-[7rem] font-serif italic leading-[0.9] text-[#C5A059] mb-8">
              <span className="text-white/30 mx-4">&</span> Diego
            </motion.h1>
            <motion.p variants={fadeVariant} className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-400 pb-60">
              15 · Noviembre · 2026
            </motion.p>
          </motion.div>

          {/* HERO SECTION (FOTO) */}
          <motion.section 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
            className="relative w-full h-[60vh] md:h-[80vh]"
          >
            <img 
              src="/hero-boutique.jpg" 
              alt="Hero" className="w-2/3 h-full object-cover mx-auto rounded-4xl shadow-4xl" 
            />
          </motion.section>
        </section>


        {/* 3. CUENTA REGRESIVA */}
        <section className="py-24 px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.h2 variants={fadeVariant} className="text-white uppercase text-[11px] tracking-[0.5em] font-light mb-12">Cuenta Regresiva</motion.h2>
            <div className="flex justify-center gap-3 md:gap-8 mb-16">
              {[{ v: timeLeft.dias, l: "Días" }, { v: timeLeft.horas, l: "Hrs" }, { v: timeLeft.minutos, l: "Min" }, { v: timeLeft.segundos, l: "Seg" }].map((t, i) => (
                <motion.div variants={fadeVariant} key={i} className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-28 md:h-32 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                    <span className="text-3xl md:text-5xl font-serif text-[#C5A059]">{t.v.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-4 font-bold">{t.l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* NUEVO: HISTORIA DE LA PAREJA */}
        <section className="py-12 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-white/3 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
              <motion.div variants={fadeVariant} className="flex justify-center mb-6">
                <Heart className="text-[#C5A059] w-10 h-10 md:w-12 md:h-12" />
              </motion.div>
              <motion.h2 variants={fadeVariant} className="text-3xl md:text-5xl font-serif italic mb-6 text-white">Nuestra Historia</motion.h2>
              <motion.p variants={fadeVariant} className="text-gray-400 font-light text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
                Todo comenzó de forma inesperada y hoy nos lleva al altar. 
                Han sido años llenos de aventuras, risas, aprendizajes y, sobre todo, de construir un amor sincero.
                Estamos inmensamente felices de dar este gran paso juntos y no hay mejor forma de celebrarlo
                que acompañados de las personas que más queremos.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* 4. ITINERARIO */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-white">Itinerario</h2>
              <div className="h-px w-20 bg-[#C5A059] mx-auto opacity-50"></div>
            </motion.div>

            <div className="relative border-l border-[#C5A059]/20 ml-4 md:ml-0 md:border-none">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C5A059]/20 -translate-x-1/2"></div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-12">
                {itineraryEvents.map((item, i) => (
                  <motion.div key={i} variants={fadeVariant} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute -left-1.25 md:left-1/2 w-2.5 h-2.5 rounded-full bg-[#C5A059] md:-translate-x-1/2 shadow-[0_0_15px_#C5A059]"></div>
                    <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                      <div className="bg-white/3 border border-white/5 p-8 rounded-3xl backdrop-blur-xl hover:bg-white/10 hover:border-[#C5A059]/30 transition-all duration-300 transform hover:-translate-y-1">
                        <div className="text-[#C5A059] mb-4 flex items-center justify-between">
                          {item.icon}
                          <span className="text-xl font-mono opacity-40">{item.time}</span>
                        </div>
                        <h3 className="text-2xl font-serif mb-2 text-white/90">{item.title}</h3>
                        <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. GALERÍA (B&W) */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-4 text-white">Galería</h2>
              <p className="text-[#C5A059] uppercase text-[10px] tracking-[0.4em] font-black">Nuestros Momentos</p>
            </motion.div>

            {/* Aquí implementamos grid-cols-1 para móviles y grid-cols-4 para desktop */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-6">
              {galleryImages.map((src, i) => (
                <motion.div key={i} variants={fadeVariant} className="aspect-4/5 overflow-hidden rounded-xl group relative bg-[#111] shadow-2xl">
                  <img 
                    src={src} alt="Nuestros momentos" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. REGALOS / SPOTIFY (Interactivos) */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            
            {/* Mesa de Regalos */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant}>
              <div 
                onClick={() => setShowBankDetails(!showBankDetails)}
                className="bg-white/3 border border-white/10 p-10 rounded-2xl backdrop-blur-2xl text-left cursor-pointer group hover:border-[#C5A059]/30 hover:bg-white/5 transition-all h-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-6">
                    <Gift size={40} className="text-[#C5A059] shrink-0" />
                    <h3 className="text-xl font-bold text-white">Mesa de Regalos</h3>
                  </div>
                  <motion.div animate={{ rotate: showBankDetails ? 180 : 0 }} className="text-[#C5A059] opacity-50 group-hover:opacity-100">
                    <ChevronDown size={24} />
                  </motion.div>
                </div>
                <p className="text-gray-500 text-xs font-light ml-16">Datos bancarios disponibles.</p>
                
                <AnimatePresence>
                  {showBankDetails && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-300 ml-16">
                        <p><strong className="text-white font-medium">Banco:</strong> Banco de Chile</p>
                        <p><strong className="text-white font-medium">Titular:</strong> Valentina y Diego</p>
                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5 mt-2">
                          <span className="font-mono tracking-widest text-[#C5A059]">1234 5678 9101</span>
                          <button onClick={(e) => { e.stopPropagation(); copyToClipboard(); }} className="text-gray-400 hover:text-white transition-colors">
                            {copied ? <CheckCircle2 size={18} className="text-green-500"/> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          {/* Spotify Reproductor Integrado */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant} transition={{ delay: 0.2 }} className="h-full">
              <div className="bg-white/3 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl h-full flex flex-col group hover:border-[#1DB954]/30 transition-all shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Music size={28} className="text-[#1DB954]" />
                    <h3 className="text-xl font-bold text-white">Playlist Colaborativa</h3>
                  </div>
                  <ExternalLink size={20} className="text-[#1DB954] opacity-50 group-hover:opacity-100 transition-all" />
                </div>
                
                {/* INICIO IFRAME SPOTIFY */}
                <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-[#121212]">
                  <iframe 
                    data-testid="embed-iframe" 
                    style={{ borderRadius: '12px' }} 
                    src="https://open.spotify.com/embed/playlist/5PYaT9X1fdUsA391Whje9r?utm_source=generator" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  ></iframe>
                </div>
                {/* FIN IFRAME SPOTIFY */}
                
                <p className="text-gray-400 text-xs font-light mt-4 text-center">
                  Reproduce la lista aquí mismo o ábrela en Spotify para agregar tus canciones.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. RSVP (Confirmación) */}
        <section className="py-32 px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeVariant}>
            <h2 className="text-4xl font-serif italic mb-12 text-white">Confirma tu asistencia</h2>
            <div className="max-w-2xl mx-auto bg-white/2 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!rsvpSent ? (
                  <motion.form key="form" onSubmit={handleRsvpSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-8 text-left">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2">Nombre Completo</label>
                        <input required type="text" placeholder="Ej: Juan Pérez" className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light placeholder:text-gray-700 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2">¿Asistirás?</label>
                        <select required className="w-full bg-transparent border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light text-white appearance-none cursor-pointer">
                          <option value="" className="bg-[#111]">Selecciona una opción</option>
                          <option value="si" className="bg-[#111]">¡Sí, ahí estaré!</option>
                          <option value="no" className="bg-[#111]">Lo siento, no podré</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2">Acompañantes</label>
                        <input type="number" min="0" max="5" defaultValue="0" className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-2">Menú / Alergias</label>
                        <input type="text" placeholder="Ej: Vegano, Celíaco..." className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] focus:bg-white/5 transition-all font-light placeholder:text-gray-700 text-white" />
                      </div>
                    </div>

                    <textarea placeholder="Mensaje para los novios (Opcional)" rows={3} className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] transition-all font-light placeholder:text-gray-700 text-white resize-none"></textarea>
                    
                    <button type="submit" className="w-full py-6 bg-[#C5A059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all flex justify-center items-center gap-2">
                      <Send size={16} /> Enviar Confirmación
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                    <div className="w-20 h-20 mx-auto bg-[#C5A059]/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-[#C5A059]" />
                    </div>
                    <h3 className="text-3xl font-serif italic text-white mb-2">¡Mensaje Recibido!</h3>
                    <p className="text-gray-400 font-light">Gracias por responder a nuestra invitación.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 border-t border-white/5 bg-[#080808]/80 backdrop-blur-lg text-center">
          <p className="text-gray-700 text-[9px] uppercase tracking-[0.4em]">Copyright © 2026 · Boutique Design · FaroWeb</p>
        </footer>
      </div>
    </main>
  );
}