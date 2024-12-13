import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import img from "./example1.png";
import img2 from "./example2.png";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Ksentences = [
  {
    sentence: "move down",
    choices: shuffleArray([
      "move-shown",
      "more-dove",
      "move-down",
      "more-down",
    ]),
    correct: "move-down",
  },
  {
    sentence: "move up",
    choices: shuffleArray(["move-upp", "moved-up", "move-up", "more-up"]),
    correct: "move-up",
  },
  {
    sentence: "move left",
    choices: shuffleArray([
      "move-leftt",
      "move-leaf",
      "move-left",
      "move-leff",
    ]),
    correct: "move-left",
  },
  {
    sentence: "set error message",
    choices: shuffleArray([
      "set-error-massage",
      "set-err-message",
      "set-error-message",
      "set-error-mess",
    ]),
    correct: "set-error-message",
  },
  {
    sentence: "print formatted info",
    choices: shuffleArray([
      "print-format-info",
      "print-formatted-infoo",
      "print-formatted-info",
      "print-form-info",
    ]),
    correct: "print-formatted-info",
  },
  {
    sentence: "create string array",
    choices: shuffleArray([
      "create-string-arr",
      "create-str-array",
      "create-string-array",
      "create-string-aray",
    ]),
    correct: "create-string-array",
  },
  {
    sentence: "handle default error message",
    choices: shuffleArray([
      "handle-default-err-message",
      "handle-def-error-message",
      "handle-default-error-message",
      "handle-default-error-mess",
    ]),
    correct: "handle-default-error-message",
  },
  {
    sentence: "return format on click",
    choices: shuffleArray([
      "return-format-on-clik",
      "return-form-on-click",
      "return-format-on-click",
      "return-format-on-clck",
    ]),
    correct: "return-format-on-click",
  },
  {
    sentence: "format info into normal",
    choices: shuffleArray([
      "format-info-into-norm",
      "format-infos-into-normal",
      "format-info-into-normal",
      "format-info-into-nomal",
    ]),
    correct: "format-info-into-normal",
  },
];

// he;;p

