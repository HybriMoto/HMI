import { Link } from "react-router-dom";

function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
}) {
  const classes = `button button-${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span>{children}</span>
        <span className="button-arrow">↗</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        <span>{children}</span>
        <span className="button-arrow">↗</span>
      </a>
    );
  }

  return (
    <button className={classes}>
      <span>{children}</span>
      <span className="button-arrow">↗</span>
    </button>
  );
}

export default Button;