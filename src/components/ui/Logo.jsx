import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

const LogoImage = styled('img')({
  borderRadius: '4px',
  objectFit: 'contain',
})

// Resolves /institutions/<name>.<ext>, trying each format in turn. When `url`
// is provided the logo is wrapped in a link; otherwise the bare image renders
// (no dead anchor). Renders nothing if `name` is missing or all formats fail.
const FORMATS = ['png', 'jpg', 'svg', 'webp', 'avif']

const Logo = ({ name, size = 24, url, style = {} }) => {
  const [formatIndex, setFormatIndex] = useState(0)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (formatIndex < FORMATS.length - 1) {
      setFormatIndex(formatIndex + 1)
    } else {
      setHasError(true)
    }
  }

  if (!name || hasError) return null

  const src = `/institutions/${encodeURIComponent(name)}.${FORMATS[formatIndex]}`

  const image = (
    <LogoImage
      src={src}
      alt={`${name} logo`}
      onError={handleError}
      onLoad={() => setHasError(false)}
      style={{ height: `${size}px`, width: `${size}px`, ...style }}
    />
  )

  if (!url) return image

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex' }}
    >
      {image}
    </a>
  )
}

export default Logo
