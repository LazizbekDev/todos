const modol = document.querySelector('#modal')
const overlay = document.querySelector('#overlay')
const modalBtn = document.querySelector('#modal-btn')

export default function openModal () {
    modol.classList.add('open')
    overlay.classList.add('open')

    modalBtn.addEventListener('click', () => {
        overlay.classList.remove('open')
        modol.classList.remove('open')
    })
}

const closeModal = () => {
    overlay.classList.remove('open')
    modol.classList.remove('open')
}

overlay.addEventListener('click', closeModal)