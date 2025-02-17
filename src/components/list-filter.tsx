'use client'

import { ListFilter as ListFilterIcon } from 'lucide-react'
import { useState } from 'react'
import { ListFilterForm } from './forms/list-filter-form'

export function ListFilter() {
  const [openFilter, setOpenFilter] = useState(false)

  function toggleOpenFilter() {
    setOpenFilter((prevState) => !prevState)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleOpenFilter}
        className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2"
      >
        <ListFilterIcon size={28} />
        <span className="text-lg font-medium">Filtros</span>
      </button>

      {openFilter && <ListFilterForm onClose={() => setOpenFilter(false)} />}
    </div>
  )
}
