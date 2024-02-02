const SharedCart = ({
  productos,
  agregarProducto
}: {
  productos: any
  agregarProducto: any
}) => {
  return (
    <div>
      <button
        onClick={() => {
          agregarProducto({ nombre: 'Producto Ejemplo', usuario: 'Usuario1' })
        }}
      >
        Agregar Producto
      </button>

      {productos.map((producto, index) => (
        <div key={index}>
          {producto.nombre} - Agregado por {producto.usuario}
        </div>
      ))}
    </div>
  )
}

export default SharedCart
