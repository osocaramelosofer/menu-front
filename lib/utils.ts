export default function cn (...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  // year: 'numeric',
  month: 'long',
  day: 'numeric'
}

export function truncateString (str: string, num: number) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export function formatDate (date: string | undefined) {
  if (date !== undefined) {
    return new Date(date).toLocaleDateString('es-ES', options)
  }
}

export function capitalize (str: string | undefined) {
  if (str !== undefined) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

export function getOptimizedImageUrl (
  mainImageUrl: string,
  width: number | string
) {
  const defaultImageUrl = 'https://i.imgur.com/dAmZQo2l.png'
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

type PaymentType = 'cash' | 'terminal' | 'transfer'

const paymentTypeDisplay: Record<PaymentType, string> = {
  cash: 'Efectivo',
  terminal: 'Terminal',
  transfer: 'Transferencia'
}

export const getPaymentTypeDisplay = (type: PaymentType | string): string => {
  // If 'type' is a key in 'paymentTypeDisplay', return its value.
  // Otherwise, return 'Unknown Payment Type'.
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return paymentTypeDisplay[type as PaymentType] || 'Unknown Payment Type'
}

// export const BASE_URL: string = 'https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1'
export const BASE_URL: string =
  'https://menu-back-nodejs-production.up.railway.app'
// export const BASE_URL: string = 'http://localhost:3001'
