"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Sun,
  Moon,
  Linkedin,
  Github,
  Send,
  ExternalLink,
  Menu,
  X,
  Download,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Terminal,
  Cpu,
  Zap,
} from "lucide-react"

// --- Embedded CSS Styles ---
const GlobalStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --bg-dark: #0a0a0f;
            --bg-light: #f8fafc;
            --text-dark-primary: #f1f5f9;
            --text-dark-secondary: #94a3b8;
            --text-light-primary: #0f172a;
            --text-light-secondary: #475569;
            --accent-cyan: #00d9ff;
            --accent-purple: #8b5cf6;
            --accent-blue: #3b82f6;
            --card-bg-dark: rgba(15, 23, 42, 0.6);
            --card-border-dark: rgba(0, 217, 255, 0.2);
            --card-bg-light: rgba(255, 255, 255, 0.9);
            --card-border-light: rgba(226, 232, 240, 1);
            --font-mono: 'JetBrains Mono', monospace;
            --font-sans: 'Inter', sans-serif;
            --gradient-primary: linear-gradient(135deg, #00d9ff 0%, #8b5cf6 100%);
            --gradient-secondary: linear-gradient(135deg, #3b82f6 0%, #00d9ff 100%);
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: var(--font-sans);
            transition: background-color 0.5s ease;
            overflow-x: hidden;
            cursor: none;
            background: var(--bg-main);
        }
        
        .dark {
            --bg-main: var(--bg-dark);
            --text-primary: var(--text-dark-primary);
            --text-secondary: var(--text-dark-secondary);
            --accent-primary: var(--accent-cyan);
            --card-bg: var(--card-bg-dark);
            --card-border: var(--card-border-dark);
        }

        .light {
            --bg-main: var(--bg-light);
            --text-primary: var(--text-light-primary);
            --text-secondary: var(--text-light-secondary);
            --accent-primary: var(--accent-blue);
            --card-bg: var(--card-bg-light);
            --card-border: var(--card-border-light);
        }

        .app-container {
            background: var(--bg-main);
            color: var(--text-primary);
            position: relative;
        }

        /* Enhanced background with animated gradient mesh */
        .app-container::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
            z-index: -1;
            animation: gradientShift 20s ease-in-out infinite;
        }

        @keyframes gradientShift {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        .font-mono { font-family: var(--font-mono); }
        .container { width: 100%; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
        @media (min-width: 640px) { .container { max-width: 640px; padding-left: 1.5rem; padding-right: 1.5rem; } }
        @media (min-width: 768px) { .container { max-width: 768px; } }
        @media (min-width: 1024px) { .container { max-width: 1024px; padding-left: 2rem; padding-right: 2rem; } }
        @media (min-width: 1280px) { .container { max-width: 1280px; } }

        .header {
            background: rgba(10, 10, 15, 0.8);
            backdrop-filter: blur(20px);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 40;
            border-bottom: 1px solid var(--card-border);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        .light .header {
            background: rgba(248, 250, 252, 0.9);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .card {
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--card-border);
            border-radius: 1rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        /* Enhanced card hover effects with glow */
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-primary);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }
        
        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 217, 255, 0.2);
        }
        
        .card:hover::before {
            opacity: 0.05;
        }
        
        .dark .card:hover {
            box-shadow: 0 20px 40px rgba(0, 217, 255, 0.3);
        }

        /* Enhanced floating particles animation */
        .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--accent-primary);
            border-radius: 50%;
            animation: float 20s infinite linear;
            opacity: 0.6;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `}</style>
)

const FloatingParticles = () => {
  const particlesRef = useRef([])

  useEffect(() => {
    const createParticle = () => {
      const particle = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 20,
        animationDuration: 15 + Math.random() * 10,
      }
      return particle
    }

    const particles = Array.from({ length: 50 }, createParticle)
    particlesRef.current = particles
  }, [])

  return (
    <div className="floating-particles">
      {particlesRef.current.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
          }}
        />
      ))}
    </div>
  )
}

// --- Interactive Components ---

const CustomCursor = ({ darkMode }) => {
  const cursorDotRef = useRef(null)
  const cursorOutlineRef = useRef(null)

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`
        cursorDotRef.current.style.top = `${clientY}px`
        cursorOutlineRef.current.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          { duration: 500, fill: "forwards" },
        )
      }
    }
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, [data-interactive]")) {
        cursorOutlineRef.current.style.transform = "translate(-50%, -50%) scale(2)"
        cursorDotRef.current.style.background = darkMode ? "var(--accent-purple)" : "var(--accent-blue)"
      }
    }
    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, [data-interactive]")) {
        cursorOutlineRef.current.style.transform = "translate(-50%, -50%) scale(1)"
        cursorDotRef.current.style.background = darkMode ? "var(--accent-cyan)" : "var(--text-light-primary)"
      }
    }
    window.addEventListener("mousemove", moveCursor)
    document.body.addEventListener("mouseover", handleMouseOver)
    document.body.addEventListener("mouseout", handleMouseOut)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.body.removeEventListener("mouseover", handleMouseOver)
      document.body.removeEventListener("mouseout", handleMouseOut)
    }
  }, [darkMode])

  const dotStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "9999px",
    zIndex: 100,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    background: darkMode ? "var(--accent-cyan)" : "var(--text-light-primary)",
    transition: "background 0.3s ease",
  }
  const outlineStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "2.5rem",
    height: "2.5rem",
    border: "2px solid",
    borderColor: darkMode ? "var(--accent-cyan)" : "var(--text-light-primary)",
    borderRadius: "9999px",
    zIndex: 100,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s ease",
  }
  return (
    <>
      <div ref={cursorDotRef} style={dotStyle}></div>
      <div ref={cursorOutlineRef} style={outlineStyle}></div>
    </>
  )
}

