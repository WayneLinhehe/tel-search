import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import axios from 'axios';

const Upload = () => {
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    useEffect(() => {fetch("/api/reminders").then((res) => res.json()).then((json)=> {console.log(json)})},[])
    // useEffect(() => {fetch("/api/reminders", {
    //     method: "POST",
    //     body: JSON.stringify({})
    // }).then((res) => res.json()).then((json)=> {console.log(json)})},[])


    const onBasicUpload = () => {
        //toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    const onBasicUploadAuto = () => {
        //toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }

    const customBase64Uploader = async (event:any) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
        }
    }

    const invoiceUploadHandler = (files:any) => {

        axios.post('/api/reminders', { username: 'abcdef' })

        console.log(files)
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e:any) => {
            uploadInvoice(e.target.result);
        };
        fileReader.readAsDataURL(file);
    };
    const uploadInvoice = async (invoiceFile: any) => {

        await axios.post('/api/reminders', { username: 'abcdef' })



        console.log('2')
        console.log(invoiceFile)
        let formData = new FormData();
        formData.append('invoiceFile', invoiceFile);

        const response = await fetch(`/api/reminders`,
            {
                method: 'POST',
                body: formData
            },
        );
    };

    return (
        <div>
            <input type="file" id="abc"/>

            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <div className="card">
                <h5>Basic</h5>
                <FileUpload mode="basic" name="aaa" url="/api/reminders"  onUpload={onBasicUpload} />

                <h5>Basic with Auto</h5>
                <FileUpload mode="basic"  url="/api/reminders"  onUpload={onBasicUploadAuto} auto chooseLabel="Browse" />

                <h5>Custom (base64 encoded)</h5>
                <FileUpload mode="basic" url="/api/reminders"  customUpload uploadHandler={invoiceUploadHandler} />
            </div>
        </div>
    )
}

export default Upload;