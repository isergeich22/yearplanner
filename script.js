const input = document.querySelector('.add')
const button = document.querySelector('#addButton')
const section = document.querySelector('.list')
const lsKey = 'PLANS'

const plans = getState()

console.log(input)
console.log(button)
console.log(section)

button.addEventListener('click', () => {
    createCard(input.value)

    saveState()
})

function createCard(text) {

    const newPlan = {
        plan_name: text,
        done: false
    }

    input.value = ''

    plans.push(newPlan)
    saveState()

    init()

}

function renderCards() {

    if (plans.length == 0) {
        section.innerHTML = '<p>There is no plans here</p>'
    } else {
        let html = ''
        for (i = 0; i <= plans.length; i++) {
            if (plans[i].done != true) {
                html += `<div class="card">                     
                            <input type="checkbox" name="done" id="done" data-plan="${plans[i].plan_name}">
                            <p class="plan">${plans[i].plan_name}</p>
                            <button id="deleteButton" data-plan="${plans[i].plan_name}">X</button>
                        </div>`
            } else {
                html += `<div class="card">                     
                            <input type="checkbox" name="done" id="done" data-plan="${plans[i].plan_name}" checked>
                            <p class="plan done">${plans[i].plan_name}</p>
                            <button id="deleteButton" data-plan="${plans[i].plan_name}">X</button>
                        </div>`
            }
            section.innerHTML = html
            const checkbox = document.querySelectorAll('#done')
            checkbox.forEach(el => {
                el.addEventListener('change', (event) => {
                    const content = event.target.dataset.plan
                    const plan = plans.find(j => j.plan_name === content)
                    let index = plans.indexOf(plan)
                    if (index > -1) {
                        if(plans[index].done == false) {
                            plans[index].done = true
                            const text = document.querySelector('.plan')
                            text.classList.toggle('done')
                            saveState()
                        } else {
                            plans[index].done = false
                            const text = document.querySelector('.plan')
                            text.classList.remove('done')
                            saveState()
                        }
                    }                    
                })
            })
            const remove = document.querySelectorAll('#deleteButton')
            console.log(remove)
            remove.forEach(el => {
                el.addEventListener('click', (event) => {
                    const content = event.target.dataset.plan
                    const plan = plans.find(j => j.plan_name === content)
                    console.log(plan)
                    let index = plans.indexOf(plan)
                    console.log(index)
                    if (index > -1) {
                        plans.splice(index, 1)
                    }
                    saveState()
                    init()
                })
            })
            saveState()
        }

        init()

    }

}

function saveState() {
    localStorage.setItem(lsKey, JSON.stringify(plans))
}

function getState() {
    const row = localStorage.getItem(lsKey)
    return row ? JSON.parse(row) : []
}

function init() {
    renderCards()
}

init()