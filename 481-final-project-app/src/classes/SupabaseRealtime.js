import supabase from "../../supabaseConfig.js";

class SupabaseRealtime {
    // Private data attributes for the class
    #currentChannel;
    #isSubscribed;

    // Class constructor
    constructor() {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.currentChannel = null;
        this.isSubscribed = false;
    }

    // Getter and setter functions for currentChannel private data attribute
    get currentChannel() {
        return this.#currentChannel;
    }
    set currentChannel(currentChannel) {
        this.#currentChannel = currentChannel;
    }

    // Getter and setter functions for isSubscribed private data attribute
    get isSubscribed() {
        return this.#isSubscribed;
    }
    set isSubscribed(isSubscribed) {
        this.#isSubscribed = isSubscribed;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/insert

    Handles the process of creating a new record to the Messages table from a 
    Message JavaScript object that will automatically map to each table column and 
    assign its corresponding value with the Supabase Database service to serve as 
    the functionality of sending a message
    */
    async sendMessage(messageDataObject) {
        const { data, error } = await supabase
            .from("messages")
            .insert([messageDataObject]);

        /*
        Returns the error object and its associated information for an unsuccessful
        creation of a new record to the Messages table process
        */
        if (error) {
            console.error(`Sending message was unsuccessful: ${error.message}`);
            return { error };
        }

        /*
        Returns the data object and its associated information for a successful
        creation of a new record to the Messages table process
        */
        return { data };
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/subscribe

    Handles the process of listening for received messages for the current user 
    whenever a new record is inserted to the Messages table and involves the 
    account id of the current user with the Supabase Realtime service to serve as 
    the functionality of receiving a message
    */
    listenForReceivedMessages(accountId) {
        // Prevents in subscribing to the channel again if already subscribed
        if (this.isSubscribed) {
            console.log("Already subscribed to a channel");
            return;
        }

        // Unsubscribes from any old channel before subscribing to the new channel
        if (this.currentChannel) {
            this.stopListeningForReceivedMessages();
        }

        /*
        Subscribes to a channel to listen for the event of a new record being 
        inserted into the Messages table and involves the account id of the current 
        user
        */
        this.currentChannel = supabase
            .channel("messages")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "messages",
                filter: `receiverId=eq.${accountId}`
            }, (payload) => {
                console.log(`Received message successfully: ${payload}`)
            })
            .subscribe((status) => {
                if (status === "SUBSCRIBED") {
                    console.log("Subscribed to channel successfully");
                }
                else if (status === "CHANNEL_ERROR") {
                    console.log("Subscribed to channel was unsuccessful");
                }
            });

        // Implicity calls the setter function
        this.isSubscribed = true;
    }

    /*
    Documentation - https://supabase.com/docs/reference/javascript/removechannel

    Handles the process of no longer listening for received messages for the 
    current user whenever a new record is inserted to the Messages table and 
    involves the account id of the current user with the Supabase Realtime service
    */
    stopListeningForReceivedMessages() {
        /*
        Prevents in unsubscribing from a channel if there is no current channel 
        subscribe to
        */
        if (!this.isSubscribed || !this.currentChannel) {
            console.log("No current channel to unsubscribe from");
            return;
        }

        /*
        Unsubscribes from the channel that is listening for the event of a new 
        record being inserted into the Messages table and involves the account id 
        of the current user
        */
        supabase.removeChannel(this.currentChannel);

        // Implicity calls the setter functions
        this.currentChannel = null;
        this.isSubscribed = false;
        console.log("Stopped listening for receiving messages");
    }
}

// Exporting this class to be imported and used in other files
export default SupabaseRealtime;