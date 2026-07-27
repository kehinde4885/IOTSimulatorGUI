import { createFileRoute, Link } from '@tanstack/react-router'
import { EntityForm } from '#/components/entityForm.tsx'

export const Route = createFileRoute('/createEntity')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      {/* Form Section*/}
      <EntityForm />
    </>
  )
}

// SUB_COMPONENTS

function Header() {
  return (
    <header className="[font-synthesis:none] flex items-center justify-between w-full shrink-0 py-5 px-8 border-b border-b-solid border-b-[#E8ECF0] antialiased text-xs/4">
      <div className="flex items-center gap-4">
        <Link
          to={'..'}
          className="flex items-center justify-center shrink-0 rounded-[10px] bg-[#F4F6F8] size-9"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: '0' }}
          >
            <path
              d="M15 18L9 12L15 6"
              fill="none"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div className="flex flex-col gap-0.5">
          <div className="tracking-[-0.02em] inline-block font-sans font-semibold text-[#0F1419] text-base/5">
            Create Entity
          </div>
          <div className="inline-block font-sans text-[#667085] text-[13px]/4">
            Define a new smart home asset
          </div>
        </div>
      </div>
    </header>
  )
}
