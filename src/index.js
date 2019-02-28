//global variables 
const hogContainerEl = document.querySelector('#hog-container')
const hogForm = document.querySelector('#hog-form')
url = 'http://localhost:3000/hogs/';

const state = {

};

document.addEventListener('DOMContentLoaded', () => {
    drawHogs()
})

hogForm.addEventListener('submit', function(event) {
    event.preventDefault()
    addHog(event)
    event.target.reset()
});

function getHogs() {
    return fetch(url)
        .then(resp => resp.json())
};

function drawHog(hog) {
    const hogDivEl = document.createElement('div')
    hogDivEl.className = 'hog-card'
    hogDivEl.id = `${hog.id}`

    const hogTitleEl = document.createElement('h2')
    hogTitleEl.innerText = hog.name

    const hogImageEl = document.createElement('img')
    hogImageEl.src = hog.image

    hogDivEl.innerHTML =
        `<p>Weight - ${hog.weight}</p>
         <p>Speciality - ${hog.specialty}</p>
         <p>Highest Medal Achieved - ${hog["highest medal achieved"]}</p>`


    greasedspanEl = document.createElement('span')
    greasedspanEl.innerText = 'Greased:'

    checkBoxEl = document.createElement('input')
    checkBoxEl.type = 'checkbox'

    if (hog.greased) {
        checkBoxEl.checked = true
    }

    hogDeleteSpanEl = document.createElement('span')
    hogDeleteButtonEl = document.createElement('button')
    hogDeleteButtonEl.innerText = "Get rid of them hogz!"


    hogContainerEl.appendChild(hogDivEl)
    hogDivEl.prepend(hogImageEl)
    hogDivEl.prepend(hogTitleEl)
    hogDivEl.append(greasedspanEl)
    greasedspanEl.append(checkBoxEl)
    hogDivEl.append(hogDeleteSpanEl)
    hogDeleteSpanEl.append(hogDeleteButtonEl)

    hogDeleteButtonEl.addEventListener('click', () => deleteHog(hog))


    checkBoxEl.addEventListener('change', function (event) {
        greaseThatHog(hog)
    })

};



function drawHogs() {
    getHogs()
        .then(hogs => hogs.forEach(hog => drawHog(hog)))
};


function deleteHog(hog) {
    const options =
    {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hog)
    };

    fetch(url + hog.id, options)
    document.getElementById(`${hog.id}`).remove()

}


function greaseThatHog(hog) {
    hog.greased = !hog.greased
    if (hog.greased) { alert("He's a very greasy boy!") }
     updateHogAPI(hog)
}


function updateHogAPI(hog) {
  const options = 
    {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hog)
    };

   return fetch(url + hog.id, options)
      .then(resp => resp.json())
}



function addHog(event){

    const newHog = {name: event.target.name.value,
                    weight: event.target.weight.value,
                    specialty: event.target.specialty.value,
                    "highest medal achieved": event.target.medal.value,
                    image: event.target.img.value,
                    greased: event.target.greased.checked
                 }
    
    const options =
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHog)
    };

    return fetch(url, options)
        .then(resp => resp.json())
          .then(hogFromAPI => drawHog(hogFromAPI))
}

