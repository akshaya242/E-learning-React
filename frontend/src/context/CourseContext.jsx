import {  createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";

const CourseContext = createContext()

export const CourseContextProvider = ({children})=>{
    const [courses, setCourses] = useState([]);
    console.log(server)
    async function fetchCourses(){
        try {
            const {data} = await axios.get(`${server}/api/course/all`) 
            setCourses(data.courses);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchCourses();
    },[])
    return <CourseContext.Provider value={{courses}}>{children}</CourseContext.Provider>
}

export const CourseData = ()=> useContext(CourseContext);