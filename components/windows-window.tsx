"use client"

import type React from "react"

import { X, Minus, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface WindowsWindowProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  className?: string
  backgroundImage?: string
}

export default function WindowsWindow({ title, onClose, children, className, backgroundImage }: WindowsWindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })
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

  return (
    <div
      ref={windowRef}
      className={cn("bg-[#ece9d8] border-2 border-[#0c3d99] rounded shadow-xl overflow-hidden fixed", className)}
      style={{
        zIndex: 1000,
        width: "500px", // Tamaño fijo más pequeño
        maxWidth: "90vw",
      }}
    >
      <div
        className="window-header bg-gradient-to-r from-[#2a5ede] to-[#5a93ee] text-white font-bold p-1 flex items-center"
        onMouseDown={handleMouseDown}
      >
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
              onClose()
            }}
          >
            <X size={12} className="text-white" />
          </button>
        </div>
      </div>
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
    </div>
  )
}
