import { Suspense } from 'react'
import { SideStationList } from '../side-station-list'
import { ListFilter } from '../list-filter'

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:gap-2 lg:bg-zinc-800 lg:p-4">
      <h3 className="text-2xl font-medium">Rádios</h3>
      <ListFilter />
      <Suspense>
        <SideStationList />
      </Suspense>
    </aside>
  )
}
