const status = {
    SUCCESS: {
        status: 200,
        statusName: "success"
    },
    SERVER_ERROR: {
        status: 201,
        statusName: "Server error"
    },
    RESOURCE_NOT_FOUND: {
        status: 204,
        statusName: "Resource not found"
    },
    INVALID_ID: {
        status: 210,
        statusName: "Invalid id"
    },
    INVALID_PAGE: {
        status: 211,
        statusName: "Page value is invalid"
    },
    INVALID_INPUT: {
        status: 212,
        statusName: "Invalid input"
    },
    BAD_REQUEST: {
        status: 400,
        statusName: "Bad request"
    }
}

module.exports = status;