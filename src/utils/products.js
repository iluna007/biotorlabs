export function getProductById(products, id) {
  return products.find(p => p.id === id) ?? null
}

export function getProductIndex(products, id) {
  return products.findIndex(p => p.id === id)
}

export function productPath(id) {
  return `/productos/${id}`
}

export function portfolioUrl(productId) {
  return productId ? `/?product=${productId}#buy` : '/#buy'
}
