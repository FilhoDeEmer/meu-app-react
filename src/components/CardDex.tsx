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

function resolveChipType(
  text: string
): "skill" | "berries" | "ingredients" | null {
  const t = String(text).toLowerCase();

  // Normaliza remoção de espaços extras
  const normalized = t.replace(/\s+/g, " ").trim();

  // Regras simples (pode ajustar conforme seu formato real)
  if (normalized.includes("berries")) {
    return "berries";
  }
  if (normalized.includes("skill")) {
    return "skill";
  }  
  if (normalized.includes("ingredients")) {
    return "ingredients";
  }
  return null;
}

export default function Card({
  title,
  description,
  imgURL,
  items = [],
}: CardProps) {
  return (
    <section className="dexcard" aria-label={`Card ${title}`}>
      <div className="dexcard-header">
        {imgURL && (
          <div className="dexcard-image-wrapper">
            <img src={imgURL} alt={title} className="dexcard-image" />
          </div>
        )}
      </div>

      <h3 className="dexcard-title">{title}</h3>

      {description && <p className="card-desc">{description}</p>}

      {items.length > 0 && (
        <div className="chips" aria-label="Conteúdos Selecionados">
          {items.map((it) => {
            const type = resolveChipType(it);
            const cls = type ? `dexchip dexchip--${type}` : "dexchip";

            return (
              <span key={it} className={cls}>
                {it}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
