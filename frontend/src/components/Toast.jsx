import "../styles/Toast.css";

/**
 * Toast — renders a stack of transient notification pills in the top-right corner.
 *
 * Each toast auto-dismisses via the `useToast` hook — this component is purely
 * presentational.
 *
 * @param {{ toasts: Array<{id: number, message: string, type: 'success'|'error'}> }} props
 */
export default function Toast({ toasts }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          {/* Color-coded dot indicator */}
          <span className="toast__icon" />
          {toast.message}
        </div>
      ))}
    </div>
  );
}
