import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('teams')
      .then((records) => {
        if (!ignore) {
          setTeams(records)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load teams.</p>
  }

  return (
    <section className="data-panel">
      <header>
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </header>
      <div className="responsive-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id || team.name}>
            <h2>{team.name}</h2>
            <p>{team.members?.length || 0} members</p>
            <span>{team.members?.join(', ') || 'No members yet'}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams
