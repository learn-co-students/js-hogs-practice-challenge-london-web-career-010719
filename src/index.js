
const hogContainer = document.querySelector('#hog-container')
const form = document.querySelector('#form')
let medal = 'Highest medal achieved'
let weight = 'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water'
const state = {
  hogs: [],
  showGreasedOnly: false,
  get filteredHogs () {
    return this.showGreasedOnly
      ? this.hogs.filter(hog => hog.greased)
      : this.hogs
  }
}


// ================Creating hogs============
form.addEventListener('submit', (event) => {
  // if (event.target.className === "add-toy-form")
  event.preventDefault()
  const hog = { name: event.target.name.value, image: event.target.img.value, specialty: event.target.specialty.value, greased: event.target.greased.value }
  postHog(hog)
})

// ===============Rendering hogs============

function showHog (hog) {
  let hogDiv = document.createElement('div')
  hogDiv.className = 'hog-card'
  hogDiv.innerHTML =
    `<h2>${hog.name}</h2>
    <p>Specialty: ${hog.specialty}</p>
    <img src="${hog.image}"</img>
    <p>Weight: ${hog[weight]}</p>
    <p>Highest medal achieved: ${hog[medal]}</p>
    <input type="checkbox" name="greased" ${hog.greased ? 'checked' : 'unchecked'} value="">${hog.greased ? 'greased!' : 'not greased :('}</input>
    <button>Delete</button>
    `
  hogDiv.addEventListener('change', (event) => {
    event.preventDefault
    if (event.target.type === 'checkbox') {
      hog.greased = event.target.checked
    }
    updateHog(hog)
  })
  hogDiv.addEventListener('click', (event) => {
    if (event.target.innerText === 'Delete') {
      deleteHog(hog)
    }
  })

  hogContainer.append(hogDiv)
}

function listHogs (hogArray) {
  hogContainer.innerHTML = ''
  for (const hog of hogArray) {
    showHog(hog)
  }
}

//= ==============INITIALIZE===========

function init () {
  getHogs()
}
init()
