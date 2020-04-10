export default class BaseService {
    getEventInterface() {
        throw new Error(`Service with name "${this.constructor.name}" needs to provide a getEventInterface method`);
    }
}