import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventSourceInput } from '@fullcalendar/core'
import Modal from './Modal'
import { useStore } from '../store'

export default function CalendarComponent() {
  const {
    allEvents,
    newEvent,
    showModal,
    showDeleteModal,
    idToDelete,
    setAllEvents,
    setNewEvent,
    setShowModal,
    setShowDeleteModal,
    setIdToDelete,
    resetNewEvent,
  } = useStore()

  function formatDateTime(date: Date) {
    const pad = (num: number) => String(num).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    const start = formatDateTime(arg.date)
    const end = formatDateTime(new Date(arg.date.getTime() + 30 * 60000)) // 30 minutes later

    const updatedEvent = {
      ...newEvent,
      start: start,
      end: end,
      allDay: arg.allDay,
      id: new Date().getTime(),
    }

    console.log('Setting new event:', updatedEvent)

    setNewEvent(updatedEvent)
    setShowModal(true)
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
  }

  function handleDelete() {
    setAllEvents(allEvents.filter((event) => Number(event.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  function handleCloseModal() {
    setShowModal(false)
    resetNewEvent()
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setNewEvent({
      ...newEvent,
      [name]: value,
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAllEvents([...allEvents, newEvent])
    setShowModal(false)
    resetNewEvent()
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        <div className="col-span-1 lg:col-span-12">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'mobileDropdown,dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              mobileDropdown: {
                text: 'View',
                click: function () {
                  const dropdown = document.getElementById('mobile-dropdown');
                  dropdown?.classList.toggle('hidden');
                },
              },
            }}
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={(data) => handleDeleteModal(data)}
            viewClassNames={(view) => {
              return view.type === 'dayGridMonth' ? 'hidden lg:block' : '';
            }}
            buttonText={{
              dayGridMonth: 'Month',
              timeGridWeek: 'Week',
              timeGridDay: 'Day',
            }}
          />
          <div id="mobile-dropdown" className="hidden lg:hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => document.querySelector('.fc-dayGridMonth-button')?.dispatchEvent(new Event('click'))}
              >
                Month
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => document.querySelector('.fc-timeGridWeek-button')?.dispatchEvent(new Event('click'))}
              >
                Week
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => document.querySelector('.fc-timeGridDay-button')?.dispatchEvent(new Event('click'))}
              >
                Day
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        showModal={showModal}
        showDeleteModal={showDeleteModal}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newEvent={newEvent}
      />
    </>
  )
}
