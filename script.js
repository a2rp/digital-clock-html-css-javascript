const updateClock = () => {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.querySelector(".hoursNumber").innerText = hours;
    document.querySelector(".minutesNumber").innerText = minutes;
    document.querySelector(".secondsNumber").innerText = seconds;

    setTimeout(updateClock, 1000 * 1);
};
updateClock();

