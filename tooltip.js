class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log('The constructor is invoked!')
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        this.appendChild(tooltipIcon);
        console.log('The connectedCallback is invoked!')
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);