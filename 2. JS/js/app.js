function User(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.sayHi = function() {
    alert( `Hello, i'm ${self.firstName} ${self.lastName}` );
};

function Teacher(firstName, lastName) {

    User.call(this, firstName, lastName);

    this.lastQuestion = "";
    this.lastSetMark = -1;
}
Teacher.prototype = Object.create(User.prototype);
Teacher.prototype.constructor = Teacher;

function Pupil(firstName, lastName) {

    User.call(this, firstName, lastName);

    this.isAnswerForLastQuestionKnown = true;
    this.lastAnswer = "";
    this.marks = [];

}
Pupil.prototype = Object.create(User.prototype);
Pupil.prototype.constructor = Pupil;

// --------------- --------------- --------------- --------------- --------------- --------------- ---------------

function checkIsSignedIn() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    if (teacher == undefined) {
        alert("Please Sign In");
        window.open("./index.html","_self");
        return false;
    }
}

function checkIsQuestionAsked() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    if (teacher.lastQuestion == "") {
        alert("You can't answer the question because the question isn't exist.");
        window.open("./askquestionpage.html","_self");
        return false;
    }
}

function checkIsQuestionAnswered() {
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (pupil.lastAnswer == "" && pupil.isAnswerForLastQuestionKnown == true) {
        alert("You can't set a mark because the pupil hasn't answered the question yet.");
        window.open("./answerquestionpage.html","_self");
        return false;
    }
}

function signIn() {

    // TODO: Implement checkElementIsEmpty function

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
    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.open("./askquestionpage.html","_self");
} 

function loadAskQuestionPage() {
    
    checkIsSignedIn();

    // TODO: Call in a loop 
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

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
        var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
        var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    }
    else {
        var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
        var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    }

    if (document.getElementById("textarea") != null)
        teacher.lastQuestion = document.getElementById("textarea").value.trim();

    if (teacher.lastQuestion == "") {
        alert("Please Fill Question Field");
        return false;
    }

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    sessionStorage.setItem("firstRunning", "false");
    window.open("./answerquestionpage.html","_self");
}

function loadAnswerQuestionPage() {

    checkIsSignedIn();

    checkIsQuestionAsked();

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (typeof teacher.lastSetMark == 'undefined') {
        document.getElementById("last-set-mark").innerHTML = "-";
    }
    else {
        // TODO: Load pupil marks
    }

    document.getElementById("question").innerHTML = teacher.lastQuestion;
}

function setTextareaMode(checkbox) {
    var textarea = document.getElementById("answer");

    if (checkbox.checked == true) {
        textarea.readOnly = false;
    }
    else {
        textarea.readOnly = true;
    }
}   

function answerQuestion() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    var checkbox = document.getElementById("switch");
    if (checkbox.checked == true) {
        pupil.isAnswerForLastQuestionKnown = true;
        // TODO: Implement answerQuestion() function
        pupil.lastAnswer = document.getElementById("answer").value;
    }
    else {
        pupil.isAnswerForLastQuestionKnown = false;
    }
    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.open("./setmarkpage.html","_self");
}

function loadSetMarkPage() {

    checkIsSignedIn();

    checkIsQuestionAnswered()

    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (typeof pupil.isAnswerForLastQuestionKnown == 'undefined') {
        window.open("./index.html","_self");
        // & first running !
    }
    else {
        if (pupil.isAnswerForLastQuestionKnown == true) {
            document.getElementById("answer").innerHTML = "Pupil answer is \"" + pupil.answer + "\"";
        }
        else {
            document.getElementById("answer").innerHTML = "The pupil doesn't know the answer";
        }
    }
}

function setMark() {
    if (document.getElementById("mark") != null)
        var mark = document.getElementById("mark").value.trim();

    if (isNaN(mark)) {
        alert("Please Input A Number");
        return false;
    }

    if (mark <= 1 || mark >= 10) {
        alert("Please Input A Mark (1 <= Mark >= 10)");
        return false;
    }

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    teacher.lastSetMark = mark;
    pupil.marks.push(mark);


    window.open("./askquestion.html","_self");
}