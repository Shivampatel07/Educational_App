import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AcademicCapIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Coding Quizzes",
    description:
      "Test your coding skills with interactive quizzes. Practice coding problems and improve your problem-solving abilities.",
    icon: AcademicCapIcon,
  },
  {
    name: "Code Compiler",
    description:
      "Compile and run your code online. Support for multiple programming languages to test and execute your code instantly.",
    icon: CodeBracketIcon,
  },
  {
    name: "Interactive Coding Challenges",
    description:
      "Engage in hands-on coding challenges to apply what you've learned. Get immediate feedback and see your code in action.",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Real-world Projects",
    description:
      "Work on real-world coding projects to gain practical experience. Build your portfolio and showcase your skills to potential employers.",
    icon: PresentationChartBarIcon,
  },
];

export function Card(props) {
  return (
    <>
      <div className="tw-max-w-sm tw-rounded tw-overflow-hidden tw-shadow-lg">
        <img className="tw-w-full" src={props.src} alt="card" />
        <div className="tw-px-6 tw-py-4">
          <div className="tw-font-bold tw-text-xl mb-2">{props.title}</div>
          <p className="tw-text-gray-700 tw-text-base">{props.description}</p>
        </div>
      </div>
    </>
  );
}

export function Carous() {
  return (
    <>
      <div>
        <Carousel showStatus={false} showThumbs={false}>
          <div>
            <img src="images/grid1.jpg" alt="Image1" />
          </div>
          <div>
            <img src="images/grid2.jpg" alt="Image2" />
          </div>
          <div>
            <img src="images/grid3.jpg" alt="Image3" />
          </div>
        </Carousel>
      </div>
    </>
  );
}

export function Feature1() {
  return (
    <>
      <div className="tw-bg-white tw-py-24 sm:tw-py-32">
        <div className="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
          <h2 className="tw-text-center tw-text-lg tw-font-semibold tw-leading-8 tw-text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="tw-mx-auto tw-mt-10 tw-grid tw-max-w-lg tw-grid-cols-4 tw-items-center tw-gap-x-8 tw-gap-y-10 sm:tw-max-w-xl sm:tw-grid-cols-6 sm:tw-gap-x-10 lg:tw-mx-0 lg:tw-max-w-none lg:tw-grid-cols-5">
            <img
              className="tw-col-span-2 tw-max-h-12 tw-w-full tw-object-contain lg:tw-col-span-1"
              src="images/practice.png"
              alt="Practice"
              width={158}
              height={48}
            />
            <img
              className="tw-col-span-2 tw-max-h-12 tw-w-full tw-object-contain lg:tw-col-span-1"
              src="images/quizes.png"
              alt="Quizes"
              width={170}
              height={70}
            />
            <img
              className="tw-col-span-2 tw-max-h-12 tw-w-full tw-object-contain lg:tw-col-span-1"
              src="images/coderunner.png"
              alt="Code Runner"
              width={170}
              height={70}
            />
            <img
              className="tw-col-span-2 tw-max-h-12 tw-w-full tw-object-contain sm:tw-col-start-2 lg:tw-col-span-1"
              src="images/events.png"
              alt="Events"
              width={170}
              height={70}
            />
            <img
              className="tw-col-span-2 tw-col-start-2 tw-max-h-12 tw-w-full tw-object-contain sm:tw-col-start-auto lg:tw-col-span-1"
              src="images/responsive.png"
              alt="Responsive"
              width={170}
              height={70}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function Feature2() {
  return (
    <>
      <div className="tw-bg-white tw-py-0 sm:tw-py-32">
        <div className="tw-mx-auto tw-max-w-7xl tw-px-6 lg:tw-px-8">
          <div className="tw-mx-auto tw-max-w-2xl lg:tw-text-center">
            <h2 className="tw-text-base tw-font-semibold tw-leading-7 tw-text-black">
              Key to success
            </h2>
            <p className="tw-mt-2 tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl">
              Unlocking Knowledge: Welcome to Eliscops Coding
            </p>
            <p className="tw-mt-6 tw-text-lg tw-leading-8 tw-text-gray-600">
              Welcome to Eliscops, your gateway to knowledge and learning
              excellence. Explore our educational resources, courses, and expert
              insights to embark on an enriching educational journey. Let's
              learn together!
            </p>
          </div>
          <div className="tw-mx-auto tw-mt-16 tw-max-w-2xl sm:tw-mt-20 lg:tw-mt-24 lg:tw-max-w-4xl">
            <dl className="tw-grid tw-max-w-xl tw-grid-cols-1 tw-gap-x-8 tw-gap-y-10 lg:tw-max-w-none lg:tw-grid-cols-2 lg:tw-gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="tw-relative tw-pl-16">
                  <dt className="tw-text-base tw-font-semibold tw-leading-7 tw-text-gray-900">
                    <div className="tw-absolute tw-left-0 tw-top-0 tw-flex tw-h-10 tw-w-10 tw-items-center tw-justify-center tw-rounded-lg  tw-bg-black">
                      <feature.icon
                        className="tw-h-6 tw-w-6 tw-text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="tw-mt-2 tw-text-base tw-leading-7 tw-text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
