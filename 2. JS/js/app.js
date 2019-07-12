function User(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;
}

User.prototype.sayHi = function() {
    alert( `Hello, i'm ${self.firstName} ${self.lastName}` );
};

function Teacher(firstName, lastName) {

    User.call(this, firstName, lastName);

    this.lastQuestion = null;
    this.lastSetMark = -1;
}
Teacher.prototype = Object.create(User.prototype);
Teacher.prototype.constructor = Teacher;

function Pupil(firstName, lastName) {

    User.call(this, firstName, lastName);

    this.isAnswerForLastQuestionKnown = null;
    this.isUnansweredQuestion = true; // variable is used to check if the "set mark" page can be loaded
    this.lastAnswer = null;
    this.marks = [];

}
Pupil.prototype = Object.create(User.prototype);
Pupil.prototype.constructor = Pupil;

// --------------- --------------- --------------- --------------- --------------- --------------- ---------------

function checkIsSignedIn() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    if (teacher == undefined) {
        alert("Please Sign In");
        window.location = "index.html";
        return false;
    }
}

function checkIsQuestionAsked() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    if (teacher.lastQuestion == null) {
        alert("You can't answer the question because the question isn't exist.");
        window.location = "askquestionpage.html";
        return false;
    }
}

function checkIsQuestionAnswered() {
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (pupil.isUnansweredQuestion == true) {
        alert("You can't set a mark because the pupil hasn't answered the question yet.");
        window.location = "answerquestionpage.html";
        return false;
    }
}

function checkIsElementValueEmpty(element) {
    if (element != null)
        return element.value.trim();
}

function signIn() {
    var teacherFirstName = checkIsElementValueEmpty(document.getElementById("teacher-first-name"));
    var teacherLastName = checkIsElementValueEmpty(document.getElementById("teacher-last-name"));

    if (teacherFirstName == "" || teacherLastName == "") {
        alert("Please Fill Teacher Name");
        return false;
    }

    var pupilFirstName = checkIsElementValueEmpty(document.getElementById("pupil-first-name"));
    var pupilLastName = checkIsElementValueEmpty(document.getElementById("pupil-last-name"));

    if (pupilFirstName == "" || pupilLastName == "") {
        alert("Please Fill Pupil Name");
        return false;
    }

    var teacher = new Teacher(teacherFirstName, teacherLastName);
    var pupil = new Pupil(pupilFirstName, pupilLastName);
    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "askquestionpage.html";
} 

function loadAskQuestionPage() {

    checkIsSignedIn();

    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    if (pupil.marks.length == 0) {
        document.getElementById("marks-list").value = "You don't have marks!";
    }
    else {
        document.getElementById("marks-list").value = pupil.marks.join(', ');

    }
}   

function askQuestion() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    teacher.lastQuestion = checkIsElementValueEmpty(document.getElementById("textarea"));

    if (teacher.lastQuestion == "") {
        alert("Please Fill Question Field");
        return false;
    }

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "answerquestionpage.html";
}

function loadAnswerQuestionPage() {
    
    checkIsSignedIn();

    checkIsQuestionAsked();

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));

    document.getElementById("last-set-mark").innerHTML = (teacher.lastSetMark == -1) ? "-" : teacher.lastSetMark; 
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
        pupil.lastAnswer = document.getElementById("answer").value;
    }
    else {
        pupil.isAnswerForLastQuestionKnown = false;
    }

    teacher.lastQuestion = null;
    pupil.isUnansweredQuestion = false;

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "setmarkpage.html";
}

function loadSetMarkPage() {
    checkIsSignedIn();

    checkIsQuestionAnswered()

    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    
    document.getElementById("answer").innerHTML = (pupil.isAnswerForLastQuestionKnown == true) ? "Pupil answer is \"" + pupil.lastAnswer + "\"" : "The pupil doesn't know the answer";    
}

function setMark() {
    var mark = checkIsElementValueEmpty(document.getElementById("mark"));

    if (isNaN(mark)) {
        alert("Please Input A Number");
        return false;
    }

    if (mark < 1 || mark > 10) {
        alert("Please Input A Mark (1 <= Mark >= 10)");
        return false;
    }

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    teacher.lastSetMark = mark;
    pupil.lastAnswer = null;
    pupil.isUnansweredQuestion = true;
    pupil.marks.push(mark);

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "askquestionpage.html";
}