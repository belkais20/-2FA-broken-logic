import fs from "fs";

// Path to the JSON file
const dbFile = "./users.json";

export function clearUsers() {
  fs.writeFileSync(dbFile, JSON.stringify([], null, 2), "utf-8");
  console.log("Users database has been cleared.");
}

export function seedUsers() {
  clearUsers();
  addUser("mohamed-msila", "mohamed.msila@gmail.com", "mohamed2025");
  addUser("amina-msila", "amina.msila@gmail.com", "amina2025");
}

// Function to load users
export function loadUsers() {
  try {
    const data = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

// Function to save users
export function saveUsers(users) {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(users, null, 2), "utf-8");
    // console.log("Users saved successfully.");
  } catch (error) {
    console.error("Error saving users:", error);
  }
}

// Function to add a new user
export function addUser(username, email, password, role, roleId) {
  const users = loadUsers();

  if (users.some((user) => user.username === username)) {
    console.log("Username already exists!");
    return false;
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    role,
    roleId,
  };

  users.push(newUser);
  saveUsers(users);
  return;
}

// Function to delete a user by username
export function deleteUserByUsername(username) {
  let users = loadUsers();
  const initialLength = users.length;

  users = users.filter((user) => user.username !== username);

  if (users.length === initialLength) {
    console.log(`User "${username}" not found.`);
    return false;
  }

  saveUsers(users);
  console.log(`User "${username}" has been deleted.`);
  return true;
}

// Update user email
export async function updateUserEmail(username, newEmail) {
  const users = await loadUsers();
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    console.log("User not found!");
    return false;
  }

  users[userIndex].email = newEmail;
  saveUsers(users);
  return true;
}

// Update user roleId
export async function updateUserRoleId(username, roleId) {
  const users = await loadUsers();
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    console.log("User not found!");
    return false;
  }

  users[userIndex].roleId = roleId;
  saveUsers(users);
  return true;
}
