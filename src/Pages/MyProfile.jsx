import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const image = form.image.value.trim();

    updateUser({
      displayName: name || user.displayName,
      photoURL: image || user.photoURL,
    })
      .then(() => {
        setUser({
          ...user,
          displayName: name || user.displayName,
          photoURL: image || user.photoURL,
        });
        document.getElementById("my_modal_1").close();
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
        setUser(user);
      });
  };

  return (
    <section className="bg-[var(--color-bg)] flex 
    items-center justify-center p-5">
      <div className="w-full max-w-md rounded-2xl 
      border border-[var(--color-border)] 
      bg-[var(--color-surface)] shadow-xl p-6 sm:p-8 my-10
      ">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              user?.photoURL ||
              "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
            }
            alt="Profile"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
          />

          <div className="mt-5 w-full text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text)]">
              <span className="text-[var(--color-muted)] font-medium">
                Name:
              </span>{" "}
              {user?.displayName || "No name"}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[var(--color-muted)]">
              <span className="text-[var(--color-muted)] font-medium">
                Email:
              </span>{" "}
              {user?.email || "No email"}
            </p>
          </div>

          <button
            className="mt-6 w-full sm:w-auto bg-[var(--color-primary)] hover:brightness-95 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Update profile details
          </h3>

          <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                placeholder="Enter your new name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Photo URL
              </label>
              <input
                name="image"
                type="text"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                placeholder="Paste your image URL"
              />
              <p className="text-xs text-[var(--color-muted)]">
                Leave fields empty to keep current info.
              </p>
            </div>

            <button
              className="w-full mt-1 bg-[var(--color-primary)] hover:brightness-95 text-white text-sm sm:text-base font-semibold py-2.5 rounded-xl transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              type="submit"
            >
              Save Changes
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="w-full rounded-xl border border-[var(--color-secondary)] text-[var(--color-secondary)] bg-transparent hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] text-sm sm:text-base font-semibold py-2.5 transition">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default ProfilePage;
