import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className, ...props }, ref) => {
    const baseClasses = 'font-medium rounded-lg inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900';
    
    const variants = {
      primary: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-stone-900 hover:from-yellow-400 hover:to-amber-400 focus:ring-yellow-500 shadow-md hover:shadow-lg',
      secondary: 'bg-stone-700 text-yellow-300 hover:bg-stone-600 focus:ring-stone-500 border border-stone-600',
      ghost: 'text-stone-200 hover:bg-stone-700/50 focus:ring-stone-500',
      danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 focus:ring-red-500 border border-red-500/30'
    };
    
    const sizes = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3'
    };
    
    const loadingState = isLoading 
      ? 'opacity-70 cursor-not-allowed' 
      : '';
      
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${loadingState} ${className || ''}`;

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Загрузка...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;