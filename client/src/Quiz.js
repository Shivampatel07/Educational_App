import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./css/App.css";
import "./css/quizlist.css";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

export function Quizlist() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="tw-grid tw-m-8 sm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3  tw-gap-6">
        <div className="tw-max-w-sm   tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="HTML"
            className="tw-w-full tw-border-black"
            src="images/grid1.jpg"
            width={100}
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">HTML Quiz</h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/html">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="tw-max-w-sm tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="CSS"
            className="tw-w-full"
            width={100}
            src="images/grid2.jpg"
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">CSS Quiz</h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/css">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="tw-max-w-sm tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="JAVASCRIPT"
            width={100}
            className="tw-w-full"
            src="images/grid3.jpg"
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">
              JAVASCRIPT Quiz
            </h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/javascript">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="tw-max-w-sm tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="DATA STRUCTURE AND ALGORITHM"
            width={100}
            className="tw-w-full"
            src="images/grid4.jpg"
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">
              D.S. and Algorithm Quiz
            </h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/datastructure">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="tw-max-w-sm tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="PYTHON"
            className="tw-w-full"
            width={100}
            src="images/grid5.jpg"
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">
              Python Quiz
            </h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/python">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="tw-max-w-sm  tw-text-center tw-rounded tw-overflow-hidden tw-shadow-lg">
          <img
            alt="JAVA"
            className="tw-w-full"
            width={100}
            src="images/grid6.jpg"
          />
          <div className="tw-px-6 tw-py-2">
            <h3 className="tw-text-xl tw-text-left tw-font-bold">JAVA Quiz</h3>
          </div>
          <div className="tw-px-6 tw-py-2 tw-mb-4">
            <Link to="/quizlist/java">
              <button className=" tw-bg-gray-500 hover:tw-bg-gray-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded">
                Attempt Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function Quiz() {
  const params = useParams();
  const [data, setData] = useState([{}]);
  const baseURL = `/quiz/${params.id}`;
  async function getData() {
    await axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(0);
  const [QuizAnswer, setquizAnswer] = useState({});

  function QuestionNext() {
    if (question < data.quiz.length - 1) {
      var newQuestion = question + 1;
      setQuestion(newQuestion);
    }
  }
  function QuestionPrev() {
    if (question > 0) {
      var newQuestion = question - 1;
      setQuestion(newQuestion);
    }
  }

  function handleChange(event) {
    setquizAnswer({
      ...QuizAnswer,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit() {
    var scoreQue = 0;
    for (let i = 0; i < data.quiz.length; i++) {
      if (data.quiz[i].answer === QuizAnswer["option" + i]) {
        scoreQue++;
      } 
    }
    axios
      .post("/quiz/submit", {
        quizanswer: QuizAnswer,
        quizmarks: scoreQue,
        quizname: data.subject,
        username: isLoggedIn.username,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      });
  }

  return (
    <div>
      <br />
      <br />
      <br />
      {typeof data.subject === "undefined" ? (
        <div className="tw-w-screen tw-h-screen tw-justify-center tw-flex tw-items-center ">
          <img src="/images/loading.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          <div className="tw-flex   tw-justify-between tw-m-6">
            <div className="tw-text-2xl">{data.subject.toUpperCase()} Quiz</div>
            <div className="tw-text-2xl">{data.quiz[question].id}/10</div>
          </div>
          <div className="tw-m-6 tw-mt-0 tw-bg-gray-500 tw-p-5 tw-rounded-md">
            <div
              id="question"
              className="tw-text-white md:tw-text-xl md:tw-ms-10 tw-text-md"
            >
              <span>{data.quiz[question].id}. </span>
              <span>{data.quiz[question].question}</span>
            </div>
            <ul className="options tw-list-none tw-mt-4 tw-text-white md:tw-text-xl md:tw-ms-10 tw-text-md">
              <li>
                <label>
                  <input
                    type="radio"
                    name={"option" + question.toString()}
                    className="tw-me-3 "
                    value={data.quiz[question].options[0].a}
                    onChange={handleChange}
                    checked={
                      QuizAnswer["option" + question.toString()] ===
                      data.quiz[question].options[0].a
                    }
                  />
                  {data.quiz[question].options[0].a}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={"option" + question.toString()}
                    className="tw-me-3 "
                    value={data.quiz[question].options[0].b}
                    onChange={handleChange}
                    checked={
                      QuizAnswer["option" + question.toString()] ===
                      data.quiz[question].options[0].b
                    }
                  />
                  {data.quiz[question].options[0].b}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={"option" + question.toString()}
                    className="tw-me-3 "
                    value={data.quiz[question].options[0].c}
                    onChange={handleChange}
                    checked={
                      QuizAnswer["option" + question.toString()] ===
                      data.quiz[question].options[0].c
                    }
                  />
                  {data.quiz[question].options[0].c}
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    name={"option" + question.toString()}
                    className="tw-me-3 "
                    value={data.quiz[question].options[0].d}
                    onChange={handleChange}
                    checked={
                      QuizAnswer["option" + question.toString()] ===
                      data.quiz[question].options[0].d
                    }
                  />
                  {data.quiz[question].options[0].d}
                </label>
              </li>
            </ul>
          </div>
          <div
            id="buttons"
            className="tw-mb-5 tw-flex tw-flex-row-reverse tw-me-5 tw-gap-4"
          >
            {question < data.quiz.length - 1 ? (
              <>
                <button
                  className="tw-bg-transparent hover:tw-bg-black tw-text-black tw-font-semibold hover:tw-text-white tw-py-2 tw-px-4 tw-border tw-border-black hover:tw-border-transparent tw-rounded"
                  onClick={QuestionNext}
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <button
                  className="tw-bg-transparent hover:tw-bg-black tw-text-black tw-font-semibold hover:tw-text-white tw-py-2 tw-px-4 tw-border tw-border-black hover:tw-border-transparent tw-rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </>
            )}
            {question > 0 ? (
              <>
                {" "}
                <button
                  className="tw-bg-transparent hover:tw-bg-black tw-text-black tw-font-semibold hover:tw-text-white tw-py-2 tw-px-4 tw-border tw-border-black hover:tw-border-transparent tw-rounded"
                  onClick={QuestionPrev}
                >
                  Previous
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
