import React, { useState } from "react";
import "./css/App.css";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const [userData, setUserData] = useState({});

  const userDataHandle = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject } = await userData;
    await axios.post("/contact", { name, email, subject }).then((res) => {
      if (res.data.message) {
        setUserData({ name: "", email: "", subject: "" });
        toast.success(res.data.message);
      }
    });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div id="Contact_us" className="attributes">
        <div id="contact_form ">
          <h1 id="new">CONTACT US</h1>
          <form onSubmit={handleSubmit}>
            <div className="tw-mt-10 tw-grid tw-grid-cols-3 tw-gap-x-6 tw-gap-y-8 sm:tw-grid-cols-6">
              <div className="tw-col-span-full">
                <label
                  htmlFor="name"
                  className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
                >
                  Name
                </label>
                <div className="tw-mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 tw-placeholder:text-gray-400 tw-focus:ring-2 tw-focus:ring-inset tw-focus:ring-indigo-600 tw-sm:text-sm tw-leading-6"
                    onChange={userDataHandle}
                    required
                    value={userData.name}
                  />
                </div>
              </div>
            </div>
            <div className="sm:tw-col-span-4">
              <label
                htmlFor="email"
                className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
              >
                Email address
              </label>
              <div className="tw-mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 tw-placeholder-text-gray-400 tw-focus:ring-2 tw-focus:ring-inset tw-focus:ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                  onChange={userDataHandle}
                  required
                  value={userData.email}
                />
              </div>
            </div>
            <div className="tw-col-span-full">
              <label
                htmlFor="about"
                className="tw-block tw-text-sm tw-font-medium tw-leading-6 tw-text-gray-900"
              >
                Subject
              </label>
              <div className="tw-mt-2">
                <textarea
                  id="about"
                  name="subject"
                  rows={3}
                  className="tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 tw-placeholder-text-gray-400 tw-focus:ring-2 tw-focus:ring-inset tw-focus:ring-indigo-600 sm:tw-text-sm sm:tw-leading-6"
                  onChange={userDataHandle}
                  required
                  value={userData.subject}
                />
              </div>
            </div>
            <div className="tw-mt-6 tw-flex tw-items-center tw-justify-end tw-gap-x-6">
              <button
                type="submit"
                className="tw-rounded-md tw-bg-black tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-white tw-shadow-sm tw-hover:bg-indigo-500 tw-focus-visible:tw-outline tw-focus-visible:tw-outline-2 tw-focus-visible:tw-outline-offset-2 tw-focus-visible:tw-outline-indigo-600 hover:tw-bg-gray-900"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div id="details">
          <div id="title">
            <h1>NEED 24/7 SUPPORT</h1>
          </div>
          <div id="details_description">
            <table rules="none" width="100%">
              <tbody>
                <tr>
                  <td>
                    <img src="images/icon/call.png" alt="call" />
                  </td>
                  <td>
                    <h3>CALL SALES NOW</h3>
                    <p>2347523842</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="images/icon/time.png" alt="time" />
                  </td>
                  <td>
                    <h3>SALES HOURS</h3>
                    <p>7am - 4pm</p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <h3>SALES CONTACT INFO</h3>
                    <p>shivp72019@gmail.com</p>
                    <p>9345287342</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src="images/icon/mail.png" alt="mail" />
                  </td>
                  <td>
                    <h3>MAILING ADDRESS</h3>
                    <p>A-303 Dharti-2</p>
                    <p>Behind Vishwakarma Temple</p>
                    <p>Chandlodia ,Ahmedabad- 382481</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
