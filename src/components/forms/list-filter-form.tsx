'use client'

import { useQuery } from '@tanstack/react-query'
import { getCountries } from '@/http/get-countries'
import { getLanguages } from '@/http/get-languages'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUpdateSearchParams } from '@/hooks/use-update-search-params'

interface ListFilterFormProps {
  onClose: () => void
}

const filterFormSchema = z.object({
  name: z.string(),
  countrycode: z.string(),
  language: z.string(),
})

type FilterFormSchema = z.infer<typeof filterFormSchema>

export function ListFilterForm({ onClose }: ListFilterFormProps) {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(filterFormSchema),
  })

  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  })

  const { data: languages } = useQuery({
    queryKey: ['languages'],
    queryFn: () => getLanguages(),
  })

  const updateSearchParams = useUpdateSearchParams()

  function handleFilterFormSubmit(data: FilterFormSchema) {
    updateSearchParams({
      name: data.name,
      countrycode: data.countrycode,
      language: data.language,
    })

    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterFormSubmit)}
      className="absolute mt-2 flex w-60 flex-col gap-2 rounded-lg border-2 border-white bg-zinc-900 p-4"
    >
      <button
        type="button"
        title="Fechar filtros"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <label htmlFor="name">Nome da Rádio</label>
      <input
        type="text"
        autoComplete="off"
        className="h-10 w-full rounded-lg indent-1 text-black"
        {...register('name')}
      />

      <label htmlFor="countries">País</label>
      <select
        id="countries"
        className="h-10 w-full rounded-lg text-black"
        {...register('countrycode')}
      >
        <option value=""></option>
        {countries?.map((country) => (
          <option key={country.iso_3166_1} value={country.iso_3166_1}>
            {country.name}
          </option>
        ))}
      </select>

      <label htmlFor="languages">Idioma</label>
      <select
        id="languages"
        className="h-10 w-full rounded-lg text-black"
        {...register('language')}
      >
        <option value=""></option>
        {languages?.map((language) => (
          <option key={language.name} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        title="Aplicar filtros"
        className="h-10 rounded-lg bg-zinc-800 text-lg font-bold"
      >
        Aplicar
      </button>
    </form>
  )
}
