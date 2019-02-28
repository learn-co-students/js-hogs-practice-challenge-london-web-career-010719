const hogBar = document.querySelector('#hog-container')
const hogForm = document.querySelector('#hog-form')
const HOGS_URL = "http://localhost:3000/hogs"

document.addEventListener("DOMContentLoaded", function () {
    displayHogCards()
});

hogForm.addEventListener("submit", event => {
    event.preventDefault()
    postNewHog(createNewHog())
})

const fetchHogs = () => fetch(HOGS_URL).then(res => res.json())

const writeHogCard = hog => {
    const hogCardEl = document.createElement('div')
    hogCardEl.innerHTML = `
        <h2>${hog.name} <button>☠</button></h2>
        <h4>Speciality: ${hog.specialty}</h4>
        <h4>Greased: ${hog.greased ? '👍' : '👍'}</h4>
        <h4>Medal: ${hog['highest medal achieved']}</h4>
        <img src="${hog.image}" >
    `
    hogCardEl.className = 'hog-card'
    hogBar.append(hogCardEl)
    hogCardEl.querySelector('button').addEventListener('click', () => {
        hogCardEl.remove()
        deleteHog(hog)
    })
}

const deleteHog = hog => {
    return fetch(HOGS_URL +`/${hog.id}`, { method: 'Delete' })
        .then(res => res.json())
}

const writeHogCards = hogs => hogs.forEach(writeHogCard)

const displayHogCards = () => {
    hogBar.innerHTML = ''
    fetchHogs()
        .then(writeHogCards)
}

const createNewHog = () => {
    const newHog = {
    "name": event.target.name.value,
    "specialty": event.target.specialty.value,
    "greased": event.target.greased.checked,
    "highest medal achieved": event.target.medal.value,
    "image": event.target.img.value
  }
  return newHog
}

const postNewHog = newHog => {
    const options = {method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHog)}
    return fetch(HOGS_URL, options)
        .then(res => res.json())
        .then(writeHogCard)
}