'use strict';

// const uuid = require("uuid");
// const bcrypt = require("bcryptjs");
// const _ = require("lodash");

// const SALT_ROUNDS = 10;

exports.authorizeRequest = async (req) => {
    // How could this ever be spoofed??
    if (req.headers.auth && JSON.parse(req.headers.auth)) {
        return true;
    }

    return false;
}

exports.login = async (body) => {
    return {'login': body};
};

exports.signup = async (body) => {
    return {'signup': body};
};

// exports.signup = async (event, context, callback) => {
//   const timestamp = new Date().getTime();
//   const data = JSON.parse(event.body);

//   // TODO: input validation

//   // hash password
//   const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

//   // insert user
//   const params = {
//     TableName: process.env.DYNAMODB_USERS_TABLE,
//     Item: {
//       id: uuid.v4(),
//       email: data.email,
//       password: hashedPassword,
//       accountType: ACCOUNT_TYPE_USER,
//       reviewStatus: REVIEW_STATUS_PENDING,
//       createdAt: timestamp,
//       updatedAt: timestamp
//     }
//   };

//   // insert user to the database
//   try {
//     await dynamoDb.put(params).promise();

//     // create a response
//     const user = params.Item;
//     const resp = _.omit(user, ["password"]); // leave out password field

//     return {
//       statusCode: 200,
//       body: JSON.stringify(resp)
//     };
//   } catch (err) {
//     // handle potential errors
//     console.error(putError);
//     return {
//       statusCode: putError.statusCode || 501,
//       headers: { "Content-Type": "text/plain" },
//       body: "Couldn't create the user item."
//     };
//   }
// };