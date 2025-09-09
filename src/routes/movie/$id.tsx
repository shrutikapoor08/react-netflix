import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movie/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movie/$id"!</div>
}
