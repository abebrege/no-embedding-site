import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../../../theme.js'
import Logo from '../../../ui/Logo.jsx'
import SectionHeading from '../../../ui/SectionHeading.jsx'

const Grid = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.lg,
})

const Item = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing.xs,
  width: '72px',
})

const Name = styled('span')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  textAlign: 'center',
  lineHeight: 1.3,
})

// Institutions have no URL, so the logo is the only affordance.
function Universities({ institutions = [] }) {
  if (institutions.length === 0) return null

  return (
    <section>
      <SectionHeading>Universities & Institutions</SectionHeading>
      <Grid>
        {institutions.map((institution) => (
          <Item key={institution.institutionId || institution.id}>
            <Logo name={institution.name || institution.shortName} size={40} />
            <Name>{institution.shortName || institution.name}</Name>
          </Item>
        ))}
      </Grid>
    </section>
  )
}

export default Universities
