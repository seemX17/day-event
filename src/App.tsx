import { useEffect, useState } from 'react';
import './App.css';

interface EventData {
  fromHour: number;
  toHour: number;
  title: string;
  id?: number;
}

const testData: EventData[] = [
  {
    fromHour: 10, toHour: 12, title: "Work"
  },
  {
    fromHour: 11, toHour: 13, title: "Meeting"
  },
  {
    fromHour: 14, toHour: 15, title: "Break"
  }
]

function App() {
  const [eventData, setEventData] = useState<EventData[]>([]);

  useEffect(() => {
    //add id to recieved data
    let newData = testData.map((item) => {
      item.id = item.fromHour - 8;
      return item;
    });
    setEventData(newData);
  }, [])

  //convert index to time
  const getHourString = (index: number): string => {
    let str = "";
    let hour = index > 3 ? index - 3 : index + 9;
    str += hour > 9 ? `${hour}:00 ` : `0${hour}:00 `;
    str += index > 2 ? 'PM' : 'AM';
    return str;
  }

  //convert 24hr time format to 12hrs
  const getHourString24 = (hour: number): string => {
    let str = "";
    let parsedHour = hour;
    if (hour > 12) {
      parsedHour = hour - 12
    }
    str = parsedHour > 9 ? `${parsedHour}:00` : `0${parsedHour}:00`
    return str;
  }

  //get all events present
  const getEvents = (index: number) => {
    let hour = index + 9;
    return eventData.filter(data => data.fromHour < hour && data.toHour >= hour)
  }

  //delete on click of item
  const itemClicked = (index: number) => {
    let data = eventData;
    data = data.filter((item) => item.id != index);
    setEventData(data);
  }

  //event component
  const renderEvents = (index: number) => {
    let allEvents = getEvents(index);
    let multiplier = 1;
    let eventToRender = allEvents.pop();
    multiplier = allEvents.length;
    let height = (multiplier + 1) * 50;
    if (eventToRender && eventToRender.toHour - 9 === index && eventToRender.toHour - eventToRender.fromHour > 1) {
      eventToRender = undefined
    }
    if (allEvents.length === 0 && eventToRender && eventToRender.toHour - eventToRender.fromHour > 1) {
      height = (eventToRender.toHour - eventToRender.fromHour) * 50 + 45
      multiplier = 1
    }
    let padded = allEvents.length + 1 === 1;
    return (<div className="events" id={index.toString()} style={{
      alignItems: multiplier ? 'flex-start' : 'center'
    }}>
      {eventToRender && (<div key={index} className="eventcard" style={{
        height: padded ? height : height + 45,
        marginLeft: padded ? 20 : (allEvents.length + 1) * 40,
        marginTop: multiplier ? (padded ? 15 : 0) : 0,
      }} onClick={() => { itemClicked(index) }}>
        <div className="coloredBgs">
          {!padded && (<div className="red"></div>)}
        </div>
        <div className="content">
          <p className="eventname">{eventToRender.title}</p>
          <p className="eventtime">{getHourString24(eventToRender.fromHour)} - {getHourString24(eventToRender.toHour)}</p>
        </div>
      </div>)}
    </div>)
  }

  return (
    <div className="App">
      <header>
        <img src="./logo.svg" alt="Sawayo logo" className="logo" />
      </header>

      <div className="calendar">
        {new Array(13).fill("", 0, 13).map((val, index) =>
          <div className="row" key={index}>
            <div className="time">
              <p className="hour">{getHourString(index)}</p>
            </div>
            {renderEvents(index)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
