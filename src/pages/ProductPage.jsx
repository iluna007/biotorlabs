import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContent } from '../context/SitePreferencesContext'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { ProductPackImage } from '../components/ui/ProductPackImage'
import { getProductById, getProductIndex, portfolioUrl, productPath } from '../utils/products'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, productPage: copy, ui } = useContent()
  const product = getProductById(products, id)
  const index = getProductIndex(products, id)
  const prev = index > 0 ? products[index - 1] : null
  const next = index >= 0 && index < products.length - 1 ? products[index + 1] : null

  useEffect(() => {
    if (!product) navigate('/', { replace: true })
    else window.scrollTo(0, 0)
  }, [product, navigate])

  if (!product?.detail) return null

  const { detail } = product

  return (
    <div className="product-page">
      <Navbar />

      <header className="product-page__hero">
        <div className="product-page__hero-inner">
          <nav className="product-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">{copy.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <Link to={portfolioUrl()}>{copy.breadcrumbPortfolio}</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product-page__hero-grid">
            <ProductPackImage product={product} className="product-page__pack" />

            <div>
              <div className="product-page__badges">
                {product.badges.map(badge => (
                  <span key={badge} className="product-page__badge">{badge}</span>
                ))}
                {product.featured && (
                  <span className="product-page__badge product-page__badge--featured">{ui.premium}</span>
                )}
              </div>

              <h1 className="product-page__title">{product.name}</h1>
              <p className="product-page__tagline">{product.tagline}</p>
              <p className="product-page__type">{product.type}</p>
              <p className="product-page__organism">{product.organism}</p>

              {product.crops.length > 0 && (
                <div className="product-page__crops">
                  <span className="product-page__crops-label">{ui.cropsLabel}</span>
                  {product.crops.map(crop => (
                    <span key={crop} className="product-page__crop">{crop}</span>
                  ))}
                </div>
              )}

              <Link to={portfolioUrl(product.id)} className="btn-ghost product-page__back">
                {copy.backToCarousel}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="product-page__main">
        <section className="product-page__section">
          <p className="section-eyebrow">{copy.overviewLabel}</p>
          <p className="product-page__overview">{detail.overview}</p>
        </section>

        <section className="product-page__section">
          <p className="section-eyebrow">{copy.highlightsLabel}</p>
          <ul className="product-page__highlights">
            {detail.highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="product-page__section">
          <p className="section-eyebrow">{copy.mechanismsLabel}</p>
          <div className="product-page__mechanisms">
            {detail.mechanisms.map(m => (
              <article key={m.title} className="product-page__mechanism">
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="product-page__section product-page__grid-2">
          <div>
            <p className="section-eyebrow">{copy.applicationLabel}</p>
            <p className="section-body">{detail.application}</p>
          </div>
          <div>
            <p className="section-eyebrow">{copy.formulationLabel}</p>
            <p className="section-body">{detail.formulation}</p>
          </div>
        </section>

        <section className="product-page__section product-page__evidence">
          <p className="section-eyebrow">{copy.evidenceLabel}</p>
          <p className="section-body">{detail.evidence}</p>
          <a
            href={`mailto:info@biotorlabs.com?subject=${encodeURIComponent(`${copy.contactSubject} — ${product.name}`)}`}
            className="btn-primary product-page__contact"
          >
            {copy.contactCta}
          </a>
        </section>

        <nav className="product-page__nav" aria-label={copy.productNavLabel}>
          {prev ? (
            <Link to={productPath(prev.id)} className="product-page__nav-link">
              ← {prev.name}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={productPath(next.id)} className="product-page__nav-link product-page__nav-link--next">
              {next.name} →
            </Link>
          ) : <span />}
        </nav>
      </main>

      <Footer />
    </div>
  )
}
