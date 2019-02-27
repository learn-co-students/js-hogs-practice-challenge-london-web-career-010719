const BASEURL = 'http://localhost:3000/hogs/'

//returns all hogs in a promise
const getHogs = () => fetch(BASEURL).then(resp => resp.json())
//creates a hog and returns the hog in a promise is successful
const createHog = hog => {
    return fetch(BASEURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hog)
    }).then(resp => resp.json())
}
//deletes a hog and returns success status in a promise
const deleteHog = hog => {
    return fetch(BASEURL + hog.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(resp => resp.ok)
}
//patches a hog returns new hog in a promise
const patchHog = hog => {
    return fetch(BASEURL + hog.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(hog)
    }).then(resp => resp.json())
}