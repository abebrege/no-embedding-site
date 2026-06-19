// Curated short summaries for the featured quantum languages, in display order.
// Shared by the home-page Featured Languages cards and the languages inventory
// table so both stay in sync.
export const FEATURED_LANGUAGES = [
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

// name -> short summary, for lookups (e.g. the languages table).
export const languageSummaries = Object.fromEntries(
  FEATURED_LANGUAGES.map((l) => [l.name, l.summary]),
)
