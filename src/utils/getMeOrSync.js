export async function getMeOrSync(axiosInstance, firebaseUser) {
  // We do NOT trust email coming from frontend
  // We always use Firebase ID token to identify the user.
  const token = await firebaseUser.getIdToken();
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const meRes = await axiosInstance.get("/users/me", { headers });
    return meRes.data?.user;
  } catch (err) {
    // If user not found in DB, create/sync then retry
    if (err?.response?.status !== 404) throw err;

    await axiosInstance.post(
      "/users/sync",
      {
        name: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || "",
      },
      { headers }
    );

    const meRes2 = await axiosInstance.get("/users/me", { headers });
    return meRes2.data?.user;
  }
}
