function SectionLabel({ number, children, light = false }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;