"use client";

import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CalendarHeart,
  Gift,
  Navigation,
  PartyPopper,
  Music,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Camera,
  Heart,
  ExternalLink
} from "lucide-react";

// --- VARIANTES DE ANIMACIÓN ---
const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true },
};

// --- CONFIGURACIÓN DE DATOS ---
const itineraryEvents = [
  { time: "18:00", title: "Recepción", desc: "Bienvenida con cóctel de autor.", icon: <PartyPopper size={20} /> },
  { time: "19:00", title: "La Ceremonia", desc: "Unión bajo el atardecer.", icon: <CalendarHeart size={20} /> },
  { time: "20:30", title: "Banquete", desc: "Cena gourmet & maridaje.", icon: <Gift size={20} /> },
  { time: "23:00", title: "Party Time", desc: "Música en vivo y barra abierta.", icon: <Music size={20} /> },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800",
  "https://images.unsplash.com/photo-1460364154652-f87e5f037683?q=80&w=800",
];

export default function InvitacionBoutiqueDefinitiva() {
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

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

  return (
    <main 
      className={`relative min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#C5A059]/40 overflow-x-hidden ${!invitacionAbierta ? "h-screen overflow-hidden" : ""}`}
    >
      {/* 1. CAPA DE TEXTURA GLOBAL (Ajustada para que ocupe todo sin repetirse feo) */}
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

      {/* 2. GRADIENTE DORADO INMERSIVO (Base) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(197,160,89,0.15)_0%,rgba(13,13,13,1)_70%)]"></div>

      {/* SOBRE DIGITAL */}
      <AnimatePresence>
        {!invitacionAbierta && (
          <motion.div
            key="sobre" exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 1.2, ease: [0.83, 0, 0.39, 1] }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)]"></div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center z-10 space-y-12">
              <p className="text-[#C5A059] tracking-[0.6em] uppercase text-[11px] font-bold">Private Invitation</p>
              <div onClick={handleAbrirSobre} className="w-52 h-52 mx-auto rounded-full border border-[#C5A059]/20 flex items-center justify-center bg-white/3 backdrop-blur-xl cursor-pointer hover:scale-105 transition-all duration-700 relative group shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                <span className="text-6xl font-serif italic tracking-tighter">V<span className="text-3xl text-[#C5A059] mx-1">&</span>D</span>
              </div>
              <button onClick={handleAbrirSobre} className="px-14 py-4 bg-[#C5A059] text-black font-black tracking-[0.2em] uppercase text-[10px] rounded-full hover:bg-white transition-all">
                Abrir Sobre
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÓN MÚSICA */}
      {invitacionAbierta && (
        <button onClick={() => { isPlaying ? audioElement?.pause() : audioElement?.play(); setIsPlaying(!isPlaying); }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#1A1A1A]/60 backdrop-blur-2xl border border-[#C5A059]/20 rounded-full flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all shadow-2xl"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 pb-20">

        {/* 2. TÍTULOS (DEBAJO DEL HERO) */}
        <section className="relative text-center px-6 pt-50">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} >
            <p className="text-[#C5A059] tracking-[0.5em] uppercase text-[10px] md:text-sm mb-6 font-black">Estás Invitado</p>
            <h1 className="text-6xl md:text-[9rem] font-serif italic leading-[0.9] mb-4 text-white drop-shadow-2xl">
              Valentina
            </h1>
            <h1 className="text-5xl md:text-[7rem] font-serif italic leading-[0.9] text-[#C5A059] mb-8">
              <span className="text-white/30 mx-4">&</span> Diego
            </h1>
            <p className="text-lg md:text-2xl font-light tracking-[0.4em] text-gray-400 pb-60">
              15 · Noviembre · 2026
            </p>
          </motion.div>

           {/* 1. HERO SECTION (FOTO) */}
        <section className="relative w-full  h-[60vh] md:h-[80vh]">
          <img 
            src="/hero-boutique.jpg" 
            alt="Hero" className="w-2/3 h-full object-cover mx-auto rounded-4xl shadow-4xl  " 
          />
        </section>
        </section>


        {/* 3. COUNTDOWN */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white uppercase text-[11px] tracking-[0.5em] font-light mb-12">Countdown</h2>
            <div className="flex justify-center gap-3 md:gap-8 mb-16">
              {[{ v: timeLeft.dias, l: "Days" }, { v: timeLeft.horas, l: "Hrs" }, { v: timeLeft.minutos, l: "Min" }, { v: timeLeft.segundos, l: "Seg" }].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-24 md:w-28 md:h-32 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                    <span className="text-3xl md:text-5xl font-serif text-[#C5A059]">{t.v.toString().padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-4 font-bold">{t.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ITINERARIO */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-2 text-white">Itinerary</h2>
              <div className="h-px w-20 bg-[#C5A059] mx-auto opacity-50"></div>
            </motion.div>

            <div className="relative border-l border-[#C5A059]/20 ml-4 md:ml-0 md:border-none">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C5A059]/20 -translate-x-1/2"></div>
              <div className="space-y-12">
                {itineraryEvents.map((item, i) => (
                  <motion.div key={i} {...fadeInUp} className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="absolute -left-1.25 md:left-1/2 w-2.5 h-2.5 rounded-full bg-[#C5A059] md:-translate-x-1/2 shadow-[0_0_15px_#C5A059]"></div>
                    <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                      <div className="bg-white/3 border border-white/5 p-8 rounded-3xl backdrop-blur-xl hover:bg-white/5 transition-all">
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
              </div>
            </div>
          </div>
        </section>

        {/* 5. GALERÍA (B&W) */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif italic mb-4 text-white">Galería</h2>
              <p className="text-[#C5A059] uppercase text-[10px] tracking-[0.4em] font-black">Nuestros Momentos</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {galleryImages.map((src, i) => (
                <motion.div key={i} {...fadeInUp} className="aspect-4/5 overflow-hidden rounded-xl group relative bg-[#111] shadow-2xl">
                  <img 
                    src={src} alt="Gallery" 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. REGALOS / SPOTIFY */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} className="bg-white/3 border border-white/10 p-10 rounded-2xl backdrop-blur-2xl text-left flex items-center gap-6 group hover:border-[#C5A059]/30 transition-all">
              <Gift size={40} className="text-[#C5A059] shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Mesa de Regalos</h3>
                <p className="text-gray-500 text-xs font-light">Datos bancarios disponibles.</p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-linear-to-r from-[#1DB954]/10 to-transparent border border-white/10 p-10 rounded-2xl backdrop-blur-2xl text-left flex items-center gap-6 group hover:border-[#1DB954]/30 transition-all">
              <Music size={40} className="text-[#1DB954] shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Spotify</h3>
                <p className="text-gray-500 text-xs font-light">Añade música a la lista.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 7. RSVP */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl font-serif italic mb-12 text-white">RSVP</h2>
          <div className="max-w-2xl mx-auto bg-white/2 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
            <form className="space-y-8 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Name" className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] transition-all font-light placeholder:text-gray-700 text-white" />
                <input type="text" placeholder="Last Name" className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] transition-all font-light placeholder:text-gray-700 text-white" />
              </div>
              <textarea placeholder="Message" rows={3} className="w-full bg-white/3 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-[#C5A059] transition-all font-light placeholder:text-gray-700 text-white resize-none"></textarea>
              <button className="w-full py-6 bg-[#C5A059] text-black font-black uppercase text-[10px] tracking-[0.4em] rounded-lg hover:bg-white transition-all shadow-xl">
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 border-t border-white/5 bg-[#080808]/80 backdrop-blur-lg text-center">
          <p className="text-gray-700 text-[9px] uppercase tracking-[0.4em]">Copyright © 2026 · Boutique Design · FaroWeb</p>
        </footer>
      </div>
    </main>
  );
}