import { useState, useCallback } from "react";

/**
 * useToast — lightweight toast notification hook.
 *
 * Returns `toasts` (array of active toasts) and `showToast(message, type)`.
 * Each toast auto-dismisses after 3 seconds.
 *
 * @returns {{ toasts: Array<{id: number, message: string, type: string}>, showToast: Function }}
 */
export default function useToast() {
  const [toasts, setToasts] = useState([]);

  /**
   * Display a new toast notification.
   * @param {string} message - The text to display in the toast.
   * @param {'success'|'error'} type - Visual style of the toast.
   */
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();

    // Add the new toast to the list
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, showToast };
}
