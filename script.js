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

    if (text == '') {
        input.classList.toggle('invalid')
        const label = document.querySelector('#tooltip')
        label.style.display = 'flex'

        setTimeout(() => {
            input.classList.remove('invalid')
            label.style.display = 'none'
        }, 3000)
    } else {

        const newPlan = {
            plan_name: text,
            done: false
        }

        input.value = ''

        plans.push(newPlan)
        saveState()

        init()

    }

}

function renderCards() {

    if (plans.length == 0) {
        section.innerHTML = '<p>There is no plans here</p>'
    } else {
        let html = ''
        for (i = 0; i <= plans.length; i++) {
            if (plans[i].done != true) {
                html += `<div class="card">                     
                            <input type="checkbox" name="done" id="done" ${plans[i].done} data-plan="${plans[i].plan_name}">
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
            const remove = document.querySelectorAll('#deleteButton')
            const cards = document.querySelectorAll('.card')
            cards.forEach(el => {
                el.addEventListener('click', togglePlan)
            })
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

function togglePlan(event) {
    const text = event.target.dataset.plan
    const plan = plans.find(p => p.plan_name === text)
    console.log(plan)
    console.log(event.target.checked)
    plan.done = event.target.checked

    saveState()

    init()
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