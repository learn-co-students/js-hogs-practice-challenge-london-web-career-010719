//==== Set Global Variables & State ====//
const hogContainerEl = document.querySelector('#hog-container')

//==== Initialize Page ====//
document.addEventListener('DOMContentLoaded', () => {
    initialize()
    addNewHogListener()
})
function initialize() {
    getHogs().then(drawHogCards)
}
const addNewHogListener = () =>{
    const pigFormEl = document.querySelector('#hog-form')
    pigFormEl.addEventListener('submit', event => {
        event.preventDefault()
        const newHog = {
            name: event.target.name.value,
            specialty: event.target.specialty.value,
            greased: event.target.greased.value,
            'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': event.target.weight.value,
            'highest medal achieved': event.target.medal.value,
            image: event.target.img.value
        }
        createHog(newHog).then(hog => {
            drawHogCard(hog)
            pigFormEl.reset()
        })
    })
}

//==== Draw Functions ====//
const drawHogCard = hog => {
    const hogCardEl = document.createElement('div')
    hogCardEl.dataset.hogId = hog.id
    hogCardEl.classList.add('hog-card')
    hogCardEl.innerHTML = hogCardHTML(hog)
    hogCardEl.querySelector('button').addEventListener('click', ()=>{
        deleteHog(hog)
            .then(success => { if (success) { removeHogCard(hog) }})
    })
    hogCardEl.querySelector('input').addEventListener('click', () => {
        greaseHog(hog)
    })
    hogContainerEl.appendChild(hogCardEl)
}
const greaseHog = hog => {
    hog.greased = !hog.greased
    patchHog(hog).then(redrawHogCard)
}
const drawHogCards = hogs => hogs.forEach(drawHogCard)
const redrawHogCard = hog => hogContainerEl.querySelector(`div[data-hog-id="${hog.id}"]`).innerHTML = hogCardHTML(hog)
const removeHogCard = hog => hogContainerEl.querySelector(`div[data-hog-id="${hog.id}"]`).remove()

//returns the inner HTML of a Hog Card
const hogCardHTML = hog => `
    <h3>${hog.name}</h3>
    <img src="${hog.image}" alt="HogPicture"/>
    <ul>
        <li><b>Specialty:</b> ${hog.specialty}</li>
        <li>
            <b>Greased:</b>
            <input id="termsCheck" type="checkbox" name="greased" ${hog.greased? 'checked' : ''}/>
        </li>
        <li><b>Ratio:</b> ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}</li>
        <li><b>Best Medal:</b> ${hog['highest medal achieved']}
    </ul><button>Convert to Bacon 🥓</button>`

