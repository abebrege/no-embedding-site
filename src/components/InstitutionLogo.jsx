import React, { useState } from 'react'
import { styled } from '@mui/material/styles'

const LogoImage = styled('img')({
  borderRadius: '4px',
  objectFit: 'contain',
})

const InstitutionLogo = ({ name, size = 24, style = {}, url = null }) => {
  const [currentFormatIndex, setCurrentFormatIndex] = useState(0)
  const [hasError, setHasError] = useState(false)
  const formats = ['png', 'jpg', 'svg', 'webp', 'avif']

  const getLogoUrl = (institutionName, format) => {
    if (!institutionName) return null
    return `/institutions/${encodeURIComponent(institutionName)}.${format}`
  }

  const handleError = () => {
    if (currentFormatIndex < formats.length - 1) {
      setCurrentFormatIndex(currentFormatIndex + 1)
    } else {
      setHasError(true)
    }
  }

  const handleLoad = () => {
    setHasError(false)
  }

  if (!name || hasError) {
    return null
  }

  const currentUrl = getLogoUrl(name, formats[currentFormatIndex])

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit', ...style }}
      >
        <LogoImage
          src={currentUrl}
          alt={`${name} logo`}
          onError={handleError}
          onLoad={handleLoad}
          style={{
            height: `${size}px`,
            width: `${size}px`,
            ...style
          }}
          {...(url && { href: url })}
        />
      </a>
    </>

  )
}

export default InstitutionLogo