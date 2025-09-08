import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const getDndBackend = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? TouchBackend : HTML5Backend;
};

export const getDndProviderOptions = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? {captureDraggingState: true} : {};
};