import { useState, useEffect, useRef, useLayoutEffect, Fragment, type ReactNode, type MouseEvent } from 'react'
import {
  Menu, X, Phone, Mail, MapPin, CheckCircle2,
  Shield, Settings, AlignJustify, Home,
  ArrowRight, Star, Clock,
  PenTool, Hammer, Truck, CheckSquare, MessageSquare,
  Instagram, Facebook, Linkedin, Navigation,
  type LucideIcon,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  id: number
  title: string
  icon: LucideIcon
  desc: string
}

interface GalleryItem {
  id: number
  category: string
  img: string
  title: string
}

interface ProcessStep {
  icon: LucideIcon
  title: string
  desc: string
}

interface Testimonial {
  id: number
  name: string
  project: string
  text: string
  stars: number
}

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

interface SectionHeadingProps {
  subtitle: string
  title: string
  centered?: boolean
}

const WHATSAPP_URL = 'https://wa.me/541112345678?text=Hola%20Bush%20and%20Craft%2C%20quisiera%20consultar%20sobre'

const SERVICES: Service[] = [
  { id: 1, title: 'Portones Automáticos', icon: Settings, desc: 'Comodidad y seguridad con motores de alta tecnología y rodamientos premium.' },
  { id: 2, title: 'Estructuras Metálicas', icon: Home, desc: 'Bases sólidas para naves industriales y construcciones de gran envergadura.' },
  { id: 3, title: 'Escaleras de Diseño', icon: AlignJustify, desc: 'Diseños de interior y exterior, rectos, caracol o flotantes con precisión.' },
  { id: 4, title: 'Rejas y Cerramientos', icon: Shield, desc: 'Protección perimetral con diseños modernos y máxima resistencia garantizada.' },
]

const GALLERY_CATEGORIES = ['Todos', 'Portones', 'Escaleras', 'Estructuras', 'Muebles', 'Parrillas']

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, category: 'Portones', img: '/galeria/portones-hierro.jpeg', title: 'Portón de Hierro' },
  { id: 2, category: 'Portones', img: '/galeria/portonesdehierro-2.jpeg', title: 'Portón de Hierro Clásico' },
  { id: 3, category: 'Escaleras', img: '/galeria/escaleras-de-madera.webp', title: 'Escalera de Madera' },
  { id: 4, category: 'Estructuras', img: '/galeria/barandas-y-pasamanos.jpeg', title: 'Barandas y Pasamanos' },
  { id: 5, category: 'Estructuras', img: '/galeria/marquesina-de-hierro.jpeg', title: 'Marquesina de Hierro' },
  { id: 6, category: 'Muebles', img: '/galeria/muebles-cocina.jpg', title: 'Muebles de Cocina' },
  { id: 7, category: 'Parrillas', img: '/galeria/parrilas-y-fogoneros.webp', title: 'Parrillas y Fogoneros' },
]

const PROCESS_STEPS: ProcessStep[] = [
  { icon: MessageSquare, title: 'Consulta Inicial', desc: 'Entendemos tus necesidades y requerimientos específicos, asesorando sobre las mejores alternativas.' },
  { icon: PenTool, title: 'Visita y Medición', desc: 'Evaluación técnica en el lugar del proyecto con herramientas láser para una precisión milimétrica.' },
  { icon: CheckSquare, title: 'Presupuesto', desc: 'Propuesta detallada, transparente y sin compromiso, respetando tu presupuesto y tiempos.' },
  { icon: Hammer, title: 'Fabricación', desc: 'Producción artesanal con estándares de precisión industrial en nuestro taller especializado.' },
  { icon: Truck, title: 'Instalación', desc: 'Montaje seguro, limpio y profesional en obra por personal altamente capacitado.' },
  { icon: CheckCircle2, title: 'Entrega Final', desc: 'Control de calidad exhaustivo y garantía documentada sobre nuestros trabajos.' },
]

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Martín S.', project: 'Portón Automatizado', text: 'Impecable trabajo. El portón funciona a la perfección y los detalles de terminación son de primera calidad. Cumplieron con los tiempos estipulados.', stars: 5 },
  { id: 2, name: 'Arq. Laura G.', project: 'Estructura Industrial', text: 'Excelente cumplimiento de plazos y precisión milimétrica en la estructura. Es un placer trabajar con un equipo tan profesional para nuestras obras.', stars: 5 },
  { id: 3, name: 'Carlos R.', project: 'Escalera Flotante', text: 'El diseño de la escalera superó nuestras expectativas. Aportó un valor estético increíble a nuestra casa, fusionando hierro y madera de forma magistral.', stars: 5 },
  { id: 4, name: 'Valeria M.', project: 'Cerramiento Exterior', text: 'Materiales de primerísima calidad y una instalación rápida y limpia. Nos asesoraron en todo momento para encontrar la mejor solución.', stars: 5 },
  { id: 5, name: 'Estudio Q.', project: 'Mobiliario Corporativo', text: 'Entendieron perfectamente la estética que buscábamos para nuestra nueva oficina. Trabajos en hierro de nivel premium, muy recomendables.', stars: 5 },
]

