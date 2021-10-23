import { useEffect, useState } from 'react';
import './App.scss';
import { hourToString } from './shared/helpers';
import { EventData } from './shared/models';

const testData = [
  {
    fromHour: 10, toHour: 12, title: "Work"
  },
  {
    fromHour: 11, toHour: 13, title: "Meeting"
  },
  {
    fromHour: 14, toHour: 15, title: "Lunch"
  },
  // {
  //   fromHour: 11, toHour: 15, title: "Superbowl"
  // },
  // {
  //   fromHour: 12, toHour: 14, title: "World Cup"
  // },
  // {
  //   fromHour: 9, toHour: 10, title: "Coffee Meetup"
  // },
  // {
  //   fromHour: 9, toHour: 10, title: "Enter Office"
  // },
  // {
  //   fromHour: 17, toHour: 18, title: "Tea Break"
  // }
]

function App() {
  // event list
  const [events, setEvents] = useState<EventData[]>([])
  // calendar start time
  const [startHour] = useState(9)
  // calendar end time
  const [endHour] = useState(21)

  useEffect(() => {
    sortData()
  }, [])

  // sort the events based on their start time and filter events that don't satisfy calendar timeline
  const sortData = () => {
    let sortedEvents = testData
      .sort((a, b) => (a.fromHour - b.fromHour) > 0 ? 1 : -1)
      .map(item => new EventData(item))
      .filter(item => item.fromHour >= startHour && item.toHour < endHour && item.fromHour < endHour && item.toHour <= endHour)
    // assign an id to the events which is the same as index of the initial sorted array
    sortedEvents = sortedEvents.map((event, index) => {
      event.id = index;
      return event
    })
    setEvents(sortedEvents)
  }

  // get start hour for a given index or time span
  const getStartHourForIndex = (index: number, is24Hour: boolean = false) => {
    let hour = index > (12 - startHour) ? index - (12 - startHour) : index + startHour
    if (12 - startHour < index && is24Hour) {
      return hour + 12
    }
    return hour;
  }

  // get label each index in left column
  const getHourString = (index: number): string => {
    let hour = getStartHourForIndex(index);
    return hourToString(hour, index > (12 - startHour - 1), true);
  }

  // find all the events at a given time span position
  const getTotalEventsInSpan = (index: number): EventData[] => {
    let eventsInSpan = events.filter(event => event.fromHour <= getStartHourForIndex(index, true) && event.toHour > getStartHourForIndex(index, true))
    return eventsInSpan.sort((a, b) => (a.id - b.id) > 0 ? 1 : -1)
  }

  // method to decide whether a particular block in a card is red or not
  const isBgRed = (index: number, cardIndex: number, event: EventData): boolean => {
    let currentSpanEvents = getTotalEventsInSpan(index + cardIndex)
    if (currentSpanEvents.length > 0) {
      if (event.id !== currentSpanEvents[0].id) return true
    }
    return false
  }

  // method to render cards, looping through each event at a given time span index
  const renderCards = (index: number) => {
    // get all the events starting at given index
    let currentEvents = events.filter(event => event.fromHour === index + startHour ? event : null)
    if (currentEvents.length === 0) return null
    return currentEvents.sort((a, b) => (a.id - b.id) > 0 ? 1 : -1).map((event, i) => renderCard(i, index, event))
  }

  // method to render each card, decide card height, check if blocks in card are red or not
  const renderCard = (index: number, cardIndex: number, event: EventData) => {
    return (
      <div className={`card d-flex flex-column`} key={index}
        style={{
          height: event.getSpan() * 100 - 1,
          justifyContent: event.getSpan() === 1 ? 'center' : 'flex-start',
          marginLeft: isBgRed(index, cardIndex, event) ? 20 : 0
        }}>
        <div className="backgrounds d-flex flex-column">
          {
            (new Array(event.getSpan()).fill("", 0, event.getSpan()).map((item, i) =>
            (<div key={i} className="background" style={{
              backgroundColor: isBgRed(i, cardIndex, event) ? '#d63031' : 'transparent'
            }}></div>))
            )
          }
        </div>
        <h4 className="title overlay" style={{
          marginTop: event.getSpan() === 1 ? 0 : 15
        }}>{event.title}</h4>
        <h5 className="time overlay">{hourToString(event.fromHour)} - {hourToString(event.toHour)}</h5>
      </div>
    )
  }

  return (
    <div className="App">
      <header>
        <img src="./logo.svg" alt="Sawayo logo" className="logo" />
      </header>

      <div className="calendar">
        <div className="container d-flex">
          <div className="left">
            {new Array(endHour - startHour + 1).fill("", 0, endHour - startHour + 1).map((val, index) =>
              <h3 key={index}>{getHourString(index)}</h3>
            )}
          </div>
          <div className="right">
            {new Array(endHour - startHour).fill("", 0, endHour - startHour).map((val, index) =>
              <div className="well d-flex" key={index}>{renderCards(index)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
