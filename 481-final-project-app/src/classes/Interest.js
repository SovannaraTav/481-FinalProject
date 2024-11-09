class Interest {
    // Private data attributes for the class
    #interestId;
    #interestType;
    #interest;

    // Class constructor
    constructor(interestId, interestType, interest) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.interestId = interestId;
        this.interestType = interestType;
        this.interest = interest;
    }

    // Getter and setter functions for interestId private data attribute
    get interestId() {
        return this.#interestId;
    }
    set interestId(interestId) {
        this.#interestId = interestId;
    }

    // Getter and setter functions for interestType private data attribute
    get interestType() {
        return this.#interestType;
    }
    set interestType(interestType) {
        this.#interestType = interestType;
    }

    // Getter and setter functions for interest private data attribute
    get interest() {
        return this.#interest;
    }
    set interest(interest) {
        this.#interest = interest;
    }
}

// Exporting this class to be imported and used in other files
export default Interest;