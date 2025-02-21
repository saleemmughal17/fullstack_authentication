// // Button Component
// export function Button({ children, onClick, variant = 'default', className = '' }) {
//   const baseStyles = 'px-4 py-2 rounded-2xl font-semibold transition-colors';
//   const variantStyles = {
//     default: 'bg-blue-500 text-white hover:bg-blue-600',
//     destructive: 'bg-red-500 text-white hover:bg-red-600',
//   };
//   return (
//     <button
//       onClick={onClick}
//       className={`${baseStyles} ${variantStyles[variant]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }