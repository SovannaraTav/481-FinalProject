class Experience {
    // Private data attributes for the class
    #experienceId;
    #alumniId;
    #jobTitle;
    #jobType;
    #field;
    #company;
    #location;
    #startDate;
    #endDate;
    #description;

    // Class constructor
    constructor(experienceId, alumniId, jobTitle, jobType, field, 
        company, location, startDate, endDate, description) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.experienceId = experienceId;
        this.alumniId = alumniId;
        this.jobTitle = jobTitle;
        this.jobType = jobType;
        this.field = field;
        this.company = company;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    // Getter and setter functions for experienceId private data attribute
    get experienceId() {
        return this.#experienceId;
    }
    set experienceId(experienceId) {
        this.#experienceId = experienceId;
    }

    // Getter and setter functions for alumniId private data attribute
    get alumniId() {
        return this.#alumniId;
    }
    set alumniId(alumniId) {
        this.#alumniId = alumniId;
    }

    // Getter and setter functions for jobTitle private data attribute
    get jobTitle() {
        return this.#jobTitle;
    }
    set jobTitle(jobTitle) {
        this.#jobTitle = jobTitle;
    }

    // Getter and setter functions for jobType private data attribute
    get jobType() {
        return this.#jobType;
    }
    set jobType(jobType) {
        this.#jobType = jobType;
    }

    // Getter and setter functions for field private data attribute
    get field() {
        return this.#field;
    }
    set field(field) {
        this.#field = field;
    }

    // Getter and setter functions for company private data attribute
    get company() {
        return this.#company;
    }
    set company(company) {
        this.#company = company;
    }

    // Getter and setter functions for location private data attribute
    get location() {
        return this.#location;
    }
    set location(location) {
        this.#location = location;
    }

    // Getter and setter functions for startDate private data attribute
    get startDate() {
        return this.#startDate;
    }
    set startDate(startDate) {
        this.#startDate = startDate;
    }

    // Getter and setter functions for endDate private data attribute
    get endDate() {
        return this.#endDate;
    }
    set endDate(endDate) {
        this.#endDate = endDate;
    }

    // Getter and setter functions for description private data attribute
    get description() {
        return this.#description;
    }
    set description(description) {
        this.#description = description;
    }

    /*
    Returns a JavaScript object of the instance of the class to work with the 
    Supabase Database service
    */
    toObject() {
        // Implicity calls the getter functions
        return {
            experienceId: this.experienceId,
            alumniId: this.alumniId,
            jobTitle: this.jobTitle,
            jobType: this.jobType,
            field: this.field,
            company: this.company,
            location: this.location,
            startDate: this.startDate,
            endDate: this.endDate,
            description: this.description
        };
    }
}

// Exporting this class to be imported and used in other files
export default Experience;