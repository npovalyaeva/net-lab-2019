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

    if (teacherFirstName == "" || teacherLastName == "")
    {
        alert("Please Fill Teacher Name");
        return false;
    }

    if (document.getElementById("pupil-first-name") != null)
        var pupilFirstName = document.getElementById("pupil-first-name").value.trim();

    if (document.getElementById("pupil-last-name") != null)
        var pupilLastName = document.getElementById("pupil-last-name").value.trim();

    if (pupilFirstName == "" || pupilLastName == "")
    {
        alert("Please Fill Pupil Name");
        return false;
    }

    var teacher = new Teacher(teacherFirstName, teacherLastName);
    var pupil = new Pupil(pupilFirstName, pupilLastName);
    sessionStorage.setItem("teacherObject", JSON.stringify(teacher));
    sessionStorage.setItem("pupilObject", JSON.stringify(pupil));
    window.open("./askquestionpage.html","_self");
} 

function askQuestion() {
 
    var teacher = JSON.parse(sessionStorage.getItem("teacherObject"));
    var pupil = JSON.parse(sessionStorage.getItem("pupilObject"));

    if (document.getElementById("textarea") != null)
        var question = document.getElementById("textarea").value.trim();

    if (question == "")
        {
            alert("Please Fill Question Field");
            return false;
        }
    alert(question);
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
