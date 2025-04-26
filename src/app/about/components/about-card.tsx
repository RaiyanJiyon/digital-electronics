import Image from "next/image";

const services = [
  {
    logo: "/assets/images/fast-delivery.png",
    title: "Worldwide Delivery",
    description: "Free Delivery with $50 purchase",
  },
  {
    logo: "/assets/images/24-hours-support.png",
    title: "24/7 Support",
    description: "We're here to help around the clock",
  },
  {
    logo: "/assets/images/secure-payment.png",
    title: "Secure Payments",
    description: "Your transactions are safe with us",
  },
  {
    logo: "/assets/images/high-quality.png",
    title: "Quality Guarantee",
    description: "We offer only the best products",
  },
];

const AboutCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 max-w-[1920px] mx-auto">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 bg-white border rounded-lg shadow-md hover:shadow-lg hover:text-white transition-all duration-300"
        >
          {/* Icon Section */}
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Image
              src={service.logo}
              alt={`${service.title} logo`}
              width={100}
              height={100}
              className="w-10 h-10"
            />
          </div>

          {/* Content Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutCard;
