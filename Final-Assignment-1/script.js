const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button")
var taskInput = document.getElementById("taskInput");
var taskdescription = document.getElementById("taskdesc");
var tasklist = document.getElementById("tasklist");
var taskListArray = [];
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let tasktit = taskInput.value;
  let taskdesc = taskdescription.value;
  let dueDate = dueDateInput.value;
  let completionTime = completionTimeInput.value;
  let estimatedTime = estimatedTimeInput.value;
  let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
  if (tasktit == '' || taskdesc == '' || dueDate == '' || completionTime == '' || estimatedTime == '' || priorityRating == '') {
    alert('Please complete the form')
  } else {
    addTask(tasktit, taskdesc, dueDate, estimatedTime, priorityRating, completionTime, false);
  }


})



function addTask(tasktit, taskdesc, dueDate, estimatedTime, priorityRating, completionTime, completionStatus) {
  let d = new Date();
  let dateCreated = d.getFullYear();
  let task = {
    tasktit,
    taskdesc,
    dueDate,
    dateCreated,
    estimatedTime,
    completionTime,
    priorityRating,
    estimatedTime,
    completionStatus
  };
  taskListArray.push(task);
  renderTask(taskListArray);
}

function renderTask(taskListArray) {
  // Create HTML elements
  var html = ''
  taskListArray.forEach((ele, i) => {
    html += `
  
      <div class="card">
      <h1>task#${i + 1}</h1>
      <p>Task Name:${ele.tasktit}</p>
      <p>Task Description:${ele.taskdesc}</p>
      <p>Due Date:${ele.dueDate}</p>
      <p>completion Time:${ele.completionTime}</p>
      <p>Estimated completion time (in mins):${ele.estimatedTime}</p>
      <p>Task Priority:${ele.priorityRating}</p>
      <button onclick='deleted(${i})'>deleted</button>
    </div>
  `
  })

  document.querySelector('.content').innerHTML = html;
  // Clear the input form
  form.reset();
}
// Extra Task DOM elements
// Event Listeners for DOM elements
/* deleted data */
function deleted(i) {
  console.log(i)
  taskListArray.splice(i, 1);
  console.log(taskListArray)
  renderTask(taskListArray)
}


/* Timer */
var h = 0;
var m = 0;
var s = 0;
var start = false;
var init;
/* Format time */
function timers() {
  s = s + 1;
  if (s >= 60) {
    s = 00;
    m = m + 1;
  }
  if (m >= 60) {
    m = 0;
    h = h + 1;
  }
  document.getElementById('_h').innerHTML = `${h < 10 ? ('0' + h) : h}`/* 时 */
  document.getElementById('_m').innerHTML = `${m < 10 ? ('0' + m) : m}`/* 分 */
  document.getElementById('_s').innerHTML = `${s < 10 ? ('0' + s) : s} `/* 秒 */
}
// Start Timer
function starttime() {
  if (start == false) {

    init = setInterval(timers, 1000)
  }

}
/* Stop Timer */
function stoptime() {
  window.clearInterval(init)
}
/* Reset Timer */
function restarttime() {
  window.clearInterval(init);
  h = 0;
  m = 0;
  s = 0;
  document.getElementById('_h').innerHTML = '00'
  document.getElementById('_m').innerHTML = '00'
  document.getElementById('_s').innerHTML = '00'

}

/* Music Player */
var videoVolume = 1.0;
var audio = document.querySelector('#audio'),
  audioTimeBar = document.querySelector('#audioTimeBar'),
  audioMute = document.querySelector('#audioMute'),
  audioPlayPause = document.querySelector('#audioPlayPause'),
  audioCurrentTime = document.querySelector('#audioCurrentTime'),
  lyrics_button = document.querySelector('.lyrics-button'),/* 歌词显示隐藏按钮 */
  lyrics = document.querySelector('.lyrics'),
  audioDuration = document.querySelector('#audioDuration');

audioTimeBar.addEventListener('change', function () {
  audio.currentTime = audioTimeBar.value;
  audio.play();
  console.log('audio now playing at : ' + videoTimeBarTag.value + 's');
});
audio.addEventListener('loadedmetadata', function () {
  // Set to minute and seconds
  var duration = audio.duration;
  var seconds = duration.toFixed(2);
  var cleanDuration = formatTime(seconds);
  var durationTime = audioDuration;
  // Set the audio duration
  durationTime.innerHTML = cleanDuration;
  // set the timebar to 0
  audioTimeBar.value = 0;
});
audio.addEventListener("timeupdate", function () {

  audioTimeBar.value = audio.currentTime;
  // Set to minute and seconds
  var time = audio.currentTime;
  var seconds = time.toFixed(2);
  console.log(seconds);
  var cleartime = formatTime(seconds);
  console.log('ccc')
  // Set the current play value
  audioCurrentTime.innerHTML = cleartime;
});
audioPlayPause.addEventListener('click', function () {
  var type;
  if (audio.paused || audio.ended) {
    type = 'audio play';
    audio.play();
    audioPlayPause.classList.value = 'playbtn pause';
  } else {
    type = 'audio pause';
    audio.pause();
    audioPlayPause.classList.value = 'playbtn play';
  }
  console.log(type);
});
audioMute.addEventListener('click', function () {
  var type;
  if (audio.muted) {
    type = 'mute open';
    this.classList.value = 'mute open';
    audio.muted = false;
    audio.volume = videoVolume;
  } else {
    type = 'mute close';
    this.classList.value = 'mute close';
    audio.volume = 0;
    audio.muted = true;
  }
  console.log(type);
});
function formatTime(s) {
  var m = Math.floor(s / 60);
  var m = (m >= 10) ? m : "0" + m;
  var s = Math.floor(s % 60);
  var s = (s >= 10) ? s : "0" + s;
  return m + ":" + s;
}
/* lyric hidden */
lyrics_button.addEventListener('click', function () {
  var txt = lyrics_button.innerHTML;
  console.log(txt)
  if (txt == 'Hide lyrics') {
    lyrics_button.innerHTML = 'Show lyrics';
    lyrics.classList = 'lyrics hidden';

  } else {
    lyrics_button.innerHTML = 'Hide lyrics';
    lyrics.classList = 'lyrics ';
  }
});
