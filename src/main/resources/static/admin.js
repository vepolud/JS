    const url = "http://localhost:8080/rest/";
    const renderTable = document.getElementById("user-data");
    const addForm = document.getElementById("add-form");

    const renderPosts = (users) => {
    let temp = '';
    users.forEach((u) => {
    temp +=`<tr>
                                <td>${u.id}</td>
                                <td id=${'name' + u.id}>${u.name}</td>
                                <td id=${'surname' + u.id}>${u.surname}</td>
                                <td id=${'age' + u.id}>${u.age}</td>
                                <td id=${'email' + u.id}>${u.email}</td>
                                <td id=${'role' + u.id}>${u.role}</td>

                                <td>
                                <button class="btn btn-info" type="button"
                                data-toggle="modal" data-target="#modalEdit"
                                onclick="editModal(${u.id})">Edit</button></td>

                                <td>
                                <button class="btn btn-danger" type="button"
                                data-toggle="modal" data-target="#modalDelete"
                                onclick="deleteModal(${u.id})">Delete</button></td>
                                </tr>
                                `
})
    renderTable.innerHTML = temp;
}

    function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {renderPosts(data)})
}

    getAllUsers()

    addForm.addEventListener('submit', addUser)

    function addUser() {
    let nameValue = document.getElementById("firstname").value;
    let surnameValue = document.getElementById("lastname").value;
    let ageValue = document.getElementById("age").value;
    let emailValue = document.getElementById("email").value;
    let passwordValue = document.getElementById("password").value;
    let roles = getRoles(Array.from(document.getElementById("addRoles").selectedOptions).map(role => role.value));

    let newUser = {
    name: nameValue,
    surname: surnameValue,
    age: ageValue,
    email: emailValue,
    password: passwordValue,
    roles: roles
}

    fetch(url, {
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

    function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("ADMIN") >= 0) {
    roles.push({"id": 1});
}
    if (rols.indexOf("USER") >= 0) {
    roles.push({"id": 2});
}
    return roles;
}

    function deleteModal(id) {
    fetch(url + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(us => {

            document.getElementById('idDelete').value = us.id;
            document.getElementById('firstnameDelete').value = us.name;
            document.getElementById('lastnameDelete').value = us.surname;
            document.getElementById('ageDelete').value = us.age;
            document.getElementById('emailDelete').value = us.email;
            document.getElementById('delPassword').value = us.password;
        })
    });
}

    async function deleteUser() {
    await fetch(url + document.getElementById('idDelete').value, {
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
    fetch(url + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json().then(us => {

            document.getElementById('idEdit').value = us.id;
            document.getElementById('firstnameEdit').value = us.name;
            document.getElementById('lastnameEdit').value = us.surname;
            document.getElementById('ageEdit').value = us.age;
            document.getElementById('emailEdit').value = us.email;
            document.getElementById('passwordEdit').value = us.password;

        })
    });
}

    async function editUser() {
    let idValue = document.getElementById("idEdit").value;
    let nameValue = document.getElementById("firstnameEdit").value;
    let surnameValue = document.getElementById("lastnameEdit").value;
    let ageValue = document.getElementById("ageEdit").value;
    let emailValue = document.getElementById("emailEdit").value;
    let passwordValue = document.getElementById("passwordEdit").value;
    let roles = getRoles(Array.from(document.getElementById("editRoles").selectedOptions).map(role => role.value));

    let user = {
    id: idValue,
    name: nameValue,
    surname: surnameValue,
    age: ageValue,
    email: emailValue,
    password: passwordValue,
    roles: roles
}

    await fetch(url, {
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

    const adminData = document.getElementById("data-admin");
    const urlAuth = "http://localhost:8080/rest/user";
    const panel = document.getElementById("admin-panel");

    function userAuthInfo() {
        fetch(urlAuth)
            .then((res) => res.json())
            .then((u) => {
                let temp = '';
                temp += `<tr>
            <td>${u.id}</td>
            <td>${u.username}</td>
            <td>${u.lastName}</td>
            <td>${u.age}</td>
            <td>${u.email}</td>
            <td>${u.roles.map(role => role.name).join(', ')}</td>
            </tr>`;
                adminData.innerHTML = temp;
            });
    }

    userAuthInfo()

    function userPanel() {
        fetch(urlAuth)
            .then((res) => res.json())
            .then((u) => {
                panel.innerHTML = `<h5>${u.email} with roles: ${u.roles.map(role => role.name).join(', ')}</h5>`
            });
    }

    userPanel()