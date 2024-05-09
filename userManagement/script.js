const apiBaseURL = `https://reqres.in/api/`;

const getUserURL = apiBaseURL + "users";

const usersContainer = $("#users");

let userCount = 0;

function changeTotalUserValue() {
  $("#total-user").text(userCount);
}

function MakeUserTable(users) {
  usersContainer.html("");
  users.forEach(function (user) {
    const userElement = `
            <div>
            <h5>${user.id}. ${user.first_name} ${user.last_name} (${user.email})</h5>
            <button class="btn-delete" data-id="${user.id}">Delete</button>
            <button class="btn-edit" data-id="${user.id}">Edit</button>
            </div>
            `;

    usersContainer.append(userElement);
  });
}
$(document).ready(function () {
  // API for Get Users list
  function getUsers() {
    $.ajax({
      url: getUserURL,
      type: "GET",
      success: function (response) {
        if (response) {
          userCount = response.total;
          changeTotalUserValue();
          console.table(response.data);
          MakeUserTable(response.data);
        }
      },
      error: function (error) {
        console.error("Error on Get Users API : " + error);
      },
    });
  }
  // API for add User
  function addUser() {
    const newUser = {
      name: $("#name").val(),
      job: $("#job").val(),
    };
    $.ajax({
      url: getUserURL,
      type: "POST",
      data: newUser,
      success: function (response) {
        if (response) {
          console.log(response);
          getUsers();
        }
      },
      error: function (error) {
        console.error("Error on Get Users API : " + error);
      },
    });
  }
  // API for delete User
  function deleteUser(userId) {
    $.ajax({
      url: getUserURL + "/" + userId,
      type: "DELETE",
      success: function (response) {
        getUsers();
      },
      error: function (error) {
        console.error("Error on Get Users API : " + error);
      },
    });
  }
  // API for edit User
  function editUser(userId) {
    $.ajax({
      url: getUserURL + "/" + userId,
      type: "PUT",
      data: {
        name: "morpheus",
        job: "zion resident",
      },
      success: function (response) {
        if (response) {
          getUsers();
        } else {
          alert("error on API");
        }
      },
      error: function (error) {
        console.error("Error on Get Users API : " + error);
      },
    });
  }

  // Intial Total user count
  changeTotalUserValue();

  //Get user button
  $(document).on("click", "#get-users", function () {
    getUsers();
  });
  //Add user button
  $(document).on("click", "#add-user", function () {
    addUser();
  });
  // Delete user button
  $(document).on("click", ".btn-delete", function () {
    const userId = $(this).data("id");
    deleteUser(userId);
  });
  // edit user button
  $(document).on("click", ".btn-edit", function () {
    const userId = $(this).data("id");
    editUser(userId);
  });
});
