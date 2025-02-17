'use client'

import { useRouter, useSearchParams } from 'next/navigation'

type SearchParamsUpdate = Record<string, string>

export function useUpdateSearchParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateSearchParams(updates: SearchParamsUpdate) {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`?${params.toString()}`)
  }

  return updateSearchParams
}
