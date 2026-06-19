import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../../../theme.js'
import useResource from '../../../../hooks/useResource.js'
import { getLiterature } from '../../../../services/literatureService.js'
import Card from '../../../ui/Card.jsx'
import Logo from '../../../ui/Logo.jsx'
import TextLink from '../../../ui/TextLink.jsx'
import SectionHeading from '../../../ui/SectionHeading.jsx'
import Loading from '../../../ui/Loading.jsx'

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing.md,
})

const Title = styled('div')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.body,
  color: theme.color.text.heading,
  lineHeight: 1.3,
  marginBottom: theme.spacing.xs,
})

const Meta = styled('div')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  flexWrap: 'wrap',
})

const Thumb = styled('img')({
  width: '100%',
  height: '120px',
  objectFit: 'cover',
  borderRadius: theme.layout.borderRadius.sm,
  border: `1px solid ${theme.color.border.secondary}`,
  marginBottom: theme.spacing.sm,
})

function RecentResearch() {
  const { data, loading } = useResource(() => getLiterature({ sort: 'recent', limit: 10 }), [])

  // The ten most recent papers, year descending, breaking ties by title.
  // Sliced client-side as well so the limit holds even if the API ignores it.
  const papers = [...(data || [])]
    .sort((a, b) => {
      const yearA = a.publication_year ?? 0
      const yearB = b.publication_year ?? 0
      if (yearA !== yearB) return yearB - yearA
      return (b.title || '').localeCompare(a.title || '')
    })
    .slice(0, 10)

  return (
    <section>
      <SectionHeading>Recent Research</SectionHeading>
      {loading ? (
        <Loading>Loading recent research...</Loading>
      ) : (
        <Grid>
          {papers.map((paper) => {
            const group = paper.associations?.researchGroups?.[0]
            const institution = paper.associations?.institutions?.[0]
            const paperUrl = paper.open_access_url || paper.doi_url
            return (
              <Card key={paper.literatureId || paper.id} href={paperUrl}>
                {/* <PaperThumb title={paper.title} /> */}
                <Title>
                  <TextLink href={paper.open_access_url || paper.doi_url}>{paper.title}</TextLink>
                </Title>
                <Meta>
                  <span>{paper.author}</span>
                  {paper.publication_year && <span>· {paper.publication_year}</span>}
                  {institution && <Logo name={institution.name || institution.shortName} size={20} />}
                </Meta>
                {group && (
                  <Meta>
                    <TextLink href={group.url}>{group.name}</TextLink>
                  </Meta>
                )}
              </Card>
            )
          })}
        </Grid>
      )}
    </section>
  )
}

export default RecentResearch
