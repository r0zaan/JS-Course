$(document).ready(function () {
  const baseURL = "https://reqres.in/api/users";

  // Function to fetch users
  function getUsers() {
    $.ajax({
      url: baseURL,
      type: "GET",
      success: function (response) {
        displayUsers(response.data);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching users:", error);
      },
    });
  }

  // Function to display users
  function displayUsers(users) {
    $("#users").empty();
    users.forEach(function (user) {
      const userElement = `
                <div class="user">
                    <h2 class="user-name">${user.first_name} ${user.last_name}</h2>
                    <p class="user-email">${user.email}</p>
                    <button class="delete-user" data-id="${user.id}">Delete</button>
                </div>
            `;
      $("#users").append(userElement);
    });
  }

  // Get users when page loads
  $("#get-users").click(function () {
    getUsers();
  });

  // Add user
  $("#add-user").click(function () {
    const newUser = {
      name: "John Doe", // Example user name
      job: "Software Engineer", // Example job
    };

    $.ajax({
      url: baseURL,
      type: "POST",
      data: newUser,
      success: function () {
        getUsers(); // Fetch updated user list
      },
      error: function (xhr, status, error) {
        console.error("Error adding user:", error);
      },
    });
  });

  // Delete user
  $(document).on("click", ".delete-user", function () {
    const userId = $(this).data("id");

    $.ajax({
      url: `${baseURL}/${userId}`,
      type: "DELETE",
      success: function () {
        getUsers(); // Fetch updated user list
      },
      error: function (xhr, status, error) {
        console.error("Error deleting user:", error);
      },
    });
  });
});
