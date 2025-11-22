import React from 'react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" className="w-10 h-10" />
            <div className="text-white font-semibold text-xl">IronFloor</div>
          </div>
          <nav className="text-sm text-slate-300">
            <Link className="hover:text-white" to="/product/rubber-gym-mat-pro">Product</Link>
          </nav>
        </header>

        <section className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Premium Rubber Gym Mats</h1>
            <p className="mt-4 text-lg text-slate-300">Protect your floors. Reduce noise. Train harder. Commercial-grade mats built for home gyms.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/product/rubber-gym-mat-pro" className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium">View Product</Link>
              <a href="/test" className="px-6 py-3 rounded-md border border-slate-700 hover:border-slate-500">Check Backend</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50">
            <img src="/images/mat-hero.jpg" alt="Rubber gym mats" className="w-full h-full object-cover" />
          </div>
        </section>

        <section className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Shock absorbing protection',
            'Anti-slip, low-odor surface',
            'Precision cut edges',
            '2-year warranty',
          ].map((p, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="text-white font-medium">{p}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default App