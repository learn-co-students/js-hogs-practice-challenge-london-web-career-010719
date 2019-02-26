class Hog {
    constructor(id, name, specialty, greased, weight, medal, image){
        this.id = id
        this.name = name
        this.specialty = specialty
        this.greased = greased
        this.weight = weight
        this.medal = medal
        this.image = image
        this.create()
      }


    remove(e) {
        const id = e.target.dataset.id
        const options = {
            method: "DELETE",
        }
        fetch(`http://localhost:3000/hogs/${id}`, options)
        .then(() => {
            document.querySelector("#hog-container").removeChild(document.getElementById(id))
        })
    }

    toggleGreased(e) {
        const id = e.target.dataset.id
        const options = {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                greased: e.target.checked
            })
        }
        fetch(`http://localhost:3000/hogs/${id}`, options)
    }

    create() {
        let checked = this.greased === true ? "checked" : ""
        const hogContainer = document.querySelector("#hog-container")
        const div = document.createElement("div")
        div.className = "hog-card"
        div.id = `${this.id}`
        div.innerHTML = `<h2>${this.name}</h2>
        <img src='${this.image}' />
        <p>Specialty: ${this.specialty}</p>
        <p>Highest medal achieved: ${this.medal}</p>
        <p>Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${this.weight}</p>
        <p>Greased: <input data-id="${this.id}" class="toggle" type="checkbox" name="greased" value="greased" ${checked}><br></p>
        <button class="delete" data-id="${this.id}">Delete</button>
        `
        hogContainer.appendChild(div)
        div.addEventListener("click", (e) => {
            if (e.target.className === "delete") {
                return this.remove(e)
            } else if (e.target.className === "toggle") {
                return this.toggleGreased(e)
            }
        })

    }


}
