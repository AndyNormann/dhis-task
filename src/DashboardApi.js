const APIURL = "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/"
export const dashboards = 
  [
    {
      "displayName": "Antenatal Care",
      "id": "nghVC4wtyzi",
      "starred": true
    },
    {
      "displayName": "Cases Malaria",
      "id": "JW7RlN5xafN",
      "starred": false
    },
    {
      "displayName": "Delivery",
      "id": "iMnYyBfSxmM",
      "starred": false
    },
    {
      "displayName": "Disease Surveillance",
      "id": "vqh4MBWOTi4",
      "starred": false
    },{
      "displayName": "Immunization",
      "id": "TAMlzYkstb7",
      "starred": false
    }
  ]

export const getDashboard = async (id) => {
  const dashboardData = dashboards.find(d => d.id === id)
  if(!dashboardData) {
    return null
  }
  const data = await fetch(`${APIURL}/${id}.json`)
  const json = await data.json()
  return json
}
