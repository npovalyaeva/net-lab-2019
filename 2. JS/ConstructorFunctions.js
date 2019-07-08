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