const SectionHeading = ({ subtitle, title, centered = true }: SectionHeadingProps) => (
  <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} gsap-fade-up`}>
    <span className="text-[#FF6B00] font-inter font-semibold tracking-wider uppercase text-sm md:text-base block mb-3 drop-shadow-md">
      {subtitle}
    </span>
    <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
      {title}
    </h2>
  </div>
)

const ButtonPrimary = ({ children, className = '', onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`bg-[#FF6B00] hover:bg-[#e56000] text-white font-inter font-semibold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] ${className}`}
  >
    {children}
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>
)

const ButtonSecondary = ({ children, className = '', onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`border border-white/20 hover:border-white text-white font-inter font-semibold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm ${className}`}
  >
    {children}
  </button>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src="/logopara-lacabeceraa.png" alt="Bush and Craft" className="h-12 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 font-inter text-sm font-medium text-gray-300">
          <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
          <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
          <a href="#sobre-nosotros" className="hover:text-white transition-colors">Nosotros</a>
          <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
          <a
            href={WHATSAPP_URL.replace('%20sobre', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF6B00] hover:text-[#e56000] transition-colors flex items-center gap-2 bg-[#FF6B00]/10 px-4 py-2 rounded-full border border-[#FF6B00]/20"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 py-4 px-6 flex flex-col gap-4">
          <a href="#servicios" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white py-2">Servicios</a>
          <a href="#proyectos" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white py-2">Proyectos</a>
          <a href="#sobre-nosotros" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white py-2">Nosotros</a>
          <ButtonPrimary className="w-full mt-2">Cotizar Ahora</ButtonPrimary>
        </div>
      )}
    </nav>
  )
}

