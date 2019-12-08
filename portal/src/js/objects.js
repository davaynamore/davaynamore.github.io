const user = {
	name: 'Sergey',
	age: 20,
	group: {
		student_1: 'Yulia',
		student_2: 'Tanya',
		student_3: 'Vova'
	},
	children: ['Yarik', 'Karina'],
	getAge: function(){
		return this.age;
	}
}

export default user;

function User(name, age) {
	this.name = name;
	this.age = age;
}

User.prototype.getAge = function () {
	return this.age;
}

const sergey = new User('Sergey', '37');
const vova = new User('Vova', '27');


export { sergey, vova };