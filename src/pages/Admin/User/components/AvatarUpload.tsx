import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { uploadFileUsingPost } from '@/services/backend/fileController';

interface AvatarUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

// 常量定义
const UPLOAD_CONFIG = {
  ACCEPTED_TYPES: ['image/jpeg', 'image/png'],
  MAX_SIZE_MB: 2,
  BIZ_TYPE: 'user_avatar',
} as const;

const MESSAGES = {
  TYPE_ERROR: '只能上传 JPG/PNG 格式的图片!',
  SIZE_ERROR: '图片大小不能超过 2MB!',
  UPLOAD_SUCCESS: '头像上传成功!',
  UPLOAD_ERROR: '头像上传失败',
} as const;

const AvatarUpload: React.FC<AvatarUploadProps> = ({ value, onChange }) => {
  const [imageUrl, setImageUrl] = useState<string>(value || '');
  
  // 当外部value变化时同步更新imageUrl
  useEffect(() => {
    if (typeof value === 'string' && value) {
      setImageUrl(value);
    }
  }, [value]);
  
  // 当imageUrl有值但value为空时，主动同步到表单
  useEffect(() => {
    if (imageUrl && !value && onChange) {
      onChange(imageUrl);
    }
  }, [imageUrl, value, onChange]);

  // 文件验证
  const validateFile = useCallback((file: File): boolean => {
    const isValidType = UPLOAD_CONFIG.ACCEPTED_TYPES.includes(file.type as any);
    if (!isValidType) {
      message.error(MESSAGES.TYPE_ERROR);
      return false;
    }
    
    const isValidSize = file.size / 1024 / 1024 < UPLOAD_CONFIG.MAX_SIZE_MB;
    if (!isValidSize) {
      message.error(MESSAGES.SIZE_ERROR);
      return false;
    }
    
    return true;
  }, []);

  // 处理文件上传
  const handleUpload = useCallback(async ({ file, onSuccess, onError }: any) => {
    try {
      const response = await uploadFileUsingPost(
        { biz: UPLOAD_CONFIG.BIZ_TYPE },
        {},
        file as File
      );
      
      if (response.code === 0 && response.data) {
        setImageUrl(response.data);
        onChange?.(response.data);
        onSuccess?.(response);
        message.success(MESSAGES.UPLOAD_SUCCESS);
      } else {
        throw new Error(response.message || '上传失败');
      }
    } catch (error: any) {
      onError?.(error);
      message.error(`${MESSAGES.UPLOAD_ERROR}: ${error.message || '未知错误'}`);
    }
  }, [onChange]);
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );
  
  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={validateFile}
      customRequest={handleUpload}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="avatar" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default AvatarUpload;