import React, { useState } from "react";

const KanbanBoard = () => {
  const [newTask, setNewTask] = useState("");
  const taskCategories = [
    "to do",
    "Dev in Progress",
    "Qa in progress",
    "Completed",
  ];

  const [tasks, setTasks] = useState([
    { name: "task1", id: 0 },
    { name: "task2", id: 1 },
    { name: "task3", id: 2 },
    { name: "task4", id: 3 },
  ]);

  const moveBackward = (e) => {
    setTasks((prev) => {
      return prev.map((ele) => {
        return ele.id === e.id && ele.name === e.name
          ? { name: ele.name, id: ele.id - 1 }
          : ele;
      });
    });
  };

  const moveForword = (e) => {
    setTasks((prev) => {
      return prev.map((ele) => {
        return ele.id === e.id && e.name === ele.name
          ? { name: ele.name, id: ele.id + 1 }
          : ele;
      });
    });
  };

  return (
    <div className="board-wrapper">
      <div
        className="taskCrationBar"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          padding: "15px",
          background: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <input
          className="taskInput"
          value={newTask}
          placeholder="add your task"
          type="text"
          style={{
            height: "40px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid",
            padding: "5px",
          }}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            const trimmedTask = newTask.trim();
            if (!trimmedTask) return;
            const exists = tasks.some(
              (task) => task.name.toLowerCase() === trimmedTask.toLowerCase()
            );

            if (exists) {
              alert("Task already exists!");
              return;
            }
            setTasks([...tasks, { name: trimmedTask, id: 0 }]);
            setNewTask("");
          }}
          style={{
            height: "35px",
            width: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2px",
            cursor: newTask ? "pointer" : "not-allowed",
          }}
        >
          Create
        </button>
      </div>
      <div
        className="taskBoard"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "10px",
          background: "#f4f5f7",
          minHeight: "auto",
        }}
      >
        {taskCategories.map((ele, i) => {
          return (
            <div
              key={i}
              className="taskCard"
              style={{
                flex: "1 1 300px",
                maxWidth: "250px",
                background: "#ebecf0",
                borderRadius: "8px",
                padding: "10px",
                minHeight: "400px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                margin: "5px"
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "1.1rem",
                }}
              >
                {ele}
              </h3>

              {tasks.map((e) => {
                return e.id === i ? (
                  <div
                    className="task"
                    style={{
                      background: "white",
                      margin: "8px 0",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {e.name}
                    <div
                      className="taskButtons"
                      style={{
                        display: "flex",
                        gap: "6px",
                        marginLeft: "10px",
                      }}
                    >
                      <button
                        className="backButton"
                        disabled={e.id === 0}
                        onClick={() => moveBackward(e)}
                        style={{
                          background: "#e0e0e0",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: e.id === 0 ? "not-allowed" : "pointer",
                        }}
                      >
                        ⬅
                      </button>
                      <button
                        className="forwardButton"
                        disabled={e.id === 3}
                        onClick={() => moveForword(e)}
                        style={{
                          background: "#4caf50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: e.id === 3 ? "not-allowed" : "pointer",
                        }}
                      >
                        ➡
                      </button>
                      <button
                        className="deleteButton"
                        disabled={e.id === 3}
                        onClick={() =>
                          setTasks((prev) =>
                            prev.filter((task) => task.name !== e.name)
                          )
                        }
                        style={{
                          background: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          cursor: e.id === 3 ? "not-allowed" : "pointer",
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
