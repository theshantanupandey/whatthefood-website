
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      // Enhanced accessibility
      closeButton
      richColors
      expand={false}
      position="top-right"
      // Ensure screen readers announce toasts
      toastOptions={{
        ...props.toastOptions,
        classNames: {
          ...(props.toastOptions?.classNames || {}),
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        },
        // Add ARIA attributes for better accessibility
        jsx: ({ id, title, description }) => (
          <div role="alert" aria-live="assertive" aria-atomic="true">
            {title && <h3 id={`toast-title-${id}`}>{title}</h3>}
            {description && <div id={`toast-description-${id}`}>{description}</div>}
          </div>
        ),
      }}
      {...props}
    />
  )
}

export { Toaster }
