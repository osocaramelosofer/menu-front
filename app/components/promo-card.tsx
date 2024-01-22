import React from 'react'

import CardsCarousel from './carousel/cards-carousel'

export default function PromoCard () {
  const promos = [
    {
      id: 1,
      img: 'https://i.imgur.com/jnhwrtYl.png',
      title: 'Cafés de Chiapas, Guerrero y Oaxaca',
      subtitle:
        'En nuestro menú, tienes la libertad de elegir los granos de café de cualquier estado. ¡Disfruta de la diversidad de sabores que ofrecen nuestros cafés!'
    },
    {
      id: 2,
      img: 'https://i.imgur.com/IH7UqrEl.png',
      title: 'Diviértete con ¡Pinta y Crea!',
      subtitle:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quibusdam ea voluptate similique repellat inventore!'
    },
    {
      id: 3,
      img: 'https://i.imgur.com/es71a9rl.png',
      title: 'Bienvenido a Dulce Trago',
      subtitle:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quibusdam ea voluptate similique repellat inventore!'
    }
  ]
  return (
    <section className='self-center'>
      <CardsCarousel data={promos} />
    </section>
  )
}
