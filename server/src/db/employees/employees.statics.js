async function editEmployee(employee, id) {
  const existing = await this.findById(id);
  existing.overwrite({ ...employee });
  existing.save();
  return existing;
}

async function searchEmployees(searchText) {
  const query = {
    name: new RegExp(searchText, "i"),
  };
  const data = await this.find(query);
  return data;
}

module.exports = { editEmployee, searchEmployees };
