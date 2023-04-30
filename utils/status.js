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
    NAME_EXIST: {
        status: 211,
        statusName: "Colour name exist"
    },
    INVALID_HEX: {
        status: 212,
        statusName: "Invalid hex"
    },
    INVALID_RGB: {
        status: 213,
        statusName: "Invalid rgb"
    },
    INVALID_HSL: {
        status: 214,
        statusName: "Invalid hsl"
    },
    COLOUR_NOT_MATCH: {
        status: 215,
        statusName: "Colour not match"
    },
    EMPTY_COLOUR_NAME: {
        status: 216,
        statusName: "Colour name is empty"
    },
    COLOUR_EXIST: {
        status: 217,
        statusName: "Colour is exist"
    },
    BAD_REQUEST: {
        status: 400,
        statusName: "Bad request"
    }
}

module.exports = status;