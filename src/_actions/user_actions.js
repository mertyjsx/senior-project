


export function addUser(id) {
  console.log("reducera gelen id",id)
  return {
    type: "add_user",
    payload: id,
  };
}

export function updateUser(user) {
  console.log("reducera gelen new user",user)
  return {
    type: "update_user",
    payload: user,
  };
}
export function deleteUser(payload) {
  
  return {
    type: "delete_user",
    payload: payload,
  };


}
