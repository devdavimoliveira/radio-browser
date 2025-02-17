'use client'

import { useSearchParams } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getStationsByFilter } from '@/http/get-stations-by-filters'
import {
  CircleArrowDown,
  CircleCheck,
  CirclePause,
  CirclePlay,
  CirclePlus,
} from 'lucide-react'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { StationContext } from '@/contexts/station-context'
import { useContextSelector } from 'use-context-selector'
import { AudioContext } from '@/contexts/audio-context'

export function SideStationList() {
  const searchParams = useSearchParams()

  const countrycode = searchParams.get('countrycode') ?? 'BR'
  const name = searchParams.get('name') ?? ''
  const language = searchParams.get('language') ?? ''

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['stations', { countrycode, name, language }],
    queryFn: ({ pageParam = 0 }) =>
      getStationsByFilter({
        countrycode,
        name,
        language,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length * 10 : undefined
    },
  })

  const addToFavorites = useContextSelector(
    StationContext,
    (context) => context.addToFavorites,
  )

  const removeFromFavorites = useContextSelector(
    StationContext,
    (context) => context.removeFromFavorites,
  )

  const findInFavorites = useContextSelector(
    StationContext,
    (context) => context.findInFavorites,
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
    <ul className="flex flex-grow flex-col gap-5 overflow-y-auto overflow-x-hidden pr-2 [scrollbar-color:#18181b_transparent]">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <li
              key={index}
              className="h-[3.75rem] shrink-0 animate-pulse rounded-lg bg-zinc-900"
            />
          ))
        : data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group.map((station) => (
                <li
                  key={station.stationuuid}
                  className="flex items-center gap-4 rounded-lg bg-zinc-900 p-5"
                >
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
                  {station.name}
                  {findInFavorites(station) !== undefined ? (
                    <button
                      onClick={() => removeFromFavorites(station)}
                      className="ml-auto"
                    >
                      <CircleCheck size={22} />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorites(station)}
                      className="ml-auto"
                    >
                      <CirclePlus size={22} />
                    </button>
                  )}
                </li>
              ))}
            </Fragment>
          ))}
      <li>
        <button
          title="Carregar mais"
          className={cn(
            'mx-auto -mt-6 block animate-bounce',
            !hasNextPage && 'hidden',
          )}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          <CircleArrowDown size={32} />
        </button>
      </li>
    </ul>
  )
}
