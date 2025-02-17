import { Suspense } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Menu, X } from 'lucide-react'
import { SideStationList } from '../side-station-list'
import { ListFilter } from '../list-filter'

export function SheetMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="block lg:hidden">
          <Menu size={32} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/10 backdrop-blur-md" />
        <Dialog.Content asChild>
          <div className="fixed left-0 top-0 flex h-full w-80 flex-col gap-2 bg-zinc-800 p-4">
            <Dialog.Title asChild>
              <h3 className="text-2xl font-medium">Rádios</h3>
            </Dialog.Title>
            <VisuallyHidden asChild>
              <Dialog.Description>Lista de Rádios</Dialog.Description>
            </VisuallyHidden>
            <Dialog.Close asChild>
              <button className="absolute right-2 top-2">
                <X size={28} />
              </button>
            </Dialog.Close>
            <ListFilter />
            <Suspense>
              <SideStationList />
            </Suspense>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
