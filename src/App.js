import './App.css';
import { useState } from 'react';

function App() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState("");
  
  const getDateInAllFormats = (day, month, year) => {
    var ddmmyyyy = day + month + year;
    var mmddyyyy = month + day + year;
    var yyyymmdd = year + month + day;
    var ddmmyy = day + month + year.slice(-2);
    var mmddyy = month + day + year.slice(-2);
    var yyddmm = year.slice(-2) + day + month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  };

  const reverseString = (str) => str.split("").reverse().join("");


  const checkPalindromeString = (currentDate) => {
    const dateList = getDateInAllFormats(currentDate.getDate().toString(),
                        (currentDate.getMonth() + 1).toString(), currentDate.getFullYear().toString());
    let result = false;

    dateList.forEach(item => {
      if(item === reverseString(item)) {
        result = true;
      } else {
        return false;
      }
    });

    return result;
  };

  const getNextPalindromeDate = (currentDate) => {
    let day = 0;
    let isPlaindrome = false;
    let date = currentDate;
    while(1) {
      day++;
      let nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      date = nextDate;
      isPlaindrome = checkPalindromeString(nextDate);
      if(isPlaindrome) {
        return {
          days: day,
          date: nextDate
        }
      }
    }
  };

  const getPreviousPalindromeDate = (currentDate) => {
    let day = 0;
    let isPlaindrome = false;
    let date = currentDate;
    
    while(1) {
      day++;
      let previousDate = new Date(date);
      previousDate.setDate(date.getDate() - 1);
      date = previousDate;
      isPlaindrome = checkPalindromeString(previousDate);
      if(isPlaindrome) {
        return {
          days: day,
          date: previousDate
        }
      }
    }
  };

  const checkPalindrome = () => {
    if(birthDate && birthDate !== "") {
      const currentDate = new Date(birthDate);
    let isPalindrome = checkPalindromeString(currentDate);    
    let palindromeDateData = {date: currentDate, days: 0};

    if(!isPalindrome) {
      let nextDateData = getNextPalindromeDate(currentDate);
      let previousDateData =getPreviousPalindromeDate(currentDate);
      
      palindromeDateData = nextDateData.days > previousDateData.days ? 
        previousDateData : nextDateData;
    }
    let palindromeDate = palindromeDateData.date.getDate() + "-" + (palindromeDateData.date.getMonth() + 1) + "-" + palindromeDateData.date.getFullYear();
    setResult(`The nearest palindrome date is ${palindromeDate}, you missed by ${palindromeDateData.days} days.`);
    }    
  };

  return (
    <div className="App">
      <div>
        <h1 className="label">Palindrome Birthday!</h1>
      </div>
      <div className="input-section">
        <h3 className="label">Enter your birthday date:</h3>
        <input type="date" id="birth-date" name="birth-date" placeholder="dd-mm-yyyy" onSelect= {(event) => setBirthDate(event.target.value)} />
      </div>
      <div>
        <button onClick={checkPalindrome}>Show</button>
      </div>
      <div className="result-section">
        <h2>{result}</h2>
      </div>
    </div>
  );
}

export default App;