const CCsentences = [
  {
    sentence: "move right",
    choices: shuffleArray(["moveWrite", "moveWright", "moveRight", "moveRite"]),
    correct: "moveRight",
  },
  {
    sentence: "back up",
    choices: shuffleArray(["backUpp", "backUp", "backUp", "bakUp"]),
    correct: "backUp",
  },
  {
    sentence: "back down",
    choices: shuffleArray(["backDwon", "backDawn", "backDown", "bakDown"]),
    correct: "backDown",
  },
  {
    sentence: "set profile information",
    choices: shuffleArray([
      "setProfileInfo",
      "setProfInfo",
      "setProfileInformation",
      "setProfileInformations",
    ]),
    correct: "setProfileInformation",
  },
  {
    sentence: "create integer array",
    choices: shuffleArray([
      "createIntArray",
      "createIntegerArr",
      "createIntegerArray",
      "createIntegerAray",
    ]),
    correct: "createIntegerArray",
  },
  {
    sentence: "handle submit form",
    choices: shuffleArray([
      "handleSubForm",
      "handleSubmitFrm",
      "handleSubmitForm",
      "handleSubmitFrom",
    ]),
    correct: "handleSubmitForm",
  },
  {
    sentence: "return format on click",
    choices: shuffleArray([
      "returnFormOnClick",
      "returnFormatOnClik",
      "returnFormatOnClick",
      "returnFormatOnClck",
    ]),
    correct: "returnFormatOnClick",
  },
  {
    sentence: "handle default state change",
    choices: shuffleArray([
      "handleDefStateChange",
      "handleDefaultStateChng",
      "handleDefaultStateChange",
      "handleDefaultStChange",
    ]),
    correct: "handleDefaultStateChange",
  },
  {
    sentence: "print info to csv",
    choices: shuffleArray([
      "printInfosToCsv",
      "printInfoToCsvv",
      "printInfoToCsv",
      "printInfoToCvs",
    ]),
    correct: "printInfoToCsv",
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [expertise, setExpertise] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Kresults, setKResults] = useState([]);
  const [CCresults, setCCResults] = useState([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [Ktimes, setKTimes] = useState<number[]>([]);
  const [CCtimes, setCCTimes] = useState<number[]>([]);
  const [unformattedTimer, setUnformattedTimer] = useState<number>(0);
  const [currentTimer, setCurrentTimer] = useState<number>(0);
  const [name, setName] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step >= 2 && step % 2 === 1) {
      setStartTime(new Date());
      timer = setInterval(() => {
        setUnformattedTimer((prev) => prev + 100);
      }, 100);
    } else {
      setUnformattedTimer(0);
    }
    return () => clearInterval(timer);
  }, [step]);

  useEffect(() => {
    setCurrentTimer((unformattedTimer / 1000).toFixed(1));
  }, [unformattedTimer]);

  function handleSubmit() {
    if (age === 0 || gender === "" || expertise === "")
      return setErrorMsg("Please fill all the fields");

    setStep((prev) => prev + 1);
    setErrorMsg("");
  }

  function handleChoice(choice: string, correct: string, isKebab: boolean) {
    if (startTime) {
      const timeSpent = (new Date().getTime() - startTime.getTime()) / 1000;
      if (isKebab) {
        setKTimes((prev) => [...prev, timeSpent]);
        setKResults((prev) => [...prev, choice === correct]);
      } else {
        setCCTimes((prev) => [...prev, timeSpent]);
        setCCResults((prev) => [...prev, choice === correct]);
      }
    }
    setStep((prev) => prev + 1);
  }

  function saveResultsToCSV() {
    const data = [
      [
        "Type",
        "Sentence",
        "Choice",
        "Correct",
        "Time Spent (s)",
        "Age",
        "Gender",
        "Expertise",
      ],
      ...Kresults.map((result, index) => [
        "kebab-case",
        Ksentences[index].sentence,
        result ? Ksentences[index].correct : "Incorrect",
        result ? "Correct" : "Incorrect",
        Ktimes[index],
        index === 0 ? age : "",
        index === 0 ? gender : "",
        index === 0 ? expertise : "",
      ]),
      ...CCresults.map((result, index) => [
        "camelCase",
        CCsentences[index].sentence,
        result ? CCsentences[index].correct : "Incorrect",
        result ? "Correct" : "Incorrect",
        CCtimes[index],
        index === 0 ? age : "",
        index === 0 ? gender : "",
        index === 0 ? expertise : "",
      ]),
    ];

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${name.replace(/\s+/g, "_")}_results.csv`);
  }

  return (
    <>
      <div className="bg-gray-900 flex items-center justify-center min-h-screen">
        <div className=" bg-zinc-900 fixed top-0 left-0 right-0  shadow-md p-4 over">
          <h1 className="text-4xl font-bold text-center text-yellow-500 font-mono">
            Experiment 2
          </h1>
        </div>
        <div className="mt-16 p-4">
          {step === 0 && (
            <>
              <div className="text-xl bg-slate-800 p-5 pt-7 pb-7 rounded-3xl font-mono text-white">
                <h1 className="font-bold text-3xl text-center text-amber-300">
                  Welcome to Experiment 2: CamelCase vs kebab-case
                </h1>
                <br />
                <p className="text-left text-green-400/80">
                  // In this experiment, we will be comparing the readability of
                  <br />
                  // camelCase and kebab-case.
                </p>
                <br />
                <p className="text-left text-green-400/80">
                  // You will be asked for some personal information in the next
                  <br />
                  // step. After that, the experiment will begin.
                </p>
                <br />
                <p className="text-left text-green-400/80">
                  // You will be shown a sentence, read it carefully and
                  remember it. <br />
                  // When ready, click "Ready".
                </p>
                <br />
                <p className="text-left text-green-400/80">
                  // At this point you will be shown some options among which
                  you
                  <br />
                  // will have to find the sentence you read earlier.
                </p>
                <br />
                <p className="text-left text-green-400/80">
                  // Select the correct one
                  <br />
                  <br />
                  // the experiment will proceed in this way until completion.
                </p>
                <br />
                <p className="text-left text-green-400/80">
                  // here is an example (the word "function" is{" "}
                  <span className="underline">not</span> part of the name)
                </p>
                <br />
                <div className="flex justify-center">
                  <img src={img} alt="Example" className="rounded-lg" />
                </div>
                <br />
                <p className="text-left text-green-400/80">
                  // you will then be asked to select the correct name from the
                  proposals
                </p>
                <br />
                <div className="flex justify-center">
                  <img src={img2} alt="Example" className="rounded-lg" />
                </div>
                <br />
                <p className="text-left text-green-400/80">
                  // proceed through the experiment and try to complete it
                  <br />
                  // in a timely manner
                  <br />
                  // Thank you for participating
                </p>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="text-xl bg-slate-800 p-5 pt-7 pb-7 rounded-3xl font-mono text-white">
                <h2 className="font-bold text-3xl text-center text-amber-300">
                  Personal Information
                </h2>
                <br />
                <form className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-lg font-medium">
                      {" "}
                      <span className="text-blue-500">let </span>
                      <span className="text-blue-300">your-name</span> =
                    </label>
                    <input
                      type="text"
                      className="mt-1 text-emerald-200 p-2 border-b-2 bg-slate-800 border-gray-500 focus:outline-none focus:border-gray-600 appearance-none"
                      value={name}
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-lg font-medium">
                      {" "}
                      <span className="text-blue-500">let </span>
                      <span className="text-blue-300">your-age</span> =
                    </label>
                    <input
                      type="text"
                      className="mt-1 text-emerald-200 p-2 border-b-2 bg-slate-800 border-gray-500 focus:outline-none focus:border-gray-600 appearance-none"
                      value={age}
                      placeholder="Enter your age"
                      maxLength={2}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,2}$/.test(value)) {
                          setAge(parseInt(value) || 0);
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-lg font-medium">
                      {" "}
                      <span className="text-blue-500">let </span>
                      <span className="text-blue-300">your-gender</span> =
                    </label>
                    <select
                      className="mt-1 text-emerald-200 p-2 border-b-2 bg-slate-800 border-gray-500 focus:outline-none focus:border-gray-600 appearance-none"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" className="text-lg">
                        Select your gender
                      </option>
                      <option value="male" className="text-lg">
                        Male
                      </option>
                      <option value="female" className="text-lg">
                        Female
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="text-lg font-medium">
                      {" "}
                      <span className="text-blue-500">let </span>
                      <span className="text-blue-300">your-expertise</span> =
                    </label>
                    <select
                      className="mt-1 text-emerald-200 p-2 border-b-2 bg-slate-800 border-gray-500 focus:outline-none focus:border-gray-600 appearance-none"
                      value={expertise}
                      onChange={(e) => setExpertise(e.target.value)}
                    >
                      <option value="" className="text-lg">
                        Select
                      </option>
                      <option value="never coded" className="text-lg">
                        Never coded
                      </option>
                      <option value="beginner" className="text-lg">
                        Beginner
                      </option>
                      <option value="intermediate" className="text-lg">
                        Intermediate
                      </option>
                      <option value="expert" className="text-lg">
                        Expert
                      </option>
                    </select>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="p-2 bg-blue-500 text-white rounded"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="flex justify-center font-mono text-red-500 text-sm">
                    {errorMsg}
                  </div>
                </form>
              </div>
            </>
          )}
          {step >= 2 &&
            step < Ksentences.length * 2 + CCsentences.length * 2 + 2 && (
              <>
                <div className="text-xl">
                  {step % 2 === 0 ? (
                    <>
                      <h2 className="font-bold text-3xl text-center text-white">
                        Read the name carefully
                      </h2>
                      <br />
                      <p className="text-center font-mono bg-slate-800 rounded-xl p-4 text-amber-300">
                        <span className="text-blue-400">function </span>
                        {step < Ksentences.length * 2 + 2
                          ? Ksentences[Math.floor((step - 2) / 2)].sentence
                          : CCsentences[
                              Math.floor((step - Ksentences.length * 2 - 2) / 2)
                            ].sentence}
                        <span className="text-yellow-300">()</span>
                      </p>
                      <br />
                      <div className="flex justify-center">
                        <button
                          onClick={() => setStep((prev) => prev + 1)}
                          className="p-2 bg-green-700 text-gray-200 rounded"
                        >
                          Ready
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold text-3xl text-white text-center">
                        Select the correct name
                      </h2>
                      {step >= 2 && step % 2 === 1 && (
                        <div className="text-center mt-2">
                          <p
                            className={`text-lg font-bold font-mono ${
                              currentTimer < 5
                                ? "text-green-500"
                                : currentTimer < 10
                                ? "text-orange-500"
                                : "text-red-500"
                            }`}
                          >
                            {currentTimer} s
                          </p>
                        </div>
                      )}
                      <br />
                      <div className="space-y-4">
                        {step < Ksentences.length * 2 + 2
                          ? Ksentences[Math.floor((step - 2) / 2)].choices.map(
                              (choice, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    handleChoice(
                                      choice,
                                      Ksentences[Math.floor((step - 2) / 2)]
                                        .correct,
                                      true
                                    )
                                  }
                                  className="block w-full p-2 text-white bg-slate-800 hover:text-amber-300 font-mono rounded transition ease-in-out duration-150"
                                >
                                  {choice}
                                </button>
                              )
                            )
                          : CCsentences[
                              Math.floor((step - Ksentences.length * 2 - 2) / 2)
                            ].choices.map((choice, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleChoice(
                                    choice,
                                    CCsentences[
                                      Math.floor(
                                        (step - Ksentences.length * 2 - 2) / 2
                                      )
                                    ].correct,
                                    false
                                  )
                                }
                                className="block w-full p-2 text-white bg-slate-800 hover:text-amber-300 font-mono rounded transition ease-in-out duration-150"
                              >
                                {choice}
                              </button>
                            ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          {step >= Ksentences.length * 2 + CCsentences.length * 2 + 2 && (
            <>
              <div className="text-xl bg-slate-800 p-5 rounded-3xl font-mono text-white">
                <h2 className="font-bold text-3xl text-center text-amber-300">
                  Experiment Completed
                </h2>
                <br />
                <p className="text-center font-bold">
                  Thank you <span className="text-fuchsia-300/80">for</span>{" "}
                  participating <span className="text-fuchsia-300/80">in</span>{" "}
                  the experiment.
                </p>
                <br />
                <p className="text-left">
                  <span className="text-blue-500">let </span>
                  <span className="text-blue-300">your-results</span> ={" "}
                  <span className="text-yellow-600/90">
                    "{Kresults.filter((result) => result).length} out of{" "}
                    {Kresults.length} correct for kebab-case."
                  </span>
                </p>
                <p className="text-left">
                  <span className="text-blue-500">let </span>
                  <span className="text-blue-300">yourResults</span> ={" "}
                  <span className="text-yellow-600/90">
                    "{CCresults.filter((result) => result).length} out of{" "}
                    {CCresults.length} correct for camelCase".
                  </span>
                </p>
                <p className="text-left">
                  <span className="text-blue-500">var </span>
                  <span className="text-blue-300">
                    time-spent-on-kebab-case
                  </span>{" "}
                  ={" "}
                  <span className="text-emerald-200">
                    {Ktimes.reduce((a, b) => a + b, 0).toFixed(3)} seconds
                  </span>
                </p>
                <p className="text-left">
                  <span className="text-blue-500">var </span>
                  <span className="text-blue-300">
                    timeSpentOnCamelCase
                  </span> ={" "}
                  <span className="text-emerald-200">
                    {CCtimes.reduce((a, b) => a + b, 0).toFixed(3)} seconds
                  </span>
                </p>
                <div className="flex justify-center mt-4">
                  {!canGoBack ? (
                    <button
                      onClick={() => {
                        saveResultsToCSV();
                        setCanGoBack(true);
                      }}
                      className="p-2 bg-green-500 text-white rounded"
                    >
                      Save Results to CSV
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setStep(0);
                        setCanGoBack(false);
                        setAge(0);
                        setGender("");
                        setExpertise("");
                        setErrorMsg("");
                        setKResults([]);
                        setCCResults([]);
                        setStartTime(null);
                        setKTimes([]);
                        setCCTimes([]);
                        setUnformattedTimer(0);
                        setCurrentTimer(0);
                        setName("");
                      }}
                      className="p-2 bg-green-500 text-white rounded"
                    >
                      Go Back
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-center">
            {step > 0 && step < 2 && (
              <button
                onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))}
                className="p-2 bg-none text-red-500 font-mono rounded flex items-center"
              >
                &lt; Back
              </button>
            )}
            {step !== 1 && step < 2 && (
              <button
                onClick={() => setStep((prev) => (prev < 2 ? prev + 1 : prev))}
                className="p-2 bg-green-500 text-white rounded w-32"
              >
                Start
              </button>
            )}
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
