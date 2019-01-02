class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'Some hurdcoded tooltip text!';
        this.attachShadow({mode: 'open'}); // Attach shadow DOM to custom element
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }
                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 2px solid orange;
                }

                :host {
                    padding: 0.15rem;
                }

                :host(.component-syle) {
                    background-color: var(--color-primary, #ccc);
                    
                }

                :host-context(p) {
                    font-weight: bold;
                }

                .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default value</slot>
            <span class="icon">?</span>
        `;
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

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        if (oldValue === newValue) {
            return;
        }
        if(name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
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