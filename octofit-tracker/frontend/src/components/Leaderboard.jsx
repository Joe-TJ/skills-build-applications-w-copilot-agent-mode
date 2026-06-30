import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection(apiEndpoint)
      .then((records) => {
        if (!ignore) {
          setEntries(records)
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
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load leaderboard.</p>
  }

  return (
    <section className="data-panel">
      <header>
        <p className="eyebrow">Standings</p>
        <h1>Leaderboard</h1>
      </header>
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id || entry.userId}>
            <strong>#{entry.rank || index + 1}</strong>
            <span>{entry.userId}</span>
            <b>{entry.score} pts</b>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
