// alert("js is active")
const data = document.getElementById("data-user");
const url = "http://localhost:8080/rest/user";
const panel = document.getElementById("user-panel");

function userAuthInfo() {
    fetch(url)
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
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${u.email} with roles: ${u.roles.map(role => role.name).join(', ')}</h5>`
        });
}

userAuthInfo()