type CardProps = {
  title: string;
  description?: string;
  imgURL?: string;
  badge?: string;
  items?: string[];
};

export default function Card({
  title,
  description,
  imgURL,
  items = [],
}: CardProps) {
  return (
    <section className="ingcard" aria-label={`Card ${title}`}>
      <div className="ingcard-header">
        {imgURL && (
          <div className="ingcard-image-wrapper">
            <img src={imgURL} alt={title} className="ingcard-image" />
          </div>
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
