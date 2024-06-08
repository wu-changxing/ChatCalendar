interface Event {
    title: string
    id: string
  }
  
  interface DraggableEventsProps {
    events: Event[]
  }
  
  export default function DraggableEvents({ events }: DraggableEventsProps) {
    return (
      <div id="draggable-el" className="ml-8 w-full p-4 mt-16 lg:h-1/2 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="font-bold text-xl text-center text-violet-700 mb-4">Drag Event</h1>
        <div className="space-y-3">
          {events.map(event => (
            <div
              className="fc-event p-3 w-full rounded-lg bg-violet-50 hover:bg-violet-100 cursor-pointer shadow-md text-gray-700"
              title={event.title}
              key={event.id}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
  