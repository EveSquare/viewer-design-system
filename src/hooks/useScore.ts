import { useState } from "react";

function useScore(defaultValue: number) {

    const [score, _setScore] = useState(defaultValue);
    const setScore = (score: number) => { _setScore(Math.round(score * 100) / 100) } // 少数第二位まで表示

    const [maxScore, _setMaxScore] = useState(defaultValue);
    const setMaxScore = (score: number) => { _setMaxScore(Math.round(score * 100) / 100) } // 少数第二位まで表示

    return { score: score, setScore: setScore, maxScore: maxScore, setMaxScore: setMaxScore }
}

export default useScore;