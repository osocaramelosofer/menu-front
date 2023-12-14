export default function HomePage() {
  return (
    <main
      className="flex flex-col items-center justify-center h-screen max-w-7xl gap-4 px-4
       py-8 mx-auto relative"
    >
      <div className="text-center leading-8 md:leading-10 md:text-left">
        <div className="inline-block">
          <h1 className="tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl">
            Let's make your&nbsp;
          </h1>
          <h1 className="tracking-tight inline font-semibold from-[#FF1CF7] to-[#b249f8] text-[2.1rem] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b">
            menu&nbsp;
          </h1>
        </div>
        <h1 className="tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl">
          looks&nbsp;
        </h1>
        <h1 className="tracking-tight inline font-semibold text-[2.1rem] lg:text-5xl">
          wonder.&nbsp;
        </h1>

        <p
          className="w-full my-2 font-normal text-default-500 block max-w-full
         md:w-full text-base lg:text-lg"
        >
          Digital menus for your culinary success.
        </p>
        <div className="flex justify-center lg:justify-start mt-8">
          <a
            className=" text-secondary bg-secondary/10 px-6 rounded-lg"
            href="/dulce-trago"
          >
            Dulce Trago
          </a>
        </div>
      </div>
    </main>
  );
}
