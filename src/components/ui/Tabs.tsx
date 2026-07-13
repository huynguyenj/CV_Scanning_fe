import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import type { Dispatch, SetStateAction } from 'react'
import type React from 'react'
const tabVariants = cva(
      'flex gap-2 item-center px-1 py-1 rounded-xl w-fit',
      {
            variants: {
                  variant: {
                        default: 'bg-transparent',
                        primary: 'bg-deep-cove text-light-white',
                        secondary: 'bg-ebony-grey text-light-white'
                  },
                  default: {
                        variant: 'default',
                  }
            },
      }
)

function Tabs({
      className,
      variant='default',
      children,
      ...props
}: React.ComponentProps<'div'> & VariantProps<typeof tabVariants>) {
  return (
    <div
      data-slot='tabs'
      className={cn(tabVariants({variant, className}))}
      {...props}
    >
      {children}
    </div>
  )
}

function TabTrigger({ onSelect, value, content, className, isSelect= false, isDisable= false }: { onSelect: Dispatch<SetStateAction<string>>, value: string, content: string, className?: string, isSelect: boolean, isDisable?: boolean }) {
      const styleSelect = isSelect ? 'border-2 border-white/80' : 'border-none'       
      const disabledStyle = isDisable === false ? '' : 'opacity-60'
      return <button disabled={isDisable} onClick={() => onSelect(value)} className={cn(className, styleSelect, 'px-2 rounded-md hover:text-gray-200', disabledStyle)}>{content}</button>
}

export { Tabs, TabTrigger }