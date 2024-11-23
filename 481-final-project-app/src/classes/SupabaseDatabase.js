import supabase from "../../supabaseConfig.js";

class SupabaseDatabase {
    // Private data attributes for the class
    #tables = [];

    // Class constructor
    constructor() {
        this.#tables =
            ["accounts", "uw_students", "uw_alumni", "messages",
            "interests", "experiences", "skills"];
    }

    // Functions for the tables private data attribute
    addNewTableToTables(tableName) {
        // Ensuring a duplicate table name isn't added to the tables list
        if (this.#tables.includes(tableName)) {
            console.error(`${tableName} already exists in the tables list`);
            return false;
        }

        this.#tables.push(tableName);
        return true;
    }
    removeTableFromTables(tableName) {
        // Ensuring the table exists in the tables list before removing
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        this.#tables.splice(tableName, 1);
        return true;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/insert

    Handles the process of creating a new record to the specified table from a
    JavaScript object that will automatically map to each table column and assign
    its corresponding value with the Supabase Database service
    */
    async createRecordToTable(tableName, dataObject) {
        /*
        Ensuring the table exists in the tables list before creating a new record
        to the specified table
        */
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        const { data, error } = await supabase
            .from(tableName)
            .insert([dataObject]);

        /*
        Returns the error object and its associated information for an unsuccessful
        creation of a new record process
        */
        if (error) {
            console.error(
                `Creating record to ${tableName} unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful
        creation of a new record process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/select

    Handles the process of reading an existing record in the specified table from
    the primary key's column and its corresponding value with the Supabase Database
    service
    */
    async readRecordFromTable(tableName, primaryKeyColumn, primaryKeyColumnValue) {
        /*
        Ensuring the table exists in the tables list before reading an existing
        record from the specified table
        */
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        const { data, error } = await supabase
            .from(tableName)
            .select("*")
            .eq(primaryKeyColumn, primaryKeyColumnValue);

        /*
        Returns the error object and its associated information for an unsuccessful
        reading of an existing record process
        */
        if (error) {
            console.error(
                `Reading record from ${tableName} unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful
        reading of an existing record process
        */
        return { data };
    }

    async readTable(tableName) {
        /*
        Ensuring the table exists in the tables list before reading an existing
        record from the specified table
        */
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        const { data, error } = await supabase
            .from(tableName)
            .select("*")

        /*
        Returns the error object and its associated information for an unsuccessful
        reading of an existing record process
        */
        if (error) {
            console.error(
                `Reading record from ${tableName} unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful
        reading of an existing record process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/insert

    Handles the process of updating an existing record in the specified table from
    a JavaScript object that will automatically map to each table column and assign
    its corresponding updated value alongside the primary key's column, and its
    corresponding value with the Supabase Database service
    */
    async updateRecordFromTable(
        tableName, dataObject, primaryKeyColumn, primaryKeyColumnValue) {
        /*
        Ensuring the table exists in the tables list before updating an existing
        record in the specified table
        */
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        const { data, error } = await supabase
            .from(tableName)
            .update(dataObject)
            .eq(primaryKeyColumn, primaryKeyColumnValue)
            .select();

        /*
        Returns the error object and its associated information for an unsuccessful
        update of an existing record process
        */
        if (error) {
            console.error(
                `Updating record in ${tableName} unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful
        update of an existing record process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/delete

    Handles the process of deleting an existing record from the specified table from
    the primary key's column and its corresponding value with the Supabase Database
    service
    */
    async deleteRecordFromTable(tableName, primaryKeyColumn, primaryKeyColumnValue) {
        /*
        Ensuring the table exists in the tables list before deleting an existing
        record from the specified table
        */
        if (!this.#tables.includes(tableName)) {
            console.error(`${tableName} doesn't exist in the tables list`);
            return false;
        }

        const response = await supabase
            .from(tableName)
            .delete()
            .eq(primaryKeyColumn, primaryKeyColumnValue);

        // Returns the response object and its associated information
        return response;
    }
}

// Exporting this class to be imported and used in other files
export default SupabaseDatabase;