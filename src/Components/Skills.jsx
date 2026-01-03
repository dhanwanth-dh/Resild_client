import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { styled } from '@mui/material/styles';
import Buttonn from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';

import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { getAuth, onAuthStateChanged } from "firebase/auth";

/* ================== antd-style ================== */
const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
/* ================================================= */

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Skills = () => {
    const { styles } = useStyle();

    /* ================== STATE ================== */
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const auth = getAuth();

    /* ================== AUTH FIX ================== */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            }
        });

        return () => unsubscribe();
    }, [auth]);
    /* ============================================ */

    const handleSubmit = async () => {
        try {
            if (!currentUser) {
                alert("Authentication still loading. Please try again.");
                return;
            }

            // 🔥 get username from Firestore
            const userDocRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                alert("User record not found in database");
                return;
            }

            const username = userSnap.data().username;

            if (!username) {
                alert("Username missing in user profile");
                return;
            }

            // 🔥 save skills using username as document ID
            await setDoc(doc(db, "skills", username), {
                skills: selectedSkills.map(skill => skill.title),
                files: uploadedFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                })),
                updatedAt: new Date()
            });

            alert("Skills saved successfully!");
        } catch (error) {
            console.error("Error saving skills:", error);
        }
    };

    const handleFileUpload = (event) => {
        setUploadedFiles([...event.target.files]);
    };

    return (
        <>
            <div className='h-150 w-200 flex flex-col items-center justify-between'>
                <div className='mt-10 flex flex-col justify-between gap-20 items-center'>
                    <div className='h-70 w-130 flex flex-col justify-around items-center bg-amber-50 rounded-2xl'>

                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={top100Films}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            onChange={(e, value) => setSelectedSkills(value)}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <li key={key} {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                );
                            }}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Skills" placeholder="Interests" />
                            )}
                        />

                        <ConfigProvider
                            button={{
                                className: styles.linearGradientButton,
                            }}
                        >
                            <Space>
                                <Button
                                    className='w-125'
                                    type="primary"
                                    size="large"
                                    icon={<AntDesignOutlined />}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </Space>
                        </ConfigProvider>

                    </div>

                    <div>
                        <Buttonn
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                            />
                        </Buttonn>
                    </div>
                </div>
            </div>
        </>
    )
}

const top100Films = [
    { title: 'Communication' },
    { title: 'Programming' },
    { title: 'Leadership' },
    { title: 'Teamwork' },
    { title: 'Problem-solving' },
    { title: 'Critical thinking' },
    { title: 'Time management' },
    { title: 'Data analysis' },
    { title: 'Mathematics & Analytics' },
    { title: 'Cybersecurity' },
    { title: 'Data Structures' },
    { title: 'Web Technologies' },
    { title: 'Databases' },
    { title: 'Debugging' },
    { title: 'Testing' },
    { title: 'Development Tools' },
    { title: 'Object-Oriented Programming (OOP)' },
    { title: 'Cloud Computing' },
    { title: 'Game development' },
    { title: 'Design skills' },
    { title: 'Hardware Design' },
    { title: 'Circuit Design' },
    { title: 'Optimization' },
    { title: 'Engine programming' },
    { title: 'Simulation' },
    { title: 'System Knowledge' },
    { title: 'Project Management' },
];

export default Skills;
