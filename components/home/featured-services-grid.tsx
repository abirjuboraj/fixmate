"use client";

import { motion, type Variants } from "framer-motion";
import { ServiceItem } from "@/types";
import { ServiceCard } from "@/app/(public)/services/_components/service-card";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};


const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface FeaturedServicesGridProps {
  services: ServiceItem[];
}

export function FeaturedServicesGrid({ services }: FeaturedServicesGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      // Animate once, when the section scrolls into view
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {services.map((service) => (
        // className="h-full" keeps every card the same height inside its
        // grid cell, so all cards in a row are equal in size.
        <motion.div
          key={String(service._id)}
          variants={cardVariants}
          className="h-full"
        >
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </motion.div>
  );
}
