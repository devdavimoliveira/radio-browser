import { useRef, useState } from 'react'
import { createContext } from 'use-context-selector'
import { Station } from '@/@types/station'

interface AudioContextType {
  currentStation: Station | null
  playStation: (station: Station) => Promise<void>
  pauseStation: () => void
}

export const AudioContext = createContext({} as AudioContextType)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentStation, setCurrentStation] = useState<Station | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  async function playStation(station: Station) {
    try {
      if (!audio.current) {
        audio.current = new Audio(station.url_resolved)
      } else {
        audio.current.src = station.url_resolved
      }

      await audio.current.play()
      setCurrentStation(station)
    } catch (e) {
      console.log('Error when playing station', e)
    }
  }

  function pauseStation() {
    try {
      if (!audio.current) return

      audio.current.pause()
      setCurrentStation(null)
    } catch {
      console.log('Error when pausing station')
    }
  }

  return (
    <AudioContext.Provider
      value={{ currentStation, playStation, pauseStation }}
    >
      {children}
    </AudioContext.Provider>
  )
}
