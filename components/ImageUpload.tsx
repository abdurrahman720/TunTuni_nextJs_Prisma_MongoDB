"use client"
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";

interface ImageUploadProps{
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, value, disabled }) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange])
    
    const resizeFile = (file: File) =>
    new Promise<string>((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        150,
        0,
        (uri) => {
          resolve(uri as string);
        },
        "base64"
      );
    });

  const handleDrop = useCallback((files: any) => {
    const file = files[0];
  
    const reader = new FileReader();
  
    reader.onload = async (e: any) => {
        const resizedImage = await resizeFile(file);
        console.log(resizedImage)
      setBase64(resizedImage);
      handleChange(resizedImage);
    };
  
    reader.readAsDataURL(file);
  }, [handleChange]);
    
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    return (
        <div
        {...getRootProps({
            className : 'w-full p-4 text-white text-center border-2 border-dotted'
        })}
        >
            <input {...getInputProps()} /> 
            {
                base64 ? (
                    <div className="flex items-center justiy-center">
                        <Image
                            src={base64}
                            height="100"
                            width="100"
                            alt="image"
                        />
                </div>
                ) : (
                        <p className="text-white">
                            {label}
                        </p>
                )
            }
        </div>
    );
};

export default ImageUpload;