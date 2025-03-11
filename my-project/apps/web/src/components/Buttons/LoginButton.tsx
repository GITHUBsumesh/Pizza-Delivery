import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, icon, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          'group relative flex h-[3.125rem] w-[9.375rem] items-center justify-center overflow-hidden rounded-lg border-none bg-gray-900 font-sans text-xl font-semibold text-gray-50 transition-all duration-500 ease-in-out hover:shadow-[0_0_1.25rem_0_rgba(46,46,46,0.23)] focus:outline-none',
          className,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        <span className="absolute left-0 flex h-[2.5rem] w-[4.375rem] items-center justify-center transition-all duration-500 ease-in-out group-hover:w-full group-active:scale-95">
          {icon || (
            <svg viewBox="0 0 175 80" className="h-[2.5rem] w-[2.5rem]">
              <rect width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect y={30} width={80} height={15} fill="#f0f0f0" rx={10} />
              <rect y={60} width={80} height={15} fill="#f0f0f0" rx={10} />
            </svg>
          )}
        </span>
        <span className="relative transition-all duration-500 ease-in-out group-hover:opacity-0">
          {children}
        </span>
      </button>
    );
  }
);
CustomButton.displayName = "CustomButton";

export default CustomButton;