import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

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
  const [errorMsg, setErrorMsg] = useState("");
  const [Kresults, setKResults] = useState([]);
  const [CCresults, setCCResults] = useState([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [Ktimes, setKTimes] = useState<number[]>([]);
  const [CCtimes, setCCTimes] = useState<number[]>([]);
  const [unformattedTimer, setUnformattedTimer] = useState<number>(0);
  const [currentTimer, setCurrentTimer] = useState<number>(0);

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
    if (age === 0 || gender === "")
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
      ["Type", "Sentence", "Choice", "Correct", "Time Spent (s)"],
      ...Kresults.map((result, index) => [
        "kebab-case",
        Ksentences[index].sentence,
        result ? Ksentences[index].correct : "Incorrect",
        result ? "Correct" : "Incorrect",
        Ktimes[index],
      ]),
      ...CCresults.map((result, index) => [
        "camelCase",
        CCsentences[index].sentence,
        result ? CCsentences[index].correct : "Incorrect",
        result ? "Correct" : "Incorrect",
        CCtimes[index],
      ]),
    ];

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "experiment_results.csv");
  }

  return (
    <>
      <div className="bg-gray-200 flex items-center justify-center min-h-screen">
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
          <h1 className="text-4xl font-bold text-center">Experiment 2</h1>
          {step >= 2 && step % 2 === 1 && (
            <div className="text-center mt-2">
              <p>Time spent on this choice: {currentTimer} seconds</p>
            </div>
          )}
        </div>
        <div className="mt-16 p-4">
          {step === 0 && (
            <>
              <div className="text-xl">
                <h1 className="font-bold text-3xl text-center">
                  Welcome to Experiment 2: CamelCase vs kebab-case
                </h1>
                <br />
                <p>
                  In this experiment, we will be comparing the readability of
                  camelCase and kebab-case. We will be using React to
                  demonstrate this.
                </p>
                <br />
                <p>
                  You will be asked for some personal information in the next
                  step. After that, the experiment will begin.
                </p>
                <br />
                <p>
                  You will be shown a sentence, read it carefully and remember
                  it. <br />
                  Only after that, you can press continue.
                </p>
                <br />
                <p>
                  At this point you will be shown some options among which you
                  will have to find <br />
                  the sentence you read earlier.
                </p>
                <br />
                <p>
                  Select the correct; the experiment will proceed in this way
                  untill completion.
                </p>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="text-xl">
                <h2 className="font-bold text-2xl text-center">
                  Personal Information
                </h2>
                <br />
                <form className="space-y-4">
                  <div>
                    <label className="block text-lg font-medium">Age:</label>
                    <input
                      type="number"
                      className="mt-1 p-2 w-full border rounded"
                      value={age}
                      placeholder="Enter your age"
                      min="0"
                      onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium">Gender:</label>
                    <div className="mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="form-radio"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center ml-4">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="form-radio"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
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
                      <h2 className="font-bold text-2xl text-center">
                        Read the sentence carefully
                      </h2>
                      <br />
                      <p className="text-center">
                        {step < Ksentences.length * 2 + 2
                          ? Ksentences[Math.floor((step - 2) / 2)].sentence
                          : CCsentences[
                              Math.floor((step - Ksentences.length * 2 - 2) / 2)
                            ].sentence}
                      </p>
                      <br />
                      <div className="flex justify-center">
                        <button
                          onClick={() => setStep((prev) => prev + 1)}
                          className="p-2 bg-green-500 text-white rounded"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold text-2xl text-center">
                        Select the correct sentence
                      </h2>
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
                                  className="block w-full p-2 bg-blue-500 text-white rounded"
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
                                className="block w-full p-2 bg-blue-500 text-white rounded"
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
              <div className="text-xl">
                <h2 className="font-bold text-2xl text-center">
                  Experiment Completed
                </h2>
                <br />
                <p className="text-center">
                  Thank you for participating in the experiment.
                </p>
                <br />
                <p className="text-center">
                  Your results: {Kresults.filter((result) => result).length} out
                  of {Kresults.length} correct for kebab-case.
                </p>
                <p className="text-center">
                  Your results: {CCresults.filter((result) => result).length}{" "}
                  out of {CCresults.length} correct for camelCase.
                </p>
                <p className="text-center">
                  Time spent on kebab-case: {Ktimes.reduce((a, b) => a + b, 0)}{" "}
                  seconds
                </p>
                <p className="text-center">
                  Time spent on camelCase: {CCtimes.reduce((a, b) => a + b, 0)}{" "}
                  seconds
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={saveResultsToCSV}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Save Results to CSV
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-center">
            {step > 0 && step < 2 && (
              <button
                onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))}
                className="mr-2 p-2 bg-red-500 text-white rounded"
              >
                Previous
              </button>
            )}
            {step !== 1 && step < 2 && (
              <button
                onClick={() => setStep((prev) => (prev < 2 ? prev + 1 : prev))}
                className="p-2 bg-green-500 text-white rounded"
              >
                Next
              </button>
            )}
            <br />
          </div>
          <div className="flex justify-center">
            <span className="text-red-600">{errorMsg}</span>
          </div>
        </div>
      </div>
    </>
  );
}
