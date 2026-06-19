import React from 'react'
import { getLanguages } from '../../../services/languagesService.js'
import { getLiterature } from '../../../services/literatureService.js'
import { getInstitutions } from '../../../services/institutionsService.js'
import Logo from '../../ui/Logo.jsx'
import LinkRow from '../../ui/LinkRow.jsx'
import AssociationList from '../../ui/AssociationList.jsx'
import TextLink from '../../ui/TextLink.jsx'

const firstLiterature = (lang) => lang.associations?.literature?.[0]
const firstInstitution = (entity) => entity.associations?.institutions?.[0]

export const languagesConfig = {
  title: 'Languages',
  fetcher: getLanguages,
  keyOf: (l) => l.languageId || l.id,
  columns: [
    { key: 'name', header: 'Name', render: (l) => l.name },
    {
      key: 'typeHost',
      header: 'Type / Host',
      render: (l) => [l.type, l.host].filter(Boolean).join(' / ') || '—',
    },
    { key: 'summary', header: 'Summary', render: (l) => l.summary || '' },
    {
      key: 'links',
      header: 'Links',
      render: (l) => {
        const lit = firstLiterature(l)
        const uni = firstInstitution(l)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <LinkRow repo={l.repoUrl} paper={lit?.open_access_url} doi={lit?.doi_url} />
            {uni && <Logo name={uni.name || uni.shortName} />}
          </div>
        )
      },
    },
  ],
}

export const literatureConfig = {
  title: 'Literature',
  fetcher: getLiterature,
  keyOf: (l) => l.literatureId || l.id,
  columns: [
    { key: 'title', header: 'Title', render: (l) => l.title },
    { key: 'author', header: 'Author', render: (l) => l.author },
    { key: 'year', header: 'Year', render: (l) => l.publication_year || '—' },
    {
      key: 'university',
      header: 'University',
      render: (l) => {
        const uni = firstInstitution(l)
        return uni ? <Logo name={uni.name || uni.shortName} size={28} /> : null
      },
    },
    {
      key: 'links',
      header: 'Links',
      render: (l) => <LinkRow paper={l.open_access_url} doi={l.doi_url} />,
    },
  ],
}

export const institutionsConfig = {
  title: 'Institutions',
  fetcher: getInstitutions,
  keyOf: (i) => i.institutionId || i.id,
  columns: [
    { key: 'shortName', header: 'Short Name', render: (i) => i.shortName || '—' },
    {
      key: 'name',
      header: 'Name',
      render: (i) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo name={i.name || i.shortName} size={28} />
          {i.name}
        </div>
      ),
    },
    { key: 'location', header: 'Location', render: (i) => i.location || '—' },
    { key: 'type', header: 'Type', render: (i) => i.type || '—' },
    {
      key: 'researchGroups',
      header: 'Research Groups',
      render: (i) => (
        <AssociationList
          label="Groups"
          items={i.associations?.researchGroups}
          keyOf={(g) => g.researchGroupId || g.id}
          renderItem={(g) => <TextLink href={g.url}>{g.name}</TextLink>}
        />
      ),
    },
  ],
}
