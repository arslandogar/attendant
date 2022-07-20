import { Modal as AntModal, Typography, Row, Col } from 'antd';
import { ReactNode, FC } from 'react';

interface ModalProps {
  title: string;
  titleContent: ReactNode;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ visible, onClose, title, titleContent, children }) => {
  return (
    <AntModal
      title={<ModalTitle title={title}>{titleContent}</ModalTitle>}
      width="80%"
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      {children}
    </AntModal>
  );
};

interface ModalTitleProps {
  title: string;
  children?: ReactNode;
}

const ModalTitle: FC<ModalTitleProps> = ({ title, children }) => {
  const { Title } = Typography;
  return (
    <Row align="middle" justify="center">
      <Col>
        <Title level={3} type="secondary">
          {title}
        </Title>
        {children}
      </Col>
    </Row>
  );
};
