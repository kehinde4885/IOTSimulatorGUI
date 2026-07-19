import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { CreateEntityButton } from '../components/CreateEntityButton.tsx'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [doEntityExist, changeIsEntityExisting] = useState(false)

  useEffect(() => {
    getEntities().then((entityInfoArray) => {
      if (entityInfoArray.length > 0) {
        changeIsEntityExisting(true)
      }
    })
  }, [])

  return (
    <main className="window">
      <header className="[font-synthesis:none] flex items-center justify-between w-full shrink-0 py-5 px-8 border-b border-b-solid border-b-[#E8ECF0] antialiased text-xs/4">
        <div className="flex items-center gap-3">
          {/**/}
          <div className="flex items-center justify-center shrink-0 rounded-[10px] bg-[#0F1419] size-9">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: '0' }}
            >
              <path
                d="M4 10.5L12 4L20 10.5V19C20 19.552 19.552 20 19 20H5C4.448 20 4 19.552 4 19V10.5Z"
                fill="none"
                stroke="#39D98A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="13" r="1.5" fill="#39D98A" />
              <circle cx="8" cy="16" r="1.2" fill="#39D98A" />
              <circle cx="16" cy="16" r="1.2" fill="#39D98A" />
            </svg>
          </div>
          {/**/}
          <div className="flex flex-col gap-0.5">
            <div className="tracking-[-0.02em] inline-block font-sans font-semibold text-[#0F1419] text-base/5">
              Simulator Console
            </div>
            <div className="inline-block font-sans text-[#667085] text-[13px]/4">
              Smart home entity manager
            </div>
          </div>
        </div>
      </header>

      {doEntityExist ? <></> : <CreateEntityButton />}
    </main>
  )
}

async function getEntities() {
  const response = await fetch('http://127.0.0.1:3001/getEntities')

  const entityInfoJSON = await response.json()

  return JSON.parse(entityInfoJSON)
}
