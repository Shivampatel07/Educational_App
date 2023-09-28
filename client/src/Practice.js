import React, { useEffect, useState } from "react";
import axios from "axios";

function Practice() {
  const [blog, setBlog] = useState([{}]);
  async function getBlog() {
    await axios
      .get("/blog")
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getBlog();
    
  }, []);

  const [openItemIndex, setOpenItemIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <div className="tw-container tw-mx-auto tw-mt-4 tw-p-4">
        <h1 className="tw-text-2xl tw-font-semibold tw-mb-4">
          Language Cheat sheet
        </h1>
        <div className="tw-space-y-2">
          {blog.map((item, index) => (
            <AccordionItem
              key={index}
              {...item}
              isOpen={openItemIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function AccordionItem({ title, author, date, sections, isOpen, onClick }) {
  return (
    <div className="tw-border tw-rounded-md tw-mb-2 ">
      <button
        className={
          "tw-w-full tw-text-lg tw-font-semibold tw-py-2 tw-px-4 tw-text-left tw-bg-gray-500 tw-rounded-md"
        }
        onClick={onClick}
      >
        {title}
      </button>
      {isOpen && (
        <div className="tw-p-4 tw-mt-1  tw-bg-gray-300   focus:tw-transition  tw-rounded-md tw-duration-1000 tw-ease-in-out">
          <div className="tw-flex tw-justify-between">
            <div className="tw-text-lg tw-font-medium"> {author}</div>
            <div className="tw-text-lg tw-font-medium"> {date}</div>
          </div>
          <br />

          {sections.map((inneritems, innerindex) => (
            <div key={innerindex} className="tw-mb-3">
              <div className="tw-font-medium  tw-text-base lg:tw-text-lg">
                {innerindex + 1}
                {"  "} {inneritems.section_title}{" "}
              </div>
              <div>
                {typeof inneritems.section_content === "string" ? (
                  <div className="tw-indent-1 tw-font-small ">
                    {inneritems.section_content}
                  </div>
                ) : (
                  <table
                    style={{ border: "1px solid black" }}
                    className="tw-mb-7 tw-mt-3 tw-w-full lg:tw-w-9/12 tw-text-sm lg:tw-text-base"
                  >
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black" }}>concept</th>
                        <th style={{ border: "1px solid black" }}>
                          description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inneritems.section_content.map(
                        (blogitems, blogindex) => (
                          <tr key={blogindex}>
                            {blogitems.concept && (
                              <>
                                <td style={{ border: "1px solid black" }}>
                                  {blogitems.concept}
                                </td>
                                <td style={{ border: "1px solid black" }}>
                                  {blogitems.description}
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
          <br />
        </div>
      )}
    </div>
  );
}

export default Practice;
