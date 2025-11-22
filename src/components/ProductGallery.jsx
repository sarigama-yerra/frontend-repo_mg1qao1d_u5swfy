import React, { useState } from 'react'

export default function ProductGallery({ images = [] }) {
  const safeImages = images.length ? images : [
    { url: '/images/mat-1.jpg', alt: 'Rubber gym mat' },
    { url: '/images/mat-2.jpg', alt: 'Rubber gym mat with barbell' },
    { url: '/images/mat-3.jpg', alt: 'Home gym with mats' },
  ]

  const [active, setActive] = useState(0)

  return (
    <div className="w-full">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-900/50 border border-slate-700">
        <img
          src={safeImages[active]?.url}
          alt={safeImages[active]?.alt || 'Product image'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`aspect-square rounded-lg overflow-hidden border transition ${
              idx === active ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            <img src={img.url} alt={img.alt || 'Thumbnail'} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
