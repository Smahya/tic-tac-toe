import React from "react";
import cx from "classnames";

type Props = {
  children: React.ReactNode;
  type: "teal" | "silver" | "yellow";
  className?: string;
};

export const Card = ({ children, type, className }: Props) => {
  const cardClass = {
    teal: "bg-light-blue",
    silver: "bg-silver",
    yellow: "bg-light-yellow",
  };
  return (
    <div className={cx("rounded-2xl py-3", cardClass[type], className)}>
      {children}
    </div>
  );
};
