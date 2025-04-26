import type React from "react";
import Image from "next/image";

// Define the props for the ServiceItem component
interface ServiceItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

// Reusable ServiceItem component to display a single service
const ServiceItem: React.FC<ServiceItemProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="flex items-center gap-4 py-3">
      {/* Container for the image with hover effect */}
      <div
        className={`w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0 overflow-hidden 
          transition-all duration-300 ease-in-out hover:rounded-full`}
      >
        <Image
          src={imageUrl || "/placeholder.svg"} // Fallback to placeholder if imageUrl is missing
          alt={title}
          width={24}
          height={24}
          className="w-full object-contain"
        />
      </div>

      {/* Text content for the service item */}
      <div>
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

// Main ServiceHighlights component to display a list of services
const ServiceHighlights: React.FC = () => {
  // Array of service objects containing image URLs, titles, and descriptions
  const services = [
    {
      imageUrl: "https://i.ibb.co.com/QvT0m6ph/icon-1.jpg",
      title: "FREE DELIVERY",
      description: "From $59",
    },
    {
      imageUrl: "https://i.ibb.co.com/GbXzLq7/icon-2.jpg",
      title: "SUPPORT 24/7",
      description: "Online 24 hours",
    },
    {
      imageUrl: "https://i.ibb.co.com/pBfGm0Rk/icon-3.jpg",
      title: "FREE RETURN",
      description: "365 a day",
    },
    {
      imageUrl: "https://i.ibb.co.com/s9mbN4z4/icon-4.jpg",
      title: "PAYMENT METHOD",
      description: "Secure payment",
    },
    {
      imageUrl: "https://i.ibb.co.com/RGV3S2fF/icon-5.jpg",
      title: "GET PROMOTION",
      description: "Secure payment",
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Render a list of services */}
      <div className="space-y-2">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            imageUrl={service.imageUrl}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;