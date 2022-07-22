import { Col, Button } from 'antd';
import { FC } from 'react';

export interface BtnColProps {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export const BtnCol: FC<BtnColProps> = ({ text, onClick, loading }) => {
  return (
    <Col style={{ height: '100%', width: 240 }}>
      <Button
        className="user-dashboard-button"
        type="primary"
        block
        onClick={onClick}
        loading={loading}
      >
        {text}
      </Button>
    </Col>
  );
};
