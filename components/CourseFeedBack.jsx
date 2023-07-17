'use client';

import React, { use, useState } from 'react';
import { Button, Select } from 'antd';
import ResponsePage from './Response';
const { Option } = Select;

export default function CourseFeedback({ lecture }) {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showResponse, setShowResponse] = useState(false);

    function handleCourseChange(value) {
        setSelectedCourse(value);
    }

    function handleSubmit() {
        setShowResponse(true);
    }

    return (
        <div className='pt-4 '>
            <p className='text-black'>View feedback for a course</p>
            <form>
                <Select id="course-select" value={selectedCourse} onChange={handleCourseChange} className='w-1/2'>
                    <Option value="">Select a course</Option>
                    <Option value="Introduction to Computer Science">Introduction to Computer Science</Option>
                    <Option value="Data Structures and Algorithms">Data Structures and Algorithms</Option>
                    <Option value="Computer Networks">Computer Networks</Option>
                    <Option value="Operating Systems">Operating Systems</Option>
                    <Option value="Calculus">Calculus</Option>
                    <Option value="Linear Algebra">Linear Algebra</Option>
                    <Option value="Probability Theory">Probability Theory</Option>
                    <Option value="Number Theory">Number Theory</Option>
                </Select>
            </form>
            <div className='flex justify-end w-1/2'>
                <Button className="flex my-2 base-color-bg text-primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            {showResponse && <ResponsePage lecture={lecture} course={selectedCourse} />}
        </div>
    );
}