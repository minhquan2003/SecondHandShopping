import Users from "../../../models/Users.js";

const findAdminByEmail = async (email) => {
  return await Users.findOne({ email, role: "admin", status: true });
};

export { findAdminByEmail };
