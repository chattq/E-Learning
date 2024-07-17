import { ReactNode, forwardRef } from "react";

interface CardLayoutProps {
  children?: ReactNode;
  className?: String;
  title?: String;
}
export const CardLayout = forwardRef(
  ({ children, className, title }: CardLayoutProps, ref: any) => {
    return (
      <div
        className={`px-[24px] pb-[24px] pt-[16px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff] ${className}`}>
        {title && (
          <div className="font-bold text-[20px] border-b-[0.5px] pb-1">
            {title}
          </div>
        )}
        {children}
      </div>
    );
  }
);
