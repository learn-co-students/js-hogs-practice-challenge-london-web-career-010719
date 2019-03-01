const url = `http://localhost:3000/hogs`

// GET
function getHogs () {
  return fetch(url)
    .then(resp => resp.json())
    .then(hogs => {
      state.hogs = (hogs)
      listHogs(state.filteredHogs)
    })
}

// POST
function postHog (hog) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hog)
  }
  fetch(url, options)
    .then(resp => resp.json)
    .then(getHogs)
}

// PATCH
function updateHog (hog) {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hog)
  }
  fetch(`${url}/${hog.id}`, options)
    .then(resp => resp.json)
    .then(getHogs)
}

// DELETE
function deleteHog (hog) {
  const options = {
    method: 'DELETE'
  }
  fetch(`${url}/${hog.id}`, options)
    .then(resp => resp.json)
    .then(getHogs)
}
