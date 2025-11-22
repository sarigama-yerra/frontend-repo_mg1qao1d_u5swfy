import React, { useState } from 'react'

export default function AddToCart({ product, variants, selectedSku, onCart }) {
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const current = variants.find(v => v.sku === selectedSku) || variants[0]
  const price = current?.price ?? product.base_price

  const add = async () => {
    setLoading(true)
    setMsg('')
    try {
      const cartId = localStorage.getItem('cart_id') || crypto.randomUUID()
      localStorage.setItem('cart_id', cartId)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_id: cartId,
          product_slug: product.slug,
          sku: current.sku,
          quantity: qty,
        })
      })
      if (!res.ok) throw new Error('Failed to add to cart')
      setMsg('Added to cart!')
      onCart && onCart()
    } catch (e) {
      setMsg('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-semibold text-white">${price.toFixed(2)}</div>
        <div className="text-sm text-slate-400">incl. taxes</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border border-slate-700">
          <button className="px-3 py-2 text-slate-300 hover:bg-slate-800" onClick={() => setQty(q => Math.max(1, q-1))}>-</button>
          <input className="w-12 bg-slate-900 text-center text-white outline-none" value={qty} onChange={e => setQty(Math.max(1, parseInt(e.target.value)||1))} />
          <button className="px-3 py-2 text-slate-300 hover:bg-slate-800" onClick={() => setQty(q => q+1)}>+</button>
        </div>
        <button onClick={add} disabled={loading} className="flex-1 rounded-md bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white px-4 py-3 font-medium shadow">
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
      {msg && <div className="text-sm text-slate-300">{msg}</div>}
    </div>
  )
}
