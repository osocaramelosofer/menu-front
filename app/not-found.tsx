function NotFoundPage () {
  return (
    <section className=' flex flex-col gap-4 justify-center items-center flex-1 w-full min-h-screen'>
      <h1 className=' text-center font-semibold text-2xl'>
        Not found <br /> ¯\_(ツ)_/¯
      </h1>
      <a
        className=' text-warning bg-warning/10 px-6 py-2 capitalize rounded-lg'
        href='/'
      >
        Go back to home
      </a>
    </section>
  )
}

export default NotFoundPage
