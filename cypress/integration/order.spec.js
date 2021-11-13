describe('Lambda Eats App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    const nameInput = () => cy.get('input[name=name]');
    const pepperoniInput = () => cy.get('input[name=pepperoni');
    const baconInput = () => cy.get('input[name=bacon]');
    const sizeInput = () => cy.get('select[id="size-dropdown"]');
    const sauceInput = () => cy.get('input[type=radio]');
    const submitBtn = () => cy.get('button[id="order-button"]')

    it('cypress functionality tests', () => {
        expect(2 + 2).to.equal(4);
        expect(1 + 1).not.to.equal(6);
    })

    describe('page functionality', () => {
        it('Can add text to the box', () => {
            nameInput()
                .type('testing1')
                .should('have.value', 'testing1');
        })
        it('can select multiple toppings', () => {
            pepperoniInput().check().should('be.checked');
            baconInput().check().should('be.checked');
        })
    })
    describe('page submission', () => {
        it('can submit page', () => {
            nameInput().type('asdf');
            sizeInput().select('medium');
            sauceInput().first().check();
            submitBtn().click();
        })
    })
})