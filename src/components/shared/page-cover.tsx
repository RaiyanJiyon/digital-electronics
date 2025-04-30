import React from "react";
import Link from "next/link";

interface PageCoverProps {
  prev: string;
  next: string;
}

const PageCover: React.FC<PageCoverProps> = ({ prev, next }) => {
  return (
    <div className="relative overflow-hidden" style={{ 
      background: 'linear-gradient(90deg, #e91e63 0%, #ff6b6b 100%)',
      position: 'relative'
    }}>
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v2h-100zM0 20h100v2h-100zM0 40h100v2h-100zM0 60h100v2h-100zM0 80h100v2h-100z" fill="rgba(255,255,255,0.1)"%3E%3C/path%3E%3Cpath d="M20 0v100h2v-100zM40 0v100h2v-100zM60 0v100h2v-100zM80 0v100h2v-100z" fill="rgba(255,255,255,0.1)"%3E%3C/path%3E%3C/svg%3E")',
        opacity: 0.2,
      }}></div>
      <div className="flex justify-center items-center gap-2 py-14 text-white font-sm relative z-10">
        <Link href={'/'}>{prev}</Link>
        <span>{">"}</span>
        <Link href={'/about'}>{next}</Link>
      </div>
    </div>
  );
};

export default PageCover;