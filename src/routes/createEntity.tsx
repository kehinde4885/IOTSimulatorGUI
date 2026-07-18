import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/createEntity')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/createEntity"!</div>
}
