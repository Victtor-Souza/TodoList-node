const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const body = req.body;
    const parts = req.body.final_date.split('-')
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    const id = await connection("tasks").insert({
      description: body.description,
      final_date: date.toString(),
      finished: false,
    });

    return res.json({ id });
  },

  async listTasks(req, res) {
    const tasks = await connection("tasks").select("*");

    return res.json({ tasks });
  },

  async updateTask(req, res) {
    const { id } = req.params;

    const parts = req.body.final_date.split('-')
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    const task = await connection("tasks")
      .where("id", id)
      .update({
        description: req.body.description,
        final_date: date.toString(),
        finished: req.body.finished,
      });
    if (task !== 0) {
      return res.json({ task });
    } else {
      return res.status(500).json({ error: "Atividade não encontrada!" });
    }
  },
  
    async deleteTask(req,res){
        const {id} = req.params;

        const task = await connection('tasks')
        .where('id', id)
        .select('id')
        .first();

        if (task) { 
            await connection('tasks')
            .where('id',id)
            .delete();

            return res.status(204).send();
        }

        return res.status(404).json({error: "Atividade não encontrada!"});
    }




};
