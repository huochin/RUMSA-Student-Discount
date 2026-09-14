import { useMemo, useState } from 'react'
import vendorsData from './vendors.json'
import VendorCard from './VendorCard'
import MapView from './MapView'
import { CATEGORY_INFO, FILTER_CATEGORIES, REGIONS } from './categories'

export default function App() {
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [mapOpen, setMapOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return vendorsData.filter((v) => {
      if (activeRegion !== 'All' && v.region !== activeRegion) return false
      if (activeCategory !== 'All' && !v.categories.includes(activeCategory)) return false
      if (query.trim()) {
        const q = query.trim().toLowerCase()
        if (!v.name.toLowerCase().includes(q) && !v.region.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [activeRegion, activeCategory, query])

  const regionCounts = useMemo(() => {
    const counts = {}
    for (const v of vendorsData) counts[v.region] = (counts[v.region] || 0) + 1
    return counts
  }, [])

  function handleLocate(vendor) {
    setSelected(vendor)
    setMapOpen(true)
  }

  return (
    <div className="page">
      <header className="masthead">
        <div className="masthead-inner">
          <div className="masthead-top">
            <span className="masthead-eyebrow">RUMSA · Vice President Department</span>
            <span className="masthead-count">{vendorsData.length} partner vendors</span>
          </div>
          <h1 className="masthead-title">The Student Discount Ledger</h1>
          <p className="masthead-sub">
            Every deal negotiated for RUMSA members, organised by neighbourhood.
            Flash your student card and claim it.
          </p>
        </div>
      </header>

      <div className="controls">
        <div className="controls-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search a vendor or area…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={`map-toggle ${mapOpen ? 'map-toggle-active' : ''}`}
            onClick={() => setMapOpen((o) => !o)}
          >
            {mapOpen ? 'Hide map' : 'Show map'}
          </button>
        </div>

        <div className="chip-row">
          <span className="chip-row-label">Area</span>
          <div className="chip-scroll">
            <button
              className={`chip ${activeRegion === 'All' ? 'chip-active' : ''}`}
              onClick={() => setActiveRegion('All')}
            >
              All areas
            </button>
            {REGIONS.map((r) => (
              <button
                key={r}
                className={`chip ${activeRegion === r ? 'chip-active' : ''}`}
                onClick={() => setActiveRegion(r)}
              >
                {r}
                <span className="chip-count">{regionCounts[r] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="chip-row">
          <span className="chip-row-label">Category</span>
          <div className="chip-scroll">
            <button
              className={`chip ${activeCategory === 'All' ? 'chip-active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All categories
            </button>
            {FILTER_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip chip-cat ${activeCategory === c ? 'chip-active' : ''}`}
                style={{
                  '--chip-color': CATEGORY_INFO[c].color,
                  '--chip-bg': CATEGORY_INFO[c].bg,
                }}
                onClick={() => setActiveCategory(c)}
              >
                {CATEGORY_INFO[c].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className={`content ${mapOpen ? 'content-with-map' : ''}`}>
        <div className="results-column">
          <div className="results-meta">
            <span>{filtered.length} of {vendorsData.length} vendors</span>
            {activeRegion !== 'All' && (
              <button className="clear-pill" onClick={() => setActiveRegion('All')}>
                {activeRegion} ×
              </button>
            )}
            {activeCategory !== 'All' && (
              <button className="clear-pill" onClick={() => setActiveCategory('All')}>
                {CATEGORY_INFO[activeCategory].label} ×
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No vendors match that search.</p>
              <button
                className="reset-btn"
                onClick={() => {
                  setActiveRegion('All')
                  setActiveCategory('All')
                  setQuery('')
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="vendor-grid">
              {filtered.map((v) => (
                <VendorCard key={`${v.region}-${v.name}`} vendor={v} onLocate={handleLocate} />
              ))}
            </div>
          )}
        </div>

        {mapOpen && (
          <div className="map-column">
            <MapView vendors={filtered} selected={selected} onSelect={setSelected} />
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>
          Discounts subject to change at each vendor's discretion. Categories: F = Food
          (N = non-halal), H = Health &amp; beauty, S = Sport, C = Clothes, O = Other.
        </p>
      </footer>

      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .masthead {
          background: var(--ink);
          color: var(--paper);
          padding: 28px 16px 26px;
          background-image:
            repeating-linear-gradient(135deg, rgba(232,163,61,0.045) 0px, rgba(232,163,61,0.045) 1px, transparent 1px, transparent 14px);
        }
        .masthead-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .masthead-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 6px 10px;
          margin-bottom: 14px;
        }
        .masthead-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.03em;
          color: var(--marigold);
        }
        .masthead-count {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(247,243,234,0.6);
        }
        .masthead-title {
          font-size: clamp(28px, 8vw, 52px);
          line-height: 1.08;
          color: var(--paper);
          max-width: 14ch;
        }
        .masthead-sub {
          margin: 12px 0 0;
          max-width: 46ch;
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(247,243,234,0.78);
        }
        @media (min-width: 600px) {
          .masthead {
            padding: 40px 24px 34px;
          }
          .masthead-top {
            gap: 8px;
            margin-bottom: 18px;
          }
          .masthead-eyebrow, .masthead-count {
            font-size: 12px;
          }
          .masthead-sub {
            margin-top: 14px;
            font-size: 15.5px;
          }
        }

        .controls {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 16px 16px 4px;
        }
        .controls-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }
        .search-input {
          flex: 1;
          min-width: 0;
          background: var(--paper-raised);
          border: 1px solid var(--stub-line);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 16px;
          color: var(--ink);
          font-family: var(--font-body);
        }
        .search-input:focus {
          outline: 2px solid var(--teal);
          outline-offset: 1px;
        }
        .search-input::placeholder {
          color: var(--ink-faint);
        }
        .map-toggle {
          background: var(--paper-raised);
          border: 1px solid var(--stub-line);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .map-toggle-active {
          background: var(--teal);
          border-color: var(--teal);
          color: var(--paper-raised);
        }

        .chip-row {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 6px;
          margin-bottom: 12px;
        }
        .chip-row-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-faint);
        }
        .chip-scroll {
          display: flex;
          gap: 8px;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 2px;
          margin: 0 -16px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .chip-scroll::-webkit-scrollbar {
          display: none;
        }
        .chip {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-soft);
          background: transparent;
          border: 1px solid var(--stub-line);
          border-radius: 999px;
          padding: 8px 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .chip:hover {
          border-color: var(--ink-faint);
        }
        .chip-active {
          background: var(--ink);
          border-color: var(--ink);
          color: var(--paper);
        }
        .chip-cat.chip-active {
          background: var(--chip-color);
          border-color: var(--chip-color);
          color: var(--paper-raised);
        }
        .chip-count {
          font-family: var(--font-mono);
          font-size: 10.5px;
          opacity: 0.6;
        }

        @media (min-width: 600px) {
          .controls {
            padding: 22px 24px 4px;
          }
          .controls-row {
            gap: 10px;
            margin-bottom: 16px;
          }
          .search-input, .map-toggle {
            font-size: 14.5px;
          }
          .map-toggle {
            padding: 11px 18px;
            font-size: 14px;
          }
          .chip-row {
            flex-direction: row;
            align-items: flex-start;
            gap: 12px;
          }
          .chip-row-label {
            font-size: 11px;
            padding-top: 9px;
            flex-shrink: 0;
            width: 62px;
          }
          .chip-scroll {
            flex-wrap: wrap;
            overflow-x: visible;
            margin: 0;
            padding: 0;
          }
        }

        .content {
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 12px 16px 32px;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .content-with-map {
          grid-template-columns: 1fr;
        }
        @media (min-width: 600px) {
          .content {
            padding: 12px 24px 40px;
            gap: 20px;
          }
        }
        @media (min-width: 920px) {
          .content-with-map {
            grid-template-columns: 1.1fr 0.9fr;
            align-items: start;
          }
          .map-column {
            position: sticky;
            top: 20px;
            height: calc(100vh - 40px);
          }
        }

        .results-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--ink-faint);
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .clear-pill {
          font-family: var(--font-mono);
          font-size: 11.5px;
          background: var(--teal-light);
          color: var(--teal);
          border: none;
          border-radius: 999px;
          padding: 7px 10px;
          cursor: pointer;
        }

        .vendor-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .vendor-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 14px;
          }
        }

        .empty-state {
          background: var(--paper-raised);
          border: 1px dashed var(--stub-line);
          border-radius: var(--radius-card);
          padding: 40px 20px;
          text-align: center;
          color: var(--ink-faint);
        }
        .reset-btn {
          margin-top: 12px;
          background: var(--ink);
          color: var(--paper);
          border: none;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .map-column {
          min-height: 420px;
          height: 60vh;
        }
        @media (min-width: 920px) {
          .map-column {
            height: calc(100vh - 40px);
          }
        }

        .site-footer {
          border-top: 1px solid var(--stub-line);
          padding: 18px 16px 28px;
        }
        @media (min-width: 600px) {
          .site-footer {
            padding: 20px 24px 34px;
          }
        }
        .site-footer p {
          max-width: 1100px;
          margin: 0 auto;
          font-size: 12px;
          color: var(--ink-faint);
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}
