"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const roadmapItems = [
  {
    phase: "Fase 1",
    title: "Lanzamiento",
    description: "Lanzamiento del token, listado en exchanges descentralizados y creación de la comunidad inicial.",
    date: "Q2 2025",
    completed: true,
  },
  {
    phase: "Fase 2",
    title: "Desarrollo de Ecosistema",
    description: "Implementación de staking, desarrollo de la plataforma de gobernanza y expansión de la comunidad.",
    date: "Q3 2025",
    completed: false,
  },
  {
    phase: "Fase 3",
    title: "Expansión",
    description:
      "Listado en exchanges centralizados, asociaciones estratégicas y lanzamiento de productos adicionales.",
    date: "Q4 2025",
    completed: false,
  },
  {
    phase: "Fase 4",
    title: "Evolución",
    description: "Implementación de soluciones de capa 2, integración con otros ecosistemas DeFi y expansión global.",
    date: "Q1 2026",
    completed: false,
  },
]

export default function RoadmapSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-purple-500 to-cyan-500"></div>

      <div className="grid gap-16 relative">
        {roadmapItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative grid md:grid-cols-2 gap-8 items-center",
              index % 2 === 0 ? "md:text-right" : "md:text-left md:flex-row-reverse",
            )}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className={cn("order-2 md:order-1", index % 2 !== 0 && "md:order-2")}>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-purple-500 transition-colors">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 mb-2">
                  {item.phase}
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <span className="text-sm text-cyan-400">{item.date}</span>
              </div>
            </div>

            <div className={cn("flex justify-center order-1 md:order-2", index % 2 !== 0 && "md:order-1")}>
              <div className="relative">
                <motion.div
                  className={cn(
                    "w-12 h-12 rounded-full border-4 flex items-center justify-center z-10 relative",
                    activeIndex === index || item.completed
                      ? "border-purple-500 bg-black"
                      : "border-gray-700 bg-gray-900",
                  )}
                  animate={activeIndex === index ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: activeIndex === index ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                  }}
                >
                  {item.completed ? (
                    <svg
                      className="w-6 h-6 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-gray-400">{index + 1}</span>
                  )}
                </motion.div>
                {activeIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-purple-500/20 rounded-full blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
