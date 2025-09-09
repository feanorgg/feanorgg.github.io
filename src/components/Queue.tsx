import { ButtonAdd } from "./Buttons";
import { TaskCard } from "./TaskCard";
import { useDrop } from 'react-dnd';
import Task from "../types/Task";
import "./Queue.scss";
import { getTodayTime } from "../utils/dateOperations";

interface QueueProps {
    icon: string;
    title: string;
    status: string;
    allowAdd?: boolean;
    dispatch: React.Dispatch<any>;
    tasks: Array<Task>;
};

export default function Queue({
    icon,
    title,
    status,
    allowAdd=false,
    dispatch,
    tasks
}: QueueProps) {
    const [{ canDrop }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (task: Task) => {
            dispatch({type: "move", id: task.id, status: status});
        },
        collect: (monitor: any) => ({
            canDrop: monitor.canDrop()
        })
    }));
    
    return drop(
        <div className="Queue">
            <div className="queue-header">
                <img src={icon} />
                <p className="queue-title">{title}</p>

                {allowAdd && <ButtonAdd className="add" onClick={() => dispatch({type: "add", task: {type: "todo", startDay: getTodayTime(), endDay: getTodayTime(), text: ""}})} />}
            </div>
            
            <div className="queue-scroll">
                <div className="queue-list">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task.id} dispatch={dispatch} />
                    ))}
                    {canDrop && tasks.length === 0 && <div className="card-placeholder"></div>}
                </div>
            </div>
        </div>
    );
}
