import { useState, useEffect } from 'react'
import { DataTable, DataTableRow, DataTableCell, TableBody } from '@dhis2-ui/table'
import { Divider } from '@dhis2-ui/divider'
import { IconDataString24, IconVisualizationColumn24, IconImage24, IconStar24, IconStarFilled24 } from '@dhis2/ui-icons'

const DashboardCardItem = ({item}) => {
  let name = ""
  let icon
  if(item.type === "MESSAGES") { 
    return
  }
  switch(item.type) {
    case "VISUALIZATION":
      name = item.visualization.name
      icon = <IconVisualizationColumn24 />
      name = name.slice(name.indexOf(" "))
    break;
    case "MAP":
      name = item.map.name
      name = name.slice(name.indexOf(" "))
      icon = <IconImage24 />
    break;
    case "TEXT":
      name = item.text
      icon = <IconDataString24 />
    break;
  }
  return (
    <>
      <div className="dashboard-card-item">
        {icon}
        {name}
      </div>
      <Divider />
    </>
  )
}
const DashboardCard = ({items}) => {
  return (
    <>
      {items.map((item, index) =>  <DashboardCardItem key={index} item={item} />)}
    </>
  )
}

export const Dashboard = ({dashboardData, filter}) => {
  const [expanded, setExpanded] = useState(-1)
  const [starred, setStarred] = useState([...new Array(dashboardData.length).fill(false)])
  const setStarredStatus = (index, value) => {
    const newValue = starred.map((s, i) => i === index ? value : s)
    setStarred(newValue)
    window.localStorage.setItem("dhis2-dashboard-starred", JSON.stringify(newValue))
  }

  useEffect(() => {
    const starredFromLocalStorage = window.localStorage.getItem("dhis2-dashboard-starred")
    if(starredFromLocalStorage) {
      setStarred(JSON.parse(starredFromLocalStorage))
    } 
  }, [])

  return (
    <DataTable>
      <TableBody>
        {dashboardData.map((data, index) => (
          <DataTableRow 
            key={index}
            expanded={expanded === index} 
            expandableContent={<DashboardCard items={filter === "ALL ITEMS" ? data.dashboardItems : data.dashboardItems.filter(item => item.type === filter)} />} 
            onExpandToggle={() => setExpanded(expanded === index ? -1 : index)}
          >
            <DataTableCell className="dashboard-row" onClick={() => setStarredStatus(index, !starred[index])}>
              {data.displayName} 
              {starred[index] ? <IconStarFilled24 /> : <IconStar24 />}
              
            </DataTableCell>
          </DataTableRow>
        )
        )}
      </TableBody>
    </DataTable>
  )
}
