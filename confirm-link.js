class ConfirmLink extends HTMLAnchorElement {
    connectedCallback(){
        this.addEventListener('click', event => {
            if(!confirm('Do you really wont to leave?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('keepit-confirm-link', ConfirmLink, {extends: 'a'});