class Interest {
    // Private data attributes for the class
    #interestId;
    #studentId;
    #interestType;
    #interest;

    // Class constructor
    constructor(interestId, studentId, interestType, interest) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.interestId = interestId;
        this.studentId = studentId;
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

    // Getter and setter functions for studentId private data attribute
    get studentId() {
        return this.#studentId;
    }
    set studentId(studentId) {
        this.#studentId = studentId;
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

    /*
    Returns a JavaScript object of the instance of the class to work with the
    Supabase Database service
    */
    toObject() {
        // Implicity calls the getter functions
        return {
            //interestId: this.interestId,
            interestType: this.interestType,
            interest: this.#interest,
            studentId: this.studentId
        };
    }
}

// Exporting this class to be imported and used in other files
export default Interest;