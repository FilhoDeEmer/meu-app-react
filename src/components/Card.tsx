type CardProps = {
  title: string;
  description?: string;
  onAdd?: () => void;
  onView?: () => void;
  imgURL?: string;
  badge?: string;
  items?: string[];
  onRemoveItem?: (id: string) => void;
};

export default function Card({
  title,
  description,
  imgURL,
  badge,
  items = [],
}: CardProps) {
  return (
    <section className="card" aria-label={`Card ${title}`}>
      <div className="card-header">
        {imgURL && (
          <div className="card-image-wrapper">
            <img src={imgURL} alt={title} className="card-image" />
          </div>
        )}
        {badge && (
          <span className="badge" aria-label="Indicador">
            <span aria-hidden> </span> {badge}
          </span>
        )}
      </div>
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-desc">{description}</p>}

      {items.length > 0 && (
        <div className="chips" arial-label="Conteúdos Selecionados">
          {items.map((it) => (
            <span key={it} className="chip">
              <span aria-label="Icone aqui"></span>
              {it}
            </span>
          ))}
        </div>
      )}

    </section>
  );
}
