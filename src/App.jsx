import React from "react";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const fetchJobs = async () => {
    const res = await fetch(url);
    const newJobs = await res.json();
    console.log(newJobs);
    setJobs(newJobs);
    setIsLoading(false);
  };



  useEffect(() => {
    document.title = "Tabs";
    fetchJobs();
    
  }, []);

  const checkWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  },[width]);

  if (isLoading) {
    return (
      <h1 className="text-4xl text-blue-800 flex items-center justify-center h-screen">
        loading....
      </h1>
    );
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <main className="flex flex-col space-y-10">
      <section className="mt-20">
        <div className="flex flex-col justify-center items-center capitalize font-bold font-mono p-2 text-lg lg:text-2xl">
          <h1 className="py-2">experience</h1>
          <div className="h-1 w-20 bg-blue-300"></div>
        </div>
      </section>
      <section className="flex flex-col space-y-5 lg:flex-row lg:justify-between lg:items-start lg:space-y-0 lg:mx-10">
        <div className="flex justify-center lg:flex-col">
          {jobs.map((job, index) => {
            return (
              <button
                key={job.id}
                onClick={() => setValue(index)}
                className={`p-2 font-mono lg:text-xl lg:py-6 font-semibold ${
                  index === value && "bg-blue-100 border-b-2 border-blue-700"
                }`}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <article className="flex flex-col mx-3 bg-blue-50 p-4 rounded-xl lg:w-[80vw]">
          <h3 className="capitalize font-mono py-2 pl-2 font-bold text-lg lg:text-3xl lg:py-4">
            {title}
          </h3>
          <h4 className="bg-blue-200 w-20 text-center rounded-md font-semibold p-2 ml-2 lg:text-2xl lg:w-32">
            {company}
          </h4>
          <p className="p-2 text-xs font-semibold font-mono lg:text-sm">{dates}</p>
          <div>
            {duties.map((duty, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-5 p-2"
                >
                  {width >= 768 && (
                    <FiArrowRight className="text-xl font-bold w-8" />
                  )}

                  <p className="text-sm leading-relaxed w-[90vw] lg:text-lg font-mono">{duty}</p>
                </div>
              );
            })}
          </div>
        </article>
      </section>
      {<h1>{width}</h1>}
    </main>
  );
};

export default App;
