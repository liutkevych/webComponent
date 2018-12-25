class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some hurdcoded tooltip text!';
        this.attachShadow({mode: 'open'}); // Attach shadow DOM to custom element
        const template = document.querySelector('#tooltip-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Only in this place we can place our element in  real DOM
    connectedCallback() {
        if (this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._destroyTooltip.bind(this));
        // Append new element to shadow DOM
        this.shadowRoot.appendChild(tooltipIcon); 
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.background = 'grey';
        this._tooltipContainer.style.position = 'absolute';
        this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _destroyTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);