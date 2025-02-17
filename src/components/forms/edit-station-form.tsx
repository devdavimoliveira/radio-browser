import { Station } from '@/@types/station'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { useContextSelector } from 'use-context-selector'
import { StationContext } from '@/contexts/station-context'

interface EditStationFormProps {
  station: Station
  onClose: () => void
}

const editStationFormSchema = z.object({
  name: z.string().nonempty('Nome da Rádio é obrigatório'),
  url: z.string().nonempty('URL da Rádio é obrigatório'),
})

type EditStationFormSchema = z.infer<typeof editStationFormSchema>

export function EditStationForm({ station, onClose }: EditStationFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editStationFormSchema),
    defaultValues: {
      name: station.name,
      url: station.url,
    },
  })

  const updateStation = useContextSelector(
    StationContext,
    (context) => context.updateStation,
  )

  function handleEditStationFormSubmit(data: EditStationFormSchema) {
    updateStation({
      ...station,
      name: data.name,
      url: data.url,
      url_resolved: data.url,
    })

    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditStationFormSubmit)}
      className="mt-5 flex flex-col gap-5"
    >
      <div>
        <label htmlFor="station-name">Nome da Rádio</label>
        <input
          id="station-name"
          type="text"
          placeholder="Nome da Rádio"
          className={cn(
            'h-10 w-full rounded-lg border-2 border-zinc-900 indent-1 text-black outline-none',
            errors.name && 'border-red-500',
          )}
          {...register('name')}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="station-url">Url da Rádio</label>
        <textarea
          id="station-url"
          placeholder="URL da Stream"
          className={cn(
            'h-[8.75rem] w-full resize-none break-all rounded-lg border-2 border-zinc-900 p-1 text-black outline-none',
            errors.url && 'border-red-500',
          )}
          {...register('url')}
        />
        {errors.url && (
          <span className="text-sm text-red-500">{errors.url.message}</span>
        )}
      </div>

      <button className="h-10 rounded-lg bg-zinc-900 text-lg font-bold">
        Salvar
      </button>
    </form>
  )
}
