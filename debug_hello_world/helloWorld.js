
export class HelloWorld {
    /** @type {HTMLParagraphElement} p @type {string} text */
    p; text;

    /** @param {string} [text] */
    constructor(text = "hello world") {
        this.p = document.createElement("p");
        this.p.textContent = text;
        this.text = text;
        this.p.style.fontSize = "30px";
        this.p.style.position = "fixed";
        this.p.style.left = "50%";
        this.p.style.top = "50%";
        this.p.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(this.p);
    }
    
    /** @returns {string} */
    getMessage() {
        return this.text;
    }
    
    /** @param {string} text */
    setText(text) {
        this.text = text;
        this.p.textContent = text;
    }
    
    destroy() {
        this.p.remove();
    }
    
}

export default HelloWorld;