const MatrixRain = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = document.body.scrollHeight
    }
    resizeCanvas()
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]()アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 15, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create gradient for the falling characters
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#00d9ff")
      gradient.addColorStop(0.5, "#8b5cf6")
      gradient.addColorStop(1, "#3b82f6")

      ctx.fillStyle = gradient
      ctx.font = `${fontSize}px JetBrains Mono, monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    const animate = () => {
      draw()
      animationFrameId = window.requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.3 }}
    ></canvas>
  )
}

// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(savedTheme ? savedTheme === "dark" : prefersDark)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Add a subtle glow effect to the target section
      element.style.transition = "box-shadow 0.5s ease"
      element.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.3)"
      setTimeout(() => {
        element.style.boxShadow = "none"
      }, 2000)
    }
  }

  const portfolioData = {
    name: "Sourav Pandey",
    title: "Electronics & Communication Engineer | Full-Stack Developer",
    email: "souravpandey9031@gmail.com",
    phone: "(+91)9631961778",
    cvLink: "https://drive.google.com/file/d/1ZfLQOyY6LOQ231YqbOMcjyugmFE0_MkT/view?usp=sharing",
    socials: {
      linkedin: "https://www.linkedin.com/in/sourav-p07/",
      github: "https://github.com/Souravp07",
    },
    about:
      "Aspiring Electronics and Communication Engineer with strong foundations in computer science, web development (MERN), and VLSI design. Eager to leverage academic excellence, hands-on project experience, and research publications to contribute to innovative technological solutions. Seeking opportunities that blend hardware and software to solve real-world problems while continuously enhancing my skills.",
    education: [
      {
        institution: "Institute of Engineering and Management Kolkata",
        degree: "B.Tech. (Electronics and Communication Engineering)",
        duration: "Expected Graduation, July 2026",
        location: "Kolkata, India",
        details: "CGPA: 9.18 (till 6th Sem)",
      },
      {
        institution: "Government Polytechnic Dhanbad (Jharkhand University of Technology)",
        degree: "Diploma (Computer Science Engineering)",
        duration: "Dec 2020 - May 2023",
        location: "Dhanbad, India",
        details: "Percentage: 80.25%",
      },
      {
        institution: "S.G.D Modern School Chirkunda",
        degree: "Secondary Examination (CBSE Board)",
        duration: "2019-2020",
        location: "Chirkunda, India",
        details: "Percentage: 89%",
      },
    ],
    skills: [
      { name: "Java", icon: "☕" },
      { name: "C++", icon: "⚡" },
      { name: "Python", icon: "🐍" },
      { name: "React & Node.js", icon: "⚛️" },
      { name: "HTML/CSS/JavaScript", icon: "🌐" },
      { name: "MongoDB & MySQL", icon: "🗄️" },
      { name: "VLSI Design", icon: "🔬" },
      { name: "Git & Bootstrap", icon: "🛠️" },
    ],
    experience: [
      {
        role: "Software Developer Intern",
        company: "IEMA Research and Development Private Limited",
        location: "Kolkata, India",
        duration: "July 2025 - Present",
        description:
          "Currently developing and maintaining full-stack web applications using MongoDB, Express.js, React.js, and Node.js, with a focus on responsive design and efficient REST API integration.",
      },
      {
        role: "Microelectronics and VLSI Training",
        company: "Jadavpur University",
        location: "Jadavpur, India",
        duration: "Jan 2025 - Feb 2025",
        description: "Gained hands-on experience in VLSI design, semiconductor fabrication, and FPGA programming.",
      },
      {
        role: "Research Intern",
        company: "IEM IEDC -ECE",
        location: "Kolkata, India",
        duration: "May 2024 - July 2024",
        description:
          "Conducted research & Designed and implemented Quantum Cost Optimized Adder using Reversible Logic Gates.",
      },
      {
        role: "SWE Apprenticeship",
        company: "McNally Sayaji Engineering Ltd.",
        location: "Dhanbad, India",
        duration: "Aug 2022 - Sept 2022",
        description: "Acquired knowledge in Oracle Forms/Reports Developer, SQL and Oracle EBS Flow.",
      },
    ],
    projects: [
      {
        title: "GLOBETIA",
        description: "Developed a platform for crowd-sourcing global campground and trekking data from 190+ countries.",
        tags: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js"],
        liveUrl: "https://globetia.onrender.com",
        githubUrl: "#",
      },
      {
        title: "Mental Wellness Portal",
        description:
          "Developing a portal to support mental health and wellness by providing users with various self-assessment tools.",
        tags: ["React", "Node.js", "MongoDB", "Mental Health"],
        liveUrl: "#",
        githubUrl: "#",
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website showcasing projects, skills, and professional experience.",
        tags: ["React", "CSS", "JavaScript", "Responsive Design"],
        liveUrl: "#",
        githubUrl: "#",
      },
    ],
    publications: [
      {
        title: "Optimizing Drug Management: AI-Driven Pharmacy Analytics & Electronic Health Records",
        journal: "IEEE XPLORE",
        link: "https://ieeexplore.ieee.org/document/10959359",
      },
      {
        title: "Design and Implementation of an Efficient Quantum Cost Optimized Adder Using Reversible Logic Gates",
        journal: "IEEE XPLORE",
        link: "https://ieeexplore.ieee.org/document/10959433",
      },
    ],
    certifications: [
      {
        title: "Certified Course In Object Oriented Programming Using C++",
        issuer: "NIIT, Kumardubhi, Dhanbad",
        date: "2020-2021",
      },
      { title: "Smart India Hackathon - Participation Certificate", issuer: "Government of India", date: "2024" },
    ],
  }

  return (
    <div className={darkMode ? "dark" : "light"}>
      <GlobalStyles />
      <div className="app-container">
        <CustomCursor darkMode={darkMode} />
        {darkMode && <MatrixRain />}
        <FloatingParticles />
        <Header
          toggleMenu={toggleMenu}
          scrollToSection={scrollToSection}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <AnimatePresence>
          {isMenuOpen && <MobileMenu navLinks={navLinks} scrollToSection={scrollToSection} toggleMenu={toggleMenu} />}
        </AnimatePresence>
        <main style={{ paddingTop: "5rem", position: "relative", zIndex: 2 }}>
          <HeroSection data={portfolioData} scrollToSection={scrollToSection} />
          <AboutSection data={portfolioData} />
          <EducationSection data={portfolioData.education} />
          <ExperienceSection data={portfolioData.experience} />
          <ProjectsSection data={portfolioData.projects} />
          <PublicationsSection data={portfolioData.publications} />
          <CertificationsSection data={portfolioData.certifications} />
          <ContactSection email={portfolioData.email} />
        </main>
        <Footer data={portfolioData} />
      </div>
    </div>
  )
}

const navLinks = [
  { id: "hero", title: "Home" },
  { id: "about", title: "About" },
  { id: "education", title: "Education" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "publications", title: "Research" },
  { id: "certifications", title: "Certifications" },
  { id: "contact", title: "Contact" },
]

const Header = ({ toggleMenu, scrollToSection, toggleDarkMode, darkMode }) => {
  return (
    <header className="header">
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem" }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            background: "var(--gradient-primary)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          onClick={() => scrollToSection("hero")}
          data-interactive
        >
          Sourav Pandey
        </div>
        <nav style={{ display: "none" }} className="lg-flex">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="nav-link" data-interactive>
              {link.title}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={toggleDarkMode} className="theme-toggle" data-interactive>
            {darkMode ? (
              <Sun size={22} style={{ color: "var(--accent-cyan)" }} />
            ) : (
              <Moon size={22} style={{ color: "var(--text-primary)" }} />
            )}
          </button>
          <div className="lg-hidden">
            <button onClick={toggleMenu} style={{ padding: "0.5rem" }} data-interactive>
              <Menu size={26} style={{ color: "var(--accent-primary)" }} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
                /* Enhanced navbar styles with better responsive design */
                .lg-flex { display: none; }
                @media (min-width: 1024px) { 
                  .lg-flex { 
                    display: flex; 
                    align-items: center; 
                    gap: 2rem; 
                  } 
                }
                .lg-hidden { display: block; }
                @media (min-width: 1024px) { .lg-hidden { display: none; } }
                .nav-link { 
                    font-family: var(--font-sans); 
                    font-size: 0.875rem; 
                    font-weight: 500;
                    letter-spacing: 0.025em; 
                    color: var(--text-secondary); 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: var(--gradient-primary);
                    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 1px;
                }
                .nav-link:hover { 
                    color: var(--accent-primary); 
                    background: rgba(0, 255, 255, 0.1);
                    transform: translateY(-2px);
                }
                .nav-link:hover::after {
                    width: 80%;
                }
                .theme-toggle { 
                    padding: 0.75rem; 
                    border-radius: 50%; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(0, 255, 255, 0.2);
                }
                .theme-toggle:hover { 
                    background: rgba(0, 255, 255, 0.2);
                    transform: scale(1.1) rotate(15deg);
                    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
                }
            `}</style>
    </header>
  )
}

