import { useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { Station } from '@/@types/station'

interface StationContextType {
  favorites: Station[]
  isFavoritesLoading: boolean
  addToFavorites: (station: Station) => void
  removeFromFavorites: (station: Station) => void
  findInFavorites: (station: Station) => Station | undefined
  updateStation: (station: Station) => void
}

export const StationContext = createContext({} as StationContextType)

export function StationProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Station[]>([])
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true)

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

  function updateStation(station: Station) {
    const updatedStation = findInFavorites(station)

    if (!updatedStation) return

    updatedStation.name = station.name
    updatedStation.url = station.url
    updatedStation.url_resolved = station.url_resolved

    const updatedFavorites = favorites.map((s) => {
      if (s.stationuuid === station.stationuuid) {
        s = updatedStation
        return s
      }
      return s
    })

    setFavorites(updatedFavorites)

    localStorage.setItem(
      '@radiobrowser:favorites',
      JSON.stringify(updatedFavorites),
    )
  }

  useEffect(() => {
    const favoritesFromLocalStorage = localStorage.getItem(
      '@radiobrowser:favorites',
    )

    if (favoritesFromLocalStorage) {
      setFavorites(JSON.parse(favoritesFromLocalStorage))
    }

    setTimeout(() => setIsFavoritesLoading(false), 1000)
  }, [])

  return (
    <StationContext.Provider
      value={{
        favorites,
        isFavoritesLoading,
        addToFavorites,
        removeFromFavorites,
        findInFavorites,
        updateStation,
      }}
    >
      {children}
    </StationContext.Provider>
  )
}
