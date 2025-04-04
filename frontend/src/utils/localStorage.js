// Save user to local storage
export const saveUserToLocal = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

// Get logged-in user from local storage
export const getUserFromLocal = () => {
    return JSON.parse(localStorage.getItem("user")) || null;
};

// Save progress for a specific user
export const saveProgressToLocal = (letter, progress) => {
    let user = getUserFromLocal();
    if (!user || !user.email) return;

    let allProgress = JSON.parse(localStorage.getItem("progress")) || {};
    allProgress[user.email] = allProgress[user.email] || {};
    allProgress[user.email][letter] = progress;

    localStorage.setItem("progress", JSON.stringify(allProgress));
};

// Get progress for the logged-in user
export const getProgressFromLocal = () => {
    let user = getUserFromLocal();
    if (!user || !user.email) return {};

    let allProgress = JSON.parse(localStorage.getItem("progress")) || {};
    return allProgress[user.email] || {};
};

// Remove user from local storage (Logout)
export const removeUserFromLocal = () => {
    localStorage.removeItem("user");
};
