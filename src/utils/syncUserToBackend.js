// src/utils/syncUserToBackend.js
export async function syncUserToBackend(firebaseUser, axiosInstance) {
  const token = await firebaseUser.getIdToken();

  const payload = {
    name: firebaseUser.displayName || "",
    photoURL: firebaseUser.photoURL || "",
  };

  const res = await axiosInstance.post("/users/sync", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data?.user; // contains role, status, etc.
}
