import { CATEGORY_INFO } from './categories'

function CategoryBadge({ code }) {
  const info = CATEGORY_INFO[code]
  if (!info) return null
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        color: info.color,
        background: info.bg,
        borderRadius: '5px',
        padding: '3px 7px',
        lineHeight: 1,
      }}
    >
      {info.short}
    </span>
  )
}

export default function VendorCard({ vendor, onLocate }) {
  const hasDiscount = vendor.discount && vendor.discount.trim().length > 0

  return (
    <article className="vendor-card">
      <div className="vendor-card-top">
        <div className="vendor-card-heading">
          <h3 className="vendor-name">{vendor.name}</h3>
          <div className="vendor-badges">
            {vendor.categories.map((c) => (
              <CategoryBadge key={c} code={c} />
            ))}
          </div>
        </div>
        <div className="vendor-discount-stub">
          <span className="stub-label">Discount</span>
          <span className={hasDiscount ? 'stub-value' : 'stub-value stub-value-empty'}>
            {hasDiscount ? vendor.discount : 'Not listed'}
          </span>
        </div>
      </div>

      <div className="vendor-card-divider" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="vendor-card-bottom">
        <p className="vendor-address">{vendor.address}</p>
        <button className="vendor-locate-btn" onClick={() => onLocate(vendor)}>
          Show on map
        </button>
      </div>

      <style>{`
        .vendor-card {
          background: var(--paper-raised);
          border: 1px solid var(--stub-line);
          border-radius: var(--radius-card);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .vendor-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px 14px;
        }
        .vendor-card-heading {
          display: flex;
          flex-direction: column;
          gap: 7px;
          min-width: 0;
        }
        .vendor-name {
          font-size: 17px;
          line-height: 1.25;
          color: var(--ink);
          font-weight: 600;
        }
        .vendor-badges {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .vendor-discount-stub {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .stub-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ink-faint);
        }
        .stub-value {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 600;
          color: var(--marigold-dark);
          text-align: right;
          max-width: 150px;
        }
        .stub-value-empty {
          color: var(--ink-faint);
          font-weight: 500;
          font-style: italic;
          font-size: 12px;
        }
        .vendor-card-divider {
          display: flex;
          justify-content: space-between;
          padding: 0 6px;
        }
        .vendor-card-divider span {
          flex: 1;
          height: 1px;
          margin: 0 2px;
          background: var(--stub-line);
        }
        .vendor-card-bottom {
          padding: 12px 18px 16px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .vendor-address {
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-faint);
          margin: 0;
        }
        .vendor-locate-btn {
          flex-shrink: 0;
          background: transparent;
          border: 1px solid var(--teal);
          color: var(--teal);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 11px;
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .vendor-locate-btn:hover {
          background: var(--teal);
          color: var(--paper-raised);
        }
      `}</style>
    </article>
  )
}
