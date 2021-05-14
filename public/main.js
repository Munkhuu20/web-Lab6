const button = document.querySelector(".addButton");
const updateBtns = document.querySelectorAll(".upd");
const todoContainer = document.querySelector(".crud-cont");

const employees = []

window.addEventListener("load", e => {
    fetch("/todo", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
        .then(data => data.json())
        .then(res => {
            res.forEach(data => {
                todoContainer.innerHTML += addCrudEl(data.name, data.email, data.phone);
            })
        })
        .catch(err => {
            console.log(err);
        })
})

button.addEventListener("click", e => {
    let name = prompt("Neree oruullah");
    let email = prompt("Emailee oruullah");
    let phone = prompt("Phone oruulah");

    fetch("/todo/add", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone }),
        method: "POST"
    })
        .then(data => data.json())
        .then(res => {
            todoContainer.innerHTML += addCrudEl(name, email, phone);
        })
        .catch(err => {
            console.log(err);
        })
})

const updateEl = e => {
    let name = prompt("zaswarlah neree oruulna uu");
    let email = prompt("zaswarlah emailee oruulna");
    let phone = prompt("zaswarlah phone oruulna");
    fetch(`/todo/upd/${e.id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, phone }),
        method: "PUT"
    })
        .then(data => data.json())
        .then(res => {
            e.parentNode.parentNode.parentNode.childNodes[1].textContent = name
            e.parentNode.parentNode.parentNode.childNodes[3].textContent = email
            e.parentNode.parentNode.parentNode.childNodes[5].textContent = phone
        })
        .catch(err => {
            console.log(err);
        })
}

const deleteEl = e => {
    fetch(`/todo/del/${e.id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "DELETE"
    })
        .then(data => data.json())
        .then(res => {
            e.parentNode.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode)
        })
        .catch(err => {
            console.log(err);
        })
}

const addCrudEl = (name, email, phone) => {
    return `
        <tr class="crud-table">
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>
                <div class="Delete-Edit">
                    <button class="Delete-Edit-btn" id=${name} onClick="updateEl(this)">Edit</button>
                    <button class="Delete-Edit-btn" id=${name} onClick="deleteEl(this)">Delete</button>
                </div>
            </td>
        </tr>
    `
}