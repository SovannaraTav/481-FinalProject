import Account from "./Account.js";

class UWStudent extends Account {
    // Private data attributes for the class
    #major;
    #interests = []; // Array of Interest objects

    // Class constructor
    constructor(accountId, firstName, lastName, profilePicture, bio, major) {
        super(accountId, firstName, lastName, profilePicture, bio);
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.major = major;
    }

    // Getter and setter for major private data attribute
    get major() {
        return this.#major;
    }
    set major(major) {
        this.#major = major;
    }

    // Functions for the interests private data attribute
    addToInterests(interestObject) {
        this.#interests.push(interestObject);
    }
    removeFromInterests(interestId) {
        let interestObjectIndexToRemove =
            this.#interests.findIndex(interest => interestId === interest.interestId);

        if (interestObjectIndexToRemove !== -1) {
            this.#interests.splice(interestObjectIndexToRemove, 1);
        }
    }

    /*
    Returns a JavaScript object of the instance of the class to work with the
    Supabase Database service
    */
    toObject() {
        // Implicity calls the getter functions from Account and this class
        return {
            studentId: this.accountId,
            major: this.major
        };
    }
}

// Exporting this class to be imported and used in other files
export default UWStudent;