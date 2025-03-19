import { useState, useEffect } from "react";

const banners = ["/banner/01.png", "/banner/02.png", "/banner/03.png"];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="hidden md:flex absolute inset-0 justify-center items-center">
        {/* Previous banner */}
        <img
          src={banners[(index - 1 + banners.length) % banners.length]}
          alt="Previous banner"
          className="absolute left-0 w-1/4 h-full object-cover opacity-50 transition-all duration-500 ease-in-out"
        />
        {/* Next banner */}
        <img
          src={banners[(index + 1) % banners.length]}
          alt="Next banner"
          className="absolute right-0 w-1/4 h-full object-cover opacity-50 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Main */}
      <div className="relative z-10 w-full transition-opacity duration-500 ease-in-out">
        <img src={banners[index]} alt="Slideshow banner" className="w-full object-cover" />
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`} />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
