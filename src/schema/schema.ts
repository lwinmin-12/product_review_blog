import { array, number, object, string } from "zod";

export const allSchemaId = object({
  query: object({
    _id: string({
      required_error: "no data with that id",
    }).regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
  }),
});

export const roleSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
});

export const userRoleSchema = object({
  body: object({
    userId: string().regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
    roleId: string().regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
  }),
});

export const userPermitSchema = object({
  body: object({
    userId: string().regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
    permitId: string().regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
  }),
});

export const permitSchema = object({
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
});

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Passwrod too short should be 6 characters minimum"),
    comparePassword: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }),
  }).refine((data) => data.password === data.comparePassword, {
    message: "Password do not match",
    path: ["Password Confirmation"],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(4, "password is too short"),
  }),
});

export const feedbackSchema = object({
  body: object({
    productId: string({
      required_error: "You need product's id",
    }).regex(/^[0-9a-fA-F]{24}$/, "invlid id"),

    userId: string({
      required_error: "You need user's id",
    }).regex(/^[0-9a-fA-F]{24}$/, "invlid id"),
  }),
});
