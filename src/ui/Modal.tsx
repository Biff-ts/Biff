// src/ui/components/Modal.tsx
import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

export function Modal({
  open,
  onOpenChange,
  title,
  children
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  children: React.ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-[500px] max-w-full"
          >
            <Dialog.Title className="text-lg font-semibold mb-4">{title}</Dialog.Title>
            <div>{children}</div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
