interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M16 6L8 26h4l2-5h4l2 5h4L16 6zm0 8l2 5h-4l2-5z" fill="currentColor" />
      <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
