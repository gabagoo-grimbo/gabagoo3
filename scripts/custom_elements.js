function defineElementsFromJson(path) {
    fetch(path)
        .then(r => r.json())
        .then(json => {
            for (const [elementName, path] of Object.entries(json)) {
                console.log(`${elementName}: ${path}`);
                defineElementFromFile(elementName,path);
            }
        });
}

function defineElementFromFile(name,path) {
    fetch(path)
        .then(r => r.text())
        .then(text => defineElementFromHtml(name,text));
}

function defineElementFromHtml(name,html) {
    customElements.define(name, class extends HTMLElement {
        constructor() {
            super();
            const template = document.createElement("template");
            template.innerHTML = html;
            const shadow = this.attachShadow({mode: "open"});
            shadow.append(template.content.cloneNode(true));
            //this.innerHTML = html;
        }
    });
}