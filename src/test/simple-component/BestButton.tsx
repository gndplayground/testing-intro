import React from "react";

function BestButton({
  children,
  className = "",
  href,
  ref,
  type,
  ...other
}: React.HTMLProps<HTMLButtonElement | HTMLAnchorElement>) {
  if (href) {
    return (
      <a
        href={href}
        className={`my-button my-button--link ${className}`}
        {...other}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type as any} className={`my-button ${className}`} {...other}>
      {children}
    </button>
  );
}

export default BestButton;
