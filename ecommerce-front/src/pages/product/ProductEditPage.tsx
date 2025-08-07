import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "@/api/product";
import { Form, Input, Button, Spin, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then(product => {
        form.setFieldsValue(product);
      })
      .catch(() => message.error("加载失败"))
      .finally(() => setLoading(false));
  }, [id]);

  const onFinish = async (values: { photo: any }) => {
    setLoading(true);
    try {
      await updateProduct(id!, "adminUserId", {
        photo: values.photo?.file?.response?.url || values.photo,
      });
      message.success("商品更新成功");
    } catch {
      message.error("商品更新失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item label="商品图片" name="photo" valuePropName="file">
            <Upload name="file" action="/api/upload" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading} type="primary" block>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
export default ProductEditPage;
