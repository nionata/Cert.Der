'use strict';

exports.getAll = async () => {
    return {'users': []};
}

exports.get = async (path) => {
    return {'user': path};
}

exports.create = async (body) => {
    return {'create': body};
}

exports.updateImage = async (path, body) => {
    return {'update': path+body};
}