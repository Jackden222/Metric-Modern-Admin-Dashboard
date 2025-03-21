import { motion } from 'framer-motion';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  className?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: '2024-03-15T10:00:00',
    end: '2024-03-15T11:30:00',
    className: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: '2024-03-20',
    end: '2024-03-20',
    allDay: true,
    className: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    id: '3',
    title: 'Client Presentation',
    start: '2024-03-18T14:00:00',
    end: '2024-03-18T15:30:00',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: '4',
    title: 'Team Building',
    start: '2024-03-22',
    end: '2024-03-23',
    allDay: true,
    className: 'bg-green-100 text-green-800 border-green-200'
  }
];

const Calendar = () => {
  const [view, setView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth');
  const [currentEvents, setCurrentEvents] = useState<Event[]>(mockEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    start: '',
    end: '',
    allDay: false,
    className: 'bg-pink-100 text-pink-800 border-pink-200'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleDateSelect = (selectInfo: any) => {
    const endDate = new Date(selectInfo.end);
    endDate.setMinutes(endDate.getMinutes() - 1);
    
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: endDate.toISOString(),
      allDay: selectInfo.allDay
    });
    setShowEventModal(true);
  };

  const handleEventClick = (clickInfo: any) => {
    if (window.confirm('Would you like to delete this event?')) {
      setCurrentEvents(currentEvents.filter(event => event.id !== clickInfo.event.id));
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title) {
      alert('Please enter an event title');
      return;
    }

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title!,
      start: newEvent.start!,
      end: newEvent.end!,
      allDay: newEvent.allDay,
      className: newEvent.className
    };

    setCurrentEvents([...currentEvents, event]);
    setShowEventModal(false);
    setNewEvent({
      title: '',
      start: '',
      end: '',
      allDay: false,
      className: 'bg-pink-100 text-pink-800 border-pink-200'
    });
  };

  return (
    <motion.div
      className="p-6 h-screen bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
          <p className="text-gray-500">Manage your schedule and events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setShowEventModal(true);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Event</span>
        </motion.button>
      </div>

      {/* View Selector */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            view === 'dayGridMonth'
              ? 'bg-pink-100 text-pink-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setView('dayGridMonth')}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            view === 'timeGridWeek'
              ? 'bg-pink-100 text-pink-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setView('timeGridWeek')}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            view === 'timeGridDay'
              ? 'bg-pink-100 text-pink-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setView('timeGridDay')}
        >
          Day
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
          }}
          initialView={view}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={currentEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventClassNames="rounded-lg border px-2 py-1 cursor-pointer"
          height="80vh"
        />
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.start?.slice(0, 16)}
                    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={newEvent.end?.slice(0, 16)}
                    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allDay"
                  checked={newEvent.allDay}
                  onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                  className="rounded border-gray-300 text-pink-500 focus:ring-pink-500 cursor-pointer"
                />
                <label htmlFor="allDay" className="ml-2 text-sm text-gray-700 cursor-pointer">
                  All Day Event
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                onClick={() => setShowEventModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                onClick={handleCreateEvent}
              >
                Add Event
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Calendar;