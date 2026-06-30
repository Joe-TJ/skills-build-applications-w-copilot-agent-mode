import { useEffect, useState } from 'react'

import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('users')
      .then((records) => {
        if (!ignore) {
          setUsers(records)
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
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load users.</p>
  }

  return (
    <section className="data-panel">
      <header>
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </header>
      <div className="responsive-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id || user.username}>
            <h2>{user.displayName || user.username}</h2>
            <p>{user.username}</p>
            {user.email && <span>{user.email}</span>}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
