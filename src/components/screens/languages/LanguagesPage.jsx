import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import theme from '../../../theme.js'
import BackButton from '../../form-elements/BackButton.jsx'
import InstitutionLogo from '../../InstitutionLogo.jsx'

const BASE_URL = import.meta.env.VITE_BASE

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing.xl,
  gap: theme.spacing.lg,
  boxSizing: 'border-box',
  height: '100vh',
  overflow: 'auto',
})

const PageTitle = styled('h1')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.size.xl,
  color: theme.color.text.heading,
  margin: 0,
})

const LanguageGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing.md,
  marginTop: theme.spacing.md,
})

const LanguageCard = styled('div')({
  border: `1px solid ${theme.color.border.secondary}`,
  borderRadius: theme.layout.borderRadius.md,
  padding: theme.spacing.md,
  backgroundColor: theme.color.background,
  boxShadow: theme.color.shadow,
})

const LanguageName = styled('h3')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.md,
  color: theme.color.text.heading,
  margin: `0 0 ${theme.spacing.sm} 0`,
})

const LanguageCode = styled('p')({
  fontFamily: theme.font.family.mono,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  margin: `0 0 ${theme.spacing.sm} 0`,
  backgroundColor: theme.color.code.background,
  padding: theme.spacing.xs,
  borderRadius: theme.layout.borderRadius.sm,
})

const LanguageType = styled('p')({
  fontFamily: theme.font.family.mono,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  margin: `0 0 ${theme.spacing.sm} 0`,
  backgroundColor: theme.color.code.background,
  padding: theme.spacing.xs,
  borderRadius: theme.layout.borderRadius.sm,
})

const LanguageHost = styled('p')({
  fontFamily: theme.font.family.mono,
  fontSize: theme.font.size.sm,
  color: theme.color.text.secondary,
  margin: `0 0 ${theme.spacing.sm} 0`,
  backgroundColor: theme.color.code.background,
  padding: theme.spacing.xs,
  borderRadius: theme.layout.borderRadius.sm,
})

const LanguageHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.sm,
})

const Description = styled('p')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.body,
  color: theme.color.text.secondary,
  margin: `0 0 ${theme.spacing.sm} 0`,
  lineHeight: theme.font.lineHeight.body,
})

const AssociationSection = styled('div')({
  marginTop: theme.spacing.sm,
})

const AssociationLabel = styled('h4')({
  fontFamily: theme.font.family.ui,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: 0,
})

const AssociationList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: `${theme.spacing.xs} 0 0 0`,
})

const AssociationItem = styled('li')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.sm,
  color: theme.color.text.primary,
  margin: `${theme.spacing.xs} 0`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
})

const LoadingText = styled('p')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.body,
  color: theme.color.text.secondary,
  textAlign: 'center',
})

function LanguagesPage() {
  const navigate = useNavigate()
  const [languagesData, setLanguagesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/languages`)
        const result = await response.json()
        if (result.success) {
          setLanguagesData(result.data)
        } else {
          setError('Failed to fetch languages')
        }
      } catch (err) {
        setError('Error connecting to API')
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  if (loading) return (
    <Wrapper>
      <BackButton />
      <PageTitle>Languages</PageTitle>
      <LoadingText>Loading languages...</LoadingText>
    </Wrapper>
  )

  if (error) return (
    <Wrapper>
      <BackButton />
      <PageTitle>Languages</PageTitle>
      <LoadingText>Error: {error}</LoadingText>
    </Wrapper>
  )

  return (
    <Wrapper>
      <BackButton />
      <PageTitle>Languages ({languagesData.length})</PageTitle>
      <LanguageGrid>
        {languagesData.map((language) => (
          <LanguageCard key={language.languageId || language.id}>
            <LanguageHeader>
              {language.code && <LanguageCode>Code: {language.code}</LanguageCode>}
              {language.type && <LanguageType>{language.type}</LanguageType>}
              {language.host && <LanguageHost>{language.host}</LanguageHost>}
              {language.repoUrl &&
                <InstitutionLogo name={"github-logo"} size={20} style={{ alignSelf: "flex-start", marginTop: "1px" }} url={language.repoUrl} />
              }
            </LanguageHeader>
            <LanguageName>{language.name}</LanguageName>
            {language.description && <Description>{language.description}</Description>}


            {language.associations && (
              <>
                {language.associations.literature?.length > 0 && (
                  <AssociationSection>
                    <AssociationLabel>Literature ({language.associations.literature.length})</AssociationLabel>
                    <AssociationList>
                      {language.associations.literature.slice(0, 3).map((lit) => (
                        <AssociationItem key={lit.literatureId || lit.id}>
                          {lit.title} - {lit.author}
                        </AssociationItem>
                      ))}
                      {language.associations.literature.length > 3 && (
                        <AssociationItem>...and {language.associations.literature.length - 3} more</AssociationItem>
                      )}
                    </AssociationList>
                  </AssociationSection>
                )}

                {language.associations.institutions?.length > 0 && (
                  <AssociationSection>
                    <AssociationLabel>Institutions ({language.associations.institutions.length})</AssociationLabel>
                    <AssociationList>
                      {language.associations.institutions.slice(0, 3).map((inst) => {
                        return (
                          <AssociationItem key={inst.institutionId || inst.id}>
                            <InstitutionLogo name={inst.name || inst.shortName} />
                            {inst.name || inst.shortName}
                          </AssociationItem>
                        )
                      })}
                      {language.associations.institutions.length > 3 && (
                        <AssociationItem>...and {language.associations.institutions.length - 3} more</AssociationItem>
                      )}
                    </AssociationList>
                  </AssociationSection>
                )}
              </>
            )}
          </LanguageCard>
        ))}
      </LanguageGrid>
    </Wrapper>
  )
}

export default LanguagesPage
