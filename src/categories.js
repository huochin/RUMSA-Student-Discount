export const CATEGORY_INFO = {
  F: { label: 'Food', short: 'Food', color: 'var(--cat-f)', bg: 'var(--cat-f-bg)' },
  N: { label: 'Non-halal', short: 'Non-halal', color: 'var(--cat-n)', bg: 'var(--cat-n-bg)' },
  H: { label: 'Health & beauty', short: 'Health', color: 'var(--cat-h)', bg: 'var(--cat-h-bg)' },
  S: { label: 'Sport', short: 'Sport', color: 'var(--cat-s)', bg: 'var(--cat-s-bg)' },
  C: { label: 'Clothes', short: 'Clothes', color: 'var(--cat-c)', bg: 'var(--cat-c-bg)' },
  O: { label: 'Other', short: 'Other', color: 'var(--cat-o)', bg: 'var(--cat-o-bg)' },
}

// Primary filterable categories (N is a sub-tag of F, shown as a badge but not
// a top-level filter chip on its own since every N entry is also F)
export const FILTER_CATEGORIES = ['F', 'H', 'S', 'C', 'O']

export const REGIONS = [
  'Eco Botanic',
  'Sunway',
  'TMIYC',
  'Medini',
  'Nusa Sentral',
  'Senadi Hills',
  'Bukit Indah',
  'Jalan Tanjung',
]
