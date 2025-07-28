"use client"
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='relative p-8 rounded-3xl overflow-hidden group transform transition-all duration-500 hover:scale-[1.02] animate-fade-in'
         style={{
           background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)',
           boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(10px)',
           border: '1px solid rgba(255, 255, 255, 0.1)'
         }}>
      {/* Animated background overlay */}
      <div className='absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700'
           style={{
             background: 'radial-gradient(circle at 30% 20%, rgba(233, 69, 96, 0.3) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(83, 52, 131, 0.3) 0%, transparent 60%)'
           }}></div>
      
      {/* Shimmer effect */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000'
           style={{
             background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
             animation: 'shimmer 2s infinite'
           }}></div>
      
      <div className='relative z-10'>
        <h2 className='text-3xl font-bold mb-3 animate-glow'
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
            }}>
          Welcome to this Online Learning Platform
        </h2>
        <p className='text-lg leading-relaxed animate-slide-up'
           style={{
             color: '#f0f0f0',
             textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)'
           }}>
          Explore a wide range of courses and resources to enhance your knowledge and skills.
        </p>
      </div>
      
      {/* Floating particles effect */}
      <div className='absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse'></div>
      <div className='absolute top-8 right-12 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-ping'></div>
      <div className='absolute bottom-6 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-50 animate-bounce'></div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.5)); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  )
}

export default WelcomeBanner