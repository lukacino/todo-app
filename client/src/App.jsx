import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("Enter Task");
  const [status, setStatus] = useState("Enter Status");
  const [date, setDate] = useState(new Date());
  const [getTask, setGetTask] = useState([]);

  const fireRequest = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/tasks", {
        task,
        status,
        date,
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  useEffect(() => {
    const getRequest = async () => {
      axios
        .get("http://localhost:3000/api/tasks")
        .then((res) => setGetTask(res.data));
      //.then((res) => console.log(res));

      console.log(getTask);
    };
    getRequest();
  }, []);

  const funDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/tasks/" + id)
      .then(() => window.location.delete);
  };

  return (
    <div className='p-6 text-center'>
      <div className=''>
        <h1 className='text-4xl font-bold'>Todo List</h1>
      </div>
      <div className='py-6 flex flex-row justify-evenly'>
        <div className='border-2 p-3'>
          <h2 className='text-2xl font-bold'>Todo List</h2>
          <div className=''>
            <div className='border-x-2 flex flex-row text-left'>
              <table>
                <thead>
                  <tr>
                    <th className='border-y-2 px-1 bg-blue-400'>Task</th>
                    <th className='border-2 px-1 bg-blue-400'>Status</th>
                    <th className='border-2 px-1 bg-blue-400'>Deadline</th>
                    <th className='border-y-2 px-1 bg-blue-400'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getTask.map((tasks) => {
                    const { _id, task, status, deadLine } = tasks;
                    const [newD, time] = deadLine;

                    return (
                      <tr key={_id}>
                        <td className='border-r-2 border-b-2 py-1 px-2'>
                          {task}
                        </td>
                        <td className='border-r-2 border-b-2 py-1 px-2'>
                          {status}
                        </td>
                        <td className='border-r-2 border-b-2 py-1 px-2'>
                          {newD},{time}
                        </td>
                        <td className='border-b-2 py-1 px-2'>
                          <button className='bg-blue-600 text-white p-1 rounded-lg mr-1'>
                            Edit
                          </button>
                          <button
                            onClick={() => funDelete(_id)}
                            className='bg-red-500 text-white p-1 rounded-lg'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='border-2 p-3'>
          <h2 className='text-2xl font-bold'>Add Task</h2>
          <form onSubmit={fireRequest} className='text-left px-6 py-3'>
            <div className='flex flex-col gap-3'>
              <label>Task</label>
              <input
                onChange={(e) => setTask(e.target.value)}
                className='border-2 rounded-xl px-3 py-1 font-medium'
                type='text'
                placeholder={task}
              />
            </div>
            <br />
            <div className='flex flex-col gap-3'>
              <label>Status</label>
              <input
                onChange={(e) => setStatus(e.target.value)}
                className='border-2 rounded-xl px-3 py-1 font-medium'
                type='text'
                placeholder={status}
              />
            </div>
            <br />
            <div className='flex flex-col gap-3'>
              <label>Dealine</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className='border-2 rounded-lg px-3 py-1 font-medium'
                type='datetime-local'
              />
            </div>
            <button className='bg-blue-700 text-white rounded-lg p-1 mt-6'>
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
