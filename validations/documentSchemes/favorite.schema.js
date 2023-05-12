const favoriteSchema = {
  collMod: "favorites",
  validationAction: "error",
  validationLevel: "strict",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "favoriteItems", "userId"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "unique id ",
          uniqueItems: true,
        },
        userId: {
          bsonType: "objectId",
          description: "must be a string and is required",
        },
        favoriteItems: {
          bsonType: "array",
          uniqueItems: true,
          items: {
            bsonType: "objectId",
            description: " the item in favorite",
          },
        },
      },
      additionalProperties: false,
    },
  },
};
module.exports = favoriteSchema;
