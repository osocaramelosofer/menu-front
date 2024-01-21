import classNames from 'classnames'

interface Props {
  itemsLength: number
  selectedIndex: number
}
const Dots = ({ itemsLength, selectedIndex }: Props) => {
  const arr = new Array(itemsLength).fill(0)
  return (
    <div className='flex gap-2 my-2 justify-center translate-y-5 z-10'>
      {arr.map((_, index) => {
        const selected = index === selectedIndex
        return (
          <div
            className={classNames({
              'h-[.3rem] w-6  rounded-full transition-all duration-300 bg-indigo-400':
                true,
              // tune down the opacity if slide is not selected
              'opacity-50': !selected
            })}
            key={index}
          ></div>
        )
      })}
    </div>
  )
}
export default Dots
