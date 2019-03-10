export default (text = "Hello world777") => {
    const element = document.createElement("div");

    element.className = "pure-button";
    element.innerHTML = text;

    return element;
};
