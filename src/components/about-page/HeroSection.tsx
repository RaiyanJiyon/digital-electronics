import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
  return (
    <section className="w-11/12 max-w-[1920px] mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-4">
          <h3 className="text-red-500 font-bold">Tech for All</h3>

          <h1 className="text-2xl md:text-5xl font-bold leading-tight">
            Discover the Future of Gadgets
            <br />
            at Unbeatable Prices.
          </h1>

          <p className="text-gray-600 max-w-lg">
            Explore our vast collection of the latest tech gadgets that will elevate your lifestyle.
            From cutting-edge smartphones to smart home devices, find everything you need in one place.
          </p>

          <Link href="#" className="inline-flex items-center gap-4 text-gray-700 hover:text-gray-900 group">
            <div className="bg-black w-28 h-0.5"></div>
            <button className="border-b-2 border-transparent hover:text-red-500">Learn More</button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute inset-0 translate-x-4 translate-y-4  rounded-3xl -z-10" />
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/assets/images/img-about.jpg"
              alt="Smart home interface with IoT devices"
              width={480}
              height={310}
              layout="responsive"
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
