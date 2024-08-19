/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from "classnames";
interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "yellow" | "teal" | "silver";
  children: any;
  block?: boolean;
  size?: "lg" | "md";
  [key: string]: any;
}
export const Button = ({
  type = "button",
  variant = "yellow",
  children,
  block,
  size = "lg",
  ...rest
}: Props) => {
  const btnClasses: Record<string, string> = {
    yellow: "bg-light-yellow shadow-[0px_8px_0px_0px_#CC8B13] hover:bg-",
    teal: "bg-light-blue shadow-[0px_8px_0px_0px_#118C87] hover:bg-light-blue-hover",
    silver: "bg-silver shadow-[0px_8px_0px_0px_#6B8997] hover:bg-silver-hover",
  };

  const btnSizeClasses: Record<string, string> = {
    lg: "h-[67px] px-6 py-3",
    md: "h-[48px] px-4 py-2",
  };

  return (
    <button
      type={type}
      className={cx(
        "rounded-lg w-full",
        btnClasses[variant],
        btnSizeClasses[size],
        block ? "w-full" : "w-max"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
