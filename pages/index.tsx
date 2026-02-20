import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const ease = [0.25, 0.4, 0.25, 1];

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Shield({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M100 8 C140 8, 180 12, 188 20 C192 28, 192 40, 192 60 L192 160 C192 190, 160 230, 100 252 C40 230, 8 190, 8 160 L8 60 C8 40, 8 28, 12 20 C20 12, 60 8, 100 8Z"
        fill={light ? "white" : "#0D9488"}
        stroke={light ? "rgba(255,255,255,0.3)" : "#115e59"}
        strokeWidth="3"
      />
      <path
        d="M100 20 C135 20, 170 23, 177 29 C180 35, 180 44, 180 60 L180 155 C180 182, 152 218, 100 238 C48 218, 20 182, 20 155 L20 60 C20 44, 20 35, 23 29 C30 23, 65 20, 100 20Z"
        fill="none"
        stroke={light ? "rgba(13,148,136,0.3)" : "rgba(255,255,255,0.4)"}
        strokeWidth="2.5"
      />
      <text
        x="100"
        y="72"
        textAnchor="middle"
        fill={light ? "#0d9488" : "white"}
        fontFamily="Oswald, sans-serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="3"
      >
        ENSENADA
      </text>
      <line
        x1="40" y1="86" x2="160" y2="86"
        stroke={light ? "rgba(13,148,136,0.2)" : "rgba(255,255,255,0.3)"}
        strokeWidth="1.5"
      />
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fill={light ? "#0d9488" : "white"}
        fontFamily="Oswald, sans-serif"
        fontWeight="700"
        fontSize="80"
        letterSpacing="-2"
      >
        101
      </text>
      <path
        d="M55 180 Q70 172, 85 180 Q100 188, 115 180 Q130 172, 145 180"
        fill="none"
        stroke={light ? "rgba(13,148,136,0.25)" : "rgba(255,255,255,0.35)"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="205"
        textAnchor="middle"
        fill={light ? "#0d9488" : "white"}
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
        fontSize="13"
        letterSpacing="4"
      >
        FISH TACOS
      </text>
    </svg>
  );
}

function WaveDivider({ flip, color }: { flip?: boolean; color: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="w-full h-[40px] sm:h-[60px] md:h-[80px]"
      >
        <path
          d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

const menuItems = [
  {
    name: "TACO DE PESCADO",
    desc: "Pescado capeado en cerveza, col rallada, crema de chipotle, pico de gallo, tortilla de ma\u00edz.",
  },
  {
    name: "TACO DE CAMAR\u00d3N",
    desc: "Camar\u00f3n a la plancha, salsa de aguacate, cebolla curtida, cilantro, tortilla de harina.",
  },
  {
    name: "BURRITO BAJA",
    desc: "Pescado crujiente, arroz, frijoles negros, col, crema de chipotle, bien envuelto.",
  },
  {
    name: "TOSTADA DE CEVICHE",
    desc: "Ceviche de pescado fresco, lim\u00f3n, pepino, serrano, aguacate, tostada crujiente.",
  },
];

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Ingresa tu email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email no v\u00e1lido.");
      return;
    }
    setError("");
    setSubmitted(true);
    window.location.href = `mailto:hello@ensenada101.fishtacos.com?subject=Notif%C3%ADcame&body=Hola!%20Agr%C3%A9game%20a%20la%20lista.%20Mi%20email%3A%20${encodeURIComponent(email)}`;
    setEmail("");
  };

  return (
    <>
      <Head>
        <title>Ensenada 101 — Tacos de Pescado y Burritos — Roma Sur, CDMX</title>
      </Head>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-teal-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3">
            <Shield className="w-8 h-auto" />
            <span className="font-display text-lg font-bold text-white tracking-wide uppercase">
              Ensenada 101
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-8">
            <a href="#menu" className="text-sm text-white/60 hover:text-white transition-colors font-medium uppercase tracking-wider">
              Men&uacute;
            </a>
            <a href="#location" className="text-sm text-white/60 hover:text-white transition-colors font-medium uppercase tracking-wider">
              Ubicaci&oacute;n
            </a>
            <a
              href="https://www.instagram.com/ensenada101.fishtacos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors font-medium uppercase tracking-wider"
            >
              Instagram
            </a>
            <a
              href="https://www.ensenada101.com"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-[0.2em] font-mono"
            >
              English
            </a>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <header
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden hero-bg"
      >
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-950/85 via-teal-900/80 to-teal-800/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,47,46,0.6)_100%)]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-16"
        >
          {/* Shield Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="mb-8"
          >
            <Shield className="mx-auto w-32 sm:w-40 md:w-48" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold uppercase leading-[0.9] tracking-wide text-white"
          >
            Tacos de Pescado
            <br />
            <span className="text-teal-300">y Burritos</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/60 font-medium"
          >
            Estilo Ensenada. Pr&oacute;ximamente en Roma Sur, CDMX.
          </motion.p>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-12 sm:mt-14"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-md mx-auto"
              >
                <p className="text-2xl font-bold text-white font-display uppercase">
                  Ya est&aacute;s en la lista.
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Te avisamos cuando abramos.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="tu@email.com"
                    className="flex-1 bg-white/10 border border-white/15 rounded-full px-6 py-4 text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-teal-300/50 focus:bg-white/15 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-white text-teal-800 font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-200 hover:bg-teal-100 active:scale-[0.98] whitespace-nowrap"
                  >
                    Notif&iacute;came
                  </button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-red-300"
                  >
                    {error}
                  </motion.p>
                )}
                <p className="mt-4 text-xs text-white/30">
                  S&eacute; el primero en enterarte. Sin spam.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      </header>

      {/* Wave transition: hero → product */}
      <WaveDivider color="#ffffff" flip />

      <main>
        {/* ════════════════════════════════════════
            PRODUCTO
        ════════════════════════════════════════ */}
        <section id="product" className="py-20 md:py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            {/* Hero image + headline split */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <FadeIn>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-teal-600 font-bold mb-4">
                    Directo de la Costa
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
                    Estilo Ensenada.
                    <br />
                    <span className="text-teal-600">Sin Atajos.</span>
                  </h2>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="relative">
                  <img
                    src="/fish-taco.png"
                    alt="Ensenada 101 Taco de Pescado"
                    className="w-full max-w-md mx-auto drop-shadow-2xl"
                  />
                </div>
              </FadeIn>
            </div>

            <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Capeado en Cerveza",
                  text: "Pescado blanco fresco, ba\u00f1ado en nuestra masa artesanal y frito hasta dorar. Crujiente por fuera, suave por dentro.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                    </svg>
                  ),
                },
                {
                  title: "Salsas Frescas",
                  text: "Hechas desde cero cada ma\u00f1ana. Crema de chipotle, pico de gallo, salsa verde de aguacate. Siempre frescas.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                    </svg>
                  ),
                },
                {
                  title: "Tradici\u00f3n Baja",
                  text: "Nacido en las calles de Ensenada. El taco de pescado original de Baja, perfeccionado y tra\u00eddo a la CDMX.",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438a2.253 2.253 0 01-1.699 2.583l-.096.024-.914-.228M3.636 15.903l.296-.197" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 text-teal-600 mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-neutral-500 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            VIDEO
        ════════════════════════════════════════ */}
        <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-teal-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/promo.mp4" type="video/mp4" />
          </video>
          {/* Teal overlay */}
          <div className="absolute inset-0 bg-teal-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/60 via-transparent to-teal-950/30" />
          {/* Centered text */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <FadeIn>
              <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide text-white text-center leading-tight drop-shadow-lg">
                De Ensenada
                <br />
                <span className="text-teal-300">a Tu Mesa.</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Wave transition: video → menu */}
        <WaveDivider color="#f0fdfa" />

        {/* ════════════════════════════════════════
            MEN&Uacute;
        ════════════════════════════════════════ */}
        <section id="menu" className="py-20 md:py-32 px-6 bg-teal-50 relative overflow-hidden">
          {/* Ghosted sign watermark */}
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[600px] opacity-[0.04] pointer-events-none select-none hidden md:block">
            <img
              src="/hero.jpg"
              alt=""
              className="w-full h-full object-cover object-center grayscale"
            />
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.25em] text-teal-600 font-bold mb-4">
                  El Men&uacute;
                </p>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
                  Lo Que Servimos
                </h2>
                <p className="mt-4 text-neutral-500 max-w-lg mx-auto">
                  Lo mejor de Ensenada, hecho fresco todos los d&iacute;as. Ingredientes simples, sabores intensos.
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid sm:grid-cols-2 gap-6">
              {menuItems.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-teal-100/60 hover:shadow-md transition-shadow duration-300">
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-neutral-900">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-neutral-500 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <p className="mt-10 text-center text-sm text-neutral-400">
                Men&uacute; completo pr&oacute;ximamente.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Wave transition: menu → location */}
        <WaveDivider color="#ffffff" flip />

        {/* ════════════════════════════════════════
            UBICACI&Oacute;N
        ════════════════════════════════════════ */}
        <section id="location" className="py-20 md:py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <FadeIn>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-teal-600 font-bold mb-4">
                    Ubicaci&oacute;n
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-neutral-900 leading-[0.95]">
                    Coahuila
                    <br />
                    192
                  </h2>
                  <p className="mt-4 text-xl text-neutral-500">
                    Roma Sur, CDMX
                  </p>
                  <p className="mt-3 text-neutral-400">
                    Misma terraza, diferente vibra.
                    <br />
                    <span className="text-teal-600 font-semibold">Bajo el mismo techo que Juanberto&apos;s.</span>
                  </p>
                  <div className="mt-8 inline-flex items-center gap-2.5 bg-teal-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    Pr&oacute;ximamente
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="aspect-square md:aspect-[4/3] bg-teal-50 border border-teal-100 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.04]">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute left-0 right-0 h-px bg-teal-950"
                        style={{ top: `${(i + 1) * 11.1}%` }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute top-0 bottom-0 w-px bg-teal-950"
                        style={{ left: `${(i + 1) * 11.1}%` }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <svg
                      className="w-10 h-10 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-sm text-neutral-500 font-semibold">
                      Coahuila 192, Roma Sur
                    </p>
                    <p className="text-xs text-neutral-400">
                      Mapa pr&oacute;ximamente
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Wave transition: location → social */}
        <WaveDivider color="#042f2e" />

        {/* ════════════════════════════════════════
            SOCIAL / S&Iacute;GUENOS
        ════════════════════════════════════════ */}
        <section className="py-20 md:py-32 px-6 bg-teal-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img
              src="/hero.jpg"
              alt=""
              className="w-full h-full object-cover object-top opacity-[0.06] grayscale"
            />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <FadeIn>
              <p className="text-sm uppercase tracking-[0.25em] text-teal-400 font-bold mb-4">
                Instagram
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide text-white leading-[0.95]">
                S&iacute;guenos.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <a
                href="https://www.instagram.com/ensenada101.fishtacos/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @ensenada101.fishtacos
              </a>
              <p className="mt-5 text-sm text-white/30">
                Directo de la costa. Mira c&oacute;mo lo construimos.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="py-10 px-6 bg-teal-950 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-auto opacity-50" />
            <span className="font-display text-sm font-bold text-white/40 uppercase tracking-wider">
              Ensenada 101
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hello@ensenada101.fishtacos.com"
              className="text-xs text-white/30 hover:text-teal-400 transition-colors duration-200"
            >
              hello@ensenada101.fishtacos.com
            </a>
            <a
              href="https://www.juanbertos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/50 transition-colors duration-200"
            >
              juanbertos.com
            </a>
          </div>

          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Ensenada 101
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
