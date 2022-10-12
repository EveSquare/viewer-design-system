import {useState, useEffect} from 'react';
import data from '../data/sample-logs/6/full/1.json';

function useRescueLog() {
    const [rescuelog, setRescueLog] = useState(data);
    return {rescuelog: rescuelog, setRescueLog: setRescueLog}
}
export default useRescueLog;