import { useState, useEffect } from 'react';
import axios from 'axios';

const Questions = (props) => {
    const [error, setError] = useState('');
    const [questionPoints, setQuestionPoints] = useState(0);
    const [questions, setQuestions] = useState([{
        question: '',
        answer1: '',
        answer2: ''
    }]);
    const [isAnswering, setIsAnswering] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionsDone, setQuestionsDone] = useState(false)
    const [matchesNotFound, setMatchesNotFound] = useState(true)
    const [matchedUsers, setMatchedUsers] = useState([])

    const projectID = '20ab33de-b351-49f8-8fe3-4e5d850e8a93';

    const handleAnswer1Click = () => {
        let currentPoints = questionPoints;
        let currentIndex = questionIndex;
        let newPoints = currentPoints + questions[questionIndex].answer1_points;
        setQuestionPoints(newPoints)

        if (currentIndex < questions.length - 1) {
            setQuestionIndex(currentIndex + 1);
        } else {
            setQuestionsDone(true)
        }

    }

    const handleAnswer2Click = () => {
        let currentPoints = questionPoints;
        let currentIndex = questionIndex;
        let newPoints = currentPoints + questions[questionIndex].answer2_points;
        setQuestionPoints(newPoints)

        if (currentIndex < questions.length - 1) {
            setQuestionIndex(currentIndex + 1);
        } else {
            setQuestionsDone(true)
        }

    }

    const handleFindClick = async () => {
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        };
        const maxPoints = questionPoints + 50;
        const minPoints = questionPoints - 50;

        console.log(questionPoints, "QUESTION POINTS")

        const updatePointsData = {
            questionPoints,
            isQuestionsAnswered: true
        }

        const updatePointsResponse = await axios.put(`https://partner-in-magic.herokuapp.com/users/${localStorage.getItem('userId')}`, updatePointsData)
        console.log(updatePointsResponse)

        const findUsersResponse = await axios.get(`https://partner-in-magic.herokuapp.com/users?questionPoints_gte=${minPoints}&questionPoints_lte=${maxPoints}&id_ne=${localStorage.getItem('userId')}&numberOfOngoingMatches_lte=3`, options)
        setMatchedUsers(findUsersResponse.data)
        setMatchesNotFound(false)
    }

    const handleStartChat = async (index) => {
        console.log(index)

        const createChatUserData = {
            "title": `${localStorage.getItem('username')} & ${matchedUsers[index].username}`
        };

        const options = {
            headers: {
                'PRIVATE-KEY': '76f18e7e-6094-422f-8267-03faa629e45c',
                'Project-ID': projectID,
                'User-Name': localStorage.getItem('username'),
                'User-Secret': localStorage.getItem('password')
            },
        };

        const newChatResponse = await axios.post('https://api.chatengine.io/chats/', createChatUserData, options)
        console.log(newChatResponse)
        if (!newChatResponse.status === 201) {
            setError('Error creating a new chat. Please check with the technical team.')
        }
        else {
            const addMemberUserData = {
                "username": matchedUsers[index].username
            }
            const addMemberResponse = await axios.post(`https://api.chatengine.io/chats/${newChatResponse.data.id}/people/`, addMemberUserData, options)
            console.log(addMemberResponse, "ADD MEMBER RESPONSE")
            props.history.push("/app");
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            const options = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            };
            const questionsResponse = await axios.get('https://partner-in-magic.herokuapp.com/questions', options)
            setQuestions(questionsResponse.data)
        }
        fetchQuestions();
    }, [])


    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Identifying your personal traits</h1>

                {isAnswering ? (<div>
                    <h5 className="sub-title">Answering the following questions honsetly will help us find the perfect match for you!</h5>
                    <div align="center">
                        <button className="button" onClick={(e) => { setIsAnswering(true) }}>
                            <span>Show me the questions!</span>
                        </button>
                    </div>
                </div>) : (<div>
                    {!questionsDone ? (<div>
                        <h5 className="sub-title">{questions[questionIndex].question}</h5>
                        <div align="center">
                            <button className="button-question" onClick={() => handleAnswer1Click()}>
                                <span>{questions[questionIndex].answer1}</span>
                            </button>
                            <button className="button-question" onClick={() => handleAnswer2Click()}>
                                <span>{questions[questionIndex].answer2}</span>
                            </button>
                        </div>
                    </div>) : <div>{matchesNotFound ? (<div><h5 className="sub-title">Thanks for answering the questions! We're all set!</h5><button className="button" onClick={() => handleFindClick()}>
                        <span>Find me a match!</span>
                    </button></div>) : (<div><h5 className="sub-title">The following matches have been found.</h5>
                        {matchedUsers.length > 0 ? (
                            matchedUsers.map((user, index) => {
                                return (
                                    <div key={index}>
                                        <button className="button" onClick={(e) => { handleStartChat(index) }}>
                                            <span>Chat with {user.username}</span>
                                        </button>
                                    </div>
                                )
                            })
                        ) : (<div><h5 className="sub-title">No matches found. Please try again later</h5></div>)}
                    </div>)}</div>

                    }
                </div>)}

                <h1>{error}</h1>
            </div>
        </div>

    );
};

export default Questions;
