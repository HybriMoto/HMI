import SectionLabel from "./SectionLabel";

function PageHeader({ number, label, title, description }) {
  return (
    <header className="page-header">
      <SectionLabel number={number}>{label}</SectionLabel>

      <div className="page-header-content">
        <h1>{title}</h1>

        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

export default PageHeader;