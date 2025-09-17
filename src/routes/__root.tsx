import { Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-router'
import Header from "../components/Header"
import appCss from '~/App.css?url'


export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Netflix Clone',
      },
      {
        name: 'description',
        content: 'React Netflix Clone Application built by Shruti Kapoor',
      }],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <div id="root">

          <Header />
          <Outlet />

        </div>
        <Scripts />
      </body>
    </html>
  )
}