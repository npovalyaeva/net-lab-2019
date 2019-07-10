function User(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.sayHi = function() {
    alert( `Hello, i'm ${self.firstName} ${self.lastName}` );
};

function Teacher(firstName, lastName) {

    User.call(this, firstName, lastName);
}
Teacher.prototype = Object.create(User.prototype);
Teacher.prototype.constructor = Teacher;

function Pupil(firstName, lastName) {

    User.call(this, firstName, lastName);
}
Pupil.prototype = Object.create(User.prototype);
Pupil.prototype.constructor = Pupil;

function signIn() {

    // TODO: implement checkElementIsEmpty function

    if (document.getElementById("teacher-first-name") != null)
        var teacherFirstName = document.getElementById("teacher-first-name").value.trim();

    if (document.getElementById("teacher-last-name") != null)
        var teacherLastName = document.getElementById("teacher-last-name").value.trim();

    if (teacherFirstName == "" || teacherLastName == "") {
        alert("Please Fill Teacher Name");
        return false;
    }

    if (document.getElementById("pupil-first-name") != null)
        var pupilFirstName = document.getElementById("pupil-first-name").value.trim();

    if (document.getElementById("pupil-last-name") != null)
        var pupilLastName = document.getElementById("pupil-last-name").value.trim();

    if (pupilFirstName == "" || pupilLastName == "") {
        alert("Please Fill Pupil Name");
        return false;
    }

    var teacher = new Teacher(teacherFirstName, teacherLastName);
    var pupil = new Pupil(pupilFirstName, pupilLastName);
    sessionStorage.setItem("teacherSignInObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilSignInObject", JSON.stringify(pupil));
    sessionStorage.setItem("firstRunning", "true");
    window.open("./askquestionpage.html","_self");
} 

function loadAskQuestionPage() {
    // TODO: Call in a loop 
    var pupil = JSON.parse(sessionStorage.getItem("pupilSignInObject"));

    if (typeof pupil.marks == 'undefined') {
        document.getElementById("marks-list").value = "You don't have marks!";
    }
    else {
        // TODO: Load pupil marks
    }
}   

function askQuestion() {
    var firstRunning = sessionStorage.getItem("firstRunning");
    if (firstRunning) {
        // TODO: Think about firstRunning value and state saving after new page opening
        var teacher = JSON.parse(sessionStorage.getItem("teacherSignInObject"));
        var pupil = JSON.parse(sessionStorage.getItem("pupilSignInObject"));
    }
    else {
        var teacher = JSON.parse(sessionStorage.getItem("teacherSignInObject"));
        var pupil = JSON.parse(sessionStorage.getItem("pupilSignInObject"));
    }

    if (document.getElementById("textarea") != null)
        teacher.lastQuestion = document.getElementById("textarea").value.trim();

    if (teacher.lastQuestion == "") {
        alert("Please Fill Question Field");
        return false;
    }

    sessionStorage.setItem("teacherAskObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilAskObject", JSON.stringify(pupil));
    sessionStorage.setItem("firstRunning", "false");
    window.open("./answerquestionpage.html","_self");
}

function loadAnswerQuestionPage() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherAskObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilAskObject"));
    if (typeof teacher.lastSetMark == 'undefined') {
        document.getElementById("last-set-mark").innerHTML = "-";
    }
    else {
        // TODO: Load pupil marks
    }

    document.getElementById("question").innerHTML = teacher.lastQuestion;
}    

function setTextareaMode(checkbox) {
    var textarea = document.getElementById("textarea");

    if (checkbox.checked == true) {
        textarea.readOnly = false;
    }
    else {
        textarea.readOnly = true;
    }
}        
