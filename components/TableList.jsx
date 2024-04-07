import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import { useDispatch, useSelector } from "react-redux";
import ReminderList from './ReminderList';
import EventsList from './EventsList';
import { fetchTodoData,fetchReminderData,fetchEventData } from "../redux/slices/tableSplice";

const TableList = () => {
  const [activeTab, setActiveTab] = useState('todo');
  const dispatch = useDispatch();

  function formatDate(inputDate) {
    const date = new Date(inputDate); // Parse the input date string
    const day = date.getUTCDate().toString().padStart(2, '0'); // Get day (01 - 31)
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getUTCMonth()]; // Get month abbreviation
    // const year = date.getUTCFullYear().toString().substr(-2); // Get last two digits of the year
    const year = date.getUTCFullYear().toString(); // Get last two digits of the year
    return `${day}-${month}-${year}`;
  }

  const [todoData, setTodoData] = useState([]);
  const [reminderData, setReminderData] = useState([]);
  const [eventData, setEventData] = useState([]);

  
  const todoList = useSelector((state) => state.tableSplice.todo);
  const reminderList = useSelector((state) => state.tableSplice.reminder);
  const eventList = useSelector((state) => state.tableSplice.event);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // for Todo List
  useEffect(() => {
    if (!todoList.data && !todoList.isLoading) {
      dispatch(fetchTodoData());
    }
    if(todoList.data){
       const formattedTodoData = todoList.data.map((item) => ({
        ...item,
        date: formatDate(item.date),
      }));
      setTodoData(formattedTodoData);
    }
  }, [todoList.data]);

  // for Reminder List
  useEffect(() => {
    if (!reminderList.data && !reminderList.isLoading) {
      dispatch(fetchReminderData());
    }
   if(reminderList.data){
         const formattedReminderData = reminderList.data.map((item) => ({
          ...item,
          date: formatDate(item.date),
        }));
        setReminderData(formattedReminderData);
   }     
  }, [reminderList.data]);

  // for Event List
  useEffect(() => {
    if (!eventList.data && !eventList.isLoading) {
      dispatch(fetchEventData());
    }
    if(eventList.data){
      const formattedEventData = eventList.data.map((item) => ({
        ...item,
        date: formatDate(item.date),
      }));
      setEventData(formattedEventData);
    }
  }, [eventList.data]);

  return (
    <div className="bs-tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => handleTabClick('todo')}
        >
          To Do
        </button>
        <button
          className={`tab-button ${activeTab === 'reminder' ? 'active' : ''}`}
          onClick={() => handleTabClick('reminder')}
        >
          Reminders
        </button>
        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => handleTabClick('events')}
        >
          Events
        </button>
      </div>

      {/* Tab Content */}
      <div className={`tab ${activeTab === 'todo' ? 'active' : ''}`}>
        <div>
          <TodoList data={todoData} />
        </div>
      </div>
      <div className={`tab ${activeTab === 'reminder' ? 'active' : ''}`}>
        <div>
          <ReminderList data={reminderData} />
        </div>
      </div>
      <div className={`tab ${activeTab === 'events' ? 'active' : ''}`}>
        <div>
          <EventsList data={eventData} />
        </div>
      </div>
    </div>
  );
};

export default TableList;