const MobileMenu = ({ navLinks, scrollToSection, toggleMenu }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.9)",
          zIndex: 50,
          backdropFilter: "blur(10px)",
        }}
        onClick={toggleMenu}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          maxWidth: "20rem",
          backgroundColor: "var(--bg-main)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid var(--card-border)",
          boxShadow: "-10px 0 50px rgba(0, 255, 255, 0.1)",
        }}
      >
        <button
          onClick={toggleMenu}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            padding: "0.5rem",
            borderRadius: "50%",
            background: "rgba(255, 0, 0, 0.1)",
            border: "1px solid rgba(255, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          data-interactive
        >
          <X size={32} style={{ color: "var(--accent-primary)" }} />
        </button>
        <nav style={{ display: "flex", flexDirection: "column", gap: "2rem", textAlign: "center" }}>
          {navLinks.map((link, index) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => {
                scrollToSection(link.id)
                toggleMenu()
              }}
              style={{
                fontSize: "1.5rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                color: "var(--text-primary)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                background: "rgba(0, 255, 255, 0.05)",
                border: "1px solid rgba(0, 255, 255, 0.2)",
              }}
              className="mobile-nav-link"
              data-interactive
            >
              {link.title}
            </motion.button>
          ))}
        </nav>
      </motion.div>
      <style>{`
        .mobile-nav-link:hover { 
          color: var(--accent-primary); 
          background: rgba(0, 255, 255, 0.15);
          transform: translateX(-5px);
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.2);
        }
      `}</style>
    </>
  )
}

