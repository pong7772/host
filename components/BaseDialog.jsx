'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const BaseDialog = ({ open, onSubmit, onCancel, departmentData, fields, dialogTitle }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});



    const handleOk = () => {
        form.validateFields().then((values) => {
            onSubmit({ ...departmentData, ...values }); // merge the old and new data
            form.resetFields();
        });
    };

    return (
        <Modal
            visible={open}
            title={dialogTitle}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form form={form} initialValues={formData}>
                {fields.map((field) => (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={field.rules || []}
                    >
                        {field.component}
                    </Form.Item>
                ))}
            </Form>
            <style>{`
        .ant-modal-title {
            padding-bottom:8px;
        }
        .ant-btn-primary{
            background-color: var(--base-blue);
        }
    `}</style>
        </Modal>

    );
};

export default BaseDialog;