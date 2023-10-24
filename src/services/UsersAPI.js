import {
  removeUser,
  setUsers,
  store,
  addUser,
  setTotalUsers,
  setTotalLimit,
} from "../store";

export const getUsers = async ({ page }) => {
  try {
    const response = await fetch(
      `http://localhost:8000/users?_page=${page ?? 1}&_limit=2`
    );
    const data = await response.json();
    store.dispatch(setTotalLimit(page * 2));
    store.dispatch(
      // if page is 1, then we know we just mounted the component
      setUsers(page === 1 ? data : [...store.getState().users.list, ...data])
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersCount = async () => {
  try {
    const response = await fetch(`http://localhost:8000/users`);
    const data = await response.json();
    store.dispatch(setTotalUsers(data.length));
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  const response = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  store.dispatch(addUser(data));
  return data;
};

export const deleteUser = async (userId) => {
  try {
    await fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  } finally {
    store.dispatch(removeUser({ id: userId }));
  }
};
