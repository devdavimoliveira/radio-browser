import { Country } from '@/@types/country'

export async function getCountries() {
  const response = await fetch(
    'https://de1.api.radio-browser.info/json/countries',
  )
  const countries: Country[] = await response.json()

  return countries
}
