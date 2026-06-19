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

// Source of truth for which languages are featured, in what order, and the
// short summary shown on each card.
const FEATURED = [
  { name: 'Qwerty', summary: 'A basis-oriented quantum language embedded in Python that reasons about bases and functions instead of individual qubits and gates.' },
  { name: 'Qrisp', summary: 'A high-level Python framework with managed QuantumVariables and automatic qubit allocation, lifting programming above the circuit level.' },
  { name: 'Silq', summary: 'A high-level language that automatically and safely uncomputes temporary values for shorter, more intuitive quantum programs.' },
  { name: 'QWire', summary: 'A minimal, formally verified core language for quantum circuits that interfaces with a classical host under the QRAM model.' },
  { name: 'Qunity', summary: 'A unified functional language expressing classical and quantum computation in one syntax with reversible semantics.' },
  { name: 'Tower', summary: 'A language for building pointer-based data structures, such as linked lists and trees, that live in quantum superposition.' },
  { name: 'Quipper', summary: 'A scalable, higher-order functional quantum language embedded in Haskell for describing large quantum circuits.' },
  { name: 'Twist', summary: 'A quantum language whose type system tracks purity and entanglement to statically verify assumptions about qubits.' },
  { name: 'Scaffold', summary: 'A C-like quantum programming language compiled by ScaffCC for expressing and analyzing large-scale quantum programs.' },
]

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
            return (
              <Card key={lang.languageId || lang.id}>
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
