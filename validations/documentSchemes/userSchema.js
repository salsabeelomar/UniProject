const userSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "email", "password"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "must be a string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          format: "email",
          description: "must be a string and is required",
        },
        password: {
          bsonType: "string",
          description: "must be a string and more than 8 characters is required",
        },
      },
      additionalProperties: false,
      validationAction: "error",
      uniqueItems: ["_id", "email"],
      validationLevel: "strict",
    },
  };
  module.export = userSchema;
  