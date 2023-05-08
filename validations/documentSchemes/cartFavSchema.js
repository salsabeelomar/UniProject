const cartFavSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "productId", "userId"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "must be a string and is required",
        },
        productId: {
          bsonType: "objectId",
          items: {
            bsonType: "objectId",
          },
        },
      },
      additionalProperties: false,
      validationAction: "error",
      uniqueItems: ["_id"],
      validationLevel: "strict",
    },
  };
  module.export = cartFavSchema;
  