import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection(apiEndpoint)
      .then((records) => {
        if (!ignore) {
          setActivities(records)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load activities.</p>
  }

  return (
    <section className="data-panel">
      <header>
        <p className="eyebrow">Movement</p>
        <h1>Activities</h1>
      </header>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id || `${activity.userId}-${activity.recordedAt}`}>
                <td>{activity.userId}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
