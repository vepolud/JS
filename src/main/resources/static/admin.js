const baseUrl = "http://localhost:8080/rest/";
const urlAuth = "http://localhost:8080/rest/user";
const usersTable = document.getElementById("users-table");
const newUserForm = document.getElementById("newUser-form");
const adminData = document.getElementById("data-admin");
const panel = document.getElementById("admin-panel");

function getCurrentUser() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((user) => {
            let temp = '';
            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => role.name).join(', ')}</td>
            </tr>`;
            adminData.innerHTML = temp;
        });
}

getCurrentUser()

function userPanel() {
    fetch(urlAuth)
        .then((res) => res.json())
        .then((u) => {
            panel.innerHTML = `<h5>${u.email} with roles: ${u.roles.map(role => role.name).join(', ')}</h5>`
        });
}

userPanel()

function getAllUsers() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(users => {
            let temp = '';
            users.forEach((user) => {
                temp += `<tr>
                                <td>${user.id}</td>
                                <td>${user.username}</td>
                                <td>${user.lastName}</td>
                                <td>${user.age}</td>
                                <td>${user.email}</td>
                                <td>${user.roles.map(role => role.name).join(', ')}</td>
                                <td>
                                    <button class="btn btn-info" type="button"
                                    data-toggle="modal" data-target="#modalEdit"
                                    onclick="editModal(${user.id})">Edit</button>
                                </td>
                                <td>
                                    <button class="btn btn-danger" type="button"
                                    data-toggle="modal" data-target="#modalDelete"
                                    onclick="deleteModal(${user.id})">Delete</button>
                                </td>
                        </tr>`
            })
            usersTable.innerHTML = temp;
        })
}

getAllUsers()

newUserForm.addEventListener('submit', addNewUser)

function addNewUser() {
    let usernameValue = document.getElementById("username").value;
    let lastnameValue = document.getElementById("lastname").value;
    let ageValue = document.getElementById("age").value;
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    let roles = getRolesFromForm(Array.from(document.getElementById("addRoles").selectedOptions).map(role => role.value));

    let newUser = {
        username: usernameValue,
        lastName: lastnameValue,
        age: ageValue,
        email: emailValue,
        password: passwordValue,
        roles: roles
    }

    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(newUser)
    })
        .then(() => {
            document.getElementById("usersTable").click();
            getAllUsers();
        })
}

function getRolesFromForm(addedRoles) {
    let roles = [];
    if (addedRoles.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    if (addedRoles.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}

function deleteModal(id) {
    fetch(baseUrl + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(us => {

            document.getElementById('idDelete').value = us.id;
            document.getElementById('firstnameDelete').value = us.username;
            document.getElementById('lastnameDelete').value = us.lastName;
            document.getElementById('ageDelete').value = us.age;
            document.getElementById('emailDelete').value = us.email;
            document.getElementById('delPassword').value = us.password;
        })
    });
}

async function deleteUser() {
    await fetch(baseUrl + document.getElementById('idDelete').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    })

    getAllUsers()
    document.getElementById("deleteButton").click();
}

function editModal(id) {
    fetch(baseUrl + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(user => {
            document.getElementById('idEdit').value = user.id;
            document.getElementById('usernameEdit').value = user.username;
            document.getElementById('lastnameEdit').value = user.lastName;
            document.getElementById('ageEdit').value = user.age;
            document.getElementById('emailEdit').value = user.email;
            document.getElementById('passwordEdit').value = user.password;

        })
    });
}

async function editUser() {
    let idValue = document.getElementById("idEdit").value;
    let usernameValue = document.getElementById("usernameEdit").value;
    let lastnameValue = document.getElementById("lastnameEdit").value;
    let ageValue = document.getElementById("ageEdit").value;
    let emailValue = document.getElementById("emailEdit").value;
    let passwordValue = document.getElementById("passwordEdit").value;
    let roles = getRolesFromForm(Array.from(document.getElementById("editRoles").selectedOptions).map(role => role.value));

    let user = {
        id: idValue,
        username: usernameValue,
        lastName: lastnameValue,
        age: ageValue,
        email: emailValue,
        password: passwordValue,
        roles: roles
    }

    await fetch(baseUrl, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    });

    getAllUsers()
    document.getElementById("updateButton").click();
}

