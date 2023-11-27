import { Button } from '@nextui-org/button'

export default function Home () {
  const name = 'fernando'

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button color="primary">Click me!</Button>

      <h1 className="text-red-200 hover:scale-75">welcome</h1>
    </main>
  )
}
