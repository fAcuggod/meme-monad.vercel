"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import WindowsWindow from "@/components/windows-window"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [lastClickedIcon, setLastClickedIcon] = useState<string | null>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  // URL actualizada para comprar $MONI
  const buyMoniUrl = "https://www.kuru.io/trade/0xe00146b6a0fb6faa969120f031166fd22468b79c"

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleLogin = () => {
    if (password === "I WILL BE RUGGED") {
      setLoggedIn(true)
      setPasswordError("")
    } else if (password === "i will be rugged" || password === "I will be rugged") {
      setPasswordError("Enter it in CAPITAL LETTERS")
    } else {
      setPasswordError("Incorrect password")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  const handleIconClick = (windowName: string) => {
    setLastClickedIcon(windowName)
    setActiveWindow(windowName)

    // Resetear el estado después de la animación
    setTimeout(() => {
      setLastClickedIcon(null)
    }, 300)
  }

  // Variantes de animación para los iconos (estilo Windows 7 pero manteniendo apariencia XP)
  const iconVariants = {
    normal: { scale: 1 },
    clicked: {
      scale: [1, 0.95, 1],
      transition: {
        duration: 0.25, // Velocidad normal (1x)
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
    },
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-[#235abd] text-white font-windows">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#0c57d0] border-2 border-white rounded-lg shadow-lg p-8 w-[400px] max-w-[90vw]">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 relative mr-4 border-2 border-white rounded-lg overflow-hidden">
                <Image src="/moni-logo.png" alt="MONI Logo" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">nad</h2>
                <p className="text-sm">Type your password</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Input
                  ref={passwordInputRef}
                  type="text" // Cambiado a text para mostrar la contraseña sin ocultar
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-white text-black border-2 border-[#7eb0f5] w-full p-2 rounded"
                  placeholder="Password"
                />
              </div>
              {passwordError && <p className="text-red-300 mt-1">{passwordError}</p>}
              <p className="text-white mt-2">insert: "I WILL BE RUGGED"</p>
            </div>

            <div className="flex justify-between">
              <Button
                className="bg-[#2b7cf7] hover:bg-[#1a6fe9] text-white border border-[#7eb0f5]"
                onClick={handleLogin}
              >
                Log On
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-[#1a6fe9]">
                Turn Off Computer
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-[#0c57d0] p-2 flex justify-end">
          <div className="text-white text-sm">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden font-windows">
      {/* Windows XP Background */}
      <div className="fixed inset-0 z-0">
        <Image src="/windows-xp-bg.png" alt="Windows XP Background" fill className="object-cover" priority />
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 min-h-[calc(100vh-40px)] p-4 grid grid-cols-6 gap-4 content-start">
        {/* MONI X Account Icon - Corregida la alineación */}
        <motion.div
          className="flex flex-col items-center justify-start h-24 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "moni-x" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => window.open("https://x.com/MonadMoni", "_blank")}
          >
            <div className="w-12 h-12 relative">
              <Image src="/x-logo.png" alt="X Logo" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 text-center">MONI X Account</span>
          </button>
        </motion.div>

        {/* Creator Icon */}
        <motion.div
          className="flex flex-col items-center justify-start h-24 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "creator" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => window.open("https://x.com/facugod0", "_blank")}
          >
            <div className="w-12 h-12 relative">
              <Image src="/x-logo.png" alt="X Logo" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 text-center">Creator</span>
          </button>
        </motion.div>

        {/* Monad Icon */}
        <motion.div
          className="flex flex-col items-center justify-start h-24 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "monad" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => window.open("https://testnet.monad.xyz", "_blank")}
          >
            <div className="w-12 h-12 relative">
              <Image src="/monad-logo.png" alt="Monad Logo" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 text-center">Monad</span>
          </button>
        </motion.div>

        {/* Buy $MONI Icon */}
        <motion.div
          className="flex flex-col items-center justify-start h-24 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "buy-moni" ? "clicked" : "normal"}
        >
          <button className="flex flex-col items-center w-full" onClick={() => window.open(buyMoniUrl, "_blank")}>
            <div className="w-12 h-12 relative bg-[#c1ff72] rounded-lg flex items-center justify-center">
              <Image src="/kuru-logo.png" alt="Kuru Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 text-center">Buy $MONI</span>
          </button>
        </motion.div>

        {/* Recycle Bin Icon */}
        <motion.div
          className="flex flex-col items-center justify-start h-24 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "recyclebin" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => {
              setLastClickedIcon("recyclebin")
              handleIconClick("recyclebin")
            }}
          >
            <div className="w-12 h-12 relative">
              <Image src="/recycle-bin.png" alt="Recycle Bin" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 text-center">Recycle Bin</span>
          </button>
        </motion.div>
      </div>

      {/* Center File Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className="flex flex-col items-center justify-start p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "home" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => {
              setLastClickedIcon("home")
              handleIconClick("home")
            }}
          >
            <div className="w-16 h-16 relative">
              <Image src="/txt-file.png" alt="Text File" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 font-bold text-center">OPEN ME</span>
          </button>
        </motion.div>
      </div>

      {/* WinRAR Icon (Bottom Right) */}
      <div className="absolute bottom-16 right-4 z-10">
        <motion.div
          className="flex flex-col items-center justify-start p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          variants={iconVariants}
          animate={lastClickedIcon === "us-heart" ? "clicked" : "normal"}
        >
          <button
            className="flex flex-col items-center w-full"
            onClick={() => {
              setLastClickedIcon("us-heart")
              handleIconClick("us-heart")
            }}
          >
            <div className="w-16 h-16 relative">
              <Image src="/winrar.png" alt="WinRAR" fill className="object-contain" />
            </div>
            <span className="text-white text-shadow text-sm mt-1 font-bold text-center">?</span>
          </button>
        </motion.div>
      </div>

      {/* Windows */}
      {activeWindow === "home" && (
        <WindowsWindow
          title="MONI on Monad - $MONI"
          onClose={() => setActiveWindow(null)}
          className=""
          backgroundImage="/moni-science.png"
          logo="/moni-logo.png"
        >
          <div className="p-6 text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 relative">
                  <Image src="/moni-logo.png" alt="MONI Logo" fill className="object-contain" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-purple-300 animate-pulse">$MONI</h1>
              <p className="text-xl mb-6">
                Moni is a mischievous yet brilliant character from the Monad world - always building, coding, and
                plotting something unexpected in the name of fun and freedom.
              </p>
              <div className="bg-black/70 p-4 rounded-lg mb-8 border-2 border-purple-500/50">
                <p className="text-lg italic text-purple-200">
                  We love MONI, we love MONAD, it's just a meme, you'll be rugged, probably nothing.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/50">
                <h2 className="text-xl font-bold mb-2 text-purple-300">About $MONI</h2>
                <p className="text-purple-100">
                  This is a meme token. It has no value. It has no utility. It's just for fun. Don't invest your life
                  savings.
                </p>
              </div>
              <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-400/50">
                <h2 className="text-xl font-bold mb-2 text-purple-300">Warning</h2>
                <p className="text-purple-100">
                  This is not financial advice. DYOR. You will probably lose all your money. But at least you'll have
                  fun!
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                className="bg-[#c1ff72] hover:bg-[#a8e65a] text-black font-bold text-lg px-8 py-6 flex items-center gap-2"
                onClick={() => window.open(buyMoniUrl, "_blank")}
              >
                <Image src="/kuru-logo.png" alt="Kuru Logo" width={24} height={24} className="object-contain" />
                BUY $MONI
              </Button>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="https://x.com/MonadMoni"
                target="_blank"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <Image src="/x-logo.png" alt="X Logo" width={20} height={20} className="object-contain" />
                <span>Follow @MonadMoni</span>
              </Link>
            </div>
          </div>
        </WindowsWindow>
      )}

      {/* Recycle Bin Window */}
      {activeWindow === "recyclebin" && (
        <WindowsWindow
          title="Notepad - Here is Megaeth LMAO.txt"
          onClose={() => setActiveWindow(null)}
          className=""
          isNotepad={true}
        >
          <div className="p-4 font-mono text-black bg-white h-[300px] w-full">Here is Megaeth LMAO</div>
        </WindowsWindow>
      )}

      {/* Us Heart Window */}
      {activeWindow === "us-heart" && (
        <WindowsWindow title="us <3" onClose={() => setActiveWindow(null)} className="">
          <div className="p-4 text-center">
            <div className="relative w-full h-[60vh]">
              <Image src="/us-heart.png" alt="Us Heart" fill className="object-contain" />
            </div>
          </div>
        </WindowsWindow>
      )}

      {/* Taskbar */}
      <div className="bg-gradient-to-r from-[#2a5ede] to-[#5a93ee] border-t-2 border-[#0c3d99] h-10 fixed bottom-0 left-0 right-0 z-20">
        <div className="flex items-center h-full">
          <button
            className="bg-gradient-to-b from-[#3c8f3c] to-[#1e6b1e] text-white font-bold px-4 h-8 rounded-md ml-1 flex items-center gap-2 hover:from-[#4ca54c] hover:to-[#2a7a2a]"
            onClick={() => {
              setLastClickedIcon("start")
              handleIconClick("home")
            }}
          >
            <div className="w-4 h-4 relative mr-1">
              <Image src="/moni-logo.png" alt="MONI Logo" fill className="object-contain" />
            </div>
            <span className="text-sm">start</span>
          </button>

          {activeWindow && (
            <div className="bg-[#3c77d9] ml-2 px-4 h-8 rounded-t-md text-white flex items-center">
              {activeWindow === "home" && (
                <div className="w-4 h-4 relative mr-2">
                  <Image src="/moni-logo.png" alt="MONI Logo" fill className="object-contain" />
                </div>
              )}
              <span className="text-sm">
                {activeWindow === "home"
                  ? "MONI on Monad - $MONI"
                  : activeWindow === "recyclebin"
                    ? "Notepad - Here is Megaeth LMAO.txt"
                    : "us <3"}
              </span>
            </div>
          )}

          <div className="ml-auto bg-[#1a56c9] px-4 h-full flex items-center text-white text-sm">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </main>
  )
}
