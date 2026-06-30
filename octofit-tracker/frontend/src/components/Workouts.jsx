import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection(apiEndpoint)
      .then((records) => {
        if (!ignore) {
          setWorkouts(records)
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
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load workouts.</p>
  }

  return (
    <section className="data-panel">
      <header>
        <p className="eyebrow">Training</p>
        <h1>Workouts</h1>
      </header>
      <div className="responsive-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id || workout.title}>
            <h2>{workout.title}</h2>
            <p>{workout.difficulty}</p>
            {workout.description && <span>{workout.description}</span>}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts
