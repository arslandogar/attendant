import { Col, Button } from 'antd';
import { FC } from 'react';

export interface BtnColProps {
  text: string;
  onClick: () => void;
}

export const BtnCol: FC<BtnColProps> = ({ text, onClick }) => {
  return (
    <Col style={{ height: '100%', width: 220 }}>
      <Button type="primary" shape="round" block style={{ height: '100%' }} onClick={onClick}>
        {text}
      </Button>
    </Col>
  );
};
