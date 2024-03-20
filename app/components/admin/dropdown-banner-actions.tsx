'use client'
import type { IBanner } from '@/interfaces/store'
import { deleteBanner } from '@/lib/actions/banner.actions'
import {
  Button,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch
} from '@nextui-org/react'
import { useState } from 'react'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'

export default function DropdownBannerActions ({ banner }: { banner: IBanner }) {
  const [loading, setLoading] = useState(false)

  const handleDeleteBanner = async () => {
    setLoading(true)
    await deleteBanner(banner.id)
  }

  return (
    <Dropdown showArrow backdrop='opaque'>
      <DropdownTrigger>
        <Button
          as={Code}
          size='sm'
          isIconOnly
          variant='faded'
          radius='full'
          color='primary'
        >
          <FaEllipsisV />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={['edit']} aria-label='Static Actions'>
        <DropdownItem
          showDivider
          textValue='Product Info'
          key='product-info'
          className='h-14 gap-2'
        >
          <p>Acciones para</p>
          <p className='font-semibold'>{banner.title}</p>
        </DropdownItem>
        <DropdownItem
          textValue='switch to update availability'
          isReadOnly
          showDivider
          key='edit'
          endContent={
            <Switch
              size='sm'
              color='success'
              defaultSelected
              aria-label='Automatic updates'
            />
          }
        >
          Banner <br /> <strong>Disponible</strong>
        </DropdownItem>
        <DropdownItem
          isReadOnly
          textValue='delete product'
          onPress={handleDeleteBanner}
          key='delete'
          className='text-danger'
          color='danger'
        >
          <Button
            isDisabled={loading}
            isLoading={loading}
            size='sm'
            fullWidth
            color='danger'
            startContent={<FaTrash />}
            onPress={handleDeleteBanner}
          >
            Eliminar Banner
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
