import { ReactNode, forwardRef } from "react";

interface CardLayoutProps {
  children?: ReactNode;
  className?: String;
  title?: String;
  textNoChild?: String;
  visible?: boolean;
}
export const CardLayout = forwardRef(
  (
    {
      children,
      className,
      title,
      textNoChild = "Vui lòng thêm content",
      visible = false,
    }: CardLayoutProps,
    ref: any
  ) => {
    return (
      <>
        {!visible && (
          <div
            className={`px-[24px] pb-[24px] pt-[16px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff] ${className}`}>
            {title && (
              <div className="font-bold text-[20px] border-b-[0.5px] pb-1">
                {title}
              </div>
            )}
            {children ? (
              children
            ) : (
              <div className="mt-3 font-medium text-[#999]">{textNoChild}</div>
            )}
          </div>
        )}
      </>
    );
  }
);
