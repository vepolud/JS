const userData = document.getElementById("userData");
const baseUrl = "http://localhost:8080/rest/user";
const topUserPanel = document.getElementById("topUserPanel");

function getCurrentUser() {
    fetch(baseUrl)
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
            userData.innerHTML = temp;
            topUserPanel.innerHTML = `<h5>${user.email} with roles: ${user.roles.map(role => role.name).join(', ')}</h5>`
        });
}

getCurrentUser()