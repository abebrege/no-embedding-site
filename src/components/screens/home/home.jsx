import React from 'react'
import { styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import theme from '../../../theme.js'
import useResource from '../../../hooks/useResource.js'
import { getInstitutions } from '../../../services/institutionsService.js'
import Dag from '../../dag/Dag.jsx'
import SectionHeading from '../../ui/SectionHeading.jsx'
import TextLink from '../../ui/TextLink.jsx'
import RecentResearch from './sections/RecentResearch.jsx'
import FeaturedLanguages from './sections/FeaturedLanguages.jsx'
import Universities from './sections/Universities.jsx'

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xxl,
  padding: theme.spacing.xl,
  width: '100%',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    padding: theme.spacing.md,
    gap: theme.spacing.xl,
  },
})

const Quote = styled('p')({
  fontFamily: theme.font.family.body,
  fontStyle: 'italic',
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  margin: 0,
  lineHeight: theme.font.lineHeight.body,
})

const Hero = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
})

const Title = styled('h1')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.size.xxl,
  color: theme.color.text.heading,
  margin: 0,
})

const Body = styled('p')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.body,
  color: theme.color.text.secondary,
  lineHeight: theme.font.lineHeight.body,
  margin: 0,
})

const Nav = styled('nav')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.md,
  marginTop: theme.spacing.sm,
})

const navLinkStyles = {
  fontFamily: theme.font.family.ui,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.sm,
  color: theme.color.link.default,
  textDecoration: 'none',
  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  border: `1px solid ${theme.color.border.primary}`,
  borderRadius: theme.layout.borderRadius.sm,
  '&:hover': { color: theme.color.link.hover, borderColor: theme.color.link.hover },
}

const NavLink = styled(RouterLink)(navLinkStyles)
const NavAnchor = styled('a')(navLinkStyles)

const DagScroll = styled('div')({
  overflowX: 'auto',
  width: '100%',
  paddingBottom: theme.spacing.md,
})

const ThreeCol = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing.xl,
  alignItems: 'start',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
})

function Home() {
  const { data: institutionsData } = useResource(getInstitutions, [])
  const institutions = institutionsData || []

  return (
    <Column>
      <Hero>
        <Title>No Embedding</Title>
        <Body>
          For software engineers and researchers interested in building high level quantum programming languages.
        </Body>
        <Body>
          Most specifically quantum control flow, with some coverage of debugging and uncomputation as well.
        </Body>
        <Body>
          Contributions are welcome and appreciated; open a PR{' '}
          <TextLink href="https://github.com/abebrege/no-embedding-site">here</TextLink>{' '}
          for any corrections or additions.
        </Body>
        <Nav>
          <NavLink to="/languages">Languages</NavLink>
          <NavLink to="/literature">Literature</NavLink>
          <NavLink to="/institutions">Institutions</NavLink>
          <NavAnchor href="https://github.com/abebrege/no-embedding-site" target="_blank" rel="noopener noreferrer">Contribute</NavAnchor>
        </Nav>
      </Hero>

      <ThreeCol>
        <RecentResearch />
        <FeaturedLanguages />
        <Universities institutions={institutions} />
      </ThreeCol>

      <section>
        <DagScroll>
          <Dag institutions={institutions} />
        </DagScroll>
      </section>

      <Quote>
        "Superficially this may strike the reader as a very negative, or perhaps schizophrenic, paper." - Bădescu and Panangaden 2015.
      </Quote>
    </Column>
  )
}

export default Home
