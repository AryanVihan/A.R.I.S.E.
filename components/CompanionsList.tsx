
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn, getSubjectColor} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('modern-companion-list', classNames)}>
            {/* Header */}
            <div className="list-header">
                <h2 className="list-title">
                    <span className="title-gradient">{title}</span>
                </h2>
                <div className="list-subtitle">
                    Continue your learning journey
                </div>
            </div>

            {/* Modern Card Layout */}
            <div className="companions-cards">
                {companions?.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            📚
                        </div>
                        <h3 className="empty-title">No Recent Sessions</h3>
                        <p className="empty-description">
                            Start your first lesson to see your progress here
                        </p>
                    </div>
                ) : (
                    companions?.map(({id, subject, name, topic, duration}, index) => (
                        <Link href={`/companions/${id}`} key={id}>
                            <div 
                                className="companion-list-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Card background */}
                                <div className="list-card-bg"></div>
                                
                                {/* Content */}
                                <div className="list-card-content">
                                    {/* Icon */}
                                    <div 
                                        className="list-card-icon"
                                        style={{ backgroundColor: `${getSubjectColor(subject)}20` }}
                                    >
                                        <div 
                                            className="icon-inner"
                                            style={{ backgroundColor: getSubjectColor(subject) }}
                                        >
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={24}
                                                height={24}
                                                className="subject-icon"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Text content */}
                                    <div className="list-card-text">
                                        <h3 className="card-lesson-name">{name}</h3>
                                        <p className="card-lesson-topic">{topic}</p>
                                        
                                        {/* Meta info */}
                                        <div className="card-meta">
                                            <div className="meta-item">
                                                <div className="meta-badge" style={{ backgroundColor: getSubjectColor(subject) }}>
                                                    {subject}
                                                </div>
                                            </div>
                                            <div className="meta-item duration">
                                                <div className="duration-badge">
                                                    <Image 
                                                        src="/icons/clock.svg" 
                                                        alt="duration" 
                                                        width={12} 
                                                        height={12} 
                                                        className="duration-icon"
                                                    />
                                                    <span>{duration}m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action arrow */}
                                    <div className="list-card-arrow">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path 
                                                d="M9 18l6-6-6-6" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Hover effect */}
                                <div className="list-card-hover"></div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </article>
    )
}

export default CompanionsList;