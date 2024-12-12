import React, { useState } from "react";

const Ksentences = [
  {
    sentence: "move down",
    choices: ["move-down", "more-down", "move-shown", "more-dove"],
    correct: "move-down",
  },
  {
    sentence: "move up",
    choices: ["move-up", "more-up", "move-upp", "moved-up"],
    correct: "move-up",
  },
  {
    sentence: "move left",
    choices: ["move-left", "move-leftt", "move-leaf", "move-leff"],
    correct: "move-left",
  },
  {
    sentence: "set error message",
    choices: [
      "set-error-message",
      "set-error-massage",
      "set-err-message",
      "set-error-mess",
    ],
    correct: "set-error-message",
  },
  {
    sentence: "print formatted info",
    choices: [
      "print-formatted-info",
      "print-format-info",
      "print-formatted-infoo",
      "print-form-info",
    ],
    correct: "print-formatted-info",
  },
  {
    sentence: "create string array",
    choices: [
      "create-string-array",
      "create-string-arr",
      "create-str-array",
      "create-string-aray",
    ],
    correct: "create-string-array",
  },
  {
    sentence: "handle default error message",
    choices: [
      "handle-default-error-message",
      "handle-default-err-message",
      "handle-def-error-message",
      "handle-default-error-mess",
    ],
    correct: "handle-default-error-message",
  },
  {
    sentence: "return format on click",
    choices: [
      "return-format-on-click",
      "return-format-on-clik",
      "return-form-on-click",
      "return-format-on-clck",
    ],
    correct: "return-format-on-click",
  },
  {
    sentence: "format info into normal",
    choices: [
      "format-info-into-normal",
      "format-info-into-norm",
      "format-infos-into-normal",
      "format-info-into-nomal",
    ],
    correct: "format-info-into-normal",
  },
];

const CCsentences = [
  {
    sentence: "move right",
    choices: ["move-right", "move-rite", "move-wright", "move-write"],
    correct: "move-right",
  },
  {
    sentence: "back up",
    choices: ["back-up", "bak-up", "back-upp", "back-up"],
    correct: "back-up",
  },
  {
    sentence: "back down",
    choices: ["back-down", "bak-down", "back-dwon", "back-dawn"],
    correct: "back-down",
  },
  {
    sentence: "set profile information",
    choices: [
      "set-profile-information",
      "set-profile-info",
      "set-profile-informations",
      "set-prof-info",
    ],
    correct: "set-profile-information",
  },
  {
    sentence: "create integer array",
    choices: [
      "create-integer-array",
      "create-int-array",
      "create-integer-arr",
      "create-integer-aray",
    ],
    correct: "create-integer-array",
  },
  {
    sentence: "handle submit form",
    choices: [
      "handle-submit-form",
      "handle-sub-form",
      "handle-submit-frm",
      "handle-submit-from",
    ],
    correct: "handle-submit-form",
  },
  {
    sentence: "return format on click",
    choices: [
      "return-format-on-click",
      "return-form-on-click",
      "return-format-on-clik",
      "return-format-on-clck",
    ],
    correct: "return-format-on-click",
  },
  {
    sentence: "handle default state change",
    choices: [
      "handle-default-state-change",
      "handle-def-state-change",
      "handle-default-state-chng",
      "handle-default-st-change",
    ],
    correct: "handle-default-state-change",
  },
  {
    sentence: "print info to csv",
    choices: [
      "print-info-to-csv",
      "print-infos-to-csv",
      "print-info-to-csvv",
      "print-info-to-cvs",
    ],
    correct: "print-info-to-csv",
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [Kresults, setKResults] = useState([]);
  const [CCresults, setCCResults] = useState([]);

  function handleSubmit() {
    if (age === 0 || gender === "")
      return setErrorMsg("Please fill all the fields");

    setStep((prev) => prev + 1);
    setErrorMsg("");
  }

  function handleChoice(choice: string, correct: string, isKebab: boolean) {
    if (isKebab) {
      setKResults((prev) => [...prev, choice === correct]);
    } else {
      setCCResults((prev) => [...prev, choice === correct]);
    }
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <div className="bg-gray-200 flex items-center justify-center min-h-screen">
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
          <h1 className="text-4xl font-bold text-center">Experiment 2</h1>
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
