export function ProductPackImage({ product, className = '' }) {
  return (
    <div className={`product-pack ${className}`.trim()} style={{
      '--product-color': product.color,
    }}>
      <img
        src={product.imageUrl}
        alt={`${product.name} — Biotor Labs`}
        loading="lazy"
      />
    </div>
  )
}
