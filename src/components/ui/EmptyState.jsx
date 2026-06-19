import React from 'react'
import Loading from './Loading.jsx'

// Centered placeholder for empty / error states (shares Loading's styling).
const EmptyState = ({ children = 'Nothing to show.' }) => <Loading>{children}</Loading>

export default EmptyState
