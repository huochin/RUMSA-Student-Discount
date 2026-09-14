import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { CATEGORY_INFO } from './categories'

function makeIcon(color) {
  const svg = `
    <svg width="26" height="34" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C5.8 0 0 5.8 0 13c0 9.75 13 21 13 21s13-11.25 13-21c0-7.2-5.8-13-13-13z" fill="${color}" stroke="#F7F3EA" stroke-width="1.5"/>
      <circle cx="13" cy="13" r="5" fill="#F7F3EA"/>
    </svg>
  `
  return L.divIcon({
    html: svg,
    className: 'vendor-map-pin',
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -30],
  })
}

const ICON_CACHE = {}
function iconForVendor(vendor) {
  const primary = vendor.categories.find((c) => c !== 'N') || vendor.categories[0]
  const color = CATEGORY_INFO[primary]?.color || '#6E7A70'
  if (!ICON_CACHE[color]) ICON_CACHE[color] = makeIcon(color)
  return ICON_CACHE[color]
}

function FlyToVendor({ selected }) {
  const map = useMap()
  useEffect(() => {
    if (selected) {
      map.flyTo([selected.lat, selected.lng], 16, { duration: 0.7 })
    }
  }, [selected, map])
  return null
}

export default function MapView({ vendors, selected, onSelect }) {
  const markerRefs = useRef({})

  useEffect(() => {
    if (selected && markerRefs.current[selected.name]) {
      markerRefs.current[selected.name].openPopup()
    }
  }, [selected])

  const center = [1.435, 103.635]

  return (
    <div className="map-shell">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToVendor selected={selected} />
        {vendors.map((v) => (
          <Marker
            key={`${v.region}-${v.name}`}
            position={[v.lat, v.lng]}
            icon={iconForVendor(v)}
            ref={(el) => {
              if (el) markerRefs.current[v.name] = el
            }}
            eventHandlers={{
              click: () => onSelect(v),
            }}
          >
            <Popup maxWidth={220} minWidth={180}>
              <div style={{ fontFamily: 'var(--font-body)', maxWidth: '200px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>
                  {v.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-faint)', marginBottom: '6px' }}>
                  {v.region}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginBottom: '6px', lineHeight: 1.4 }}>
                  {v.address}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', fontWeight: 600, color: 'var(--marigold-dark)' }}>
                  {v.discount || 'Discount not listed'}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="map-disclaimer">
        Pin locations are approximate, placed by named area — not precise geocoded addresses.
      </p>
      <style>{`
        .map-shell {
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: var(--radius-card);
          overflow: hidden;
          border: 1px solid var(--stub-line);
        }
        .map-disclaimer {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          margin: 0;
          background: rgba(247, 243, 234, 0.92);
          font-size: 10px;
          color: var(--ink-faint);
          padding: 6px 9px;
          border-radius: 8px;
          z-index: 1000;
          line-height: 1.35;
        }
        @media (min-width: 600px) {
          .map-disclaimer {
            font-size: 10.5px;
          }
        }
      `}</style>
    </div>
  )
}
