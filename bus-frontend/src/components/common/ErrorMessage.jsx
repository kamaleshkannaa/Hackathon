const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
    <p className="text-danger mb-2">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="text-primary hover:underline text-sm">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;