const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      style={{ padding: "5rem 0" }}
    >
      {children}
    </motion.section>
  )
}

const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "4rem",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em",
      background: "var(--gradient-primary)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
  >
    {children}
  </h2>
)

const HeroSection = ({ data, scrollToSection }) => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const toRotate = ["Full-Stack Developer", "Tech Innovator", "Problem Solver"]
  const period = 2000

  useEffect(() => {
    const ticker = setInterval(() => tick(), typingSpeed)
    return () => clearInterval(ticker)
  }, [text, typingSpeed])

  const tick = () => {
    const i = loopNum % toRotate.length
    const fullText = toRotate[i]
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)
    setText(updatedText)
    if (isDeleting) setTypingSpeed((prev) => prev / 2)
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true)
      setTypingSpeed(period)
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTypingSpeed(150)
    }
  }

  return (
    <section
      id="hero"
      style={{ minHeight: "calc(100vh - 5rem)", display: "flex", alignItems: "center" }}
      className="px-4 sm:px-6 lg:px-8"
    >
      <div className="container" style={{ textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Tech icons floating around */}
          <div style={{ position: "absolute", top: "20%", left: "10%", zIndex: 1 }}>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Code size={32} style={{ color: "var(--accent-cyan)", opacity: 0.6 }} />
            </motion.div>
          </div>
          <div style={{ position: "absolute", top: "30%", right: "15%", zIndex: 1 }}>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            >
              <Terminal size={28} style={{ color: "var(--accent-purple)", opacity: 0.6 }} />
            </motion.div>
          </div>
          <div style={{ position: "absolute", bottom: "20%", left: "20%", zIndex: 1 }}>
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            >
              <Cpu size={30} style={{ color: "var(--accent-blue)", opacity: 0.6 }} />
            </motion.div>
          </div>
          <div style={{ position: "absolute", bottom: "25%", right: "10%", zIndex: 1 }}>
            <motion.div
              animate={{ y: [0, 25, 0] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            >
              <Zap size={26} style={{ color: "var(--accent-cyan)", opacity: 0.6 }} />
            </motion.div>
          </div>

          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              fontFamily: "var(--font-sans)",
              letterSpacing: "0.02em",
              color: "var(--text-primary)",
              lineHeight: "1.1",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data.name}
            </span>
          </h1>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginBottom: "2rem",
              height: "3rem",
              fontFamily: "var(--font-mono)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--text-secondary)" }}>{text}</span>
            <span
              style={{
                color: "var(--accent-primary)",
                animation: "pulse 1s infinite",
                marginLeft: "2px",
              }}
            >
              |
            </span>
          </div>
          <p
            style={{
              maxWidth: "48rem",
              margin: "0 auto 3rem",
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}
          >
            {data.about}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
            <motion.a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              style={{ color: "var(--text-secondary)" }}
              className="social-link"
              data-interactive
            >
              <Linkedin size={36} />
            </motion.a>
            <motion.a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              style={{ color: "var(--text-secondary)" }}
              className="social-link"
              data-interactive
            >
              <Github size={36} />
            </motion.a>
          </div>
          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            data-interactive
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
      <style>{`
                @keyframes pulse { 50% { opacity: 0; } }
                .social-link:hover { 
                    color: var(--accent-primary); 
                    filter: drop-shadow(0 0 10px var(--accent-primary)); 
                }
                .btn-primary { 
                    background: var(--gradient-primary);
                    border: none;
                    color: white;
                    font-weight: 600;
                    font-family: var(--font-sans);
                    padding: 1rem 2.5rem;
                    border-radius: 50px;
                    font-size: 1.125rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 32px rgba(0, 217, 255, 0.3);
                    position: relative;
                    overflow: hidden;
                }
                .btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }
                .btn-primary:hover::before {
                    left: 100%;
                }
            `}</style>
    </section>
  )
}

