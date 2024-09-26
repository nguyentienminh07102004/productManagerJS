module.exports = (query) => {
	let filterStatus = [
		{
			name: "Tất cả",
			status: "",
			active: ""
		},
		{
			name: "Hoạt động",
			status: "active",
			active: ""
		},
		{
			name: "Dừng hoạt động",
			status: "inactive",
			active: ""
		}
	];
	if(query.status) {
		const index = filterStatus.findIndex(item => item.status == query.status);
		if(index >= 0) filterStatus[index].active = "active";
	} else {
		const index = filterStatus.findIndex(item => item.status == "");
		filterStatus[index].active = "active";	
	}
	return filterStatus;
}