import Account from "./Account.js";

class UWAlumni extends Account {
    // Private data attributes for the class
    #currentJobTitle;
    #currentField;
    #currentCompany;
    #experiences; // Array of Experience objects
    #skills; // Array of Skill objects

    // Class constructor
    constructor(accountId, firstName, lastName, emailAddress, password, 
        profilePicture, bio, currentJobTitle, currentField, currentCompany) {
        super(accountId, firstName, lastName, 
            emailAddress, password, profilePicture, bio);
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.currentJobTitle = currentJobTitle;
        this.currentField = currentField;
        this.currentCompany = currentCompany;
    }

    // Getter and setter functions for currentJobTitle private data attribute
    get currentJobTitle() {
        return this.#currentJobTitle;
    }
    set currentJobTitle(currentJobTitle) {
        this.#currentJobTitle = currentJobTitle;
    }

    // Getter and setter functions for currentField private data attribute
    get currentField() {
        return this.#currentField;
    }
    set currentField(currentField) {
        this.#currentField = currentField;
    }

    // Getter and setter functions for currentCompany private data attribute
    get currentCompany() {
        return this.#currentCompany;
    }
    set currentCompany(currentCompany) {
        this.#currentCompany = currentCompany;
    }

    // Functions for the experiences private data attribute
    addToExperiences(experienceObject) {
        this.#experiences.push(experienceObject);
    }
    removeFromExperiences(experienceId) {
        let experienceObjectIndexToRemove = 
            this.#experiences.findIndex(experience => experienceId === experience.experienceId);

        if (experienceObjectIndexToRemove !== -1) {
            this.#experiences.splice(experienceObjectIndexToRemove, 1);
        }
    }

    // Functions for the skills private data attribute
    addToSkills(skillObject) {
        this.#skills.push(skillObject);
    }
    removeFromSkills(skillId) {
        let skillObjectIndexToRemove = 
            this.#skills.findIndex(skill => skillId === skill.skillId);

        if (skillObjectIndexToRemove !== -1) {
            this.#skills.splice(skillObjectIndexToRemove, 1);
        }
    }
}

// Exporting this class to be imported and used in other files
export default UWAlumni;