"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// its like declaring datatypes
interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}
// its like declaring variables
const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article className="modern-companion-card group">
      {/* Background gradient overlay */}
      <div 
        className="card-background"
        style={{ 
          background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)` 
        }}
      ></div>
      
      {/* Card content */}
      <div className="card-content">
        {/* Header with subject and bookmark */}
        <div className="card-header">
          <div className="modern-subject-badge" style={{ backgroundColor: color }}>
            <span className="badge-text">{subject}</span>
            <div className="badge-shine"></div>
          </div>
          <button 
            className="modern-bookmark-btn group" 
            onClick={handleBookmark}
          >
            <div className="bookmark-bg"></div>
            <Image
              src={
                bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
              }
              alt="bookmark"
              width={16}
              height={20}
              className="bookmark-icon"
            />
          </button>
        </div>

        {/* Main content */}
        <div className="card-main">
          <h2 className="companion-name">{name}</h2>
          <p className="companion-topic">{topic}</p>
          
          {/* Duration with modern styling */}
          <div className="duration-container">
            <div className="duration-icon">
              <Image
                src="/icons/clock.svg"
                alt="duration"
                width={16}
                height={16}
                className="clock-icon"
              />
            </div>
            <span className="duration-text">{duration} minutes</span>
            <div className="duration-pulse"></div>
          </div>
        </div>

        {/* Action button */}
        <Link href={`/companions/${id}`} className="w-full">
          <button className="modern-launch-btn">
            <span className="btn-content">
              <span className="btn-text">Launch Lesson</span>
              <div className="btn-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M13 7l5 5-5 5M6 12h12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </span>
            <div className="btn-shine"></div>
          </button>
        </Link>
      </div>
      
      {/* Hover effects */}
      <div className="card-glow" style={{ backgroundColor: color }}></div>
    </article>
  );
};

export default CompanionCard;
