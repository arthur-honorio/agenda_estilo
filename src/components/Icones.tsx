import type { ReactNode, SVGProps } from 'react'

/** Ícones em linha (SVG), iguais em Android e iPhone, ao contrário dos emojis. */
function Icone({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconeAgenda = () => (
  <Icone>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icone>
)

export const IconeMais = () => (
  <Icone>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </Icone>
)

export const IconeCarteira = () => (
  <Icone>
    <path d="M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
    <circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" />
  </Icone>
)

export const IconeCadeado = () => (
  <Icone>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icone>
)

export const IconeBusca = () => (
  <Icone>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icone>
)

export const IconeCarro = () => (
  <Icone>
    <path d="M5 17h14v-5l-2-5H7l-2 5v5Z" />
    <path d="M5 12h14" />
    <circle cx="8" cy="17" r="1.5" />
    <circle cx="16" cy="17" r="1.5" />
  </Icone>
)

export const IconeAlerta = () => (
  <Icone>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17h.01" />
  </Icone>
)

export const IconeVoltar = () => (
  <Icone>
    <path d="m15 18-6-6 6-6" />
  </Icone>
)

export const IconeAvancar = () => (
  <Icone>
    <path d="m9 18 6-6-6-6" />
  </Icone>
)
