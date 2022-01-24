exports.Ok = 200;  // The request was successfully completed.
exports.Created = 201;  // A new resource was successfully created.
exports.Unauthorized = 401;  // The request did not include an authentication token or the authentication token was expired.
exports.Conflict = 409;  // The request could not be completed due to a conflict. For example,  POST ContentStore Folder API cannot complete if the given file or folder name already exists in the parent location.
