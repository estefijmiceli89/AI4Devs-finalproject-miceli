import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  const getToastTestId = (title: React.ReactNode, id: string): string => {
    if (typeof title === "string") {
      if (title === "Add customizations") {
        return "error-toast-add-customizations";
      }
      if (title === "Maximum charms reached") {
        return "error-toast-max-charms";
      }
      if (title === "Added to cart!") {
        return "success-toast-added-to-cart";
      }
      // Convert title to kebab-case for testid
      return `toast-${title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`;
    }
    return `toast-${id}`;
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const toastTestId = getToastTestId(title, id);
        return (
          <Toast key={id} data-testid={toastTestId} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle data-testid={`${toastTestId}-title`}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription data-testid={`${toastTestId}-description`}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
