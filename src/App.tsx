import { useEffect, useMemo, useReducer, useState } from "react";
import { DndProvider } from 'react-dnd';
import { getDndBackend, getDndProviderOptions } from "./utils/getDndBackend";
import { loadTasks, saveTasks } from "./utils/storage";
import { parseDate } from "./utils/formatDate";
import { SearchTextField } from "./components/TextField";
import Queue from "./components/Queue";
import Task from "./types/Task";
import "./styles/App.scss";

const queues = [
    {icon: "/icons/bxs_happy-alt.svg", title: "To Do", status: "todo", allowAdd: true},
    {icon: "/icons/bxs_smile.svg", title: "In Progress", status: "in_progress"},
    {icon: "/icons/bxs_upside-down.svg", title: "Review", status: "review"},
    {icon: "/icons/bxs_ghost.svg", title: "Done", status: "done"},
];

export default function App() {
    const [tasks, dispatch] = useReducer((state: Array<Task>, action) => {
        switch(action.type) {
            case "add":
                return [...state, action.task];
            case "edit":
                return state.map(t => t.id === action.task.id ? action.task : t);
            case "delete":
                return state.filter(t => t.id !== action.id);
            case "move":
                return state.map(t => t.id === action.id ? {...t, type: action.status} : t);
            default:
                return state;
        }
    }, [], () => loadTasks());

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const [searchValue, setSearchValue] = useState<string>("");
    const filteredTasks = useMemo(() => {
        return tasks.filter(t => /^\d{2}\.\d{2}\.\d{4}$/.test(searchValue) ? t.startDay === parseDate(searchValue) || t.endDay === parseDate(searchValue) : t.text.toLowerCase().includes(searchValue.toLowerCase()));
    }, [tasks, searchValue]);

    return(
        <DndProvider backend={getDndBackend()} options={getDndProviderOptions()}>
            <div className="App">
                <div className="wrapper">
                    <div className="header">
                        <p className="title">Your tasks</p>
                        <SearchTextField 
                            placeholder="поиск..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <div className="scroll-frame">
                        <div className="grid">
                            {queues.map((q, i) => (
                                <Queue
                                    icon={q.icon}
                                    title={q.title}
                                    status={q.status}
                                    allowAdd={q.allowAdd}
                                    dispatch={dispatch}
                                    tasks={filteredTasks.filter((t) => t.type === q.status).sort((a: Task, b: Task) => a.startDay - b.startDay)}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
}
