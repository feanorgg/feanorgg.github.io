import { useEffect, useMemo, useReducer, useState } from "react";
import { loadTasks, saveTasks } from "./utils/storage";
import { containsDate } from "./utils/dateOperations";
import { SearchTextField } from "./components/TextField";
import Queue from "./components/Queue";
import { TaskCard } from "./components/TaskCard";
import Task from "./types/Task";
import "./styles/App.scss";

import { DndProvider, usePreview } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';

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
        return tasks.filter(t => /^\d{2}\.\d{2}\.\d{4}$/.test(searchValue) ? containsDate(t, searchValue) : t.text.toLowerCase().includes(searchValue.toLowerCase()));
    }, [tasks, searchValue]);

    const TaskCardPreview = () => {
        const preview = usePreview();
        if (!preview.display) {
            return null;
        }
        const {item, style} = preview;
        return( // @ts-ignore
            <TaskCard task={item} dispatch={dispatch} style={style} />
        );
    }

    return( // backend={HTML5Backend}
        <DndProvider options={HTML5toTouch}>
            <TaskCardPreview />
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
