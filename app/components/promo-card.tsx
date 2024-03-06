import React from 'react'

import CardsCarousel from './carousel/cards-carousel'

export default function PromoCard () {
  const promos = [
    {
      id: 1,
      img: 'https://i.imgur.com/QLXvVjml.png',
      title: 'Cafés de Chiapas, Guerrero y Oaxaca',
      subtitle:
        'En nuestro menú, tienes la libertad de elegir los granos de café de cualquier estado. ¡Disfruta de la diversidad de sabores que ofrecen nuestros cafés!'
    },
    {
      id: 2,
      img: 'https://i.imgur.com/mOULU48l.png',
      title: 'Diviértete con ¡Pinta y Crea!',
      subtitle:
        'Desata tu creatividad y sumérgete en el arte de la pintura en cerámica. Nuestra sección "Pinta y Crea" te invita a elegir entre una encantadora selección de piezas de cerámica y personalizar tu obra con una paleta de colores vibrantes. Es la combinación perfecta de relajación y expresión artística. ¡Crea tu obra maestra hoy!'
    },
    {
      id: 3,
      img: 'https://i.imgur.com/ACGOtHil.png',
      title: 'Bienvenido a Dulce Trago',
      subtitle:
        '¡Bienvenido a Dulce Trago, donde cada sorbo es una invitación al placer! Descubre tu rincón favorito y déjate seducir por el aroma y sabor de nuestro café recién preparado. Ven y endulza tus momentos con nosotros."'
    }
  ]
  return (
    <section className='self-center'>
      <CardsCarousel data={promos} />
    </section>
  )
}
