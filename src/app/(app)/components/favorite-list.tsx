import { Pencil, Play, Trash2 } from 'lucide-react'

export default function FavoriteList() {
  return (
    <ul className="flex h-[calc(100%-3.25rem)] flex-col gap-5 overflow-y-auto pr-4 [scrollbar-color:#27272a_transparent]">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className="rounded-lg bg-zinc-800 px-5 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button title="Tocar Rádio">
                <Play size={32} />
              </button>
              <span className="text-lg">Jovem Pan FM - Florianópolis - SC</span>
            </div>

            <div className="flex gap-4">
              <button title="Editar Rádio" className="mx-auto">
                <Pencil size={24} />
              </button>
              <button title="Remover Rádio" className="block">
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
