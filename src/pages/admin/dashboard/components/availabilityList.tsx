import { Col, Card, Typography } from 'antd';
import { FC } from 'react';

interface Props {
  title: string;
  data: string[];
}

export const AvailabilityList: FC<Props> = ({ title, data }) => {
  return (
    <Col className="availability-list">
      <Card
        bordered={false}
        style={{
          background: '#09bfa7',
          width: '200px',
          height: '300px',
          overflow: 'auto',
          borderRadius: '15px',
        }}
      >
        <>
          <div className="title-container">
            <Typography.Title level={4}>{title}</Typography.Title>
          </div>
          <div className="names-container">
            {data.map((item) => (
              <Typography.Text key={item}>{item}</Typography.Text>
            ))}
          </div>
        </>
      </Card>
    </Col>
  );
};
