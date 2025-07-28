import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

// Modern, Aesthetic Dashboard for AI Companions

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3 });
    const recentSessionsCompanions = await getRecentSessions(10);

    return (
        <main className="modern-dashboard">
            {/* Hero Section with Beautiful Gradient */}
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        ✨ AI-Powered Learning
                    </div>
                    <h1 className="hero-title">
                        Discover Your Perfect
                        <span className="gradient-text"> Learning Companion</span>
                    </h1>
                    <p className="hero-subtitle">
                        Personalized AI tutors designed to adapt to your learning style and pace.
                        Experience the future of education.
                    </p>
                </div>
                <div className="hero-decoration">
                    <div className="floating-orb orb-1"></div>
                    <div className="floating-orb orb-2"></div>
                    <div className="floating-orb orb-3"></div>
                </div>
            </div>

            {/* Popular Companions Section */}
            <section className="companions-showcase">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="title-icon">🔥</span>
                        Popular Companions
                    </h2>
                    <p className="section-subtitle">
                        Most loved AI tutors by our community
                    </p>
                </div>
                
                <div className="companions-grid-modern">
                    {companions.map((companion, index) => (
                        <div 
                            key={companion.id}
                            className="companion-card-wrapper"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CompanionCard
                                {...companion}
                                color={getSubjectColor(companion.subject)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Sessions & CTA Section */}
            <section className="dashboard-content">
                <div className="content-wrapper">
                    <div className="sessions-container">
                        <CompanionsList
                            title="Recent Learning Sessions"
                            companions={recentSessionsCompanions}
                            classNames="modern-companions-list"
                        />
                    </div>
                    <div className="cta-container">
                        <CTA />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">📚</div>
                        <div className="stat-number">1000+</div>
                        <div className="stat-label">Lessons Completed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🎯</div>
                        <div className="stat-number">95%</div>
                        <div className="stat-label">Success Rate</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">AI Availability</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🌟</div>
                        <div className="stat-number">4.9</div>
                        <div className="stat-label">User Rating</div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Page
