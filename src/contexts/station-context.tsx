import { useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { Station } from '@/@types/station'

interface StationContextType {
  favorites: Station[]
  addToFavorites: (station: Station) => void
  removeFromFavorites: (station: Station) => void
  findInFavorites: (station: Station) => Station | undefined
}

export const StationContext = createContext({} as StationContextType)

export function StationProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Station[]>([])

  function addToFavorites(station: Station) {
    const updatedFavorites = [...favorites, station]

    setFavorites(updatedFavorites)

    localStorage.setItem(
      '@radiobrowser:favorites',
      JSON.stringify(updatedFavorites),
    )
  }

  function removeFromFavorites(station: Station) {
    const filteredFavorites = favorites.filter(
      (s) => s.stationuuid !== station.stationuuid,
    )

    setFavorites(filteredFavorites)

    localStorage.setItem(
      '@radiobrowser:favorites',
      JSON.stringify(filteredFavorites),
    )
  }

  function findInFavorites(station: Station) {
    return favorites.find((s) => s.stationuuid === station.stationuuid)
  }

  useEffect(() => {
    const favoritesFromLocalStorage = localStorage.getItem(
      '@radiobrowser:favorites',
    )

    if (favoritesFromLocalStorage) {
      setFavorites(JSON.parse(favoritesFromLocalStorage))
    }
  }, [])

  return (
    <StationContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        findInFavorites,
      }}
    >
      {children}
    </StationContext.Provider>
  )
}
