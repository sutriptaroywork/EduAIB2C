import React, { useEffect, useState } from "react";
import Image from "next/image";
import ResultComponent from "../components/Q&AResultComps/ResultComponent";
import QuizStartLoader from "../components/Utils/quizStartLoader";
import { toast } from "react-toastify";
import timerImg from "../public/timerClock.gif";
import endBtn from "../public/EndBtn.png";
import easyBtn from "../public/easyBtn.svg";
import mediumBtn from "../public/mediumBtn.png";
import hardBtn from "../public/hardBtn.png";
import lady from "../public/Lady.png";
import { summaryData } from "../redux/slices/summarySlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import VideoModal from "../components/VideoModal";
import {
  fetchEasyQuestionData,
  fetchMedQuestionData,
  fetchHardQuestionData,
} from "../redux/slices/quizSlice";
import MarkdownRenderComp from "../components/MarkDownRenderComp";
import { fetchProgressData } from "../redux/slices/dashboardSlice";

const Quiz = () => {
  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);
  const [isPreviousActive, setIsPreviousActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState();
  const [difficulty, setDifficulty] = useState("easy");
  const [countdown, setCountdown] = useState(5);
  const [sel, setSel] = useState();
  const [submittedArray, setSubmittedArray] = useState([]);
  const [selectedQA, setSelectedQA] = useState({});
  const [easyCounter, setEasyCounter] = useState(0);
  const [mediumCounter, setMediumCounter] = useState(0);
  const [hardCounter, setHardCounter] = useState(0);
  const [previousCunter, setPreviousCounter] = useState(0);
  const [previousLastCounter, setPreviousLastCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [assignedCode, setAssignedCode] = useState(null);
  const dispatch = useDispatch();

  const [clickCount, setClickCount] = useState(0);
  const [result, setResult] = useState();
  const [resultArray, setResultArray] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_SHIKSHAML_HOSTNAME;
  const summData = useSelector((state)=>state.summary.summaryData);

  const [resetTrigger, setResetTrigger] = useState(false);
  //   const [countdown, setCountdown] = useState(null);
  const router = useRouter();


  const resetQuizState = () => {
    setCountdown(5);
    setIsPreviousActive(false);
    setIsSelected(false);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSubmittedArray([]);
    setEasyCounter(0);
    setMediumCounter(0);
    setHardCounter(0);
    setPreviousCounter(0);
    setPreviousLastCounter(0);
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
    setDifficulty("easy");
    setScore(0);
    setSelectedQA({});
    setSel();
    setClickCount(0);
    setResetTrigger((prev) => !prev);
  };
  const [isPopupVisible, setPopupVisible] = useState(false);


  useEffect(() => {
    if (summData) {
      setAssignedCode(summData.assigned_code);
    } else {
      router.push("/dashboard");
    }
  }, [summData, summData?.assigned_code]);

  // useEffect to fetch easy, medium and hard question first time when page load
  useEffect(() => {
    const init = () => {
      dispatch(fetchEasyQuestionData(assignedCode));
      dispatch(fetchMedQuestionData(assignedCode));
      dispatch(fetchHardQuestionData(assignedCode));
    };
    if (assignedCode) {
      init();
    }
  }, [assignedCode]);

  const easyQuestion = useSelector((state) => state.quizSlice.easyQuestions);
  const medQuestions = useSelector((state) => state.quizSlice.medQuestions);
  const hardQuestion = useSelector((state) => state.quizSlice.hardQuestions);

  useEffect(() => {
    if (easyQuestion) {
      setQuestions(easyQuestion.content);
      setEasyQuestions(easyQuestion.content);
    }
    if (medQuestions) {
      setMediumQuestions(medQuestions.content);
    }
    if (hardQuestion) {
      setHardQuestions(hardQuestion.content);
    }
  }, [easyQuestion, medQuestions, hardQuestion]);

  useEffect(() => {
    let interval;

    if (isActive && !isPopupVisible) {
      // Check if isActive is true and isPopupVisible is false
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((prevMinutes) => prevMinutes + 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isPopupVisible]);


  // 3,2,1 countdown useEffect
  useEffect(() => {
    if (summData) {
      const interval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [countdown, summData]);

  useEffect(() => {
    if (countdown == 0) {
      return setIsActive(true);
    }
  }, [countdown]);

  const closePopup = () => {
    setPopupVisible(false);
    setIsActive(true);

  }
  // this function for applying green and red color to selected option div after clikcing on submit
  const handleSelect = (i, index) => {
    // if selected option and answer is true else it is false else selected option is correct
    if (selected === i && index === questions[currentQuestionIndex].a)
      return "!bg-[#A7DFBB] !text-[#0D6A2E] !font-poppins !font-semibold !border-2 !border-green-700 ";
    else if (selected === i && index !== questions[currentQuestionIndex].a)
      return "!bg-[#F2686F] !text-red-600 !font-semibold !border-2 !border-red-800 ";
    else if (index === questions[currentQuestionIndex].a)
      return "!bg-[#A7DFBB] !text-[#0D6A2E] !font-poppins !font-semibold !border-2 !border-green-700 ";
  };

  // this function for applying green and red color to selected option index div after clikcing on submit
  const handleColor = (i, index) => {
    // if selected option and answer is true else it is false else selected option is correct
    if (selected === i && index === questions[currentQuestionIndex].a)
      return "!bg-[#C8F5D8] !text-[#0D6A2E] !font-poppins !font-semibold !border-1 !border-green-600 ";
    else if (selected === i && index !== questions[currentQuestionIndex].a)
      return "!bg-[#F4CED0] !text-red-600 !font-semibold !border-1 !border-red-600 ";
    else if (index === questions[currentQuestionIndex].a)
      return "!bg-[#C8F5D8] !text-[#0D6A2E] !font-poppins !font-semibold !border-1 !border-green-600 ";
  };

  // this function for applying green and red color to selected option div after clikcing  previous button
  const handleColorSubmited = (i, index, question) => {
    //if question is attempted
    if (question.attempted == true) {
      // if selected option and answer is true else it is false else selected option is correct
      if (
        question.correct == true &&
        index === questions[currentQuestionIndex].a
      )
        return "!bg-[#C8F5D8] !text-[#0D6A2E] !font-poppins !font-semibold !border-1 !border-green-600 ";
      else if (
        question.selectedOption == index &&
        question.inCorrect == true &&
        index !== questions[currentQuestionIndex].a
      )
        return "!bg-[#F4CED0] !text-[#AB0810] !font-semibold !border-1 !border-red-600 ";
      else if (index === questions[currentQuestionIndex].a)
        return "!bg-[#C8F5D8] !text-[#0D6A2E]  !font-poppins !font-semibold !border-1 !border-green-600 ";
    }
  };

  // this function for applying green and red color to selected  option index div  after clikcing  previous button
  const handleColorSub = (i, index, question) => {
    //if question is attempted
    if (question.attempted == true) {
      // if selected option and answer is true else it is false else selected option is correct
      if (
        question.correct == true &&
        index === questions[currentQuestionIndex].a
      )
        return "!bg-[#A7DFBB] !text-[#0D6A2E] !font-poppins !font-semibold !border-2 !border-green-700 ";
      else if (
        question.selectedOption == index &&
        question.inCorrect == true &&
        index !== questions[currentQuestionIndex].a
      )
        return "!bg-[#F2686F] !text-[#AB0810] !font-semibold !border-2 !border-yellow-800 ";
      else if (index === questions[currentQuestionIndex].a)
        return "!bg-[#A7DFBB] !text-[#0D6A2E]  !font-poppins !font-semibold !border-2 !border-green-700 ";
    }
  };

  // this function to submit questions
  const handleSubmit = (index, data) => {
    setSel(null);
    setIsPreviousActive(true);

    // if userclicks on previous button and trying to solve unattempted question once again
    if (isPreviousActive) {
      setIsSelected(true);
      setSelected(index);
      // updating attempted questions if user attempt unattmpted question
      const newArr = submittedArray.map((question, i) => {
        if (i === currentQuestionIndex) {
          return data;
        } else {
          return question;
        }
      });
      setSubmittedArray(newArr);
      if (
        index ===
        questions[currentQuestionIndex]?.c[questions[currentQuestionIndex].a]
      ) {
        setScore(score + 1);
      }
    } else {
      setSubmittedArray([...submittedArray, data]);
      // if user yet to attempt 1st question
      if (submittedArray.length == 0) {
        setPreviousLastCounter(0);
      } else {
        setPreviousLastCounter(previousLastCounter + 1);
        setPreviousCounter(previousLastCounter + 1);
      }
      setSelected(index);
      // to increse score by 1 if user submit correct option
      if (
        index ===
        questions[currentQuestionIndex]?.c[questions[currentQuestionIndex].a]
      ) {
        setScore(score + 1);
      }
    }
  };

  // this function to handle next questions
  const handleNextQuestion = () => {
    setSel(null);
    if (isPreviousActive) setCurrentQuestionIndex(currentQuestionIndex);
    // if previous questions are not loading
    if (previousCunter == previousLastCounter) {
      // if user checking his next attempted questions
      if (submittedArray.length > 0) {
        if (
          submittedArray[submittedArray.length - 1]?.q != questions[currentQuestionIndex]?.q
        ) {
          setIsPreviousActive(false);
          if (isSelected == false) {
            const question = {
              ...questions[currentQuestionIndex],
              selectedOption: null,
              correct: false,
              inCorrect: false,
              attempted: false,
            };
            setSubmittedArray([...submittedArray, question]);
            setPreviousCounter(previousCunter + 1);
            setPreviousLastCounter(previousLastCounter + 1);
          }
        }
      }
      // if user skip first question and click on next
      if (submittedArray.length == 0) {
        setPreviousLastCounter(0);
        const question = {
          ...questions[currentQuestionIndex],
          selectedOption: null,
          correct: false,
          inCorrect: false,
          attempted: false,
        };
        setSubmittedArray([...submittedArray, question]);
      }
      setIsSelected(false);
      // previous array is false
      setIsPreviousActive(false);
      // if difficulty set to easy while fetching new questions
      if (difficulty == "easy") {
        setQuestions(easyQuestions);
        setSelected(null);
        if (
          easyCounter >= easyQuestions?.length - 1 &&
          mediumCounter >= mediumQuestions?.length - 1 &&
          hardCounter >= hardQuestions?.length - 1
        ) {
          endTest();

          return;
        } else {
          // if user already on last index of last easy question
          if (easyCounter == easyQuestions?.length - 1) {
            setEasyCounter(easyCounter);
          } else {
            setEasyCounter(easyCounter + 1);
          }
          setCurrentQuestionIndex(easyCounter);
          if (easyCounter + 1 < questions.length) {
            setCurrentQuestionIndex(easyCounter + 1);
          }
          // if medium and hard are not done
          if (
            easyCounter >= easyQuestions?.length - 1 &&
            mediumCounter < mediumQuestions?.length - 1 &&
            hardCounter < hardQuestions?.length - 1
          ) {
            setDifficulty("medium");
            setQuestions(mediumQuestions);
            setCurrentQuestionIndex(mediumCounter);
          }
          // if easy and medium question are done then show hard question
          if (
            easyCounter >= easyQuestions?.length - 1 &&
            mediumCounter >= mediumQuestions?.length - 1 &&
            hardCounter < hardQuestions?.length - 1
          ) {
            setDifficulty("hard");
            setQuestions(hardQuestions);
            setCurrentQuestionIndex(hardCounter);
          }
          // if easy and hard question are done then show medium question
          if (
            easyCounter >= easyQuestions?.length - 1 &&
            hardCounter >= hardQuestions?.length - 1 &&
            mediumCounter < mediumQuestions?.length - 1
          ) {
            setDifficulty("medium");
            setQuestions(mediumQuestions);
            setCurrentQuestionIndex(mediumCounter);
          }
        }
      }
      // if difficulty set to medium while fetching new questions
      if (difficulty == "medium") {
        setQuestions(mediumQuestions);
        setSelected(null);
        setCurrentQuestionIndex(mediumCounter);
        if (
          easyCounter >= easyQuestions?.length - 1 &&
          mediumCounter >= mediumQuestions?.length - 1 &&
          hardCounter >= hardQuestions?.length - 1
        ) {
          endTest();

          return;
        } else {
          if (mediumCounter < questions?.length - 1) {
            setCurrentQuestionIndex(mediumCounter + 1);
            setMediumCounter(mediumCounter + 1);
          }
          if (
            easyCounter < easyQuestions?.length - 1 &&
            mediumCounter >= mediumQuestions?.length - 1 &&
            hardCounter < hardQuestions?.length - 1
          ) {
            setDifficulty("hard");
            setQuestions(hardQuestions);
            setCurrentQuestionIndex(hardCounter);
          }
          // if easy andmedium question are done then show hard questions
          if (
            easyCounter >= easyQuestions?.length - 1 &&
            mediumCounter >= mediumQuestions?.length - 1 &&
            hardCounter < hardQuestions?.length - 1
          ) {
            setDifficulty("hard");
            setQuestions(hardQuestions);
            setCurrentQuestionIndex(hardCounter);
          }
          // if medium and hard question are done then show easy questions
          if (
            easyCounter < easyQuestions?.length - 1 &&
            mediumCounter >= mediumQuestions?.length - 1 &&
            hardCounter >= hardQuestions?.length - 1
          ) {
            setDifficulty("easy");
            setQuestions(easyQuestions);
            setCurrentQuestionIndex(easyCounter);
          }
        }
        // if user already on last index of last easy question
      }
      // if difficulty set to hard while fetching new questions
      if (difficulty == "hard") {
        setQuestions(hardQuestions);
        setSelected(null);
        setCurrentQuestionIndex(hardCounter);
        setHardCounter(hardCounter);
        if (hardCounter + 1 < questions.length) {
          setCurrentQuestionIndex(hardCounter + 1);
          setHardCounter(hardCounter + 1);
        } else if (hardCounter == questions.length - 1) {
          if (
            easyCounter >= easyQuestions?.length - 1 &&
            mediumCounter >= mediumQuestions?.length - 1 &&
            hardCounter >= hardQuestions?.length - 1
          ) {
            endTest();

          } else if (
            mediumCounter !== mediumCounter?.length - 1 &&
            easyCounter !== easyQuestions?.length - 1
          ) {
            setDifficulty("easy");
            setQuestions(easyQuestions);
            setCurrentQuestionIndex(easyCounter);
          } else if (
            mediumCounter !== mediumCounter?.length - 1 &&
            easyCounter == easyQuestions?.length - 1
          ) {
            setDifficulty("medium");
            setQuestions(mediumQuestions);
            setCurrentQuestionIndex(mediumCounter);
          } else if (
            mediumCounter == mediumCounter?.length - 1 &&
            easyCounter !== easyQuestions?.length - 1
          ) {
            setDifficulty("Easy");
            setQuestions(easyQuestions);
            setCurrentQuestionIndex(easyCounter);
          }
        }
      }
    }
    // if previous questions are loading
    else {
      setCurrentQuestionIndex(previousCunter);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPreviousCounter(previousCunter + 1);
      }
    }
  };

  // function to fetch previous question
  const previousQuestion = () => {
    setSel(null);
    // setSelectedOption(null);
    setSelected(null);

    setIsPreviousActive(true);
    setQuestions(submittedArray);

    if (isPreviousActive == false) {
      setCurrentQuestionIndex(previousLastCounter);
      setPreviousCounter(previousLastCounter);
    } else {
      setCurrentQuestionIndex(previousCunter - 1);
      setPreviousCounter(previousCunter - 1);
    }
  };

  // function to store Q&A result. We getting result argument when we click end button
  const submitResult = async (result) => {
    const userTokened = localStorage.getItem("userToken");
    // assignCode will be taken after summery is completed
    const url = `${apiUrl}/dashboard/submitQna?assignedCode=${assignedCode}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userTokened}`, // Add the Authorization header
        },
        body: JSON.stringify(result),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(fetchProgressData());
      } else {
      }
    } catch (error) {
    }
  };

  const endTest = () => {
    const finalResult = submittedArray.filter((question, index) => {
      return question.attempted == true;
    });
    if (finalResult?.length < 10) {
      // if user attempt less than 10 questions
      toast.warning(
        `Please attempt at least ${10 - finalResult?.length} more questions.`
      );
      return;
    } else {
      setResultArray(
        submittedArray.filter((question, index) => {
          return question.attempted == true;
        })
      );
      const easyque = submittedArray.filter((question, index) => {
        return question.f == "Easy" && question.attempted == true;
      });
      const mediumque = submittedArray.filter((question, index) => {
        return question.f == "Medium" && question.attempted == true;
      });
      const hardque = submittedArray.filter((question, index) => {
        return question.f == "Hard" && question.attempted == true;
      });
      // creating result to store it in database
      const result = {
        easy: {
          total: easyque.length,
          attempted: easyque.filter((question, index) => {
            return question.attempted == true;
          }).length,
          correct: easyque.filter((question, index) => {
            return question.correct == true;
          }).length,
          incorrect: easyque.filter((question, index) => {
            return question.inCorrect == true;
          }).length,
        },
        medium: {
          total: mediumque.length,
          attempted: mediumque.filter((question, index) => {
            return question.attempted == true;
          }).length,
          correct: mediumque.filter((question, index) => {
            return question.correct == true;
          }).length,
          incorrect: mediumque.filter((question, index) => {
            return question.inCorrect == true;
          }).length,
        },
        hard: {
          total: hardque.length,
          attempted: hardque.filter((question, index) => {
            return question.attempted == true;
          }).length,
          correct: hardque.filter((question, index) => {
            return question.correct == true;
          }).length,
          incorrect: hardque.filter((question, index) => {
            return question.inCorrect == true;
          }).length,
        },
      };
      setResult(result);
      setIsActive(false);
      submitResult(result);
      setShowResult(true);

    }
  };

  // function to set difficulty
  const handleQuestionsDifficulty = (difficulty) => {
    if (difficulty == "easy") {
      setCurrentQuestionIndex(easyCounter);
      setQuestions(easyQuestions);
    } else if (difficulty == "medium") {
      setCurrentQuestionIndex(mediumCounter);
      setQuestions(mediumQuestions);
    } else if (difficulty == "hard") {
      setCurrentQuestionIndex(hardCounter);
      setQuestions(hardQuestions);
    }
    setDifficulty(difficulty);
  };

  const handleRedirect = () => {
    handleNextQuestion();
    // setClickCount(prevCount => prevCount + 1);
    if (clickCount !== 0 && clickCount % 5 === 0) {
      setPopupVisible(true); // Show modal after every 5 clicks
    }
  };

  return (
    <div className="w-full pl-2 pr-2">
      <div>
        {countdown > 0 ? (
          <QuizStartLoader />
        ) : (
          <>
            <div className="App">
              {showResult ? (
                // Result page
                <ResultComponent
                  result={result}
                  resetQuizState={resetQuizState}
                  score={score}
                  totalQuestions={resultArray.length}
                  minutes={`${String(minutes).padStart(2, "0")}`}
                  seconds={`${String(seconds).padStart(2, "0")} `}
                />
              ) : (
                (easyQuestions.length > 0 || mediumQuestions.length > 0 || hardQuestions.length > 0) &&
                <div>
                  {/* timer and end button counter */}
                  <div className="flex flex-row justify-between">
                    <div className=" w-full flex flex-col">
                      <div className="w-full flex flex-row justify-between items-center 2xl:mt-2">
                        <h1 className="text-xl">Q&A : {summData?.title}</h1>
                        <div className="flex items-center z-0 ">
                          <div className="h-[45px] w-[45px] 2xl:h-[50px] 2xl:w-[50px]">
                            <Image src={timerImg} alt="icon" />
                          </div>
                          <div className="flex flex-row items-center">
                            <h1 className="text-[20px] 2xl:text-[24px]  my-auto  w-[75px]">
                              {String(minutes).padStart(2, "0")}:
                              {String(seconds).padStart(2, "0")}
                            </h1>
                            <div className="w-[80px] h-[30px] 2xl:w-[109px] 2xl:h-[40px] ">
                              <Image
                                onClick={endTest}
                                className="cursor-pointer"
                                src={endBtn}
                                alt="icon"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* easy medium and hard buttons */}
                      <div className="flex flex-row mt-[-20px] 2xl:mt-1 z-0 w-fit">
                        {easyQuestions?.length !== 0 && <button
                          disabled={
                            isPreviousActive ||
                            easyCounter >= easyQuestions?.length - 1
                          }
                          onClick={() => handleQuestionsDifficulty("easy")}
                          className="disabled:cursor-not-allowed mr-6 flex flex-col items-center cursor-pointer"
                        >
                          <Image
                            className="flex mb-[-22px] z-20 relative"
                            src={easyBtn}
                            width={70}
                            height={50}
                            alt="Picture of the author"
                          />
                          <div
                            className={`w-[90px] 2xl:w-[110px] disabled:cursor-not-allowed pt-1 pb-1 relative rounded-2xl mt-[-2px] ${difficulty === "easy"
                              ? "bg-[#ffcc02] text-white"
                              : "bg-[#EFE8FD]  text-[#ffcc02]"
                              }`}
                          >
                            Easy
                          </div>
                        </button>}
                        {mediumQuestions?.length !== 0 && <button
                          disabled={
                            isPreviousActive ||
                            mediumCounter >= mediumQuestions?.length - 1
                          }
                          onClick={() => handleQuestionsDifficulty("medium")}
                          className="disabled:cursor-not-allowed  mr-6 flex flex-col items-center cursor-pointer"
                        >
                          <Image
                            className="flex mb-[-20px] z-20 relative"
                            src={hardBtn}
                            width={70}
                            height={50}
                            alt="Picture of the author"
                          />
                          <div
                            className={`w-[90px] 2xl:w-[110px] pt-1 pb-1 relative rounded-2xl mt-[-2px] ${difficulty === "medium"
                              ? "bg-[#ffcc02] text-white"
                              : "bg-[#EFE8FD]  text-[#ffcc02]"
                              }`}
                          >
                            Medium
                          </div>
                        </button>}
                        {hardQuestions?.length !== 0 && <button
                          disabled={
                            isPreviousActive ||
                            hardCounter >= hardQuestions?.length - 1
                          }
                          onClick={() => handleQuestionsDifficulty("hard")}
                          className="disabled:cursor-not-allowed mr-6 flex flex-col items-center cursor-pointer "
                        >
                          <Image
                            className="flex mb-[-23px] z-20 relative"
                            src={mediumBtn}
                            width={70}
                            height={53}
                            alt="Picture of the author"
                          />
                          <div
                            disabled={isPreviousActive}
                            className={`w-[90px] 2xl:w-[110px] disabled:cursor-not-allowed pt-1 pb-1 relative rounded-2xl mt-[-2px] ${difficulty === "hard"
                              ? "bg-[#ffcc02] text-white"
                              : "bg-[#EFE8FD]  text-[#ffcc02]"
                              }`}
                          >
                            Hard
                          </div>
                        </button>}
                      </div>
                    </div>
                  </div>
                  {/* Question and Answer container */}
                  <div className="flex flex-row mt-4">
                    <div className="w-3/5">
                      <div className="border-1 border-gray-300 w-full  pt-3 py-3 pl-5 rounded-lg shadow-md mb-[20px] 2xl:mb-[40px] text-[#8F53E7] font-bold h-auto text-sm 2xl:text-lg  flex items-center flex-shrink-0  ">
                        {questions && <MarkdownRenderComp markdownContent={questions[currentQuestionIndex]?.q} />}
                      </div>
                      {questions &&
                        questions[currentQuestionIndex]?.c.map(
                          (option, index) => (
                            <button
                              className={`${isPreviousActive == true
                                ? handleColorSubmited(
                                  option,
                                  index,
                                  questions[currentQuestionIndex]
                                )
                                : ""
                                } border-1 disabled:cursor-not-allowed disabled:pointer-events-none flex border-1 border-[#ffcc02] w-full mb-3 rounded-lg ${isPreviousActive == true
                                  ? handleColorSubmited(
                                    option,
                                    index,
                                    questions[currentQuestionIndex]
                                  )
                                  : ""
                                } ${selected && handleColor(option, index)} ${sel === option ? "bg-purple-500 text-white" : ""
                                } hover:text-white hover:bg-purple-500 text-purple-500 `}
                              disabled={
                                selected ||
                                (isPreviousActive &&
                                  questions[currentQuestionIndex]?.attempted ==
                                  true)
                              }
                              key={index}
                              onClick={() => {
                                setSel(option, index);
                                setSelectedQA({
                                  ...questions[currentQuestionIndex],
                                  selectedOption: index,
                                  correct:
                                    index === questions[currentQuestionIndex].a
                                      ? true
                                      : false,
                                  inCorrect:
                                    index !== questions[currentQuestionIndex].a
                                      ? true
                                      : false,
                                  attempted: true,
                                });
                                handleSubmit(option, {
                                  ...questions[currentQuestionIndex],
                                  selectedOption: index,
                                  correct:
                                    index === questions[currentQuestionIndex].a
                                      ? true
                                      : false,
                                  inCorrect:
                                    index !== questions[currentQuestionIndex].a
                                      ? true
                                      : false,
                                  attempted: true,
                                })
                              }}
                            >
                              <div
                                className={`h-[41px] w-[41px] 2xl:h-[50px] 2xl:w-[50px] text-sm 2xl:text-base rounded-lg border-1 border-gray-300  shadow-md flex items-center my-[3px]  mr-2 ml-3 justify-center ${isPreviousActive == true
                                  ? handleColorSub(
                                    option,
                                    index,
                                    questions[currentQuestionIndex]
                                  )
                                  : ""
                                  }  ${selected && handleSelect(option, index)} `}
                              >
                                {String.fromCharCode(65 + index)}
                              </div>
                              <div
                                className={`my-auto mr-2 text-sm flex items-center pt-[14px] h-full w-full text-left  ${sel == option ? "text-white" : ""
                                  } ${isPreviousActive == true
                                    ? handleColorSubmited(
                                      option,
                                      index,
                                      questions[currentQuestionIndex]
                                    )
                                    : ""
                                  }   ${selected && handleColor(option, index)} `}
                              >
                                {option && <MarkdownRenderComp markdownContent={option} />}
                              </div>
                            </button>
                          )
                        )}
                      {/* Previous Submit and Next buttons */}
                      <div className="w-[80%] 2xl:w-[70%] m-auto flex flex-row justify-between  pl-[40px] pr-[40px] mb-4 ">
                        <button
                          onClick={previousQuestion}
                          disabled={
                            submittedArray.length == 0 ||
                              (isPreviousActive && currentQuestionIndex == 0)
                              ? true
                              : false
                          }
                          className={`w-[150px] h-[40px] 2xl:w-[212px] 2xl:h-[61px] 2xl:text-[18px] pt-1 pb-1 border-1 shadow-md rounded-2xl text-purple-700 font-semibold disabled:cursor-not-allowed`}
                        >
                          Previous
                        </button>

                        <button
                          onClick={handleRedirect}
                          id="openPopupButton"
                          className="w-[150px] h-[40px] 2xl:w-[212px] 2xl:h-[61px] 2xl:text-[18px] pt-1 pb-1 border-1 shadow-md rounded-2xl text-purple-700 font-semibold"
                        >
                          {" "}
                          Next
                        </button>
                        {isPopupVisible && (
                          <VideoModal closePopup={closePopup} />
                        )}

                      </div>
                    </div>


                    {/* Answer explanantion container */}
                    <div
                      className={`w-2/5 pt-[10px] ${isPreviousActive &&
                        submittedArray[currentQuestionIndex]?.attempted == true
                        ? "block"
                        : "hidden"
                        }  m-auto`}
                    >
                      <div
                        className={`w-[250px] 2xl:w-[350px] h-fit  text-sm 2xl:text-lg  flex flex-col justify-center m-auto p-2 text-center shadow-md rounded-md ${questions[currentQuestionIndex]?.correct ||
                          questions[currentQuestionIndex]?.c[
                          questions[currentQuestionIndex].a
                          ] == selected
                          ? "bg-[#C8F5D8] border-2 border-green-500"
                          : "bg-[#F4CED0] border-[2px] border-[#F2686F]"
                          }`}
                      >
                        <p>
                          {questions[currentQuestionIndex]?.correct ||
                            questions[currentQuestionIndex]?.c[
                            questions[currentQuestionIndex].a
                            ] == selected ? (
                            <span className="text-[#0D6A2E] font-semibold m-0">
                              {" "}
                              Correct Answer:
                            </span>
                          ) : (
                            <span className="text-[#AB0810] font-semibold m-0">
                              {" "}
                              Wrong Answer:
                            </span>
                          )}
                        </p>
                        <p className="font-normal">
                          {" "}
                          {/* {questions[currentQuestionIndex]?.e}{" "} */}
                          <MarkdownRenderComp
                            markdownContent={questions[currentQuestionIndex]?.e}
                          />
                        </p>
                      </div>
                    </div>
                  </div>


                </div>
              )}
              {/* lady image border  */}
              <div className="fixed right-0 bottom-0">
                <Image src={lady} alt="icon" height={250} width={250} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
