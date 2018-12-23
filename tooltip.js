class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log('The constructor is invoked!')
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        this.appendChild(tooltipIcon);
        console.log('The connectedCallback is invoked!')
    }

    _showTooltip() {
        console.log('Event listner is working!')
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);