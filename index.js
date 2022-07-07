// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(createEmployeeRecord(array[i]))
    }
    return result;
}
let worker = createEmployeeRecord(['jangis','marifet','gm','30']);
console.log(worker);


function createTimeInEvent(employeeRecord, dateTimeStamp) {
    const arrayDateTimeStamp = dateTimeStamp.split(" ")
    const dateStamp = arrayDateTimeStamp[0];
    const timeStamp = parseInt(arrayDateTimeStamp[1]);
    employeeRecord["timeInEvents"] = [...employeeRecord["timeInEvents"],{type: "TimeIn", hour: timeStamp, date: dateStamp}];
    return employeeRecord;
}
createTimeInEvent(worker,"2018-01-01 2300");
console.log(worker);

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
    const arrayDateTimeStamp = dateTimeStamp.split(" ")
    const dateStamp = arrayDateTimeStamp[0];
    const timeStamp = parseInt(arrayDateTimeStamp[1]);
    employeeRecord["timeOutEvents"].push({
        type: "TimeOut",
        hour: timeStamp,
        date: dateStamp
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    let timeInEvents = employeeRecord["timeInEvents"];
    let timeOutEvents = employeeRecord["timeOutEvents"];
    for (let i = 0; i < timeInEvents.length; i++) {
        if (timeInEvents[i]["date"] === dateStamp) {
            return (timeOutEvents[i]["hour"] - timeInEvents[i]["hour"])/100;
        }
    }
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp);
    return hoursWorked * employeeRecord["payPerHour"]
}

function allWagesFor(employeeRecord) {
    let allTimeInEvents = employeeRecord["timeInEvents"];
    let allDatesWorked = [];
    for (let i = 0; i < allTimeInEvents.length; i++) {
        allDatesWorked.push(allTimeInEvents[i]["date"])
    }
    let allPay = 0;
    for (let k = 0; k < allDatesWorked.length; k++) {
        allPay += wagesEarnedOnDate(employeeRecord, allDatesWorked[k])
    }
    return allPay;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    for (let i = 0; i < employeeRecords.length; i++) {
        totalPayroll += allWagesFor(employeeRecords[i])
    }
    return totalPayroll;
}