const AboutSection = ({ data }) => (
  <AnimatedSection id="about">
    <div className="container" style={{ textAlign: "center" }}>
      <SectionTitle>01. About Me</SectionTitle>
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <p style={{ fontSize: "1.125rem", marginBottom: "2rem", lineHeight: "1.75" }}>{data.about}</p>
        <a
          href={data.cvLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: "inline-flex", alignItems: "center", marginTop: "1.5rem", marginBottom: "3rem" }}
          data-interactive
        >
          <Download size={20} style={{ marginRight: "0.5rem" }} /> Download CV
        </a>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "2rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            color: "var(--accent-primary)",
          }}
        >
          TECH STACK
        </h3>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}
          className="md-grid-cols-4"
        >
          {data.skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              data-interactive
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{skill.icon}</div>
              <p className="font-mono" style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
                .md-grid-cols-4 { } @media (min-width: 768px) { .md-grid-cols-4 { grid-template-columns: repeat(4, 1fr); } }
                .skill-card { 
                    background: var(--card-bg); 
                    padding: 1.5rem; 
                    border-radius: 1rem; 
                    border: 1px solid var(--card-border); 
                    text-align: center;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .skill-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--gradient-secondary);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }
                .skill-card:hover::before {
                    opacity: 0.1;
                }
                .skill-card p { color: var(--accent-primary); }
            `}</style>
    </div>
  </AnimatedSection>
)

const TimelineSection = ({ id, title, data, icon: Icon }) => (
  <AnimatedSection id={id}>
    <div className="container">
      <SectionTitle>{title}</SectionTitle>
      <div className="timeline-wrapper">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="timeline-icon">
              <Icon size={16} style={{ color: "var(--accent-primary)" }} />
            </div>
            <motion.div className="card timeline-card" whileHover={{ y: -8 }} data-interactive>
              <h3 style={{ fontWeight: "bold", fontSize: "1.25rem", color: "var(--accent-primary)" }}>
                {item.institution || item.company}
              </h3>
              <p style={{ fontWeight: "600", color: "var(--text-primary)" }}>{item.degree || item.role}</p>
              <time
                style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: "0.25rem 0", display: "block" }}
              >
                {item.duration} &middot; {item.location}
              </time>
              <p style={{ color: "var(--text-secondary)" }}>{item.details || item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
    <style>{`
            .timeline-wrapper {
                position: relative;
                max-width: 64rem;
                margin: 0 auto;
            }
            .timeline-wrapper::before {
                content: '';
                position: absolute;
                top: 0;
                left: 1rem;
                height: 100%;
                width: 2px;
                background: var(--gradient-primary);
                opacity: 0.5;
            }
            .timeline-item {
                position: relative;
                padding-left: 3rem;
                margin-bottom: 3rem;
            }
            .timeline-icon {
                position: absolute;
                left: 1rem;
                top: 0.25rem;
                transform: translateX(-50%);
                background: var(--bg-main);
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid var(--accent-primary);
                box-shadow: 0 0 10px rgba(0, 217, 255, 0.3);
            }
            .timeline-card {
                padding: 2rem;
            }
            @media (min-width: 768px) {
                .timeline-wrapper::before {
                    left: 50%;
                    transform: translateX(-50%);
                }
                .timeline-item {
                    width: 50%;
                    padding-left: 0;
                }
                .timeline-item:nth-child(odd) {
                    padding-right: 2rem;
                    text-align: right;
                }
                .timeline-item:nth-child(even) {
                    margin-left: 50%;
                    padding-left: 2rem;
                }
                .timeline-icon {
                    left: 50%;
                }
            }
        `}</style>
  </AnimatedSection>
)

const EducationSection = ({ data }) => (
  <TimelineSection id="education" title="02. Education" data={data} icon={GraduationCap} />
)
const ExperienceSection = ({ data }) => (
  <TimelineSection id="experience" title="03. Experience" data={data} icon={Briefcase} />
)

const ProjectsSection = ({ data }) => (
  <AnimatedSection id="projects">
    <div className="container">
      <SectionTitle>04. Projects</SectionTitle>
      <div
        style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(1, 1fr)" }}
        className="md-grid-cols-2 lg-grid-cols-3"
      >
        {data.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
    <style>{`
            @media (min-width: 768px) { .md-grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
            @media (min-width: 1024px) { .lg-grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }
        `}</style>
  </AnimatedSection>
)

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      whileHover={{ y: -8 }}
      data-interactive
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "var(--accent-primary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
            flexGrow: 1,
            minHeight: "6rem",
            lineHeight: "1.6",
          }}
        >
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              data-interactive
              whileHover={{ scale: 1.2 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              data-interactive
              whileHover={{ scale: 1.2 }}
            >
              <ExternalLink size={24} />
            </motion.a>
          </div>
        </div>
      </div>
      <style>{`
                .tag { 
                    background: var(--gradient-secondary);
                    color: white;
                    font-size: 0.75rem; 
                    font-family: var(--font-mono); 
                    padding: 0.375rem 0.75rem; 
                    border-radius: 50px;
                    font-weight: 500;
                }
            `}</style>
    </motion.div>
  )
}

const PublicationsSection = ({ data }) => (
  <AnimatedSection id="publications">
    <div className="container" style={{ maxWidth: "48rem", margin: "0 auto" }}>
      <SectionTitle>05. Research</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {data.map((pub, index) => (
          <PublicationCard key={index} pub={pub} />
        ))}
      </div>
    </div>
  </AnimatedSection>
)

const PublicationCard = ({ pub }) => {
  return (
    <motion.div
      className="card"
      style={{ padding: "2rem" }}
      whileHover={{ y: -5 }}
      data-interactive
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem", color: "var(--accent-primary)" }}>
        {pub.title}
      </h3>
      <p style={{ fontStyle: "italic", color: "var(--text-secondary)", marginBottom: "1rem" }}>{pub.journal}</p>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <motion.a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="link-style"
          data-interactive
          whileHover={{ scale: 1.05 }}
        >
          Read Paper <ExternalLink size={16} style={{ marginLeft: "0.25rem" }} />
        </motion.a>
      </div>
      <style>{`
                .link-style { 
                    display: inline-flex; 
                    align-items: center; 
                    font-weight: 500; 
                    color: var(--accent-primary); 
                    text-decoration: none;
                    transition: all 0.3s ease;
                } 
                .link-style:hover { 
                    text-decoration: underline;
                    filter: drop-shadow(0 0 5px var(--accent-primary));
                }
            `}</style>
    </motion.div>
  )
}

const CertificationsSection = ({ data }) => (
  <AnimatedSection id="certifications">
    <div className="container" style={{ maxWidth: "56rem", margin: "0 auto" }}>
      <SectionTitle>06. Certifications</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md-grid-cols-2">
        {data.map((cert, index) => (
          <CertificationCard key={index} cert={cert} />
        ))}
      </div>
    </div>
  </AnimatedSection>
)

const CertificationCard = ({ cert }) => {
  return (
    <motion.div
      className="card"
      style={{ padding: "2rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
      whileHover={{ y: -5 }}
      data-interactive
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ flexShrink: 0, marginTop: "0.25rem" }}>
        <Award size={24} style={{ color: "var(--accent-primary)" }} />
      </div>
      <div>
        <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: "var(--accent-primary)" }}>{cert.title}</h3>
        <p style={{ color: "var(--text-secondary)" }}>{cert.issuer}</p>
        {cert.date && (
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{cert.date}</p>
        )}
      </div>
    </motion.div>
  )
}

const ContactSection = ({ email }) => {
  return (
    <AnimatedSection id="contact">
      <div className="container">
        <SectionTitle>07. Contact</SectionTitle>
        <div className="card" style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem" }}>
          <p style={{ textAlign: "center", fontSize: "1.125rem", marginBottom: "2rem", lineHeight: "1.6" }}>
            Have a question or want to work together? Email me at{" "}
            <a href={`mailto:${email}`} className="link-style" data-interactive>
              {email}
            </a>{" "}
            or use the form below.
          </p>
          <form
            action="https://formspree.io/f/mdkdrojl"
            method="POST"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div>
              <label htmlFor="name" className="form-label">
                NAME
              </label>
              <input type="text" name="name" id="name" required className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                EMAIL
              </label>
              <input type="email" name="email" id="email" required className="form-input" />
            </div>
            <div>
              <label htmlFor="message" className="form-label">
                MESSAGE
              </label>
              <textarea name="message" id="message" rows="4" required className="form-input"></textarea>
            </div>
            <div style={{ textAlign: "center" }}>
              <motion.button
                type="submit"
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center" }}
                data-interactive
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message <Send size={20} style={{ marginLeft: "0.5rem" }} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      <style>{`
                .form-label { 
                    display: block; 
                    margin-bottom: 0.75rem; 
                    font-size: 0.875rem; 
                    font-family: var(--font-mono); 
                    color: var(--accent-primary);
                    font-weight: 500;
                }
                .form-input { 
                    width: 100%; 
                    padding: 1rem; 
                    background: rgba(255, 255, 255, 0.05); 
                    border: 1px solid var(--card-border); 
                    border-radius: 0.5rem;
                    color: var(--text-primary);
                    font-family: var(--font-sans);
                    transition: all 0.3s ease;
                }
                .form-input:focus { 
                    outline: none; 
                    border-color: var(--accent-primary); 
                    box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
                    background: rgba(255, 255, 255, 0.08);
                }
                .form-input::placeholder {
                    color: var(--text-secondary);
                }
            `}</style>
    </AnimatedSection>
  )
}

const Footer = ({ data }) => (
  <footer
    style={{
      background: "rgba(10, 10, 15, 0.8)",
      borderTop: "1px solid var(--card-border)",
      backdropFilter: "blur(20px)",
    }}
    className="dark-footer"
  >
    <div className="container" style={{ padding: "3rem 1.5rem", textAlign: "center", color: "#94a3b8" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1.5rem" }}>
        <motion.a
          href={data.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-interactive
          whileHover={{ scale: 1.2, y: -3 }}
        >
          <Linkedin size={28} />
        </motion.a>
        <motion.a
          href={data.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-interactive
          whileHover={{ scale: 1.2, y: -3 }}
        >
          <Github size={28} />
        </motion.a>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
        &copy; {new Date().getFullYear()} {data.name}. Crafted with ❤️ and lots of ☕
      </p>
    </div>
    <style>{`
            .light .dark-footer { 
                background: rgba(248, 250, 252, 0.9); 
                border-color: #e2e8f0; 
            }
            .light .dark-footer p, .light .dark-footer a { 
                color: #64748b; 
            }
            .light .dark-footer a:hover { 
                color: var(--accent-blue); 
            }
        `}</style>
  </footer>
)

export default App
