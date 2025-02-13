'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Menu, X } from 'lucide-react'

export function SheetMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="block lg:hidden">
          <Menu size={32} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md" />
        <Dialog.Content
          id="test-cont"
          className="fixed left-0 top-0 z-50 h-full w-80 bg-stone-300"
        >
          <Dialog.Title>Sheet Menu</Dialog.Title>
          <VisuallyHidden asChild>
            <Dialog.Description>Sheet Menu</Dialog.Description>
          </VisuallyHidden>
          <Dialog.Close asChild>
            <button className="absolute right-2 top-2">
              <X size={28} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
