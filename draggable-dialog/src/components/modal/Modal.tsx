import React, { useRef, useState } from 'react'
import './modal.css'

interface Point {
    x: number,
    y: number
}

export const Modal = () => {
    const initMousePosition = useRef<Point | null>(null);
    const [currentTranslate, setCurrentTranslate] = useState<Point>({x: 0, y: 0})

    const handleOnMouseDown = (e: MouseEvent) => {
        initMousePosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        document.addEventListener('mousemove', handleOnMouseMove);
        document.addEventListener('mouseup', handleOnMouseUp);
    }

    const handleOnMouseMove = (e: MouseEvent) => {
        if (initMousePosition.current && e.clientX > 0 && e.clientY > 0) {
            const newX = currentTranslate.x + e.clientX - initMousePosition.current.x;
            const newY = currentTranslate.y + e.clientY - initMousePosition.current.y;
            setCurrentTranslate({x: newX, y: newY});
        }
    }

    const handleOnMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', handleOnMouseMove);
        document.removeEventListener('mouseup', handleOnMouseUp);
    }

    return (
        <div className='modal-container' onMouseDown={handleOnMouseDown} style={{transform: `translate(${currentTranslate.x}px, ${currentTranslate.y}px)`}}>Modal</div>
    )
}