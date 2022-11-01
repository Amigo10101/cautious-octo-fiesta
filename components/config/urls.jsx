const url = "http://localhost:3000/api/";
const API = {
  getpackages: url + "packages/",
  getcontent: url + "content/",
  postcontent: url + "packages/editpackages/",
  updatecontent: url + "packages/editpackages/",
  deletepackage: url + "packages/delete_package/",
  deletecontent: url + "packages/editpackages/",
  getimages: url + "images/",
  addimage: url + "images/add_image/",
  deleteimage: url + "images/delete_image/",
  savetodb: url + "images/save_to_db/",
};

export { API };
