import NavBar from '@/app/components/nav-bar'

export default function PageLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' flex flex-col items-center max-w-7xl mx-auto  relative'>
      <NavBar />
      {children}
    </main>
  )
}
