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
        if (pupil.marks(mark)) {
                lastSetMark = mark;
                return true;
        }
        else{
            return false;
        }
    }
}

function Pupil(firstName, lastName) {

    User.apply(this, arguments);

    var isAnswerForLastQuestionKnown = null;
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
        if (lastAnswer != null) {
            if (isNaN(mark)) {
                alert("Please Input A Number");
                return false;
            }
            if (mark < 1 || mark > 10) {
                alert("Please Input A Mark (1 <= Mark >= 10)");
                return false;
            }
            marks.push(mark);
            lastAnswer = null;
            return true;
        }
        else
            return false;
    }

    this.answerQuestion = function(isAnswerKnown, answer) {
        if (lastQuestion != null) {
            this.isAnswerForLastQuestionKnown(isAnswerKnown);
            lastQuestion = null;
            if (isAnswerKnown)
                lastAnswer = answer;
            else 
                lastAnswer = "";
            return true;
        }
        return false;   
    }
}

// --------------- --------------- --------------- --------------- --------------- --------------- ---------------

function loadIndexPage() {
    // TODO: Rewrite!
    document.getElementById("sign-in-page").style.display = "none";
    document.getElementById("ask-question-page").style.display = "none";
    document.getElementById("answer-question-page").style.display = "none";
    document.getElementById("set-mark-page").style.display = "none";
    if (window.teacher == undefined) {
        document.getElementById("sign-in-page").style.display = "flex";
        window.isUnansweredQuestion = null;
    }
    else {
        if (window.isUnansweredQuestion != null && window.isUnansweredQuestion) {
            loadSetMarkPage();
        }
        else {
            if (window.pupil.lastQuestion() != null) {
                loadAnswerQuestionPage();
            }
            else {
                loadAskQuestionPage();
            }
        }
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

    window.teacher = new Teacher(teacherFirstName, teacherLastName);
    window.pupil = new Pupil(pupilFirstName, pupilLastName);
    loadIndexPage();
} 

function loadAskQuestionPage() {
    document.getElementById("ask-question-page").style.display = "flex";
    if (window.pupil.marks().length == 0) {
        document.getElementById("marks-list").value = "You don't have marks!";
    }
    else {
        document.getElementById("marks-list").value = pupil.marks().join(', ');
    }

    // A dumb thing to show sayHi() function working
    window.teacher.sayHi();
    window.pupil.sayHi();
}   

function askQuestion() {
    question = checkIsElementValueEmpty(document.getElementById("textarea"));

    if (question == "") {
        alert("Please Fill Question Field");
        return false;
    }

    window.teacher.askQuestion(pupil, question);
    loadIndexPage();
}

function loadAnswerQuestionPage() {
    document.getElementById("answer-question-page").style.display = "flex";

    document.getElementById("last-set-mark").innerHTML = (window.teacher.getLastSetMark() == false) ? "-" : window.teacher.getLastSetMark(); 
    document.getElementById("question").innerHTML = window.pupil.lastQuestion();
}

function setTextareaMode(checkbox) {
    var textarea = document.getElementById("pupil-answer");

    if (checkbox.checked == true) {
        textarea.readOnly = false;
    }
    else {
        textarea.readOnly = true;
    }
}   

function answerQuestion() {
    var checkbox = document.getElementById("switch");

    if (checkbox.checked == true) {
        window.pupil.answerQuestion(true, document.getElementById("pupil-answer").value);
    }
    else {
        window.pupil.answerQuestion(false);
    }
    window.isUnansweredQuestion = true;
    loadIndexPage();
}

function loadSetMarkPage() {
    document.getElementById("set-mark-page").style.display = "flex";
    
    document.getElementById("pupil-answer-for-mark").innerHTML = (window.pupil.isAnswerForLastQuestionKnown() == true) ? 
        "Pupil answer is \"" + window.pupil.getLastAnswer() + "\"" : "The pupil doesn't know the answer";    
}

function setMark() {
    var mark = checkIsElementValueEmpty(document.getElementById("mark"));

    window.teacher.setMark(window.pupil, mark);
    window.isUnansweredQuestion = false;

    loadIndexPage();
}