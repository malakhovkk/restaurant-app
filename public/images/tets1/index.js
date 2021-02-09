module.exports = function({ participants, sports }) {
	/**  
     * Подобно оператору new создает экземпляр объекта,  
     * используя функцию-конструктор и параметры для нее  
     */

	function constructFrom(fnConstructor, ...params) {
		const res = {};

		//fnConstructor.bind(res).apply(params);

		//Object.setPrototypeOf(res, fnConstructor.apply(params));
		//Object.setPrototypeOf(res, fnConstructor.bind(...params));
		//console.log(params);
		let a = fnConstructor(params);
		return a;
	}

	/**  
     * Создает пары вида [’вид спорта’, ’имя участника’],  
     * где первому виду спорта соответствует последний участник  
     */

	function assignParicipants() {
		const participants = this.participants;
		const sports = this.sports;
		const orderIndexes = [];
		let res = [];

		paricipants.forEach((el, i) => {
			res.push(el, sports[sports.length - 1 - i]);
		});
		return res;
	}

	function Contest(arr) {
		console.log(arr);
		let [ participants, sports ] = arr;
		this.participants = participants;
		this.sports = sports;
	}

	Contest.prototype.assignParicipants = assignParicipants;
	//console.log(participants, sports);
	const contest = constructFrom(Contest, participants, sports);
	//console.log(contest);
	return contest.assignParicipants();
};
