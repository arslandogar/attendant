import { Col, List, Card, Typography } from 'antd';
import { FC } from 'react';

interface Props {
  title: string;
  data: string[];
}

export const AvailabilityList: FC<Props> = ({ title, data }) => {
  const { Title } = Typography;
  return (
    <Col>
      <Card bordered={false} style={{ width: '200px', height: '300px', overflow: 'auto' }}>
        <List
          header={<Title level={4}>{title}</Title>}
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </Col>
  );
};
