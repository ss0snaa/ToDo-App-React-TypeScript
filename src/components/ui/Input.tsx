import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-lg border border-stone-600 bg-stone-800 px-3 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 ${
          className || ''
        }`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;