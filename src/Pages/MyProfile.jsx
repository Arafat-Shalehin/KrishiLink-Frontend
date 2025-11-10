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

    // console.log({name, image});

    updateUser({
        displayName: name || user.displayName,
        photoURL: image || user.photoURL,
    })
    .then(() => {
      setUser({
          ...user, 
          displayName: name || user.displayName,
          photoURL: image || user.photoURL
        });
      document.getElementById("my_modal_1").close();
      toast.success("Profile updated successfully!");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Something went wrong!");
      setUser(user);
    });
  }

  return (
    <div className="h-[54vh] bg-green-50 flex items-center justify-center p-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={
              user?.photoURL ||
              "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-green-300 object-cover"
          />

          <div className="text-left">
            <h2 className="mt-4 text-2xl font-semibold text-green-800">
              Name: {user?.displayName || "No name"}
            </h2>
            <p className="mt-1 text-gray-600">
              Email: {user?.email || "No email"}
            </p>
          </div>

          <button
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Update Profile
          </button>
        </div>
      </div>
      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form className="flex flex-col" onSubmit={handleUpdateProfile}>
            <label className="label font-semibold">Name</label>
            <input
              name="name"
              type="text"
              className="input mb-2 w-full"
              placeholder="Enter Your New Name"
            />
            <label className="label font-semibold">Your Photo</label>
            <input
              name="image"
              type="text"
              className="input mb-2 w-full"
              placeholder="Your Image URL"
            />
            <button className="btn mt-4 bg-linear-to-l from-green-700 
            to-green-500 text-white text-lg font-semibold" 
            type="submit">
              Save Changes
              </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-green-300 text-black text-lg font-semibold">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;