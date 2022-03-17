export default {
  type: "object",
  properties: {
    phone: { type: "string" },
  },
  required: ["phone"],
} as const;
