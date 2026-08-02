import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'

import { PlusIcon } from 'lucide-react'

export function CreateEntityButton() {
  return (
    <Link to={'/createEntity'}>
      <Button>
        <PlusIcon data-icon={'inline-start'} />
        Create Entity
      </Button>
    </Link>
  )
}

//
//
// <section>
//   <div className="[font-synthesis:none] flex flex-col items-center max-w-105 gap-2 antialiased text-xs/4">
//     <div className="tracking-[-0.03em] text-center inline-block font-sans font-semibold text-[#0F1419] text-[22px]/7">
//       No entities yet
//     </div>
//     <div className="text-center inline-block font-sans text-[#667085] text-[15px]/5.5">
//       Add lights, sensors, switches, and other devices to your simulator
//       without editing JSON.
//     </div>
//   </div>
//
//   <Link
//     to={'/createEntity'}
//     className="[font-synthesis:none] flex items-center justify-center py-3.5 px-5.5 rounded-xl gap-3 [box-shadow:#0F141914_0px_1px_2px,#0F14191F_0px_8px_24px] bg-[#0F1419] antialiased text-xs/4"
//   >
//     <div className="flex items-center justify-center shrink-0 rounded-lg bg-[#39D98A29] size-8">
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ flexShrink: '0' }}
//       >
//         <path
//           d="M12 5V19M5 12H19"
//           fill="none"
//           stroke="#39D98A"
//           strokeWidth="2.2"
//           strokeLinecap="round"
//         />
//         <path
//           d="M4 10.5L12 4L20 10.5V19C20 19.552 19.552 20 19 20H5C4.448 20 4 19.552 4 19V10.5Z"
//           fill="none"
//           stroke="#39D98A"
//           strokeWidth="1.4"
//           strokeLinejoin="round"
//           style={{ opacity: '0.55' }}
//         />
//       </svg>
//     </div>
//     <div className="flex flex-col items-start gap-0.5">
//       <div className="tracking-[-0.01em] inline-block font-['Inter',system-ui,sans-serif] font-semibold text-white text-[15px]/4.5">
//         Create Smart Home Entity
//       </div>
//       <div className="inline-block font-['Inter',system-ui,sans-serif] text-[#9CA3AF] text-xs/3.5">
//         Lights · Sensors · Switches · More
//       </div>
//     </div>
//   </Link>
// </section>
