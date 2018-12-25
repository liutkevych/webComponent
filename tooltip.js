class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some hurdcoded tooltip text!';
        this.attachShadow({mode: 'open'}); // Attach shadow DOM to custom element
    }

    // Only in this place we can place our element in DOM
    connectedCallback() {
        if (this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._destroyTooltip.bind(this));
        // Append new element to shadow DOM
        this.shadowRoot.appendChild(tooltipIcon); 
        console.log('The connectedCallback is invoked!')
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _destroyTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);