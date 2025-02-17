'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StationProvider } from '@/contexts/station-context'
import { AudioProvider } from '@/contexts/audio-context'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <StationProvider>
        <AudioProvider>{children}</AudioProvider>
      </StationProvider>
    </QueryClientProvider>
  )
}
