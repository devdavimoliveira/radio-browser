import { Panel } from '@/components/_layout/panel'
import { Header } from '@/components/_layout/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Panel>
      <Header />
      {children}
    </Panel>
  )
}
