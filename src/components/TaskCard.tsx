import React, { useState } from "react";
import { ButtonCancel, ButtonDone, ButtonEdit, ButtonTrash } from "./Buttons";
import { TextField } from "./TextField";
import { useDrag } from 'react-dnd';
import { formatDate, parseDate } from "../utils/formatDate";
import { useMask } from "@react-input/mask";
import Task from "../types/Task";
import "./TaskCard.scss";
import { isOverdue } from "../utils/isOverdue";

export const TaskCard = React.memo(({task, dispatch, style={}}: {task: Task, dispatch: React.Dispatch<any>, style?: React.CSSProperties}) => {
    const [editing, setEditing] = useState<boolean>(task.editing || false);

    const handleCancel = () => {
        setEditing(false);
        setStartDay(formatDate(task.startDay));
        setEndDay(formatDate(task.endDay));
        setText(task.text);
    }

    const handleDone = () => {
        const newStartDay = parseDate(startDay);
        const newEndDay = parseDate(endDay);
        if (!isNaN(newStartDay) && !isNaN(newEndDay)) {
            dispatch({type: "edit", task: {...task, startDay: newStartDay, endDay: newEndDay, text: text}});
        } else {
            setStartDay(formatDate(task.startDay));
            setEndDay(formatDate(task.endDay));
            setText(task.text);
        }
        setEditing(false);
    }

    const [, drag] = useDrag(() => ({
        type: 'task',
        item: task,
        canDrag: !editing
    }), [editing]);

    const [startDay, setStartDay] = useState<string>(formatDate(task.startDay));
    const [endDay, setEndDay] = useState<string>(formatDate(task.endDay));
    const [text, setText] = useState<string>(task.text);

    const startDayRef = useMask({
        mask: '__.__.____',
        replacement: { _: /\d/ },
    });

    const endDayRef = useMask({
        mask: '__.__.____',
        replacement: { _: /\d/ },
    });

    const [hovered, setHovered] = useState<boolean>(false);

    return drag(
        <div 
            className={`TaskCard ${editing ? 'editing' : ''} ${hovered ? 'hovered' : ''}`} 
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="line">
                <p>Начало:</p>
                {editing ? 
                <TextField 
                    value={startDay} 
                    onChange={(e) => setStartDay(e.target.value)}
                    ref={startDayRef}
                /> 
                : <b>{formatDate(task.startDay)}</b>}
                <ButtonEdit onClick={() => setEditing(true)} className="fading edit" />
                <ButtonTrash onClick={() => dispatch({type: "delete", id: task.id})} className="fading" />
            </div>
            <div className="line">
                <p>Окончание:</p>
                {editing ? 
                <TextField
                    value={endDay} 
                    onChange={(e) => setEndDay(e.target.value)}
                    ref={endDayRef}
                /> 
                : <b style={isOverdue(task) ? { color: 'var(--red)' } : {}}>{formatDate(task.endDay)}</b>}
            </div>
            <div className="line">
                <p>Описание:</p>
                {editing ? 
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                /> 
                : <b>{task.text}</b>}
            </div>

            {editing &&
            <div className="actions">
                <ButtonCancel onClick={handleCancel}/>
                <ButtonDone onClick={handleDone}/>
            </div>
            }
        </div>
    );
});
