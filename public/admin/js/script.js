const buttonStatus = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);
if (buttonStatus) {
	buttonStatus.forEach((button) => {
		button.addEventListener("click", () => {
			const status = button.getAttribute("button-status");
			if (status) url.searchParams.set("status", status);
			else url.searchParams.delete("status");
			window.location.href = url.href;
		});
	});
}

const formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const keyword = evt.target[0].value;
	if (keyword) url.searchParams.set("title", keyword);
	else url.searchParams.delete("title");
	window.location.href = url.href;
});

// pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination != null) {
	buttonPagination.forEach((button) =>
		button.addEventListener("click", (evt) => {
			const value = evt.target.getAttribute("button-pagination");
			url.searchParams.set("page", parseInt(value));
			window.location.href = url.href;
		})
	);
}
// End pagination
// Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
	const checkboxCheckAll = checkboxMulti.querySelector(
		"input[name=checkall]"
	);
	const checkboxesIds = checkboxMulti.querySelectorAll("input[name=id]");
	checkboxCheckAll.addEventListener("click", (evt) => {
		checkboxesIds.forEach(
			(checkbox) => (checkbox.checked = evt.target.checked)
		);
	});
	checkboxesIds.forEach((checkbox) => {
		checkbox.addEventListener("click", () => {
			checkboxCheckAll.checked =
				checkboxMulti.querySelectorAll("input[name=id]:checked")
					.length === checkboxesIds.length;
		});
	});
}
// change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
	formChangeMulti.addEventListener("submit", (evt) => {
		evt.preventDefault();
		const checkboxesIds = checkboxMulti.querySelectorAll(
			"input[name=id]:checked"
		);
		let values = [];
		if (evt.target.elements.status.value === "change-position") {
			checkboxesIds.forEach((input) => {
				const position =
					input.parentElement.parentElement.querySelector(
						"input[name=position]"
					).value;
				values.push(`${input.value}-${position}`);
			});
		} else {
			checkboxesIds.forEach((checkbox) => values.push(checkbox.value));
		}
		formChangeMulti.querySelector("input[name=ids]").value =
			values.join(" ");
		formChangeMulti.submit();
	});
}
