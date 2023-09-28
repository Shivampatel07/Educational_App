import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export function Login() {
  var [loginForm, setLoginForm] = useState({});
  const handleLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn } = useAuth();

  const handleLoginsubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/auth/login", {
      username: loginForm.username,
      password: loginForm.password,
    });

    if (data.message) {
      toast.success(data.message);
      setIsLoggedIn(true);
      navigate("/");
    } else if (data.error) {
      toast.error(data.error);
    }
  };

  const [variable, setVariable] = useState(false);
  const forgetPassword = () => {
    axios
      .post("/api/auth/forgetpassword", {
        username: loginForm.username,
      })
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          setVariable(true);
        } else if (res.data.error) {
          toast.error(res.data.error);
        }
      });
  };
  const [passwordData, setPasswordData] = useState({});

  const changePassword = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.createpassword == passwordData.confirmpassword) {
      axios
        .post("/api/auth/updatepassword", {
          ...passwordData,
          username: loginForm.username,
        })
        .then((res) => {
          if (res.data.message) {
            toast.success(res.data.message);
          } else if (res.data.error) {
            toast.error(res.data.error);
          }
        });
    } else {
      toast.error("Password not match");
    }
  };
  return (
    <>
      <br />
      <br />
      <section className="tw-bg-gray-50 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        {variable ? (
          <>
            <div className="md:tw-w-1/4 tw-px-8 md:tw-px-16">
              <h2 className="tw-font-bold tw-text-2xl tw-w-full tw-text-black">
                Change your password
              </h2>

              <form
                onSubmit={changePasswordSubmit}
                className="tw-flex tw-flex-col tw-mt-10 tw-w-full tw-gap-4"
              >
                <div className="tw-relative">
                  <input
                    className="tw-p-2 tw-rounded-xl tw-border tw-w-full"
                    type="password"
                    name="createpassword"
                    placeholder="Create password"
                    onChange={changePassword}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className="tw-bi tw-bi-eye tw-absolute tw-top-1/2 tw-right-3 tw--translate-y-1/2"
                    viewBox="0 0 16 16"
                  ></svg>
                </div>
                <div className="tw-relative">
                  <input
                    className="tw-p-2 tw-rounded-xl tw-border tw-w-full"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm password"
                    onChange={changePassword}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className="tw-bi tw-bi-eye tw-absolute tw-top-1/2 tw-right-3 tw--translate-y-1/2"
                    viewBox="0 0 16 16"
                  ></svg>
                </div>
                <div className="tw-relative">
                  <input
                    className="tw-p-2 tw-rounded-xl tw-border tw-w-full"
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    onChange={changePassword}
                  />
                </div>
                <button className="tw-bg-black tw-rounded-xl tw-text-white tw-py-2 hover:tw-scale-105 tw-duration-300">
                  Submit
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="tw-bg-gray-100 tw-flex tw-rounded-2xl tw-shadow-lg tw-max-w-3xl tw-p-5 tw-items-center">
              <div className="md:tw-w-1/2 tw-px-8 md:tw-px-16">
                <h2 className="tw-font-bold tw-text-2xl tw-text-black">
                  Login
                </h2>
                <p className="tw-text-xs tw-mt-4 tw-text-black">
                  If you are already a member, easily log in
                </p>

                <form
                  onSubmit={handleLoginsubmit}
                  className="tw-flex tw-flex-col tw-gap-4"
                >
                  <div className="tw-relative">
                    <input
                      className="tw-p-2 tw-mt-8 tw-rounded-xl tw-border tw-mb-0"
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleLogin}
                      required
                    />
                  </div>
                  <div className="tw-relative">
                    <input
                      className="tw-p-2 tw-rounded-xl tw-border tw-w-full"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLogin}
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="gray"
                      className="tw-bi tw-bi-eye tw-absolute tw-top-1/2 tw-right-3 tw--translate-y-1/2"
                      viewBox="0 0 16 16"
                    ></svg>
                  </div>
                  <button className="tw-bg-black tw-rounded-xl tw-text-white tw-py-2 hover:tw-scale-105 tw-duration-300">
                    Login
                  </button>
                </form>

                <div className="tw-mt-6 tw-grid tw-grid-cols-3 tw-items-center tw-text-gray-400">
                  <hr className="tw-border-gray-400" />
                  <p className="tw-text-center tw-text-sm">OR</p>
                  <hr className="tw-border-gray-400" />
                </div>

                <button className="tw-bg-white tw-border tw-py-2 tw-w-full tw-rounded-xl tw-mt-5 tw-flex tw-justify-center tw-items-center tw-text-sm hover:tw-scale-105 tw-duration-300 tw-text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                      fill: "rgba(0, 0, 0, 1)",
                      transform: "msFilter",
                      marginRight: "5px",
                    }}
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                  Login with Google
                </button>

                <div className="tw-mt-5 tw-text-xs tw-border-b tw-border-black tw-py-4 tw-text-black">
                  <button onClick={forgetPassword} style={{ padding: "4px" }}>
                    Forgot your password?
                  </button>
                </div>

                <div className="tw-mt-3 tw-text-xs tw-flex tw-justify-between tw-items-center tw-text-black">
                  <p>Don't have an account?</p>
                  <button className="tw-py-2 tw-px-5 tw-bg-white tw-border tw-rounded-xl hover:tw-scale-110 tw-duration-300">
                    <Link to="/register">Register</Link>
                  </button>
                </div>
              </div>

              <div className="md:tw-block tw-hidden tw-w-1/2">
                <img
                  className="tw-rounded-2xl"
                  alt="Login form"
                  src="images/form.jpg"
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export function Register() {
  var [registerForm, setRegisterForm] = useState({});
  const handleRegister = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleRegistersubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(registerForm.email)) {
      if (registerForm.createpassword === registerForm.confirmpassword) {
        axios
          .post("/api/auth/register", {
            email: registerForm.email,
            username: registerForm.username,
            password: registerForm.createpassword,
          })
          .then((res) => {
            if (res.data.error) {
              toast.error(res.data.error);
            } else {
              toast.success("Verify your account on your mail.");
              navigate("/login");
            }
          });
      } else {
        toast.error("Password not matched");
      }
    } else {
      toast.error("Email id is not right");
    }
  };

  return (
    <>
      <br />
      <br />
      <section className="tw-bg-gray-50 tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <div className="tw-bg-gray-100 tw-flex tw-rounded-2xl tw-shadow-lg tw-max-w-3xl tw-p-5 tw-items-center">
          <div className="md:tw-w-1/2 tw-px-8 md:tw-px-16">
            <h2 className="tw-font-bold tw-text-2xl tw-text-black">Register</h2>
            <p className="tw-text-xs tw-mt-4 tw-text-black">
              If you are new to our website , then fill up this form
            </p>
            <form
              onSubmit={handleRegistersubmit}
              className="tw-flex tw-flex-col tw-gap-4"
            >
              <input
                className="tw-p-2 tw-mt-8 tw-rounded-xl tw-border tw-mb-0"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleRegister}
                required
              />

              <div className="tw-relative ">
                <input
                  className="tw-p-2  tw-rounded-xl"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleRegister}
                  required
                />
              </div>

              <div className="tw-relative ">
                <input
                  className="tw-p-2 tw-rounded-xl tw-border tw-w-full tw-appearance-none tw-leading-tight "
                  type="password"
                  name="createpassword"
                  placeholder="Create password"
                  onChange={handleRegister}
                  required
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="tw-bi tw-bi-eye tw-absolute  tw-right-5 tw--translate-y-1/2"
                  viewBox="0 0 16 16"
                ></svg>
              </div>

              <div className="tw-relative">
                <input
                  className="tw-p-2 tw-rounded-xl tw-border tw-w-full"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  onChange={handleRegister}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="tw-bi tw-bi-eye tw-absolutetw-right-3 tw-translate-y-1/2"
                  viewBox="0 0 16 16"
                ></svg>
              </div>

              <button className="tw-bg-black tw-rounded-xl tw-text-white tw-py-2 hover:tw-scale-105 tw-duration-300">
                Register
              </button>
            </form>

            <div className="tw-mt-6 tw-grid tw-grid-cols-3 tw-items-center tw-text-gray-400">
              <hr className="tw-border-gray-400" />
              <p className="tw-text-center tw-text-sm">OR</p>
              <hr className="tw-border-gray-400" />
            </div>

            <button className="tw-bg-white tw-border tw-py-2 tw-w-full tw-rounded-xl tw-mt-5 tw-flex tw-justify-center tw-items-center tw-text-sm hover:tw-scale-105 tw-duration-300 tw-text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{
                  fill: "rgba(0, 0, 0, 1)",
                  transform: "msFilter",
                  marginRight: "5px",
                }}
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
              Login with Google
            </button>
            <div className="tw-mt-3 tw-text-xs tw-flex tw-justify-between tw-items-center tw-text-black">
              <p>Have an account?</p>
              <button className="tw-py-2 tw-px-5 tw-bg-white tw-border tw-rounded-xl hover:tw-scale-110 tw-duration-300">
                <Link to="/login">Log in</Link>
              </button>
            </div>
          </div>

          <div className="md:tw-block tw-hidden tw-w-1/2">
            <img
              className="tw-rounded-2xl"
              alt="Register form"
              src="images/form1.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
