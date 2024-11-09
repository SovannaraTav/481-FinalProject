class Skill {
    // Private data attributes for the class
    #skillId;
    #skill;

    // Class constructor
    constructor(skillId, skill) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.skillId = skillId;
        this.skill = skill;
    }

    // Getter and setter functions for skillId private data attribute
    get skillId() {
        return this.#skillId;
    }
    set skillId(skillId) {
        this.#skillId = skillId;
    }

    // Getter and setter functions for skill private data attribute
    get skill() {
        return this.#skill;
    }
    set skill(skill) {
        this.#skill = skill;
    }
}

// Exporting this class to be imported and used in other files
export default Skill;