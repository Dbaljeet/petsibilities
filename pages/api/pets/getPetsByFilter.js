const getEndpointName = (region, commune, species, offset, LIMIT) => {
  if (region !== '' && commune !== '' && species !== '') {
    return `${process.env.ENDPOINT}/pets/filter/?region=${region}&city=${commune}&species=${species}&limit=${LIMIT}&offset=${offset}`
  } else if (region !== '' && commune !== '' && species === '') {
    return `${process.env.ENDPOINT}/pets/filter/?region=${region}&city=${commune}&limit=${LIMIT}&offset=${offset}`
  } else if (region !== '' && commune === '' && species !== '') {
    return `${process.env.ENDPOINT}/pets/filter/?region=${region}&species=${species}&limit=${LIMIT}&offset=${offset}`
  } else if (region !== '' && commune === '' && species === '') {
    return `${process.env.ENDPOINT}/pets/filter/?region=${region}&limit=${LIMIT}&offset=${offset}`
  } else if (region === '' && commune === '' && species !== '') {
    return `${process.env.ENDPOINT}/pets/filter/?species=${species}&limit=${LIMIT}&offset=${offset}`
  } else {
    return `${process.env.ENDPOINT}/pets/filter/?limit=${LIMIT}&offset=${offset}`
  }
}

const LIMIT = 7
export default async function getpets(req, res) {
  const { region, commune, species, offset = 0 } = req.body
  const endpoint = getEndpointName(region, commune, species, offset, LIMIT)
  return fetch(endpoint, {
    method: 'GET',
    headers: {
      api: process.env.API_KEY,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok)
        throw new Error('error response to get pet by city || specie')
      return res.json()
    })
    .then((resp) => {
      return res.status(200).json({ message: resp })
    })
}
