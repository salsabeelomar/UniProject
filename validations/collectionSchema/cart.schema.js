const cartSchema = {
  collMod: "carts",
  validationAction: "error",
  validationLevel: "strict",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "cartItems", "userId"],
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
        cartItems: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "quantity", "price"],
            properties: {
              productId: {
                bsonType: "objectId",
                description: "must be a string and is required",
                uniqueItems: true,
              },
              quantity: {
                bsonType: "int",
                description: "must be a number and is required",
              },
              price: {
                bsonType: "int",
                description: "must be a number and is required",
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  },
};
module.export = cartSchema;
