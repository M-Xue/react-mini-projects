import React, { useRef, useState } from 'react'
import './modal.css'

interface Point {
    x: number,
    y: number
}

export const Modal = () => {
    const initMousePosition = useRef<Point | null>(null);
    const currTranslatePosition = useRef<Point | null>(null);
    const [currentTranslate, setCurrentTranslate] = useState<Point>({x: 0, y: 0})

    const nodeRef = useRef<HTMLDivElement | null>(null);

    const handleOnMouseDown = (e: MouseEvent) => {
        initMousePosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        currTranslatePosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        // console.log(nodeRef);
        document.addEventListener('mousemove', handleOnMouseMove);
        document.addEventListener('mouseup', handleOnMouseUp);
    }

    const handleOnMouseMove = (e: MouseEvent) => {
        let newX = currentTranslate.x;
        let newY = currentTranslate.y;

        if (initMousePosition.current) {
            newX = currentTranslate.x + e.clientX - initMousePosition.current.x;
        }

        if (initMousePosition.current) {
            newY = currentTranslate.y + e.clientY - initMousePosition.current.y;
        }

        if (nodeRef.current?.getBoundingClientRect() && initMousePosition.current) {
            const leftPos = nodeRef.current?.getBoundingClientRect().left;
            const topPos = nodeRef.current?.getBoundingClientRect().top;

            // // console.log(topPos);
            // console.log(leftPos);
            // if (currTranslatePosition.current)
            //     console.log(currTranslatePosition.current.x);


            if (leftPos <= 0 && currTranslatePosition.current && newX < currTranslatePosition.current.x) {
                newX = currentTranslate.x;
            }

            if (topPos <= 0 && currTranslatePosition.current && newY < currTranslatePosition.current.y) {
                newY = currentTranslate.y;
            }

        }

        currTranslatePosition.current = {
            x: newX,
            y: newY
        }
        setCurrentTranslate({x: newX, y: newY});
    }

    const handleOnMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', handleOnMouseMove);
        document.removeEventListener('mouseup', handleOnMouseUp);
    }

    return (
        <div 
            className='modal-container' 
            onMouseDown={handleOnMouseDown} 
            style={{transform: `translate(${currentTranslate.x}px, ${currentTranslate.y}px)`}}
            ref={nodeRef}
        >
            Modal
        </div>
    )
}
