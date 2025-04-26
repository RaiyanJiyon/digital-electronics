import React from "react";

const Locations = () => {
  const locations = [
    {
      city: "New York",
      address: "433 E 13th St, New York, NY 10009, United State of America",
      hotline: "888 9344 6000 - 888 1234 6789",
      email: "amabook-store@magentech.com",
    },
    {
      city: "Los Angeles",
      address: "433 E 13th St, New York, NY 10009, United State of America",
      hotline: "888 9344 6000 - 888 1234 6789",
      email: "amabook-store@magentech.com",
    },
    {
      city: "London",
      address: "433 E 13th St, New York, NY 10009, United State of America",
      hotline: "888 9344 6000 - 888 1234 6789",
      email: "amabook-store@magentech.com",
    },
    {
      city: "Viet Nam",
      address: "433 E 13th St, New York, NY 10009, United State of America",
      hotline: "888 9344 6000 - 888 1234 6789",
      email: "amabook-store@magentech.com",
    },
  ];

  return (
    <div className="bg-gray-50 p-8 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {locations.map((location, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">
              Digital - {location.city}
            </h3>
            <p className="text-sm text-gray-600">{location.address}</p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Hotline:</span> {location.hotline}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Email:</span> {location.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
