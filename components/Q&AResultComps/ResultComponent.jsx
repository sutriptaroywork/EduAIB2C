import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import test from "../../public/test.png"
import revise from "../../public/revise.png"
import Chart from 'react-google-charts'
import { useRouter } from 'next/router'
import CelebrationLoader from '../Utils/celebrationLoader'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useSelector } from 'react-redux'


const ResultComponent = ({ result, score, totalQuestions, minutes, seconds, resetQuizState }) => {

    const chartOptions = {
        plugins: {
            datalabels: {
                formatter: (score, context) => {
                    const dataset = context.chart.data.datasets[context.datasetIndex];
                    const total = dataset.data.reduce((acc, data) => acc + data, 0);
    
                    if (score === 0) {
                        return ''; 
                    }
                    const percentage = ((score / total) * 100);
                    return `${percentage.toFixed(0)} %`;
                },
                color: '#fff',
                font: {
                    size: '15',
                },
            },
        },
        title: {
            display: true,
            text: 'Pie Chart Title',
            fontSize: 20,
        },
        tooltips: {
            enabled: false,
        },
        hover: {
            mode: null,
        },
        events: [], // Disable all chart events
        onHover: (event, chartElement) => {
            event.target.style.cursor = 'default'; // Set the cursor to default to avoid interactivity
        },
        maintainAspectRatio: false,
    };
    
    

    const chartData = {
        datasets: [
            {
                data: [score, totalQuestions - score],
                backgroundColor: ["#66E582", "#EF6363"],
                hoverBackgroundColor:  ["#66E582", "#EF6363"], // Set the on-hover colors

            },
        ],
    };




    const [showSpan, setShowSpan] = useState(false);
    const summData = useSelector((state)=>state?.summary?.summaryData);

    const handleButtonClick = () => {
        resetQuizState();
    };

    const router = useRouter();

    const data = [
        ["Task", "Hours per Day"],
        ["Correct", score],
        ["Incorrect", totalQuestions - score]
    ];


    useEffect(() => {
        // Delay the appearance of the <span> element after 500 milliseconds
        const timer = setTimeout(() => {
            setShowSpan(true);
        }, 500);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const style = {
        height: 300,
    };

    // setting text percerntage wise
    const text = (result) => {
        if (result <= 30) {
            return {
                text: "Keep pushing yourself, there's room for improvement.",
                para: "Your journey to excellence begins here; use your current score as a stepping stone toward continuous improvement."
            }
        } else if (result >= 31 && result <= 50) {
            return {
                text: "You're on the right track; keep up the good work.",
                para: "You're moving in the right direction, keep up the consistent effort to achieve your goals."
            }
        } else if (result >= 51 && result <= 75) {
            return {
                text: "Well done! Your efforts are paying off; keep it up.",
                para: "Your dedication is yielding success; now, stay focused and continue your journey toward excellence."
            }
        } else if (result >= 76 && result <= 85) {
            return {
                text: "Impressive! You're on the path to excellence.",
                para: "You're well on your way to excellence, so stay determined and let your achievements speak for themselves."
            }
        } else if (result >= 86 && result <= 95) {
            return {
                text: "Outstanding performance! You're excelling in your studies.",
                para: "Your outstanding performance sets you apart; keep up the remarkable work and soar even higher."
            }
        } else if (result >= 96 && result <= 100) {
            return {
                text: "Incredible achievement! You're setting a remarkable standard.",
                para: "Your perfect score sets an extraordinary standard; your dedication and hard work inspire others to reach for greatness."
            }
        }
    }

    return (
        <div className='mt-auto mb-auto'>
            <p className='font-poppins text-xl font-medium'> Q&A Assement </p>
            <div className='flex flex-row  h-full'>
                <div className='w-3/5 mt-0 2xl:mt-[50px]'>
                    <p className='font-poppins text-lg 2xl:text-xl font-medium '>{text(((score / totalQuestions) * 100).toFixed(0))?.text}</p>
                    <p className='w-[400px] font-poppins text-sm 2xl:text-base font-normal2'> {text(((score / totalQuestions) * 100).toFixed(0))?.para} </p>
                    <div className='flex flex-col mt-8'>
                        <h6 className='text-base 2xl:text-lg'>Your time : <span className='text-[#ffcc02]'> {minutes} min {seconds} seconds</span> </h6>
                        <h6 className='text-base 2xl:text-lg'>Your performance : <span className='text-[#A52938] text-base 2xl:text-xl'> {((score / totalQuestions) * 100).toFixed(0)}% </span> </h6>
                        <div className='flex flex-row'>
                            <div className='flex flex-row mt-2 relative'>
                                <div className='h-[260px] w-[260px] 2xl:h-[270px] 2xl:w-[270px] z-50 relative ' >                               
                                    <Pie data={chartData} options={chartOptions} plugins={[ChartDataLabels]} cla />
                                </div>
                                {showSpan && (
                                    <span className='h  h-[350px] w-[350px] pl-2 mt-auto mb-auto absolute bottom-0 left-0 z-0'>
                                        {((score / totalQuestions) * 100).toFixed(0) > 75 && <CelebrationLoader style={style} />}
                                    </span>
                                )}
                            </div>
                            <span className='pl-2 mt-auto mb-auto'>
                                <h4 className='text-green-800 font-poppins text-lg font-normal leading-7'>Correct <span className='bg-[#0CE75A26] border-1  border-[#0D6A2E] pl-4 pr-4 rounded-full text-[17px] ml-5'>{score}</span> </h4>
                                <h4 className='text-red-600 font-poppins text-lg font-normal leading-7'>Incorrect <span className='bg-[#F4CED026] border-1  border-[#AB0810] pl-4 pr-4 rounded-full text-[17px] ml-2'>{totalQuestions - score}</span> </h4>
                            </span>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col pl-5 pr-5 mt-auto mb-auto'>
                    <div
                        onClick={handleButtonClick}
                        className='flex flex-row pl-4 pr-4 pt-2 shadow mt-auto mb-auto cursor-pointer'>
                        <div className='flex m-auto'>
                            <Image src={test} alt="icon" height={40} width={40} />
                        </div>
                        <div className='pl-4'>
                            <p className='text-purple-600 font-poppins font-medium text-base leading-6'>Take a new test</p>
                            <p className='text-gray-700 font-poppins text-sm font-normal leading-5'>Try another test to boost your confidence</p>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            if(summData?.assigned_code){
                                router.push(`/summary?code=${summData?.assigned_code}`)
                            }else{
                                router.push("/summary")
                            }
                        }}
                        className=' flex flex-row pl-4 pr-4 pt-2 shadow mt-4 mb-auto cursor-pointer'>
                        <div className='flex m-auto'>
                            <Image src={revise} alt="icon" height={50} width={40} />
                        </div>
                        <div className='pl-4'>
                            <p className='text-purple-600 font-poppins font-medium text-base leading-6'>Lets revise concept again</p>
                            <p className='text-gray-700 font-poppins text-sm font-normal leading-5'>Lets learn again, until you get them right.</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ResultComponent;