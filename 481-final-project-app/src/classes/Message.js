class Message {
    // Private data attributes
    #messageId;
    #senderId;
    #receiverId;
    #content;
    #dateTime;
    #isMarkAsRead;

    // Class constructor
    constructor(messageId, senderId, receiverId, content, dateTime, isMarkAsRead) {
        // Implicity calls the setter functions to avoid repeating validation logic twice
        this.messageId = messageId;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.dateTime = dateTime;
        this.isMarkAsRead = isMarkAsRead;
    }

    // Getter and setter functions for messageId private data attribute
    get messageId() {
        return this.#messageId;
    }
    set messageId(messageId) {
        this.#messageId = messageId;
    }

    // Getter and setter functions for senderId private data attribute
    get senderId() {
        return this.#senderId;
    }
    set senderId(senderId) {
        this.#senderId = senderId;
    }

    // Getter and setter functions for receiverId private data attribute
    get receiverId() {
        return this.#receiverId;
    }
    set receiverId(receiverId) {
        this.#receiverId = receiverId;
    }

    // Getter and setter functions for content private data attribute
    get content() {
        return this.#content;
    }
    set content(content) {
        this.#content = content;
    }

    // Getter and setter functions for dateTime private data attribute
    get dateTime() {
        return this.#dateTime;
    }
    set dateTime(dateTime) {
        this.#dateTime = dateTime;
    }

    // Getter and setter functions for isMarkAsRead private data attribute
    get isMarkAsRead() {
        return this.#isMarkAsRead;
    }
    set isMarkAsRead(isMarkAsRead) {
        this.#isMarkAsRead = isMarkAsRead;
    }
}

// Exporting this class to be imported and used in other files
export default Message;