'use client'

import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { StationContext } from '@/contexts/station-context'
import { AudioContext } from '@/contexts/audio-context'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, CirclePlay, Trash2, CirclePause, X } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { EditStationForm } from '@/components/forms/edit-station-form'
import { Station } from '@/@types/station'

export default function FavoriteList() {
  const [editStationOpen, setEditStationOpen] = useState(false)
  const [stationBeingEdited, setStationBeingEdited] = useState<Station | null>(
    null,
  )

  const favorites = useContextSelector(
    StationContext,
    (context) => context.favorites,
  )

  const removeFromFavorites = useContextSelector(
    StationContext,
    (context) => context.removeFromFavorites,
  )

  const currentStation = useContextSelector(
    AudioContext,
    (context) => context.currentStation,
  )

  const playStation = useContextSelector(
    AudioContext,
    (context) => context.playStation,
  )

  const pauseStation = useContextSelector(
    AudioContext,
    (context) => context.pauseStation,
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
              {currentStation?.stationuuid === station.stationuuid ? (
                <button title="Pausar Rádio" onClick={pauseStation}>
                  <CirclePause size={28} />
                </button>
              ) : (
                <button
                  title="Tocar Rádio"
                  onClick={() => playStation(station)}
                >
                  <CirclePlay size={28} />
                </button>
              )}
              <span className="text-lg">{station.name}</span>
            </div>

            <div className="flex gap-4">
              <Dialog.Root
                open={editStationOpen}
                onOpenChange={setEditStationOpen}
              >
                <Dialog.Trigger asChild>
                  <button
                    title="Editar Rádio"
                    className="mx-auto"
                    onClick={() => setStationBeingEdited(station)}
                  >
                    <Pencil size={24} />
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/10 backdrop-blur-md" />
                  <Dialog.Content asChild>
                    <div className="fixed left-1/2 top-1/2 w-[90vw] max-w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-zinc-800 p-4">
                      <Dialog.Title asChild>
                        <h3 className="text-2xl font-medium">Editar Rádio</h3>
                      </Dialog.Title>
                      <VisuallyHidden asChild>
                        <Dialog.Description>
                          Editar Rádio {station.name}
                        </Dialog.Description>
                      </VisuallyHidden>
                      <Dialog.Close asChild>
                        <button
                          title="Fechar editor"
                          className="absolute right-2 top-2"
                        >
                          <X size={28} />
                        </button>
                      </Dialog.Close>
                      {stationBeingEdited && (
                        <EditStationForm
                          station={stationBeingEdited}
                          onClose={() => setEditStationOpen(false)}
                        />
                      )}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

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
