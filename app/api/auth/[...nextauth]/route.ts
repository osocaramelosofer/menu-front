import { BASE_URL } from '@/lib/utils'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        // Aquí llamas a tu API de backend para verificar las credenciales
        const res = await fetch(`${BASE_URL}/auth/login/`, {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        console.log('DATAAA: ', data)

        // Verifica si la autenticación fue exitosa y si el objeto tiene la propiedad 'user'
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (res.ok && data.user && !data.detail) {
          // Mapea la respuesta del backend al formato esperado por NextAuth
          const user = {
            id: data.user.id,
            name: data.user.username, // o cualquier otro campo que represente el "nombre" del usuario
            email: data.user.email,
            image: '' // Aquí puedes poner una URL de imagen predeterminada o dejarlo vacío si no tienes esta información
          }
          console.log('USER: ', user)

          return user
        }

        // En caso de error (como credenciales incorrectas), retorna null
        return null
      }
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
