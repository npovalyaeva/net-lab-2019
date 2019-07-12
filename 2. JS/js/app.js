function User(firstName, lastName) {

    this.firstName = firstName;
    this.lastName = lastName;

    this.sayHi = function() {
        alert( `Hello, i'm ${this.firstName} ${this.lastName}` );
    };
}

function Teacher(firstName, lastName) {

    User.apply(this, arguments);

    var lastSetMark = -1;

    this.getLastSetMark = function() {
        if (lastSetMark == -1)
            return false;
        return lastSetMark;
    }

    this.askQuestion = function(pupil, question) {
        pupil.lastQuestion(question);
    }

    this.setMark = function(pupil, mark) {
        if (pupil.lastAnswer != null)
        {
            if (pupil.marks(mark)) {
                lastSetMark = mark;
                pupil.lastAnswer(null);
                return true;
            }
            return false;
        }
        return false;
    }
}

function Pupil(firstName, lastName) {

    User.apply(this, arguments);

    var isAnswerForLastQuestionKnown = null;
    var isUnansweredQuestion = true; // variable is used to check if the "set mark" page can be loaded
    var lastQuestion = null;
    var lastAnswer = null;
    var marks = [];

    this.isAnswerForLastQuestionKnown = function(flag) {
        //getter
        if (!arguments.length) return isAnswerForLastQuestionKnown;

        //setter
        // TODO: connect a library :)
        if (typeof(flag) !== "boolean") {
            alert("Please Input A Boolean Value");
            return false;     
        }
        isAnswerForLastQuestionKnown = flag;
    }

    this.isUnansweredQuestion = function(flag) {
        //getter
        if (!arguments.length) return isUnansweredQuestion;

        //setter
        // TODO: connect a library :)
        if (typeof(flag) !== "boolean") {
            alert("Please Input A Boolean Value");
            return false;     
        }
        isUnansweredQuestion = flag;
    }

    this.lastQuestion = function(question) {
        //getter
        if (!arguments.length) return lastQuestion;

        //setter
        lastQuestion = question;
    }
    
    this.getLastAnswer = function() {
        return lastAnswer;
    }

    this.marks = function(mark) {
        // getter
        if (!arguments.length) return marks;

        // setter
        if (isNaN(mark)) {
            alert("Please Input A Number");
            return false;
        }
        if (mark < 1 || mark > 10) {
            alert("Please Input A Mark (1 <= Mark >= 10)");
            return false;
        }
        marks.push(mark);
        return true;
    }

    this.answerQuestion = function(isAnswerKnown, answer) {
        if (lastQuestion != null) {
            this.isAnswerForLastQuestionKnown(isAnswerKnown);
            lastAnswer = answer;
            lastQuestion = null;
            return true;
        }
        return false;   
    }
}

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
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (pupil.lastQuestion() == null) {
        alert("You can't answer the question because the question isn't exist.");
        window.location = "askquestionpage.html";
        return false;
    }
}

function checkIsQuestionAnswered() {
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    if (pupil.isUnansweredQuestion() == true) {
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
    sessionStorage.setItem("teacherObject", teacher);
    sessionStorage.setItem("pupilObject", pupil);
    window.location = "askquestionpage.html";
} 

function loadAskQuestionPage() {

    checkIsSignedIn();

    var teacherItem = sessionStorage.getItem("teacherObject");
    var pupilItem = sessionStorage.getItem("pupilObject");

    //!!!!!!!!!!!!!!!!!!!!!!!!
    //var teacher = new Teacher(teacherItem.firstName, teacherItem.lastName);

    if (pupil.marks().length == 0) {
        document.getElementById("marks-list").value = "You don't have marks!";
    }
    else {
        document.getElementById("marks-list").value = pupil.marks().join(', ');
    }

    // Dumb thing to show sayHi() function working
    teacher.sayHi();
    pupil.sayHi();
}   

function askQuestion() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    question = checkIsElementValueEmpty(document.getElementById("textarea"));

    if (question == "") {
        alert("Please Fill Question Field");
        return false;
    }

    teacher.askQuestion(pupil, "");

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "answerquestionpage.html";
}

function loadAnswerQuestionPage() {
    
    checkIsSignedIn();

    checkIsQuestionAsked();

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    document.getElementById("last-set-mark").innerHTML = (teacher.getLastSetMark() == -1) ? "-" : teacher.getLastSetMark(); 
    document.getElementById("question").innerHTML = pupil.lastQuestion();
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

// !!!!!
function answerQuestion() {
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    var checkbox = document.getElementById("switch");
    if (checkbox.checked == true) {
        pupil.isAnswerForLastQuestionKnown() = true;
        pupil.lastAnswer() = document.getElementById("answer").value;
    }
    else {
        pupil.isAnswerForLastQuestionKnown() = false;
    }

    pupil.lastQuestion() = null;
    pupil.isUnansweredQuestion() = false;

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "setmarkpage.html";
}

function loadSetMarkPage() {
    checkIsSignedIn();

    checkIsQuestionAnswered()

    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));
    
    document.getElementById("answer").innerHTML = (pupil.isAnswerForLastQuestionKnown() == true) ? "Pupil answer is \"" + pupil.lastAnswer() + "\"" : "The pupil doesn't know the answer";    
}

function setMark() {
    var mark = checkIsElementValueEmpty(document.getElementById("mark"));

    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    teacher.SetMark(mark);
    pupil.lastAnswer() = null;
    pupil.isUnansweredQuestion() = true;

    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.location = "askquestionpage.html";
}