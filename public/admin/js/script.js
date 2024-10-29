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
