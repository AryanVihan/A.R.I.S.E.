import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="modern-cta-section">
            {/* Background elements */}
            <div className="cta-background">
                <div className="cta-gradient"></div>
                <div className="cta-pattern"></div>
                <div className="floating-particles">
                    <div className="particle particle-1"></div>
                    <div className="particle particle-2"></div>
                    <div className="particle particle-3"></div>
                    <div className="particle particle-4"></div>
                </div>
            </div>
            
            {/* Content */}
            <div className="cta-content">
                <div className="modern-cta-badge">
                    <span className="badge-icon">✨</span>
                    <span>Start learning your way</span>
                    <div className="badge-glow"></div>
                </div>
                
                <h2 className="cta-title">
                    Build and Personalize Your
                    <span className="cta-highlight"> AI Learning Companion</span>
                </h2>
                
                <p className="cta-description">
                    Pick a name, subject, voice, & personality — and start learning through 
                    voice conversations that feel natural and engaging.
                </p>
                
                {/* Illustration with modern styling */}
                <div className="cta-illustration">
                    <div className="illustration-backdrop"></div>
                    <Image 
                        src="images/cta.svg" 
                        alt="AI Companion Illustration" 
                        width={320} 
                        height={200} 
                        className="cta-image"
                    />
                    <div className="illustration-glow"></div>
                </div>
                
                {/* Modern CTA Button */}
                <Link href="/companions/new" className="w-full">
                    <button className="modern-cta-btn">
                        <div className="btn-bg"></div>
                        <span className="btn-content">
                            <div className="btn-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <span className="btn-label">Build a New Companion</span>
                            <div className="btn-arrow">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17l10-10M17 7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </span>
                        <div className="btn-ripple"></div>
                    </button>
                </Link>
            </div>
        </section>
    )
}
export default Cta
