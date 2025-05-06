"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import WindowsWindow from "@/components/windows-window"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const startupSoundRef = useRef<HTMLAudioElement>(null)
  const logonSoundRef = useRef<HTMLAudioElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [soundsLoaded, setSoundsLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Verificar si los archivos de audio existen
    const checkAudioFiles = async () => {
      try {
        // Comprobar si los archivos existen sin intentar reproducirlos
        const logonResponse = await fetch("/windows-xp-logon.mp3", { method: "HEAD" })
        const startupResponse = await fetch("/windows-xp-startup.mp3", { method: "HEAD" })

        if (logonResponse.ok && startupResponse.ok) {
          setSoundsLoaded(true)
          console.log("Audio files loaded successfully")
        } else {
          console.error(
            "Audio files not found:",
            logonResponse.ok ? "" : "logon sound missing",
            startupResponse.ok ? "" : "startup sound missing",
          )
        }
      } catch (error) {
        console.error("Error checking audio files:", error)
      }
    }

    checkAudioFiles()

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleLogin = () => {
    if (password === "I WILL BE RUGGED") {
      setLoggedIn(true)
      setPasswordError("")

      // Solo intentar reproducir sonidos si están cargados
      if (soundsLoaded) {
        // Play Windows XP logon sound
        if (logonSoundRef.current) {
          logonSoundRef.current.play().catch((e) => console.error("Error playing logon sound:", e))
        }

        // Play Windows XP startup sound after login
        setTimeout(() => {
          if (startupSoundRef.current) {
            startupSoundRef.current.play().catch((e) => console.error("Error playing startup sound:", e))
          }
        }, 1500)
      }
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

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-[#235abd] text-white font-windows">
        {/* Cargar audio solo si los archivos existen */}
        {soundsLoaded && (
          <>
            <audio
              ref={logonSoundRef}
              src="/windows-xp-logon.mp3"
              preload="auto"
              onError={(e) => console.error("Error loading logon sound:", e)}
            />
            <audio
              ref={startupSoundRef}
              src="/windows-xp-startup.mp3"
              preload="auto"
              onError={(e) => console.error("Error loading startup sound:", e)}
            />
          </>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#0c57d0] border-2 border-white rounded-lg shadow-lg p-8 w-[400px] max-w-[90vw]">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 relative mr-4 border-2 border-white rounded-lg overflow-hidden">
                <Image src="/user-avatar.png" alt="User Avatar" fill className="object-cover" />
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
        {/* KryptoBaby777 Icon */}
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => window.open("https://x.com/kryptobaby777", "_blank")}
        >
          <div className="w-12 h-12 relative">
            <Image src="/x-logo.png" alt="X Logo" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm">KryptoBaby777</span>
        </button>

        {/* Monad Icon */}
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => window.open("https://testnet.monad.xyz", "_blank")}
        >
          <div className="w-12 h-12 relative">
            <Image src="/monad-logo.png" alt="Monad Logo" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm">Monad</span>
        </button>

        {/* Creator Icon */}
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => window.open("https://x.com/facugod0", "_blank")}
        >
          <div className="w-12 h-12 relative">
            <Image src="/x-logo.png" alt="X Logo" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm">Creator</span>
        </button>

        {/* Buy $KB Icon */}
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => window.open("https://kuru.io", "_blank")}
        >
          <div className="w-12 h-12 relative">
            <Image src="/kb-logo.png" alt="KB Logo" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm">Buy $KB</span>
        </button>

        {/* Recycle Bin Icon */}
        <button className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24">
          <div className="w-12 h-12 relative">
            <Image src="/recycle-bin.png" alt="Recycle Bin" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm">Recycle Bin</span>
        </button>
      </div>

      {/* Center File Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => setActiveWindow("home")}
        >
          <div className="w-16 h-16 relative">
            <Image src="/txt-file.png" alt="Text File" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm font-bold">OPEN ME</span>
        </button>
      </div>

      {/* WinRAR Icon (Bottom Right) */}
      <div className="absolute bottom-16 right-4 z-10">
        <button
          className="flex flex-col items-center justify-center gap-2 p-2 rounded hover:bg-blue-500/20 transition-colors w-24"
          onClick={() => setActiveWindow("us-heart")}
        >
          <div className="w-16 h-16 relative">
            <Image src="/winrar.png" alt="WinRAR" fill className="object-contain" />
          </div>
          <span className="text-white text-shadow text-sm font-bold">?</span>
        </button>
      </div>

      {/* Windows */}
      {activeWindow === "home" && (
        <WindowsWindow
          title="KryptoBaby777 - $KB"
          onClose={() => setActiveWindow(null)}
          className=""
          backgroundImage="/pikachu-bg.png"
        >
          <div className="p-6 text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-yellow-300 animate-pulse">$KB</h1>
              <p className="text-xl mb-6">$KB is just for fun and to glorify KryptoBaby777, have fun.</p>
              <div className="bg-black/50 p-4 rounded-lg mb-8 border-2 border-yellow-500/50">
                <p className="text-lg italic text-yellow-200">
                  We love Pikachu, we love KB, it's just a meme, you'll be rugged, probably nothing.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/50">
                <h2 className="text-xl font-bold mb-2 text-yellow-300">About $KB</h2>
                <p>
                  This is a meme token. It has no value. It has no utility. It's just for fun. Don't invest your life
                  savings.
                </p>
              </div>
              <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/50">
                <h2 className="text-xl font-bold mb-2 text-red-300">Warning</h2>
                <p>
                  This is not financial advice. DYOR. You will probably lose all your money. But at least you'll have
                  fun!
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6"
                onClick={() => window.open("https://kuru.io", "_blank")}
              >
                BUY $KB
              </Button>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="https://x.com/kryptobaby777"
                target="_blank"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Image src="/x-logo.png" alt="X Logo" width={20} height={20} className="object-contain" />
                <span>Follow @kryptobaby777</span>
              </Link>
            </div>
          </div>
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
            onClick={() => setActiveWindow("home")}
          >
            <span className="text-sm">start</span>
          </button>

          {activeWindow && (
            <div className="bg-[#3c77d9] ml-2 px-4 h-8 rounded-t-md text-white flex items-center">
              <span className="text-sm">{activeWindow === "home" ? "KryptoBaby777 - $KB" : "us <3"}</span>
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
