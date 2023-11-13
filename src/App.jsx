import { useState, useEffect } from 'react'
import { dashboards, getDashboard } from './DashboardApi'
import { Divider } from '@dhis2-ui/divider'
import { SingleSelect, SingleSelectOption } from '@dhis2-ui/select'
import { Dashboard } from './Dashboard'

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL ITEMS")
  useEffect(() => {
    (async () => {
      const dashboardData = 
        await Promise.all(dashboards.map(dash => getDashboard(dash.id)))
      setData(dashboardData)
    })()
  }, [])

  return (
    <>
      <div className="dashboard-heading">
        Dashboards 
        <SingleSelect placeholder="Filter items: " selected={filter} onChange={({selected}) => setFilter(selected)}>
          <SingleSelectOption label="All Types" value="ALL ITEMS"/>
          <SingleSelectOption label="Visualization" value="VISUALIZATION"/>
          <SingleSelectOption label="Map" value="MAP" />
          <SingleSelectOption label="Text" value="TEXT" />
        </SingleSelect>
      </div>
      <Divider />
      {data.length > 0 && 
        <div className="dashboard-container">
          <Dashboard filter={filter} dashboardData={data} />
        </div>
      }
    </>
  )
}

export default App
