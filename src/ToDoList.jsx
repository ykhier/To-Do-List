import { useState, useEffect } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState("");


    // Update tasks array in local storage every time tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(e) {
        e.preventDefault();
        if (newTask.trim() === "") return;
        setTasks([...tasks, newTask]);
        setNewTask("");
    }

    function newTaskChange(e) {
        setNewTask(e.target.value);
    }

    function deleteTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const item = updatedTasks[index];
            updatedTasks.splice(index, 1);
            updatedTasks.push(item);
            setTasks(updatedTasks);
        }
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const item = updatedTasks[index];
            updatedTasks.splice(index, 1);
            updatedTasks.unshift(item);
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="ToDoListContainer" dir="rtl">
            <h1 className="title">To-Do-List</h1>

            <form className="addRow" onSubmit={addTask}>
                <input
                    className="inputField"
                    type="text"
                    placeholder="הוסף משימה..."
                    onChange={newTaskChange}
                    value={newTask}
                    id="addTaskField"
                    required
                />
                <button className="addButton" type="submit">הוסף</button>
            </form>

            {tasks.length > 0 && (
                <div className="listHeader">
                    <span className="headerTask">משימה</span>
                    <span className="headerActions">פעולות</span>
                </div>
            )}

            <ul className="taskList">
                {tasks.map((task, index) => (
                    <li key={index} className="taskItem">
                        <span className="taskText">{task}</span>
                        <div className="actions">
                            <button className="iconBtn delete" onClick={() => deleteTask(index)}>❌</button>
                            <button className="iconBtn" onClick={() => moveUp(index)}>▲</button>
                            <button className="iconBtn" onClick={() => moveDown(index)}>▼</button>
                        </div>
                    </li>
                ))}
            </ul>
            <span className="numberOfTasks"> מספר המשימות:  {tasks.length}</span>
        </div>
    );
}

export default ToDoList;
