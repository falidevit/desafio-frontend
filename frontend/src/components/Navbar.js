import React, { useEffect, useState } from "react";
import { auth, signInWithGoogle,db } from "../apis/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Search from "./Search";
import Avatar from "../styles/Avatar";
import LogoIcon from '../assets/logoIcon.svg'
import AvatarUser from '../assets/user.png'
import { NotificationIcon, UploadIcon } from "./Icons";
import { query, collection, getDocs, where } from "firebase/firestore";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.grey};
  z-index: 99;
  padding: 0.7rem 1.5rem;

  input {
    width: 500px;
  }

  .toggle-navhandler {
    display: none;
  }

  .logo span {
    position: relative;
    top: 1px;
  }

  ul {
    list-style: none;
    display: flex;
    position: relative;
    top: 2px;
  }

  li svg {
    margin-right: 1.7rem;
    position: relative;
    top: 3px;
  }

  img {
    position: relative;
    top: 3px;
  }

  @media screen and (max-width: 1093px) {
    .toggle-navhandler {
      display: block;
    }
  }

  @media screen and (max-width: 1000px) {
    input {
      width: 400px;
    }
  }

  @media screen and (max-width: 850px) {
    input {
      width: 280px;
    }
  }

  @media screen and (max-width: 500px) {
    .toggle-navhandler {
      display: none;
    }

    li svg {
      width: 30px;
      height: 30px;
      margin-right: 1.7rem;
      position: relative;
      top: 0px;
    }
  }
`;

const Navbar = () => {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
    fetchUserName();
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      console.log("An error occured while fetching user data");
    }
  };

  
  console.log(user)
  return (
    <Wrapper>
      <div className="logo flex-row">
        <span>
          <Link to="/">
            <img src={LogoIcon} alt="logo" width="100px" height="30px" />
          </Link>
        </span>
      </div>
      <Search />
      <ul>
        <li>
          <UploadIcon />
        </li>
        <li>
          <NotificationIcon />
        </li>
        <li>
          <Link onClick={signInWithGoogle}>
            <Avatar className="pointer" src={AvatarUser} alt="user-avatar" />
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Navbar;
