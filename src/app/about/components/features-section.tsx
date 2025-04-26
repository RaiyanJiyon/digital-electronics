import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div>
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      title: "Top-notch Gadgets",
      description: "Our curated selection of digital electronics offers the latest and greatest in technology, ensuring you always have access to cutting-edge gadgets.",
    },
    {
      title: "Expert Recommendations",
      description: "Benefit from expert advice and recommendations, helping you make informed decisions about your tech purchases.",
    },
    {
      title: "Competitive Prices",
      description: "Enjoy unbeatable prices and exclusive deals on a wide range of electronic products, saving you money while getting the best value.",
    },
    {
      title: "Customer Satisfaction",
      description: "Our top priority is your satisfaction. We offer hassle-free returns and exceptional customer service to ensure a smooth shopping experience.",
    },
  ];

  return (
    <div className="bg-[#f5f5f5] p-8 md:p-16">
      <div className="w-11/12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Heading */}
        <div className="flex items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            Discover the Difference When You Shop at Tech Haven!
          </h2>
        </div>

        {/* Right Section: Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
