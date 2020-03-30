const discussions = {};

export const pushDiscussion = (command, userId, discussionHandler, mergeResult = {}) => {
    if (!discussions[userId])
        discussions[userId] = {
            command,
            stack: [],
            result: {}
        }

    if (discussions[userId].command === command)
        discussions[userId].stack.push(discussionHandler)

    Object.assign(discussions[userId].result, mergeResult);
}

export const getDiscussion = (userId) => {
    return discussions[userId];
}

export const endDiscussion = (userId) => {
    const { result } = discussions[userId]
    delete discussions[userId];

    return result;
}

export const getDiscussionResult = (userId, mergeResult) => {
    mergeResult && Object.assign(discussions[userId].result, mergeResult);
    return discussions[userId].result;
}