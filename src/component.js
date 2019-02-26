export default (text = "Hello world777") => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};