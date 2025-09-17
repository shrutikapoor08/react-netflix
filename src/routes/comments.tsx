import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const streamComments = createServerFn({
  method: 'GET',
  response: 'raw',
}).handler(async ({ signal }) => {
  // Create a ReadableStream to send chunks of data
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial response immediately
      controller.enqueue(new TextEncoder().encode('Connection established\n'))

      let count = 0
      const interval = setInterval(() => {
        // Check if the client disconnected
        if (signal.aborted) {
          clearInterval(interval)
          controller.close()
          return
        }

        // Send a data chunk
        controller.enqueue(
          new TextEncoder().encode(
            `Event ${++count}: ${new Date().toISOString()}\n`,
          ),
        )

        // End after 10 events
        if (count >= 10) {
          clearInterval(interval)
          controller.close()
        }
      }, 1000)

      // Ensure we clean up if the request is aborted
      signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  // Return a streaming response
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
});

export const Route = createFileRoute('/comments')({
  component: CommentsComponent,
  loader: async () => {
    try {
      return await streamComments()
    } catch (error) {
      console.error('Failed to load comments:', error)
      return { comments: [] }
    }
  },
})

function CommentsComponent() {

  return <div>Comments go here</div>

}
