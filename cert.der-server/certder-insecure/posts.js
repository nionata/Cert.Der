'use strict';

exports.getAll = async () => {
    return {'posts': []}
}

exports.create = async (body) => {
    return {'create': body}
}

exports.pin = async (path) => {
    return {'pin': path};
}