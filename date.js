exports.getDate = ()=>{
	const today = new Date();
	const option = {
		day: "numeric",
		month:"long",
		year: "numeric",
		weekday: "long"
	}

	return today.toLocaleDateString('en-US',option);
};

exports.getDay = ()=>{
	const today = new Date();
	const option = {
		weekday: "long"
	}

	return today.toLocaleDateString('en-US',option);
};