const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const codespaceConfigured = Boolean(codespaceName)

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [payload.results, payload.items, payload.data, payload.docs]
  const collection = candidates.find(Array.isArray)

  return collection || []
}

export const fetchCollection = async (resource) => {
  const endpointUrl = resource.startsWith('http')
    ? resource
    : `${apiBaseUrl}/${resource.startsWith('/api/')
      ? resource.replace(/^\/api\//, '').replace(/\/$/, '')
      : resource}/`
  const response = await fetch(endpointUrl)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}
