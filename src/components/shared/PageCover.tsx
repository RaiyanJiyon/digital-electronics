import React from "react";
import Link from "next/link";

interface PageCoverProps {
  prev: string;
  next: string;
}

const PageCover: React.FC<PageCoverProps> = ({ prev, next }) => {
  return (
    <div style={{ backgroundImage: `url('https://i.ibb.co/JWLMpdVT/cover.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex justify-center items-center gap-2 py-14 text-white font-sm">
        <Link href={'/'}>{prev}</Link>
        <span>
            >
        </span>
        <Link href={'/about'}>{next}</Link>
      </div>
    </div>
  );
};

export default PageCover;
