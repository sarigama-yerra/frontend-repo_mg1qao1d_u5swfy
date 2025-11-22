import React from 'react'

export default function VariantSelector({ variants = [], selectedSku, onChange }) {
  if (!variants.length) return null

  const thicknesses = [...new Set(variants.map(v => v.thickness_mm))].sort((a,b)=>a-b)
  const sizes = [...new Set(variants.map(v => v.size))]
  const colors = [...new Set(variants.map(v => v.color))]

  // Determine current variant by sku
  const current = variants.find(v => v.sku === selectedSku) || variants[0]

  const buildSku = (opts) => {
    const v = variants.find(v => (
      (opts.thickness_mm ?? current.thickness_mm) === v.thickness_mm &&
      (opts.size ?? current.size) === v.size &&
      (opts.color ?? current.color) === v.color
    ))
    return v?.sku || current.sku
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-slate-300 mb-2">Thickness</div>
        <div className="flex flex-wrap gap-2">
          {thicknesses.map(t => {
            const sku = buildSku({ thickness_mm: t })
            const active = sku === current.sku
            return (
              <button
                key={t}
                onClick={() => onChange(sku)}
                className={`px-3 py-1.5 rounded-md border text-sm transition ${active ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-600 text-slate-200 hover:border-slate-400'}`}
              >
                {t}mm
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div className="text-sm text-slate-300 mb-2">Size</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map(s => {
            const sku = buildSku({ size: s })
            const active = sku === current.sku
            return (
              <button
                key={s}
                onClick={() => onChange(sku)}
                className={`px-3 py-1.5 rounded-md border text-sm transition ${active ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-600 text-slate-200 hover:border-slate-400'}`}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div className="text-sm text-slate-300 mb-2">Color</div>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => {
            const sku = buildSku({ color: c })
            const active = sku === current.sku
            return (
              <button
                key={c}
                onClick={() => onChange(sku)}
                className={`px-3 py-1.5 rounded-md border text-sm transition ${active ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-600 text-slate-200 hover:border-slate-400'}`}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
