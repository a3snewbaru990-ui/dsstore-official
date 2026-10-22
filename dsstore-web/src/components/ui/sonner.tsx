import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:!rounded-xl group-[.toaster]:!border-border group-[.toaster]:!bg-card group-[.toaster]:!text-ink group-[.toaster]:!shadow-card",
          title: "group-[.toast]:!text-ink",
          description: "group-[.toast]:!text-ink-mute",
          actionButton:
            "group-[.toast]:!bg-lemon group-[.toast]:!text-[#15130b]",
          cancelButton:
            "group-[.toast]:!bg-muted group-[.toast]:!text-ink-soft",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
