function create(envVarCollection, prefix) {
  const envVarKeys = Object.keys(envVarCollection)
  const config = {}
  envVarKeys
  .filter(function handleFilter(envVarKey) {
    return envVarKey.startsWith(prefix)
  })
  .forEach(function handleMap(envVarKey) {
    config[envVarKey.slice(prefix.length)] = envVarCollection[envVarKey]
  })
  return config
}

module.exports = {
  create
}
