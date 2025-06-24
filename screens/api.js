export const API_URL = "http://192.168.254.111:50001/api"; 

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function registerUser(username, email, password, address) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, address })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign up failed");
  return data;
}

export async function updateUserInfo(token, username, email, address) {
  const res = await fetch(`${API_URL}/user/update-info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email, address }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");
  return data;
}

export async function updatePassword(token, currentPassword, newPassword) {
  const res = await fetch(`${API_URL}/user/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Password update failed");
  return data; 
}
