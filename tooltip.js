class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipIcon;
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
                    position: relative;
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
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._destroyTooltip.bind(this));

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

    disconnectedCallback() {
        console.log('Disconnected!');
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._destroyTooltip);

    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _destroyTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('keepit-tooltip-ui1', Tooltip);