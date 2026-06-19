import React, { useRef, useLayoutEffect } from 'react'
import theme from '../../theme.js'
import Logo from '../ui/Logo.jsx'
import {
  DagCanvas,
  NodeCard,
  NodeTitle,
  NodeSubtitle,
  InstitutionHead,
  UniLogo,
  HorizontalArm,
  SpineContainer,
} from './dag.styles.js'

const asArray = (value) => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

// Vertical connector measuring the span between the first and last child cards.
function BranchSpine({ children, showSpine, cardRefs }) {
  const railRef = useRef(null)
  const spineRef = useRef(null)

  useLayoutEffect(() => {
    const rail = railRef.current
    const spine = spineRef.current
    if (!rail || !spine || !showSpine || !cardRefs?.length) {
      if (spine) spine.style.display = 'none'
      return
    }
    if (cardRefs.length < 2) {
      spine.style.display = 'none'
      return
    }

    const railRect = rail.getBoundingClientRect()
    const firstEl = cardRefs[0].current
    const lastEl = cardRefs[cardRefs.length - 1].current
    if (!firstEl || !lastEl) { spine.style.display = 'none'; return }

    const firstRect = firstEl.getBoundingClientRect()
    const lastRect = lastEl.getBoundingClientRect()
    const firstMid = firstRect.top + firstRect.height / 2 - railRect.top
    const lastMid = lastRect.top + lastRect.height / 2 - railRect.top

    spine.style.display = 'block'
    spine.style.top = firstMid + 'px'
    spine.style.height = (lastMid - firstMid) + 'px'
  })

  return (
    <SpineContainer ref={railRef}>
      {showSpine && (
        <div
          ref={spineRef}
          style={{
            position: 'absolute',
            left: 0,
            width: '1px',
            backgroundColor: theme.color.border.primary,
            display: 'none',
          }}
        />
      )}
      {children}
    </SpineContainer>
  )
}

// Total descendant count — used to sort busiest institutions first.
function countNodes(node) {
  if (!node) return 0
  const children = [
    ...asArray(node.associations?.researchGroups),
    ...asArray(node.associations?.literature),
    ...asArray(node.associations?.languages),
    ...asArray(node.associations?.language),
  ]
  return 1 + children.reduce((sum, child) => sum + countNodes(child), 0)
}

function renderNode(nodeData, nodeType, keyPrefix, cardRef = null) {
  if (!nodeData) return null

  const renderWithChildren = (card, children, childNodeType, showLeftArm) => {
    const cardRefs = children.map(() => React.createRef())

    const childRows = children.map((child, index) => (
      <div
        key={`${keyPrefix}-${childNodeType}-${index}`}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <HorizontalArm />
        {renderNode(child, childNodeType, `${keyPrefix}-${childNodeType}-${index}`, cardRefs[index])}
      </div>
    ))

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {showLeftArm && <HorizontalArm />}
        {card}
        {children.length > 0 && (
          <>
            <HorizontalArm />
            <BranchSpine showSpine={children.length > 1} cardRefs={cardRefs}>
              {childRows}
            </BranchSpine>
          </>
        )}
      </div>
    )
  }

  if (nodeType === 'institution') {
    const researchGroups = asArray(nodeData.associations?.researchGroups)
    const directLiterature = asArray(nodeData.associations?.literature)
    const childNodeType = researchGroups.length > 0 ? 'researchGroup' : 'literature'
    const institutionChildren = researchGroups.length > 0 ? researchGroups : directLiterature

    const card = (
      <div ref={cardRef}>
        <NodeCard nodeType="institution">
          <InstitutionHead>
            <UniLogo>
              <Logo name={nodeData.name || nodeData.shortName} size={26} />
            </UniLogo>
            <div>
              <NodeTitle>{nodeData.shortName || nodeData.name}</NodeTitle>
              <NodeSubtitle>{nodeData.name}</NodeSubtitle>
            </div>
          </InstitutionHead>
        </NodeCard>
      </div>
    )
    return renderWithChildren(card, institutionChildren, childNodeType, false)
  }

  if (nodeType === 'researchGroup') {
    const literature = asArray(nodeData.associations?.literature)
    const card = <div ref={cardRef}><NodeCard nodeType="researchGroup"><NodeTitle>{nodeData.name || 'Research Group'}</NodeTitle></NodeCard></div>
    return renderWithChildren(card, literature, 'literature', true)
  }

  if (nodeType === 'literature') {
    const languageFromArray = asArray(nodeData.associations?.languages)
    const languageFromSingle = asArray(nodeData.associations?.language)
    const languages = languageFromArray.length > 0 ? languageFromArray : languageFromSingle
    const card = (
      <div ref={cardRef}>
        <NodeCard nodeType="literature">
          <NodeTitle>{nodeData.title || 'Untitled literature'}</NodeTitle>
          <NodeSubtitle>{nodeData.author || 'Unknown author'}</NodeSubtitle>
        </NodeCard>
      </div>
    )
    return renderWithChildren(card, languages, 'language', true)
  }

  if (nodeType === 'language') {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HorizontalArm />
        <div ref={cardRef}>
          <NodeCard nodeType="language">
            <NodeTitle>{nodeData.name || 'Unknown language'}</NodeTitle>
          </NodeCard>
        </div>
      </div>
    )
  }

  return null
}

// Isolated DAG renderer. Pure: receives institutions, does not fetch.
function Dag({ institutions = [] }) {
  if (institutions.length === 0) return null

  return (
    <DagCanvas>
      {[...institutions]
        .sort((a, b) => countNodes(b) - countNodes(a))
        .map((institution, index) => (
          <div key={institution.institutionId || institution.id || index}>
            {renderNode(institution, 'institution', `institution-${index}`)}
          </div>
        ))}
    </DagCanvas>
  )
}

export default Dag
