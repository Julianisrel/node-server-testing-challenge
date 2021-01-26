const db = require("../data/dbconfig");

module.exports = {
  find,
  add,
  remove
};

function find() {
  return db("schemes");
}


function findById(id) {
  return (
    db("schemes")
      // .first()
      .where("id", id) /*? same as {id}*/
      .then(scheme => (!scheme.length ? null : scheme))
  );
}



//* select `scheme_name`, `step_number`, `instructions,` from `steps` as `st` inner join `schemes` as `s` on `scheme_id` = `s`.`id` where `s`.`id` = 4 order by `step_number` asc

function add(scheme) {
  return db("schemes").insert([scheme]);
}
//? README  Resolves to the newly inserted scheme, including `id`.



function remove(id) {
  return db("schemes")
    .where("id", id)
    .del()
    .then(response => (!response ? null : response));
}
