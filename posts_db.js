import fs from "fs";

// Path to the JSON file
const dbFile = "./posts.json";

export function clearPosts() {
  fs.writeFileSync(dbFile, JSON.stringify([], null, 2), "utf-8");
  console.log("Posts database has been cleared.");
}

export function seedPosts() {
  clearPosts();
  addPost("Post 1", "mohamed-msila");
  addPost("Post 1", "amina-msila");
}

// Function to load posts
export function loadPosts() {
  try {
    const data = fs.readFileSync(dbFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

// Function to save users
export function savePosts(posts) {
  try {
    fs.writeFileSync(dbFile, JSON.stringify(posts, null, 2), "utf-8");
    // console.log("Users saved successfully.");
  } catch (error) {
    console.error("Error saving posts:", error);
  }
}

// Function to add a new user
export function addPost(title, author) {
  const posts = loadPosts();

  const newPost = {
    id: posts.length + 1,
    title,
    author,
  };

  posts.push(newPost);
  savePosts(posts);
  return;
}

// Function to delete a user by username
export function deletePostById(id) {
  let posts = loadPosts();
  const initialLength = posts.length;

  posts = posts.filter((post) => post.id !== id);

  if (posts.length === initialLength) {
    console.log(`Post "${id}" not found.`);
    return false;
  }

  savePosts(posts);
  console.log(`Post "${id}" has been deleted.`);
  return true;
}

// Update user email
export async function updatePostTitleById(id, newTitle) {
  const posts = await loadPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    console.log("Post not found!");
    return false;
  }

  posts[postIndex].title = newTitle;
  savePosts(posts);
  return true;
}
