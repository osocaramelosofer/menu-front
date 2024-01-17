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
        const res = await fetch('https://menu-app-back-2b09f4029d5d.herokuapp.com/api/v1/auth/login/', {
          method: 'POST',
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()

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
