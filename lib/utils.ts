export default function cn (...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function getOptimizedImageUrl (mainImageUrl: string, width: number | string) {
  const defaultImageUrl = 'https://i.imgur.com/VjWugqll.png'
  if (mainImageUrl === null) {
    return defaultImageUrl
  }

  const pathArray = mainImageUrl.split('/')
  const uploadIndex = pathArray.indexOf('upload')

  if (uploadIndex === -1) {
    // Si no se encuentra el segmento 'upload', devuelve la URL por defecto.
    return defaultImageUrl
  }

  pathArray.splice(uploadIndex + 1, 0, `w_${width},q_auto,f_webp`)
  const optimizedImagePath = pathArray.join('/')
  const cloudinaryBaseUrl = 'https://res.cloudinary.com/drzrkaoje/'
  return cloudinaryBaseUrl + optimizedImagePath
}

// export const BASE_URL: string = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1'
export const BASE_URL: string = '192.168.0.11:8000/api/v1'
