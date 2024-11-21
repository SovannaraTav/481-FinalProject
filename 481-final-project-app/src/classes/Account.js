class Account {
    // Private data attributes for the class
    #accountId;
    #firstName;
    #lastName;
    #profilePicture;
    #bio;

    // Class constructor
    constructor(accountId, firstName, lastName, profilePicture, bio) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.accountId = accountId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }

    // Getter and setter functions for accountId private data attribute
    get accountId() {
        return this.#accountId;
    }
    set accountId(accountId) {
        this.#accountId = accountId;
    }

    // Getter and setter functions for firstName private data attribute
    get firstName() {
        return this.#firstName;
    }
    set firstName(firstName) {
        this.#firstName = firstName;
    }

    // Getter and setter functions for lastName private data attribute
    get lastName() {
        return this.#lastName;
    }
    set lastName(lastName) {
        this.#lastName = lastName;
    }

    // Getter and setter functions for profilePicture private data attribute
    get profilePicture() {
        return this.#profilePicture;
    }
    set profilePicture(profilePicture) {
        this.#profilePicture = profilePicture;
    }

    // Getter and setter functions for bio private data attribute
    get bio() {
        return this.#bio;
    }
    set bio(bio) {
        this.#bio = bio;
    }
    
    /*
    Returns a JavaScript object of the instance of the class to work with the 
    Supabase Database service
    */
    toObject() {
        // Implicity calls the getter functions
        return {
            accountId: this.accountId,
            firstName: this.firstName,
            lastName: this.lastName,
            profilePicture: this.profilePicture,
            bio: this.bio
        };
    }
}

// Exporting this class to be imported and used in other files
export default Account;