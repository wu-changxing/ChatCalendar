import create from 'zustand'

interface Event {
  title: string
  description: string
  start: string
  end: string
  address: string
  invitees: string
  allDay: boolean
  id: number
}

interface StoreState {
  allEvents: Event[]
  newEvent: Event
  showModal: boolean
  showDeleteModal: boolean
  idToDelete: number | null
  setAllEvents: (events: Event[]) => void
  setNewEvent: (event: Event) => void
  setShowModal: (show: boolean) => void
  setShowDeleteModal: (show: boolean) => void
  setIdToDelete: (id: number | null) => void
  resetNewEvent: () => void
}

export const useStore = create<StoreState>((set) => ({
  allEvents: [],
  newEvent: {
    title: '',
    description: '',
    start: '',
    end: '',
    address: '',
    invitees: '',
    allDay: false,
    id: 0,
  },
  showModal: false,
  showDeleteModal: false,
  idToDelete: null,
  setAllEvents: (events) => set({ allEvents: events }),
  setNewEvent: (event) => set({ newEvent: event }),
  setShowModal: (show) => set({ showModal: show }),
  setShowDeleteModal: (show) => set({ showDeleteModal: show }),
  setIdToDelete: (id) => set({ idToDelete: id }),
  resetNewEvent: () => set({
    newEvent: {
      title: '',
      description: '',
      start: '',
      end: '',
      address: '',
      invitees: '',
      allDay: false,
      id: 0,
    }
  }),
}))
