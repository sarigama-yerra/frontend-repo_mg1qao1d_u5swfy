import React from 'react'

export default function FAQ({ items = [] }) {
  if (!items.length) return null
  return (
    <div className="divide-y divide-slate-700 rounded-xl border border-slate-700 overflow-hidden">
      {items.map((qa, i) => (
        <details key={i} className="bg-slate-900/50">
          <summary className="cursor-pointer list-none p-4 text-slate-100 hover:bg-slate-800/50">
            {qa.question}
          </summary>
          <div className="p-4 text-slate-300">{qa.answer}</div>
        </details>
      ))}
    </div>
  )
}
