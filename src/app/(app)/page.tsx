import FavoriteList from './components/favorite-list'

export default function Home() {
  return (
    <div className="h-[calc(100%-3.5rem)] p-4">
      <h2 className="mb-5 text-2xl font-medium">Rádios Favoritas</h2>
      <FavoriteList />
    </div>
  )
}
