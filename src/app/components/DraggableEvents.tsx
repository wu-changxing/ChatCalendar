interface Event {
    title: string;
    id: string;
  }
  
  interface DraggableEventsProps {
    events: Event[];
  }
  
  export default function DraggableEvents({ events }: DraggableEventsProps) {
    return (
      <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
        <h1 className="font-bold text-lg text-center">Drag Event</h1>
        {events.map(event => (
          <div
            className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
            title={event.title}
            key={event.id}
          >
            {event.title}
          </div>
        ))}
      </div>
    )
  }
  