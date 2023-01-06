import React, { useRef, useState } from 'react'
import './sidebar.css';
import _ from 'lodash';
import useLocalStorage from '../../hooks/useLocalStorage';
import useThrottle from '../../hooks/useThrottle';

export const Sidebar = () => {
    // const [sidebarWidth, setSidebarWidth] = useState<number>(240);
    const [sidebarWidth, setSidebarWidth] = useLocalStorage<number>("sidebarWidth",240);
    const cursorSidebarOffset = useRef<number>(0);
    const isMouseDown = useRef<boolean>(false);

    const handleSidebarMouseDown = (e: MouseEvent): void => {
        console.log("Mouse Down");
        document.body.style.cursor = "ew-resize";

        isMouseDown.current = true;
        cursorSidebarOffset.current = e.clientX - sidebarWidth;

        window.addEventListener("mousemove", throttledHandleSidebarMouseMove);
        window.addEventListener("mouseup", handleSidebarMouseUp);
        window.addEventListener("mouseleave", handleSidebarMouseUp);
    }

    // const handleSidebarMouseMove = 
    const throttledHandleSidebarMouseMove = useThrottle(
        (e: MouseEvent): void => {
            console.log(e.clientX);
            let newWidth = e.clientX - cursorSidebarOffset.current;

            if (newWidth < 0)
                newWidth = 0;
            if (newWidth > document.documentElement.clientWidth)
                newWidth = document.documentElement.clientWidth;
    
            if (isMouseDown.current) {
                setSidebarWidth(newWidth);
            }
        },
        10
    );    

    const handleSidebarMouseUp = (e: MouseEvent): void => {
        console.log("Mouse Up");
        document.body.style.cursor = "default";

        isMouseDown.current = false;
        window.removeEventListener("mousemove", throttledHandleSidebarMouseMove);
        window.removeEventListener("mouseup", handleSidebarMouseUp);
        window.removeEventListener("mouseleave", handleSidebarMouseUp);
    }

    return (
        <>
            <div className="sidebarContainer" style={{width: sidebarWidth}}>

            </div>
            <button className="sidebarResizeButton" onMouseDown={handleSidebarMouseDown}>
                <div className="sidebarButtonShadow"></div>
            </button>
        </>
    )
}
