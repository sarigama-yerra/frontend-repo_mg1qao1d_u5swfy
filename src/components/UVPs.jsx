import React from 'react'

export default function UVPs({ points = [] }) {
  if (!points.length) return null
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {points.map((p, i) => (
        <div key={i} className="rounded-xl border border-slate-700 bg-slate-900/50 p-4">
          <div className="text-slate-100 font-medium">{p}</div>
        </div>
      ))}
    </div>
  )
}
