const HOGS_URL = "http://localhost:3000/hogs"
const hogForm = document.querySelector("#form")


// get hogs from server and create hog instances
function getHogs() {
    return fetch(HOGS_URL)
    .then(res => res.json())
    .then(hogs => {
        hogs.forEach(hog => {
            const id = hog.id
            const name = hog.name
            const specialty = hog.specialty
            const greased = hog.greased
            const weight = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
            const medal = hog["highest medal achieved"]
            const image = hog.image
            new Hog(id, name, specialty, greased, weight, medal, image)
        })
    } )
}



// create hog on the server
function createHog(e) {
    e.preventDefault()
    const options = {
        method: "POST", 
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            "name": e.target.name.value,
            "specialty": e.target.specialty.value,
            "greased": e.target.greased.checked,
            "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": e.target.weight.value,
            "highest medal achieved": e.target.medal.value, 
            "image": e.target.img.value
        })
    }
    e.target.reset()
    return fetch(HOGS_URL, options)
    .then (res => res.json())
    .then (hog => {
        const id = hog.id
        const name = hog.name
        const greased = hog.greased
        const weight = hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]
        const medal = hog["highest medal achieved"]
        const image = hog.image
        new Hog(id, name, greased, weight, medal, image)
        })
}

hogForm.addEventListener("submit", createHog)
getHogs()
