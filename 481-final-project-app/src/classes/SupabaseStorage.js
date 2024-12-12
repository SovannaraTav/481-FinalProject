import supabase from "../../supabaseConfig.js";

class SupabaseStorage {
    // Private data attributes for the class
    #bucketName;

    // Class constructor
    constructor(bucketName) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.bucketName = bucketName;
    }

    // Getter and setter functions for bucketName private data attribute
    get bucketName() {
        return this.#bucketName;
    }
    set bucketName(bucketName) {
        this.#bucketName = bucketName;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-getuser

    Handles the process of retrieving the current user's id if there is an existing 
    session with the Supabase Auth service as a private function
    */
    async #retrieveUserId() {
        const { data: { user }, error } = await supabase.auth.getUser();

        /*
        Returns null for an unsuccessful retrieval process of the current user's id
        */
        if (error) {
            console.error(
                `Retrieving current user's id unsuccessful: ${error.message}`);
            return null;
        }

        return user.id;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/storage-from-upload

    Handles the process of the user uploading a file to a bucket with the Supabase 
    Storage service
    */
    async uploadFileToBucket(fileName, fileToUpload) {
        // Ensuring a file name and its corresponding file are provided
        if (!fileName || !fileToUpload) {
            console.error("A file name and its corresponding file must be provided");
            return { error: "A file name and its corresponding file must be provided" };
        }

        // Ensuring the retrieval of the current user's id is successful
        const userId = await this.#retrieveUserId();
        if (!userId) {
            return { error: "User id unsuccessful for upload of file" };
        }

        const filePath = `${userId}/${fileName}`;
        const { data, error } = 
            await supabase.storage.from(this.bucketName).upload(filePath, fileToUpload);
        
        /*
        Returns the error object and its associated information for an unsuccessful 
        upload process 
        */
        if (error) {
            console.error(`Unsuccessful upload of file: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful 
        upload process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/storage-from-remove

    Handles the process of the user removing a file from a bucket with the Supabase 
    Storage service
    */
    async removeFileFromBucket(fileName) {
        // Ensuring a file name is provided
        if (!fileName) {
            console.error("A file name must be provided");
            return { error: "A file name must be provided" };
        }

        // Ensuring the retrieval of the current user's id is successful
        const userId = await this.#retrieveUserId();
        if (!userId) {
            return { error: "User id unsuccessful for removal of file" };
        }

        const pathToRemoveFile = `${this.bucketName}/${userId}/${fileName}`;
        const { data, error } = 
            await supabase.storage.from(this.bucketName).remove([pathToRemoveFile]);
        
        /*
        Returns the error object and its associated information for an unsuccessful 
        removal process 
        */
        if (error) {
            console.error(`Unsuccessful removal of file: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful 
        removal process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/storage-from-getpublicurl

    Handles the process of generating a public profile picture URL to allow the 
    front end to display the profile picture of the current user
    */
    async generatePublicProfilePictureUrl(filePath) {
        // Ensuring a file path is provided
        if (!filePath) {
            console.error("A file path must be provided");
            return { error: "A file path must be provided" };
        }

        // Excluding the profile_pictures/ prefix in the file path
        const filePathPrefix = "profile_pictures/";
        const { data, error } = await supabase.storage
            .from(this.bucketName)
            .getPublicUrl(filePath.substring(filePathPrefix.length));
        
        /*
        Returns the error object and its associated information for an unsuccessful 
        generation of the public profile picture URL 
        */
        if (error) {
            console.error(`Unsuccessful generation of public URL: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful 
        generation of the public profile picture URL
        */
        return { data };
    }
}

// Exporting this class to be imported and used in other files
export default SupabaseStorage;