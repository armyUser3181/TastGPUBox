
export class HelloWorld {
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
}

export default HelloWorld;