const Hero = () => {
  const cinematicRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const video = cinematicRef.current
    if (!video) return

    const ctx = gsap.context(() => {
      gsap.fromTo(video,
        { scale: 1.4, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 2.2, ease: 'power3.out' }
      )

      gsap.to(video, {
        scale: 1.08,
        duration: 12,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          ref={cinematicRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover will-change-transform"
        >
          <source src="/hero/videohero1.mp4" type="video/mp4" />
          <source src="/hero/videohero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-4xl hero-content">
          <span className="inline-block py-1 px-3 border border-[#FF6B00]/30 bg-black/40 backdrop-blur-sm text-[#FF6B00] font-inter text-sm font-medium tracking-wide rounded-full mb-6 gsap-hero-item">
            BUSH AND CRAFT — HERRERÍA PREMIUM
          </span>
          <h1 className="font-bebas text-6xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] mb-8 tracking-wide gsap-hero-item drop-shadow-2xl">
            FORJAMOS EL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#ff984d]">FUTURO.</span>
          </h1>
          <p className="font-inter text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed gsap-hero-item">
            Diseño industrial moderno, fabricación a medida y calidad incomparable para proyectos exigentes. Más de 15 años transformando ideas en realidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 gsap-hero-item">
            <a href={WHATSAPP_URL.replace('%20sobre', '')} target="_blank" rel="noopener noreferrer">
              <ButtonPrimary>Solicitar Presupuesto</ButtonPrimary>
            </a>
            <a href="#galeria" className="inline-flex">
              <ButtonSecondary>Ver Trabajos</ButtonSecondary>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const InfiniteMarquee = () => {
  const texts = ["CALIDAD PREMIUM", "DISEÑO INDUSTRIAL", "INSTALACIÓN PROFESIONAL", "ESTRUCTURAS METÁLICAS", "PRECISIÓN MILIMÉTRICA", "ATENCIÓN PERSONALIZADA"]
  return (
    <div className="w-full bg-white/5 backdrop-blur-md border-y border-white/10 py-4 overflow-hidden relative z-20 shadow-xl">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center">
            {texts.map((text, j) => (
              <Fragment key={j}>
                <span className="text-white/80 font-bebas text-2xl tracking-widest mx-8 hover:text-white transition-colors cursor-default">{text}</span>
                <span className="text-[#FF6B00]">•</span>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 md:py-32 relative bg-transparent z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeading subtitle="Nuestra Especialidad" title="SOLUCIONES METÁLICAS INTEGRALES" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#FF6B00]/50 hover:bg-white/[0.08] transition-all duration-500 rounded-sm hover:-translate-y-2 gsap-stagger-item shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-3xl -translate-y-full translate-x-full group-hover:translate-y-0 group-hover:-translate-x-0 transition-transform duration-700 pointer-events-none" />

              <div className="w-14 h-14 bg-white/5 border border-white/10 group-hover:border-[#FF6B00]/50 group-hover:bg-[#FF6B00] transition-colors duration-500 flex items-center justify-center rounded-sm mb-6 relative z-10">
                <service.icon className="w-7 h-7 text-[#FF6B00] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-bebas text-2xl text-white mb-3 tracking-wide relative z-10">{service.title}</h3>
              <p className="font-inter text-gray-400 leading-relaxed text-sm relative z-10 mb-4">
                {service.desc}
              </p>
              <a
                href={`${WHATSAPP_URL}%20${encodeURIComponent(service.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 text-xs font-inter font-semibold text-[#FF6B00] border border-[#FF6B00]/30 hover:bg-[#FF6B00] hover:text-white px-3 py-1.5 rounded-sm transition-all duration-300 w-fit"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BestWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const images = [
    "/proyectos/rejas-para-ventanas.jpg",
    "/proyectos/mesas-ratonas.jpg",
    "/proyectos/placaraes-y-vestdiroes.webp",
  ]
  const titles = ["Rejas para Ventanas", "Mesas Ratonas", "Placares y Vestidores"]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stacked-card') as HTMLElement[]

      cards.forEach((card, index) => {
        if (index !== 0) {
          gsap.set(card, { yPercent: 100 })
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      })

      cards.forEach((card, index) => {
        if (index === 0) return
        tl.to(card, { yPercent: 0, ease: 'none' })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proyectos" ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      <div className="absolute top-12 md:top-24 left-0 w-full text-center z-50 pointer-events-none px-6">
        <span className="text-[#FF6B00] font-inter font-bold tracking-[0.2em] uppercase text-sm md:text-base block mb-4 drop-shadow-md bg-black/30 inline-block px-4 py-1 rounded-full backdrop-blur-md">
          Selección Exclusiva
        </span>
        <h2 className="font-bebas text-6xl md:text-8xl lg:text-[7rem] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none">
          LOS MEJORES TRABAJOS
        </h2>
      </div>

      {images.map((img, i) => (
        <div key={i} className="stacked-card absolute inset-0 w-full h-full will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <img src={img} alt={titles[i]} className="w-full h-full object-cover grayscale-[20%] brightness-75" loading={i === 0 ? 'eager' : 'lazy'} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

          <div className="absolute bottom-20 left-6 md:left-20 max-w-3xl">
            <span className="font-bebas text-8xl md:text-[10rem] text-white/10 absolute -top-16 -left-4 font-bold select-none z-0">
              0{i + 1}
            </span>
            <h3 className="font-bebas text-5xl md:text-7xl text-white mb-4 drop-shadow-lg relative z-10">{titles[i]}</h3>
            <div className="w-24 h-1.5 bg-[#FF6B00] relative z-10" />
          </div>
        </div>
      ))}
    </section>
  )
}

const InfiniteImageGallery = () => {
  const images = [
    "/galeria/portones-hierro.jpeg",
    "/galeria/portonesdehierro-2.jpeg",
    "/galeria/escaleras-de-madera.webp",
    "/galeria/barandas-y-pasamanos.jpeg",
    "/galeria/marquesina-de-hierro.jpeg",
    "/galeria/muebles-cocina.jpg",
    "/galeria/parrilas-y-fogoneros.webp",
  ]
  const duplicated = [...images, ...images, ...images]

  return (
    <section className="py-12 md:py-16 bg-[#0A0A0A] overflow-hidden relative z-10 border-b border-white/5">
      <div className="w-full relative flex overflow-hidden">
        <div className="flex gap-4 md:gap-6 animate-marquee w-max" style={{ animationDuration: '45s' }}>
          {duplicated.map((img, i) => (
            <div key={i} className="w-[260px] md:w-[400px] aspect-[4/3] shrink-0 overflow-hidden rounded-sm group shadow-lg bg-[#111]">
              <img
                src={img}
                alt={`Galería de trabajos ${i}`}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AboutUsSection = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.progress-fill',
        { width: '0%' },
        {
          width: (_i, el) => (el as HTMLElement).getAttribute('data-width') || '0%',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#sobre-nosotros', start: 'top 75%' },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre-nosotros" className="py-24 md:py-32 relative z-10 bg-transparent border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="gsap-fade-up">
          <SectionHeading subtitle="Conócenos" title="SOBRE NOSOTROS" centered={false} />

          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] mb-20 mt-10">
            <div className="absolute top-0 left-0 w-[85%] md:w-[75%] h-[85%] border-[3px] border-[#FF6B00] rounded-sm overflow-hidden z-10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop"
                alt="Taller de Herrería Principal"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[55%] md:w-[40%] h-[65%] md:h-[75%] border-[3px] border-[#FF6B00] rounded-sm overflow-hidden z-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
                alt="Detalle de Soldadura"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="flex flex-col justify-center">
              <p className="font-inter text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-6">
                Somos un equipo apasionado con más de 15 años de trayectoria forjando soluciones integrales en hierro y acero. Nuestro compromiso es fusionar la precisión milimétrica industrial con el diseño arquitectónico de vanguardia.
              </p>
              <p className="font-inter text-gray-400 text-base font-light leading-relaxed">
                Cada estructura que fabricamos está pensada para perdurar en el tiempo, cumpliendo con los más altos estándares de calidad y seguridad del mercado.
              </p>
            </div>

            <div className="space-y-8 flex flex-col justify-center">
              <div>
                <div className="flex justify-between font-inter text-sm font-semibold mb-3 text-white tracking-wide">
                  <span>Calidad de Fabricación & Diseño</span>
                  <span className="text-[#FF6B00]">100%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-[#FF6B00]/50 to-[#FF6B00]" data-width="100%" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-inter text-sm font-semibold mb-3 text-white tracking-wide">
                  <span>Proyectos Completados con Éxito</span>
                  <span className="text-[#FF6B00]">95%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-[#FF6B00]/50 to-[#FF6B00]" data-width="95%" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-16 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-sm p-4 md:p-6 shadow-2xl flex flex-row items-center justify-between sm:justify-around group">
            {([
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Mail, label: 'Email' },
            ] as const).map((social, i) => (
              <a
                key={i}
                href="#"
                className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                aria-label={social.label}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-black/50 border border-white/10 rounded-full flex items-center justify-center transition-colors">
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 text-[#FF6B00]" />
                </div>
                <span className="hidden sm:block font-inter text-sm tracking-wide font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filteredItems = activeFilter === 'Todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter)

  return (
    <section id="galeria" className="py-24 bg-transparent border-t border-white/5 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 gsap-fade-up">
          <div className="text-left">
            <span className="text-[#FF6B00] font-inter font-semibold tracking-wider uppercase text-sm block mb-3">
              Portafolio Premium
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl text-white leading-none">
              GALERÍA VISUAL
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-inter text-sm px-4 py-2 rounded-sm transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                    : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-[#111]/50 backdrop-blur-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative aspect-[4/5] overflow-hidden bg-[#111] rounded-sm cursor-pointer gsap-gallery-item">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#FF6B00] font-inter text-xs font-bold uppercase tracking-wider mb-2 block">
                  {item.category}
                </span>
                <h3 className="font-bebas text-3xl text-white mb-2">{item.title}</h3>
                <div className="w-0 h-0.5 bg-[#FF6B00] group-hover:w-12 transition-all duration-500 ease-out" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ProcessTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.timeline-progress-line', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 50%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      gsap.utils.toArray('.timeline-step').forEach((step) => {
        const el = step as HTMLElement
        const dot = el.querySelector('.timeline-dot') as HTMLElement | null
        const icon = el.querySelector('.timeline-icon') as HTMLElement | null

        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          },
        )

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        })

        if (dot) {
          tl.to(dot, {
            borderColor: '#FF6B00',
            backgroundColor: '#1a0b00',
            boxShadow: '0 0 20px rgba(255,107,0,0.25)',
            duration: 0.4,
          }, 0)
        }
        if (icon) {
          tl.to(icon, {
            color: '#FF6B00',
            duration: 0.4,
          }, 0)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" className="py-24 md:py-32 bg-transparent relative z-10 border-t border-white/5" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeading subtitle="Metodología" title="NUESTRO PROCESO" centered />

        <div className="timeline-container relative mt-16 md:mt-24 max-w-3xl mx-auto">
          <div className="absolute top-0 bottom-0 left-[23px] md:left-[39px] w-[2px] bg-white/10 rounded-full" />

          <div className="timeline-progress-line absolute top-0 bottom-0 left-[23px] md:left-[39px] w-[2px] bg-[#FF6B00] origin-top scale-y-0 z-0 rounded-full" />

          <div className="flex flex-col relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="timeline-step relative pl-[64px] md:pl-[100px] pb-16 md:pb-24 last:pb-0 group">
                <div className="timeline-dot absolute left-0 md:left-[16px] top-0 w-12 h-12 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center transition-all duration-500 group-hover:border-white/30">
                  <step.icon className="timeline-icon w-5 h-5 text-gray-600 transition-colors duration-500 group-hover:text-white" />
                </div>

                <div className="pt-1">
                  <span className="font-bebas text-lg md:text-xl text-[#FF6B00] tracking-wider mb-2 block">PASO 0{i + 1}</span>
                  <h3 className="font-bebas text-3xl md:text-5xl text-white tracking-wide mb-4">
                    {step.title}
                  </h3>
                  <p className="font-inter text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialsCarousel = () => {
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="py-24 md:py-32 bg-transparent border-t border-white/5 relative overflow-hidden z-10">
      <div className="container mx-auto px-6 max-w-7xl mb-12 md:mb-20">
        <SectionHeading subtitle="Testimonios" title="CLIENTES SATISFECHOS" centered />
      </div>

      <div
        className="w-full relative flex overflow-hidden"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex gap-6 animate-marquee w-max py-4">
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[450px] shrink-0 bg-[#111]/80 backdrop-blur-sm border border-white/10 p-8 rounded-sm hover:border-[#FF6B00]/40 transition-all duration-300 shadow-lg hover:-translate-y-1"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                ))}
              </div>
              <p className="font-inter text-gray-300 text-base md:text-lg italic mb-8 leading-relaxed font-light">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-white/10 text-white font-bebas text-2xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-inter font-semibold text-white">{testimonial.name}</h4>
                  <span className="font-inter text-xs text-[#FF6B00] uppercase tracking-wider block mt-1">
                    {testimonial.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CTASection = () => (
  <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden z-10 border-t border-white/5">
    <div className="absolute inset-0 z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-50"
      >
        <source src="/cta/videoctl.mp4" type="video/mp4" />
        <source src="/cta/videoctl2.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-[#0A0A0A]/60" />
    </div>

    <div className="container mx-auto px-6 max-w-6xl text-center relative z-10 gsap-fade-up">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6 drop-shadow-2xl">
          ¿LISTO PARA INICIAR TU PROYECTO?
        </h2>
        <p className="font-inter text-xl text-gray-300 font-light mb-10 drop-shadow-lg">
          Contáctanos hoy para recibir asesoramiento personalizado y un presupuesto sin cargo.
        </p>
        <a
          href={WHATSAPP_URL.replace('%20sobre', '')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF6B00] hover:bg-[#e56000] text-white font-inter font-semibold py-4 px-10 rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <path d="M20 2H4C2.9 2 2 2.9 2 4v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />
          </svg>
          Consultar Ahora
        </a>
      </div>
    </div>
  </section>
)

const LocationSection = () => (
  <section className="py-24 bg-transparent border-t border-white/5 relative z-10">
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeading subtitle="Encuéntranos" title="NUESTRA UBICACIÓN" centered={false} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12">
        <div className="lg:col-span-8 w-full h-[400px] md:h-[500px] bg-[#111] rounded-sm border border-white/10 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(10,10,10,0.8)] z-10 mix-blend-overlay" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367005218!2d-58.50314414006151!3d-34.61566245228189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac1a26d2551%3A0x6b132207b539c3e4!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[80%] contrast-125 opacity-80"
            title="Ubicación de METALLUR en Buenos Aires"
          />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-sm shadow-xl flex-grow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-bebas text-2xl text-white tracking-wide">Dirección Central</h3>
                <p className="font-inter text-gray-400 text-sm">Av. Industrial 4567, CABA, Argentina</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 my-8" />

            <h3 className="font-bebas text-3xl text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#FF6B00]" />
              Horarios de Atención
            </h3>

            <ul className="space-y-4 font-inter text-sm md:text-base text-gray-300">
              <li className="flex justify-between items-center bg-white/5 p-3 rounded-sm border border-white/5">
                <span className="font-medium">Lunes a Viernes</span>
                <span className="text-[#FF6B00] font-semibold tracking-wider">08:00 - 18:00</span>
              </li>
              <li className="flex justify-between items-center bg-white/5 p-3 rounded-sm border border-white/5">
                <span className="font-medium">Sábados</span>
                <span className="text-[#FF6B00] font-semibold tracking-wider">09:00 - 13:00</span>
              </li>
              <li className="flex justify-between items-center bg-black/20 p-3 rounded-sm border border-white/5">
                <span className="text-gray-500">Domingos y Feriados</span>
                <span className="text-gray-500 font-semibold tracking-wider">Cerrado</span>
              </li>
            </ul>
          </div>

          <button className="w-full bg-[#FF6B00] hover:bg-[#e56000] text-white font-inter font-semibold py-4 px-8 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)]">
            <Navigation className="w-5 h-5 group-hover:animate-bounce" />
            Cómo Llegar
          </button>
        </div>
      </div>
    </div>
  </section>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" />
  </svg>
)

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL.replace('%20sobre', '')}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#FF6B00] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(255,107,0,0.4)] hover:bg-[#e56000] hover:shadow-[0_4px_25px_rgba(255,107,0,0.6)] hover:scale-110 transition-all duration-300"
    aria-label="WhatsApp"
  >
    <WhatsAppIcon />
  </a>
)

const Footer = () => (
  <footer id="contacto" className="bg-[#0A0A0A] pt-20 pb-10 border-t border-white/10 relative z-10">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logopara-lacabeceraa.png" alt="Bush and Craft" className="h-10 w-auto" />
          </div>
          <p className="font-inter text-gray-400 text-sm leading-relaxed mb-6">
            Líderes en herrería industrial y residencial premium. Diseñamos, fabricamos e instalamos soluciones metálicas de alta resistencia.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FF6B00] hover:text-white transition-all hover:scale-110" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FF6B00] hover:text-white transition-all hover:scale-110" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FF6B00] hover:text-white transition-all hover:scale-110" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bebas text-2xl text-white mb-6">Contacto</h4>
          <ul className="space-y-4 font-inter text-sm text-gray-400">
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#FF6B00]" /> +54 11 1234-5678</li>
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#FF6B00]" /> info@metallur.com</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-1" /> Av. Industrial 4567,<br />Parque Industrial, BA.</li>
            <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#FF6B00]" /> Lun a Vie: 08:00 - 18:00</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bebas text-2xl text-white mb-6">Servicios</h4>
          <ul className="space-y-3 font-inter text-sm text-gray-400">
            <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Portones Automáticos</a></li>
            <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Estructuras Metálicas</a></li>
            <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Escaleras de Diseño</a></li>
            <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Rejas y Cerramientos</a></li>
            <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Muebles Industriales</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bebas text-2xl text-white mb-6">Ubicación</h4>
          <div className="w-full h-32 bg-[#111] rounded-sm border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[#222] animate-pulse flex items-center justify-center">
              <MapPin className="text-gray-500 w-8 h-8 opacity-50 group-hover:text-[#FF6B00] transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-inter text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Bush and Craft. Todos los derechos reservados.
        </p>
        <div className="flex gap-4 font-inter text-xs text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos</a>
        </div>
      </div>
    </div>
  </footer>
)

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [progress, setProgress] = useState(0)
  const introRef = useRef<HTMLImageElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const introPlayed = useRef(false)

  useLayoutEffect(() => {
    if (introPlayed.current) return
    introPlayed.current = true

    const intro = introRef.current
    const bar = barRef.current
    if (!intro || !bar) return

    const tl = gsap.timeline({
      onUpdate: () => {
        setProgress(Math.round(tl.progress() * 100))
      },
      onComplete: () => {
        setProgress(100)
        setTimeout(() => setShowIntro(false), 200)
      },
    })

    tl.fromTo(intro,
      { scale: 2.2 },
      { scale: 1, duration: 3, ease: 'power2.out' },
    )
      .to(intro, { opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.3')

    tl.fromTo(bar,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.8, ease: 'power1.inOut' },
      0,
    )
  }, [])

  useLayoutEffect(() => {
    if (showIntro) return

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content .gsap-hero-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 },
      )

      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((elem) => {
        gsap.fromTo(elem,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: elem as HTMLElement, start: 'top 85%' },
          },
        )
      })

      ScrollTrigger.batch('.gsap-stagger-item', {
        onEnter: batch => gsap.fromTo(batch,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        ),
        start: 'top 85%',
      })
    }, appRef)

    return () => ctx.revert()
  }, [showIntro])

  return (
    <>
      {showIntro && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
          <img
            ref={introRef}
            src="/cinematicreveval-logo-y-fondo-full.width.png"
            alt="Bush and Craft"
            className="w-full h-full object-cover object-center will-change-transform md:object-[center_30%]"
          />

          <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 w-[200px] md:w-[300px]">
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-[#FF6B00] rounded-full origin-left will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
            <span className="block text-center font-inter text-xs text-white/50 mt-2 tracking-widest">
              {progress}%
            </span>
          </div>
        </div>
      )}

      <div ref={appRef} className={`min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF6B00] selection:text-white relative ${showIntro ? 'invisible' : ''}`}>
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#FF6B00]/10 rounded-full blur-[150px] opacity-70" />
          <div className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-[#FF6B00]/5 rounded-full blur-[180px] opacity-50" />
        </div>

        <Navbar />
        <main className="relative z-10">
          <Hero />
          <InfiniteMarquee />
          <ServicesSection />
          <BestWorksSection />
          <InfiniteImageGallery />
          <AboutUsSection />
          <GallerySection />
          <ProcessTimeline />
          <TestimonialsCarousel />
          <CTASection />
          <LocationSection />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  )
}
