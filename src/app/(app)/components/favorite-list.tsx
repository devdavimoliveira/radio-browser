'use client'

import { StationContext } from '@/contexts/station-context'
import { useContextSelector } from 'use-context-selector'
import { Pencil, CirclePlay, Trash2 } from 'lucide-react'

export default function FavoriteList() {
  const favorites = useContextSelector(
    StationContext,
    (context) => context.favorites,
  )

  const removeFromFavorites = useContextSelector(
    StationContext,
    (context) => context.removeFromFavorites,
  )

  return (
    <ul className="flex h-[calc(100%-3.25rem)] flex-col gap-5 overflow-y-auto pr-4 [scrollbar-color:#27272a_transparent]">
      {favorites.map((station) => (
        <li
          key={station.stationuuid}
          className="rounded-lg bg-zinc-800 px-5 py-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button title="Tocar Rádio">
                <CirclePlay size={28} />
              </button>
              <span className="text-lg">{station.name}</span>
            </div>

            <div className="flex gap-4">
              <button title="Editar Rádio" className="mx-auto">
                <Pencil size={24} />
              </button>
              <button
                title="Remover Rádio"
                className="block"
                onClick={() => removeFromFavorites(station)}
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
