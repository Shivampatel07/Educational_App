import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

function Linechart(p) {
  Chart.register(...registerables);
  return (
    <div>
      <Line
        data={{
          labels: p.subjects,
          datasets: [
            {
              label: p.label,
              data: p.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
}

function Dashboard() {
  const { isLoggedIn, setUser, user } = useAuth();

  const [examData, setExamData] = useState([]);

  async function getData() {
    if (examData.length === 0) {
      await axios
        .post("/exam/data", { username: isLoggedIn.username })
        .then(async (res) => {
          if (res.data.message === "User Data not found") {
            await setExamData([]);
          } else {
            await setExamData(res.data);
          }
        });
    }
  }

  const [userUpdateData, setUserUpdateData] = useState({});
  const handleUpdate = (e) => {
    setUserUpdateData({
      ...userUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) {
      setUser(false);
    } else if (!user) {
      setUser(true);
    }
  }, []);

  useEffect(() => {
    if (examData.length === 0) {
      getData();
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    let finalData = { username: isLoggedIn.username };
    if (userUpdateData) {
      if (userUpdateData.name !== "" && userUpdateData.name) {
        finalData = { ...finalData, name: userUpdateData.name };
      }
      if (userUpdateData.institute !== "" && userUpdateData.institute) {
        finalData = { ...finalData, institute: userUpdateData.institute };
      }
      axios.post("/api/auth/update", finalData).then((res) => {
        if (res.data.message) {
          setIsModalOpen(false);
        } else {
          setIsModalOpen(false);
        }
      });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/auth/delete", { username: isLoggedIn.username })
      .then((res) => {
        if (res.data.message) {
          window.location.href = "/";
        }
      });
  };
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      {isLoggedIn && (
        <>
          <div className="tw-p-5">
            <div className="tw-mt-3 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
              <div>
                <div
                  className=" tw-ps-5 tw-pb-5 tw-pe-5 tw-rounded-lg "
                  style={{ border: "1px solid #ccc" }}
                >
                  <button
                    className="tw-mt-2 tw-float-right tw-text-blue-500"
                    onClick={() => {
                      setTimeout(() => {
                        setIsModalOpen(true);
                      }, 200);
                    }}
                  >
                    Edit profile
                  </button>
                  {isModalOpen && (
                    <div className=" tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-overflow-x-hidden tw-overflow-y-auto tw-outline-none focus:tw-outline-none">
                      <div className="tw-relative tw-w-auto tw-max-w-md tw-mx-auto tw-my-6">
                        <div className="tw-relative tw-bg-white tw-p-5 tw-rounded-lg tw-shadow-lg tw-border-2 tw-border-black">
                          <form onSubmit={handleUpdateSubmit}>
                            <div className="tw-mb-3">
                              <table>
                                <tr>
                                  <td>Name</td>
                                  <td>
                                    <input
                                      type="text"
                                      name="name"
                                      onChange={handleUpdate}
                                      placeholder={isLoggedIn.name}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Institute</td>
                                  <td>
                                    <input
                                      type="text"
                                      name="institute"
                                      onChange={handleUpdate}
                                      placeholder={isLoggedIn.institute}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td></td>
                                  <td>
                                    <button
                                      type="submit"
                                      className="tw-bg-blue-gray-700 tw-text-white tw-p-3 tw-rounded-md hover:tw-bg-blue-gray-800"
                                    >
                                      Update
                                    </button>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </form>
                          <button
                            onClick={() => {
                              setTimeout(() => {
                                setIsModalOpen(false);
                              }, 200);
                            }}
                            className="tw-absolute tw-top-0 tw-right-0 tw-mt-2 tw-mr-2 tw-text-gray-600 hover:tw-text-red-500"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tw-p-3 tw-mt-5  tw-m-auto tw-w-full ">
                    <div id="info " className="tw-w-full">
                      <ul>
                        <li
                          className=" tw-mb-2 tw-break-all"
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          Username {" - "}
                          <span className=" tw-text-blue-600 ">
                            {isLoggedIn.username}
                          </span>
                        </li>
                        <li
                          className=" tw-mb-2 tw-break-all"
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          Name {"  "}
                          <span className=" tw-text-blue-600 ">
                            {isLoggedIn.name ? (
                              <>{isLoggedIn.name}</>
                            ) : (
                              <>------</>
                            )}
                          </span>
                        </li>
                        <li
                          className=" tw-mb-2 tw-break-all"
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          Email {" - "}
                          <span className=" tw-text-blue-600">
                            {isLoggedIn.email}
                          </span>
                        </li>
                        <li
                          className=" tw-mb-2 tw-break-all"
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          Institute {"  "}{" "}
                          <span className=" tw-text-blue-600">
                            {isLoggedIn.institute ? (
                              <>{isLoggedIn.institute}</>
                            ) : (
                              <>------</>
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {examData.length > 0 && (
                  <>
                    <div>
                      <table
                        className="tw-w-full"
                        style={{
                          marginLeft: "0px",
                        }}
                      >
                        <thead className="tw-bg-black  tw-text-white">
                          <tr>
                            <th>No.</th>
                            <th>Language</th>
                            <th>Result</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ border: "1px solid #ccc" }}
                          className="tw-p-5 tw-text-center"
                        >
                          {examData.map((dataItem, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{dataItem.quizname.toUpperCase()}</td>
                                <td>{dataItem.quizmarks}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              {examData.length > 0 && (
                <div className=" tw-rounded-lg ">
                  <h1 className="tw-bg-black tw-rounded-t-lg tw-text-white tw-text-3xl tw-p-3 tw-m-0 tw-text-center">
                    Progress Graph
                  </h1>
                  <div style={{ border: "1px solid #ccc" }} className="tw-p-5">
                    <Linechart
                      label="Pending"
                      subjects={examData.map((dataItem) =>
                        dataItem.quizname.toUpperCase()
                      )}
                      data={examData.map((dataItem) => dataItem.quizmarks)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <div className="tw-flex tw-justify-center tw-mb-10 tw-mt-5">
        <button
          class="tw-bg-red-500 hover:tw-bg-red-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-border tw-border-red-700 tw-rounded"
          onClick={handleDelete}
        >
          Delete your account
        </button>
      </div>
    </>
  );
}

export default Dashboard;
