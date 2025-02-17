import { Language } from '@/@types/language'

export async function getLanguages() {
  const response = await fetch(
    'https://de1.api.radio-browser.info/json/languages',
  )
  const languages: Language[] = await response.json()

  return languages
}
