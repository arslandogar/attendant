import { Col, Button } from 'antd';
import { FC } from 'react';

interface Props {
  text: string;
  onClick: () => void;
}

export const BtnCol: FC<Props> = ({ text, onClick }) => {
  return (
    <Col style={{ height: '100%', width: 220 }}>
      <Button type="primary" shape="round" block style={{ height: '100%' }} onClick={onClick}>
        {text}
      </Button>
    </Col>
  );
};
