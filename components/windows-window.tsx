"use client"

import type React from "react"

import { X, Minus, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface WindowsWindowProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
  backgroundImage?: string
  isNotepad?: boolean
  logo?: string
}

export default function WindowsWindow({
  title,
  onClose,
  children,
  className,
  backgroundImage,
  isNotepad,
  logo,
}: WindowsWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    // Verificar si el clic fue en el encabezado (excluyendo los botones)
    const header = windowRef.current?.querySelector(".window-header-drag-area") as HTMLElement
    if (header && header.contains(e.target as Node)) {
      e.preventDefault()
      setIsDragging(true)

      // Calcular el desplazamiento desde la esquina superior izquierda de la ventana
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && windowRef.current) {
      e.preventDefault()
      const newX = e.clientX - offset.x
      const newY = e.clientY - offset.y

      // Actualizar la posición directamente en el estilo del elemento
      windowRef.current.style.left = `${newX}px`
      windowRef.current.style.top = `${newY}px`
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Centrar la ventana cuando se monta
  useEffect(() => {
    if (windowRef.current) {
      const windowWidth = windowRef.current.offsetWidth
      const windowHeight = windowRef.current.offsetHeight
      const centerX = (window.innerWidth - windowWidth) / 2
      const centerY = (window.innerHeight - windowHeight) / 2

      windowRef.current.style.left = `${centerX}px`
      windowRef.current.style.top = `${centerY}px`
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    // Esperar a que termine la animación antes de cerrar realmente
    setTimeout(() => {
      onClose()
    }, 250) // 250ms es la duración de la animación
  }

  // Variantes de animación al estilo Windows 7 (suaves y rápidas)
  // pero manteniendo la apariencia visual de Windows XP
  const windowVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.98,
      transition: {
        duration: 0.25, // Velocidad normal (1x)
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25, // Velocidad normal (1x)
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.25, // Velocidad normal (1x)
        ease: "easeInOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          ref={windowRef}
          className={cn("bg-[#ece9d8] border-2 border-[#0c3d99] rounded shadow-xl overflow-hidden fixed", className)}
          style={{
            zIndex: 1000,
            width: isNotepad ? "600px" : "500px", // Tamaño fijo más pequeño
            maxWidth: "90vw",
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={windowVariants}
        >
          <div
            className="window-header bg-gradient-to-r from-[#2a5ede] to-[#5a93ee] text-white font-bold p-1 flex items-center"
            onMouseDown={handleMouseDown}
          >
            {logo && (
              <div className="w-5 h-5 relative ml-1">
                <Image src={logo || "/placeholder.svg"} alt="Window Logo" fill className="object-contain" />
              </div>
            )}
            <div className="window-header-drag-area flex-1 ml-2 text-sm cursor-move">{title}</div>
            <div className="flex">
              <button
                className="w-6 h-6 bg-[#ece9d8] rounded-sm flex items-center justify-center hover:bg-[#fff] mr-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Minus size={12} className="text-black" />
              </button>
              <button
                className="w-6 h-6 bg-[#ece9d8] rounded-sm flex items-center justify-center hover:bg-[#fff] mr-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Square size={12} className="text-black" />
              </button>
              <button
                className="w-6 h-6 bg-[#ff5050] rounded-sm flex items-center justify-center hover:bg-[#ff3333] mr-1"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          </div>

          {isNotepad ? (
            // Estilo de Notepad para Windows XP
            <div>
              <div className="bg-[#ece9d8] border-b border-gray-400 px-2 py-1 text-sm">
                <span className="mr-4">File</span>
                <span className="mr-4">Edit</span>
                <span className="mr-4">Format</span>
                <span className="mr-4">View</span>
                <span>Help</span>
              </div>
              <div className="window-content">{children}</div>
            </div>
          ) : (
            // Estilo normal para otras ventanas
            <div className="window-content bg-[#0c0c0c] text-white border-t-2 border-[#ece9d8] max-h-[70vh] overflow-auto relative">
              {backgroundImage && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={backgroundImage || "/placeholder.svg"}
                    alt="Background"
                    fill
                    className="object-cover opacity-30"
                  />
                </div>
              )}
              <div className="relative z-10">{children}</div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
