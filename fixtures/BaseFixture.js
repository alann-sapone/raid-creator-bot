// store
import store from "../store/store";

export default class BaseFixture {

    constructor(guildId, userID) {
        this.guildId = guildId;
        this.userID = userID;
      }

    getStore = () => {
        return store;
    }

    install = () => {
        throw new Error("Must redefine install method");
    }
}