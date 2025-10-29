"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { features } from "../data/features";

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const featureIndex = Math.min(
        Math.floor(latest * features.length),
        features.length - 1
      );
      setActiveFeature(featureIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleFeatureClick = (index: number) => {
    const sectionHeight = sectionRef.current?.offsetHeight ?? 0;
    const targetScroll =
      (sectionRef.current?.offsetTop ?? 0) +
      ((index + 0.5) / features.length) * sectionHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div ref={sectionRef} className="relative bg-white text-gray-900">
      <div className="h-[40vh]" />
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-16 items-center">
            <div className="h-auto md:h-32">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1 text-left"
              >
                <p className="text-blue-600 font-semibold mb-1">
                  Feature No.{activeFeature + 1} -
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
                  {features[activeFeature].title}
                </h2>
                <ul className="text-gray-600 text-base space-y-3 mb-8">
                  {features[activeFeature].points?.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() =>
                      handleFeatureClick(Math.max(0, activeFeature - 1))
                    }
                    className="text-gray-400 hover:text-gray-700 text-2xl"
                  >
                    ←
                  </button>
                  <div className="h-6 w-px bg-gray-300" />
                  <button
                    onClick={() =>
                      handleFeatureClick(
                        Math.min(features.length - 1, activeFeature + 1)
                      )
                    }
                    className="text-gray-400 hover:text-gray-700 text-2xl"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="h-64 flex justify-center items-center">
              <motion.div
                className="relative order-1 md:order-2 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-[220px] sm:w-[260px] md:w-[280px] lg:w-[210px] aspect-[9/19] rounded-[2rem] border-[3px] border-gray-300 shadow-2xl flex items-center justify-center">
                  <div className="w-[95%] h-[93%] bg-white rounded-[2rem] overflow-hidden">
                    <img
                      key={activeFeature}
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 md:w-24 h-4 bg-gray-800 rounded-full" />
                </div>
              </motion.div>
            </div>

            <div className="h-auto md:h-32">
              <div className="order-3">
                <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-6 uppercase">
                  Feature Showcase
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={feature.title}
                      ref={(el) => {
                        if (featureRefs.current)
                          featureRefs.current[index] = el;
                      }}
                      onClick={() => handleFeatureClick(index)}
                      whileHover={{ scale: 1.03 }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`h-8 w-1 rounded-full transition-all duration-300 ${
                          activeFeature === index
                            ? "bg-blue-600"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base transition-colors ${
                          activeFeature === index
                            ? "text-blue-600 font-medium"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
