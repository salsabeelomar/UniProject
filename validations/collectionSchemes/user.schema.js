const userSchema = {
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "email", "password"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "must be a string and is required",
          uniqueItems: true,
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          // format: "email",
          description: "must be a string and is required",
          uniqueItems: true,
        },
        password: {
          bsonType: "string",
          description:
            "must be a string and more than 8 characters is required",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};
module.exports = userSchema;
