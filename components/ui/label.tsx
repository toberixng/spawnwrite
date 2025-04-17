import * as React from 'react'
import { Label as ShadcnLabel } from '@radix-ui/react-label'
import { cn } from '@/lib/utils'

const Label = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  React.ComponentPropsWithoutRef<typeof ShadcnLabel>
>(({ className, ...props }, ref) => (
  <ShadcnLabel
    ref={ref}
    className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
    {...props}
  />
))

Label.displayName = 'Label'
export { Label }
