import supabase from "../../supabaseConfig.js";

class SupabaseAuthentication { 
    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-signup
    
    Handles the process of the user signing up with an email address and password 
    to create a new account with the Supabase Auth service
    */
    async signUp(email, password) {
        const { data, error } = 
            await supabase.auth.signUp({ email, password });

        /*
        Returns the error object and its associated information for an unsuccessful 
        sign up process
        */
        if (error) {
            console.error(`Sign-up unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful sign 
        up process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-signinwithpassword

    Handles the process of the user signing in to their existing account using an 
    email address and password with the Supabase Auth service
    */
    async signIn(email, password) {
        const { data, error } = 
            await supabase.auth.signInWithPassword({ email, password });

        /*
        Returns the error object and its associated information for an unsuccessful 
        sign in process
        */
        if (error) {
            console.error(`Sign-in unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful sign 
        in process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-signout

    Handles the process of the user signing out of their existing account with the 
    Supabase Auth service
    */
    async signOut() {
        const { error } = await supabase.auth.signOut();

        /*
        Returns the error object and its associated information for an unsuccessful 
        sign out process
        */
        if (error) {
            console.error(`Sign-out unsuccessful: ${error.message}`);
            return { error };
        }

        // Returns null for a successful sign out process
        return null;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-getuser

    Handles the process of retrieving the current user details if there is an 
    existing session with the Supabase Auth service 
    */
    async retrieveUser() {
        const { data: { user }, error } = await supabase.auth.getUser();

        /*
        Returns null for an unsuccessful retrieval process of the current user 
        details
        */
        if (error) {
            console.error(
                `Retrieving current user details unsuccessful: ${error.message}`);
            return null;
        }

        return user;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-getuser

    Handles the process of retrieving the current session with the Supabase Auth 
    service
    */
    async retrieveSession() {
        const { data: { session }, error } = await supabase.auth.getSession();

        /*
        Returns null for an unsuccessful retrieval process of the current session
        */
        if (error) {
            console.error(
                `Retrieving current session unsuccessful: ${error.message}`);
            return null;
        }

        return session;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/auth-onauthstatechange

    Handles the process of keeping track of authentication state changes of the user 
    with the Supabase Auth service
    */
    listenForAuthenticationStateChanges(callback) {
        const { data } = 
            supabase.auth.onAuthStateChange((event, session) => {
            /*
            Callback functions to handle initial session, signed in, signed out, 
            and other events will be implemented in its corresponding authentication 
            React component
            */
            callback(event, session);
        });

        // Invokes unsubscribe to remove the callback function
        return () => { data.subscription.unsubscribe() };
    }
}

// Exporting this class to be imported and used in other files
export default SupabaseAuthentication;