import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-stone-800/50 backdrop-blur-sm rounded-xl border border-stone-700 shadow-lg ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  return (
    <div className={`p-5 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div className={`p-5 pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <div className={`p-5 pt-0 ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter };