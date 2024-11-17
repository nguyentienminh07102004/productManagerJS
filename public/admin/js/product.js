// Change status
const buttonChangeStatusList = document.querySelectorAll(
	"[button-change-status]"
);
if (buttonChangeStatusList !== null && buttonChangeStatusList.length > 0) {
	const formChangeStatus = document.querySelector("#form-change-status");
	const path = formChangeStatus.getAttribute("data-path");
	buttonChangeStatusList.forEach((button) => {
		button.addEventListener("click", (evt) => {
			evt.preventDefault();
			const id = evt.target.getAttribute("data-id");
			const status = evt.target.getAttribute("data-status");
			const action = `${path}/${status}/${id}?_method=patch`;
			formChangeStatus.action = action;
			formChangeStatus.submit();
		});
	});
}
//End change status

// delete product
const buttonDeleteProduct = document.querySelectorAll("[button-delete]");
if (buttonDeleteProduct.length > 0) {
	buttonDeleteProduct.forEach((button) => {
		button.addEventListener("click", (e) => {
			if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
				const id = e.target.getAttribute("data-id");
				const formDeleteProduct =
					document.querySelector("#form-delete-item");
				formDeleteProduct.action =
					formDeleteProduct.getAttribute("data-path") +
					`/${id}?_method=DELETE`;
				formDeleteProduct.submit();
			}
		});
	});
}
