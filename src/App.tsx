import './App.css';

interface JobData {
  fromHour: number;
  toHour: number;
  title: string;
}

function App() {
  const testData: JobData[] = [
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

  const getHourString = (index: number): string => {
    let str = "";
    let hour = index > 3 ? index - 3 : index + 9;
    str += hour > 9 ? `${hour}:00 ` : `0${hour}:00 `;
    str += index > 2 ? 'PM' : 'AM';
    return str;
  }

  const getHourString24 = (hour: number): string => {
    let str = "";
    let parsedHour = hour;
    if (hour > 12) {
      parsedHour = hour - 12
    }
    str = parsedHour > 9 ? `${parsedHour}:00` : `0${parsedHour}:00`
    return str;
  }

  const getJobs = (index: number) => {
    let hour = index + 9;
    return testData.filter(data => data.fromHour < hour && data.toHour >= hour)
  }

  const itemClicked = () => {
  }

  const renderJobs = (index: number) => {
    let allJobs = getJobs(index)
    let multiplier = 1;
    let jobToRender = allJobs.pop()
    multiplier = allJobs.length
    let height = (multiplier + 1) * 50;
    if (jobToRender && jobToRender.toHour - 9 === index && jobToRender.toHour - jobToRender.fromHour > 1) {
      jobToRender = undefined
    }
    if (allJobs.length === 0 && jobToRender && jobToRender.toHour - jobToRender.fromHour > 1) {
      height = (jobToRender.toHour - jobToRender.fromHour) * 50 + 45
      multiplier = 1
    }
    let padded = allJobs.length + 1 === 1;
    return (<div className="jobs" style={{
      alignItems: multiplier ? 'flex-start' : 'center'
    }}>
      {jobToRender && (<div key={index} className="jobcard" style={{
        height: padded ? height : height + 45,
        marginLeft: padded ? 20 : (allJobs.length + 1) * 40,
        marginTop: multiplier ? (padded ? 15 : 0) : 0,
      }} onClick={itemClicked}>
        <div className="coloredBgs">
          {!padded && (<div className="red"></div>)}
        </div>
        <div className="content">
          <p className="jobname">{jobToRender.title}</p>
          <p className="jobtime">{getHourString24(jobToRender.fromHour)} - {getHourString24(jobToRender.toHour)}</p>
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
            {renderJobs(index)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
