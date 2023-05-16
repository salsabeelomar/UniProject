const productSchema = {
  collMod: "products",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id",
        "vendorId",
        "name",
        "price",
        "images",
        "description",
        "stock",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "must be a objectId and is required",
          uniqueItems: true,
        },
        vendorId: {
          bsonType: "objectId",
          description: " vendorId is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        description: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        size: {
          bsonType: "array",
          description: "sizes not array",
        },
        stock: {
          bsonType: "number",
          description: "stock not number",
        },
        price: {
          bsonType: "number",
          description: "price not number",
        },
        images: {
          bsonType: "array",
          description: "images not array",
        },
      },
      additionalProperties: false,
    },
  },
  validationLevel: "strict",
  validationAction: "error",
};
module.exports = productSchema;
