import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            /* Creating a collection inside db for storing the users */
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            /* creating the collection inside db for storing the user chats */
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
          setErr(false);
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <span className="logo">Usama ChatRoom</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="UserName..." />
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <span className="icon">
              <ion-icon name="image-outline"></ion-icon>
            </span>
            <span className="icon_tag">Upload profile picture</span>
          </label>
          <button type="submit">Register</button>
          {err && <span>Something went Wrong!</span>}
        </form>
        <p>
          Already have an account? <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
