import React, { useEffect, useMemo, useState } from 'react'
import ProductGallery from '../components/ProductGallery'
import VariantSelector from '../components/VariantSelector'
import AddToCart from '../components/AddToCart'
import UVPs from '../components/UVPs'
import FAQ from '../components/FAQ'

export default function ProductDetail() {
  const [product, setProduct] = useState(null)
  const [selectedSku, setSelectedSku] = useState('')

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/rubber-gym-mat-pro`)
      const data = await res.json()
      setProduct(data)
      setSelectedSku(data?.variants?.[0]?.sku)
    }
    load()
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        Loading product...
      </div>
    )
  }

  const current = product.variants.find(v => v.sku === selectedSku) || product.variants[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <ProductGallery images={product.images} />

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{product.title}</h1>
            {product.subtitle && <p className="mt-2 text-slate-300">{product.subtitle}</p>}
            <div className="mt-3 text-sm text-slate-400">{product.reviews_count} reviews • {product.rating}★</div>

            <div className="mt-6">
              <VariantSelector variants={product.variants} selectedSku={selectedSku} onChange={setSelectedSku} />
            </div>

            <div className="mt-6">
              <AddToCart product={product} variants={product.variants} selectedSku={selectedSku} />
            </div>

            <div className="mt-6 text-slate-300 leading-relaxed">{product.description}</div>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([k,v]) => (
                  <div key={k} className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-400">{k}</div>
                    <div className="text-slate-100">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {product.uvps?.length ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-white mb-4">Why this mat</h2>
            <UVPs points={product.uvps} />
          </section>
        ) : null}

        {product.faqs?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">FAQ</h2>
            <FAQ items={product.faqs} />
          </section>
        ) : null}
      </div>
    </div>
  )
}
