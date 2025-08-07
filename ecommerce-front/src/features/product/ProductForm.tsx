import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useProductStore } from '@/store/productStore';

type Props = { visible: boolean; onClose: () => void; };

const ProductForm: React.FC<Props> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const { addProduct, loading } = useProductStore();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values: { photo: string }) => {
    setSubmitting(true);
    try {
      await addProduct({ photo: values.photo });
      message.success('商品新增成功');
      onClose();
    } catch {
      message.error('提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="新增商品"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="photo" label="商品图片URL" rules={[{ required: true }]}>
          <Input placeholder="请输入图片链接" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting || loading} block>
          提交
        </Button>
      </Form>
    </Modal>
  );
};

export default ProductForm;
