class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some hurdcoded tooltip text!';
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
        this.appendChild(tooltipIcon);
        console.log('The connectedCallback is invoked!')
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.appendChild(this._tooltipContainer);
    }

    _destroyTooltip() {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);