class Skill {
    // Private data attributes for the class
    #skillId;
    #alumniId;
    #skill;

    // Class constructor
    constructor(skillId, alumniId, skill) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.skillId = skillId;
        this.alumniId = alumniId;
        this.skill = skill;
    }

    // Getter and setter functions for skillId private data attribute
    get skillId() {
        return this.#skillId;
    }
    set skillId(skillId) {
        this.#skillId = skillId;
    }

    // Getter and setter functions for alumniId private data attribute
    get alumniId() {
        return this.#alumniId;
    }
    set alumniId(alumniId) {
        this.#alumniId = alumniId;
    }

    // Getter and setter functions for skill private data attribute
    get skill() {
        return this.#skill;
    }
    set skill(skill) {
        this.#skill = skill;
    }

    /*
    Returns a JavaScript object of the instance of the class to work with the 
    Supabase Database service
    */
    toObject() {
        // Implicity calls the getter functions
        return {
            /*
            Supabase Database will automatically fill the other data attributes
            that are comment out
            */
            // skillId: this.skillId,
            alumniId: this.alumniId,
            skill: this.skill
        };
    }
}

// Exporting this class to be imported and used in other files
export default Skill;