import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../../../theme.js'
import useResource from '../../../../hooks/useResource.js'
import { getLanguages } from '../../../../services/languagesService.js'
import Card from '../../../ui/Card.jsx'
import Logo from '../../../ui/Logo.jsx'
import LinkRow from '../../../ui/LinkRow.jsx'
import SectionHeading from '../../../ui/SectionHeading.jsx'
import Loading from '../../../ui/Loading.jsx'
import { FEATURED_LANGUAGES as FEATURED } from '../../../../data/languageSummaries.js'

const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing.md,
})

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.xs,
})

const Name = styled('h3')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.md,
  color: theme.color.text.heading,
  margin: 0,
})

const Summary = styled('p')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  lineHeight: theme.font.lineHeight.body,
  margin: `0 0 ${theme.spacing.sm} 0`,
})

function FeaturedLanguages() {
  const { data, loading } = useResource(getLanguages, [])

  const byName = new Map((data || []).map((l) => [l.name, l]))
  const featured = FEATURED.map(({ name, summary }) => {
    const lang = byName.get(name)
    if (!lang && !loading) console.warn(`FeaturedLanguages: "${name}" not found in languages data`)
    return lang ? { ...lang, summary } : null
  }).filter(Boolean)

  return (
    <section>
      <SectionHeading>Featured Languages</SectionHeading>
      {loading ? (
        <Loading>Loading featured languages...</Loading>
      ) : (
        <Grid>
          {featured.map((lang) => {
            const lit = lang.associations?.literature?.[0]
            const uni = lang.associations?.institutions?.[0]
            const paperUrl = lit?.open_access_url || lit?.doi_url
            return (
              <Card key={lang.languageId || lang.id} href={paperUrl}>
                <Header>
                  <Name>{lang.name}</Name>
                  {uni && <Logo name={uni.name || uni.shortName} size={20} />}
                </Header>
                {lang.summary && <Summary>{lang.summary}</Summary>}
                <LinkRow repo={lang.repoUrl} paper={lit?.open_access_url} doi={lit?.doi_url} />
              </Card>
            )
          })}
        </Grid>
      )}
    </section>
  )
}

export default FeaturedLanguages
