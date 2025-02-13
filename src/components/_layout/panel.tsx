import { Sidebar } from './sidebar'

interface PanelProps {
  children: React.ReactNode
}
export function Panel({ children }: PanelProps) {
  return (
    <>
      <Sidebar />
      <main className="h-screen lg:ml-80">{children}</main>
    </>
  )
}
