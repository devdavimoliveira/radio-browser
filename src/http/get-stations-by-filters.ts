import { Station } from '@/@types/station'

type Filter = {
  countrycode: string
  name: string
  language: string
  orderBy?: string
  offset?: number
}

export async function getStationsByFilter({
  countrycode,
  name,
  language,
  orderBy = 'clicktrend',
  offset = 0,
}: Filter) {
  const response = await fetch(
    `https://de1.api.radio-browser.info/json/stations/search?countrycode=${countrycode}&name=${name}&language=${language}&limit=10&offset=${offset}&order=${orderBy}&reverse=true`,
  )
  const stations: Station[] = await response.json()

  return stations
}
