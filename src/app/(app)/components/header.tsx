import { SheetMenu } from '@/components/_layout/sheet-menu'

export function Header() {
  return (
    <header className="relative flex h-14 items-center justify-center">
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <SheetMenu />
      </div>
      <h1 className="text-2xl font-bold">Radio Browser</h1>
    </header>
  )
}
