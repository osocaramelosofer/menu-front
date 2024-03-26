interface EmptyStateProps {
  title?: string
  subtitle?: string
}

export default function EmptyData ({ title, subtitle }: EmptyStateProps) {
  return (
    <div className='flex flex-col gap-1 justify-center items-center px-4 py-12 text-center border border-neutral-100 shadow-sm rounded-xl '>
      <h1 className=' text-lg font-semibold'>{title}</h1>
      <p className=' opacity-50 font-medium text-sm'>{subtitle}</p>
    </div>
  )
}
