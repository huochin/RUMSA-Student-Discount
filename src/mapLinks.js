// No-API-key Google Maps helpers. These use Google's public, documented
// (search) and undocumented-but-stable (embed output=embed) URL schemes —
// no billing account or API key required.

export function googleMapsSearchUrl(vendor) {
  const q = encodeURIComponent(`${vendor.name}, ${vendor.address}`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export function googleMapsEmbedUrl(vendor) {
  const q = encodeURIComponent(`${vendor.name}, ${vendor.address}`)
  return `https://www.google.com/maps?q=${q}&output=embed`
}
